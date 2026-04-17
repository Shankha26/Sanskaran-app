// 🚀 React + Styled Components Version

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, onSnapshot } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// Firebase Config
const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_PROJECT_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export default function App() {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  // Login
  const login = async () => {
    const email = prompt("Email");
    const password = prompt("Password");
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      setUser(res.user);
    } catch {
      alert("Login failed");
    }
  };

  // Real-time chat
  useEffect(() => {
    if (!user) return;

    const unsub = onSnapshot(collection(db, "messages"), (snap) => {
      setMessages(snap.docs.map(doc => doc.data()));
    });

    return () => unsub();
  }, [user]);

  const sendMessage = async () => {
    if (!text) return;

    await addDoc(collection(db, "messages"), {
      text,
      user: user.email,
      time: Date.now()
    });

    setText("");
  };

  if (!user) {
    return (
      <Center>
        <LoginButton onClick={login}>Login</LoginButton>
      </Center>
    );
  }

  return (
    <Container>
      <Sidebar>
        <Title>Sanskaran</Title>
        <NavItem>🎭 Dance</NavItem>
        <NavItem>🎵 Music</NavItem>
        <NavItem>💻 Tech</NavItem>
      </Sidebar>

      <ChatSection>
        <Messages>
          {messages.map((m, i) => (
            <Message key={i}>
              <b>{m.user}</b>: {m.text}
            </Message>
          ))}
        </Messages>

        <InputArea>
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message..."
          />
          <SendButton onClick={sendMessage}>Send</SendButton>
        </InputArea>
      </ChatSection>

      <Members>
        <Title>Members</Title>
        <Member>🟢 You</Member>
      </Members>
    </Container>
  );
}

// 🎨 Styled Components

const Container = styled.div`
  display: flex;
  height: 100vh;
  background: #36393f;
  color: white;
`;

const Sidebar = styled.div`
  width: 220px;
  background: #202225;
  padding: 15px;
`;

const Title = styled.h3`
  margin-bottom: 15px;
`;

const NavItem = styled.div`
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #40444b;
  }
`;

const ChatSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Messages = styled.div`
  flex: 1;
  padding: 15px;
  overflow-y: auto;
`;

const Message = styled.div`
  margin-bottom: 10px;
`;

const InputArea = styled.div`
  display: flex;
  padding: 10px;
  background: #40444b;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 5px;
  outline: none;
`;

const SendButton = styled.button`
  margin-left: 10px;
  padding: 10px 15px;
  background: #5865f2;
  border: none;
  color: white;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #4752c4;
  }
`;

const Members = styled.div`
  width: 220px;
  background: #2f3136;
  padding: 15px;
`;

const Member = styled.div`
  margin-top: 10px;
`;

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoginButton = styled.button`
  padding: 12px 20px;
  background: #5865f2;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

/*
🔥 NOW YOU HAVE:
✔ Clean UI (Discord-like)
✔ Styled Components (industry standard)
✔ Maintainable structure

⚠️ INSTALL THIS:
npm install styled-components
*/
const params = new URLSearchParams(window.location.search);
const team = params.get("team");

console.log("Selected Team:", team);