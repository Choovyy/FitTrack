// src/pages/Home.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token'); // Clear the token from local storage
        navigate('/login'); // Redirect to login page
    };

    return (
        <>
            <nav className="navbar">
                <ul className="navList">
                    <li className="navDashboard">
                        <Link to="/home" className="navLink">Dashboard</Link>
                    </li>
                    <li className="navLogworkout">
                        <Link to="/log-workout" className="navLink">Log Workout</Link>
                    </li>
                    <li className="navLogout">
                        <button onClick={handleLogout} className="navLink">Logout</button>
                    </li>
                </ul>
            </nav>
            <div>
                <h1>Welcome to FitTrack</h1>
                <p>Tiwasa lang</p>
            </div>
        </>
    );
};

export default Home;
