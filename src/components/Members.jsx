import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

export default function Members() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "users"), (snap) => {
      setUsers(snap.docs.map(d => d.data()));
    });
    return () => unsub();
  }, []);

  return (
    <div style={{ width: "200px", background: "#2f3136" }}>
      <h3>Members</h3>
      {users.map((u, i) => (
        <div key={i}>
          {u.online ? "🟢" : "⚫"} {u.name} ({u.role})
        </div>
      ))}
    </div>
  );
}