import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './App.css';

const Home = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token'); 
        navigate('/login'); // Redirect to login after logout
    };

    return (
        <>
            <nav className="navbar">
                <ul className="navList">
                    <li className="navDashboard">
                        <Link to="/dashboard" className="navLink">Dashboard</Link>
                    </li>
                    <li className="navWorkoutHistory">
                        <Link to="/workout-history" className="navLink">History</Link>
                    </li>
                    <li className="navAboutUs">
                        <Link to="/about-us" className="navLink">About Us</Link> {/* Corrected URL */}
                    </li>
                    <li className="navLogout">
                        <button onClick={handleLogout} className="navLink">Logout</button> {/* Button for logout */}
                    </li>
                </ul>
            </nav>
            <div>
                <h1>Welcome to FitTrack</h1>
                <p>Track your workouts and goals easily!</p> {/* Updated text */}
            </div>
        </>
    );
};

export default Home;
