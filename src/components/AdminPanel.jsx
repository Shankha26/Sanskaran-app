import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";

export default function AdminPanel({ user }) {
  if (user.email !== "admin@gmail.com") return null;

  const makeCore = async () => {
    const uid = prompt("User ID");
    await updateDoc(doc(db, "users", uid), {
      role: "core"
    });
  };

  return (
    <div style={{ width: "200px", background: "#111" }}>
      <h3>Admin Panel</h3>
      <button onClick={makeCore}>Make Core</button>
    </div>
  );
}