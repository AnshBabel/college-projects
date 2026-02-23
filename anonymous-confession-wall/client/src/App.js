import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

axios.defaults.withCredentials = true;

const COLORS = ["#f7c6d0", "#c7f0a6", "#b5d8ff", "#ffe97a", "#ffb347", "#d0f7f3"];

function App() {
  const [user, setUser] = useState(null);
  const [confessions, setConfessions] = useState([]);
  const [text, setText] = useState("");
  const [secretCode, setSecretCode] = useState("");
  const [modal, setModal] = useState(null);
  const [codeInput, setCodeInput] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/auth/user")
      .then(res => setUser(res.data))
      .catch(() => setUser(null));

    loadConfessions();
  }, []);

  const loadConfessions = async () => {
    const { data } = await axios.get("http://localhost:5000/confessions");
    setConfessions(
      data.map(c => ({
        ...c,
        rotation: (Math.random() * 2 - 1).toFixed(2)
      }))
    );
  };

  const postConfession = async () => {
    if (!text || secretCode.length < 4)
      return alert("Secret Code must be at least 4 digits");

    await axios.post("http://localhost:5000/confessions", { text, secretCode });
    setText("");
    setSecretCode("");
    loadConfessions();
  };

  const react = async (id, type) => {
    await axios.post(`http://localhost:5000/confessions/${id}/react`, { type });
    loadConfessions();
  };

  const handleEditDelete = async () => {
    try {
      const url = `http://localhost:5000/confessions/${modal.id}`;

      if (modal.type === "edit") {
        await axios.put(url, { text: modal.text, secretCode: codeInput });
      } else {
        await axios.delete(url, { data: { secretCode: codeInput } });
      }

      setModal(null);
      setCodeInput("");
      loadConfessions();
    } catch {
      alert("Wrong Secret Code");
    }
  };

  const logout = async () => {
    await axios.get("http://localhost:5000/auth/logout");
    setUser(null);
  };

  return (
    <div className="container">
      {!user ? (
        <div className="login-page">
          <div className="login-left">
            <h1>🧱 Anonymous Confession Wall</h1>
            <p>Share secrets. Stay anonymous. Express freely.</p>
          </div>

          <div className="login-right">
            <div className="login-card">
              <h2>Welcome</h2>
              <a
                href="http://localhost:5000/auth/google"
                className="google-btn"
              >
                Connect with Google
              </a>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="top-bar">
            <h1>🧱 Anonymous Confession Wall</h1>
            <div className="user-section">
              <span>Logged in as {user.displayName}</span>
              <button className="logout-btn" onClick={logout}>Logout</button>
            </div>
          </div>

          <div className="form">
            <textarea
              placeholder="Write your confession..."
              value={text}
              onChange={e => setText(e.target.value)}
            />

            <div className="row">
              <input
                type="password"
                placeholder="Secret Code (min 4 digits)"
                value={secretCode}
                onChange={e => setSecretCode(e.target.value)}
              />

              <button className="post-btn" onClick={postConfession}>
                Post Confession
              </button>
            </div>
          </div>

          <div className="wall">
            {confessions.map((c, i) => (
              <div
                key={c._id}
                className="card"
                style={{
                  background: COLORS[i % COLORS.length],
                  transform: `rotate(${c.rotation}deg)`
                }}
              >
                <p>{c.text}</p>

                <div className="reactions">
                  {["like", "love", "laugh"].map(type => (
                    <button key={type} onClick={() => react(c._id, type)}>
                      {type === "like" && "👍"}
                      {type === "love" && "❤️"}
                      {type === "laugh" && "😂"}{" "}
                      {c.reactions[type]}
                    </button>
                  ))}
                </div>

                <div className="actions">
                  <button onClick={() => setModal({ type: "edit", id: c._id, text: c.text })}>
                    Edit
                  </button>
                  <button onClick={() => setModal({ type: "delete", id: c._id })}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {modal && (
        <div className="modal">
          <div className="modal-box">
            <h3>Enter Secret Code</h3>

            <input
              type="password"
              placeholder="Enter your secret code"
              value={codeInput}
              onChange={e => setCodeInput(e.target.value)}
              className="code-input"
            />

            {modal.type === "edit" && (
              <textarea
                value={modal.text}
                onChange={e => setModal({ ...modal, text: e.target.value })}
                className="edit-textarea"
              />
            )}

            <div className="modal-actions">
              <button onClick={() => setModal(null)}>Cancel</button>
              <button onClick={handleEditDelete}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;