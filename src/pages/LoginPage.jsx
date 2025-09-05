import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import { Link, useLocation, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const nav = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/app";

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      nav(from, { replace: true });
    } catch (e) {
      setErr(e.message);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "linear-gradient(135deg, #132a53 0%, #1b2d6b 35%, #2b0b66 70%, #431c7a 100%)",
      }}
    >
      <form
        onSubmit={onSubmit}
        style={{
          width: "min(420px, 92%)",
          background: "rgba(255,255,255,0.2)",
          backdropFilter: "blur(6px)",
          padding: "1.25rem",
          borderRadius: "12px",
          boxShadow: "0 10px 30px rgba(0,0,0,.2)",
        }}
      >
        <h2
          style={{
            margin: 0,
            textAlign: "center",
            fontFamily: "'Brush Script MT', cursive",
            fontWeight: "bold",
            color: "white",
          }}
        >
          Log in
        </h2>
        <p
          style={{
            marginTop: ".25rem",
            color: "white",
            textAlign: "center",
            fontFamily: "'Brush Script MT', cursive",
            fontWeight: "bold",
          }}
        >
          Welcome back 👋
        </p>

        <label style={{ display: "block", marginTop: "1rem" }}>
          <span
            style={{
              color: "white",
              fontFamily: "'Brush Script MT', cursive",
              fontWeight: "bold",
            }}
          >
            Email
          </span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "95%",
              marginTop: ".35rem",
              marginLeft: "auto",
              marginRight: "auto",
              padding: ".6rem",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
            }}
          />
        </label>

        <label style={{ display: "block", marginTop: ".8rem" }}>
          <span
            style={{
              color: "white",
              fontFamily: "'Brush Script MT', cursive",
              fontWeight: "bold",
            }}
          >
            Password
          </span>
          <input
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            required
            style={{
              width: "95%",
              marginTop: ".35rem",
              marginLeft: "auto",
              marginRight: "auto",
              padding: ".6rem",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
            }}
          />
        </label>

        {err && (
          <div
            style={{
              color: "white",
              marginTop: ".8rem",
              fontFamily: "'Brush Script MT', cursive",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {err}
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
          <button
            type="submit"
            style={{
              width: "fit-content",
              minWidth: "140px",
              padding: ".75rem",
              borderRadius: "999px",
              border: "none",
              background: "#7c3aed",
              color: "white",
              fontWeight: 800,
              cursor: "pointer",
              boxShadow: "0 10px 24px rgba(124,58,237,0.4)",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#5a1ea6")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#7c3aed")}
            onMouseDown={(e) => (e.currentTarget.style.backgroundColor = "#4b1780")}
            onMouseUp={(e) => (e.currentTarget.style.backgroundColor = "#5a1ea6")}
          >
            Continue
          </button>
        </div>

        <div
          style={{
            marginTop: ".8rem",
            textAlign: "center",
            fontFamily: "'Brush Script MT', cursive",
            fontWeight: "bold",
            color: "white",
          }}
        >
          New here?{" "}
          <Link
            to="/register"
            style={{ cursor: "pointer", color: "#87ceeb", transition: "color 0.3s ease" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#1e90ff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#87ceeb")}
            onMouseDown={(e) => (e.currentTarget.style.color = "#1e90ff")}
            onMouseUp={(e) => (e.currentTarget.style.color = "#1e90ff")}
          >
            Create an account
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
