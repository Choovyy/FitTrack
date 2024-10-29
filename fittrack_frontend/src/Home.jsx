// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
const Home = () => {
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
