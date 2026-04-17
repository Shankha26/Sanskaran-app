import { useState, useEffect } from "react";
import { db, storage } from "../firebase";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function Chat({ user }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "messages"), (snap) => {
      setMessages(snap.docs.map(d => d.data()));
    });
    return () => unsub();
  }, []);

  const sendMessage = async () => {
    if (!text) return;
    await addDoc(collection(db, "messages"), {
      text,
      user: user.email,
      time: Date.now()
    });
    setText("");
  };

  // 📁 FILE UPLOAD
  const uploadFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const storageRef = ref(storage, "files/" + file.name);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);

    await addDoc(collection(db, "messages"), {
      text: url,
      user: user.email,
      isFile: true
    });
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1, overflow: "auto" }}>
        {messages.map((m, i) => (
          <div key={i}>
            <b>{m.user}</b>: 
            {m.isFile ? <a href={m.text}>📁 File</a> : m.text}
          </div>
        ))}
      </div>

      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
      <input type="file" onChange={uploadFile} />
    </div>
  );
}