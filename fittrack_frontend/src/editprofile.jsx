import React from "react";
import { useNavigate } from "react-router-dom"; // Import Navigate hook for programmatic navigation
import "./Style/editprofile.css"

const EditProfile = () => {
  const navigate = useNavigate(); // Hook for navigation

  const handleGoHome = () => {
    // Use navigate to programmatically go back to Home
    navigate("/");
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "var(--light-gray)", height: "100vh" }}>
      {/* Header */}
      <header style={{ backgroundColor: "var(--dark-blue)", color: "var(--white)", padding: "10px 20px" }}>
        <h1 style={{ margin: 0 }}>Edit Profile</h1>
      </header>

      {/* Tabs */}
      <nav style={{ backgroundColor: "var(--white)", display: "flex", borderBottom: "1px solid var(--light-gray)" }}>
        <button style={{ flex: 1, padding: "10px", backgroundColor: "var(--white)", border: "none" }}>
          Basic
        </button>
        <button style={{ flex: 1, padding: "10px", backgroundColor: "var(--teal)", color: "var(--white)", border: "none" }}>
          Athletic
        </button>
        <button style={{ flex: 1, padding: "10px", backgroundColor: "var(--white)", border: "none" }}>
          Academic
        </button>
      </nav>

      {/* Main Content */}
      <main style={{ padding: "20px" }}>
        {/* Public Info Section */}
        <section style={{ marginBottom: "20px" }}>
          <h2 style={{ color: "var(--dark-blue)" }}>Public Info</h2>
          <form>
            <div style={{ display: "flex", gap: "20px" }}>
              <div>
                <img
                  src="https://via.placeholder.com/100"
                  alt="Profile"
                  style={{
                    borderRadius: "50%",
                    border: "2px solid var(--teal)",
                    width: "100px",
                    height: "100px",
                  }}
                />
                <button style={{ marginTop: "10px", backgroundColor: "var(--yellow)", border: "none", padding: "5px 10px" }}>
                  Change Photo
                </button>
              </div>
              <div style={{ flex: 1 }}>
                <label>Name</label>
                <input type="text" placeholder="Name" style={{ display: "block", width: "100%", marginBottom: "10px" }} />
                <label>Birth Year</label>
                <input type="number" placeholder="Birth Year" style={{ display: "block", width: "100%", marginBottom: "10px" }} />
              </div>
            </div>
          </form>
        </section>

        {/* Contact Section */}
        <section>
          <h2 style={{ color: "var(--dark-blue)" }}>Contact</h2>
          <p style={{ fontSize: "14px" }}>Only verified recruiters will see this information.</p>
          <form>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              <input type="text" placeholder="Street" />
              <input type="email" placeholder="Email" />
            </div>
          </form>
        </section>

        {/* Go Home Button */}
        <button onClick={handleGoHome} style={{ marginTop: "20px", backgroundColor: "var(--teal)", color: "var(--white)", border: "none", padding: "10px 20px" }}>
          Go Back to Home
        </button>
      </main>
    </div>
  );
};

export default EditProfile;
