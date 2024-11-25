import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Style/editprofile.css"; // Ensure this file contains the provided CSS

const EditProfile = () => {
  const navigate = useNavigate();

  // State to manage the username and password inputs
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  // Example: Replace this with the actual user ID from context or props
  const userId = 1;

  const handleGoHome = () => {
    navigate("/");
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleUpdateProfile = async () => {
    try {
      // Make an API call to update the user's profile
      const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          password,
        }),
      });

      if (response.ok) {
        alert("Profile updated successfully!");
        navigate("/"); 
      } else {
        const errorData = await response.json();
        alert(`Failed to update profile: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred while updating the profile.");
    }
  };

  return (
    <div>
      {/* Header */}
      <header>
        <h1>Edit Profile</h1>
      </header>

      {/* Navigation Bar */}
      <nav>
        <button onClick={() => handleNavigate("/")}>Home</button>
        <button onClick={() => handleNavigate("/profile")}>Profile</button>
        <button onClick={() => handleNavigate("/settings")}>Settings</button>
        <button onClick={() => handleNavigate("/logout")}>Logout</button>
      </nav>

      {/* Main Content */}
      <main>
        {/* Public Info Section */}
        <section>
          <h2>Edit Your Profile</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <div>
              <div>
                <img
                  src="https://via.placeholder.com/100"
                  alt="Profile"
                  className="profile-img"
                />
                <button type="button" className="change-photo">
                  Change Photo
                </button>
              </div>
              <div style={{ flex: 1 }}>
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </form>
        </section>

        {/* Buttons */}
        <div className="button-group">
          <button onClick={handleUpdateProfile} className="confirm">
            Confirm
          </button>
          <button onClick={handleGoHome} className="go-home">
            Go Back to Home
          </button>
        </div>
      </main>
    </div>
  );
};

export default EditProfile;
