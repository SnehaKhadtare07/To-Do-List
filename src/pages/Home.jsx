import React from "react";
import { useNavigate, Link } from "react-router-dom";

const Home = () => {
  const nav = useNavigate();

  return (
    <div
      style={{
        minHeight: "90vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "3rem 1rem",
        background: "#2a2a72",
        color: "white",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        marginTop: "-1cm",   
        
      }}
    >
      {/* top brand */}
      <header style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            fontFamily: "'Brush Script MT', cursive",
          }}
        >
          ✅ TASKFLOW
        </h1>
        <p
          style={{
            fontSize: "1.2rem",
            fontWeight: "bold",
            fontFamily: "'Brush Script MT', cursive",
          }}
        >
          Make your day a little more organized and joyfully simple
        </p>
      </header>

      {/* mid feature cards */}
      <section
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1.5rem",
          width: "100%",
          maxWidth: "900px",
          marginBottom: "2rem",
          flexWrap: "wrap", // ✅ fixes small screen overflow
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderRadius: "12px",
            padding: "1rem",
            flex: "1",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            minWidth: "250px",
          }}
        >
          <h2 style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>✨ Uniqueness</h2>
          <p>✨ Create as many lists as you like—whether for study, work, or pure fun.</p>
          <p>🎨 Personalize each list with colors, icons, and names that reflect your style.</p>
          <p>💡 Every list feels unique, because it’s made just for you.</p>
        </div>

        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderRadius: "12px",
            padding: "1rem",
            flex: "1",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            minWidth: "250px",
          }}
        >
          <h2 style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>🎯 Priorities</h2>
          <p>🚦 Rank your tasks by importance—High, Medium, or Low.</p>
          <p>🎯 Stay sharp by focusing on what truly matters first.</p>
          <p>⏳ No more stress—see clearly what needs attention and what can wait.</p>
        </div>

        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderRadius: "12px",
            padding: "1rem",
            flex: "1",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            minWidth: "250px",
          }}
        >
          <h2 style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>🎨 Why</h2>
          <p>🎲 Add a spark of fun to your day—turn tasks into a game.</p>
          <p>🎉 Celebrate progress with playful themes, surprises, and rewards.</p>
          <p>🌈 Because productivity doesn’t have to be boring—it can be your playground.</p>
        </div>
      </section>

      {/* CTA */}
      <div style={{ textAlign: "center" }}>
        <button
          onClick={() => nav("/login")}
          style={{
            backgroundColor: "#7c3aed",
            color: "white",
            border: "none",
            borderRadius: "9999px",
            padding: "0.75rem 2rem",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(124, 58, 237, 0.6)",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#5a1ea6")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#7c3aed")}
          onMouseDown={(e) => (e.currentTarget.style.backgroundColor = "#4b1780")}
          onMouseUp={(e) => (e.currentTarget.style.backgroundColor = "#5a1ea6")}
        >
          Get started
        </button>
        <div style={{ marginTop: "1rem" }}>
          <Link
            to="/login"
            style={{
              color: "white",
              textDecoration: "underline",
              fontWeight: "bold",
              fontFamily: "'Brush Script MT', cursive",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#d1c4e9")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "white")}
            onMouseDown={(e) => (e.currentTarget.style.color = "#b39ddb")}
            onMouseUp={(e) => (e.currentTarget.style.color = "#d1c4e9")}
          >
            or log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
