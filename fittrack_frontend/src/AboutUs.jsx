import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import JohnD from './assets/JohnD.png';
import Scott from './assets/Scott.png';
import JohnG from './assets/JohnG.png';
import Vincent from './assets/Vincent.png';
import Tovi from './assets/Tovi.png';
import './Style/AboutUs.css';
import logo from './assets/FitTrack Logo.png';
import { FaUser } from 'react-icons/fa';

const teamMembers = [
    { name: 'John David Calimpong', role: 'Senior Developer', image: JohnD },
    { name: 'Scott Benzer Gitgano', role: 'Frontend Specialist', image: Scott },
    { name: 'John Gerard Donaire', role: 'Frontend Specialist', image: JohnG },
    { name: 'Vincent Paul Dumangcas', role: 'Backend Specialist', image: Vincent },
    { name: 'Tovi Joshua Hermosisima', role: 'Backend Specialist', image: Tovi },
];

const AboutUs = () => {
    const [isNavbarVisible, setIsNavbarVisible] = useState(true);
    const [isProfileDropdownVisible, setIsProfileDropdownVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => setIsNavbarVisible(window.scrollY <= 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/login');
    };

    const toggleProfileDropdown = () => {
        setIsProfileDropdownVisible(!isProfileDropdownVisible);
    };

    return (
        <>
            {/* Navbar */}
            <nav className={`navbar ${isNavbarVisible ? 'visible' : 'hidden'}`}>
                <div className="navbar-logo">
                    <Link to="/dashboard">
                        <img src={logo} alt="FitTrack Logo" />
                    </Link>
                </div>
                <ul className="navList">
                    <li><Link to="/dashboard" className="navLink">Dashboard</Link></li>
                    <li><Link to="/workout-history" className="navLink">History</Link></li>
                    <li><Link to="/aboutus" className="navLink">About Us</Link></li>
                    <li className="navProfile">
                        <button className="profile-btn navLink" onClick={toggleProfileDropdown}>
                            <FaUser className="profile-icon" /> Profile
                        </button>
                        {isProfileDropdownVisible && (
                            <div className="profile-dropdown">
                                <button className="dropdown-item" onClick={() => navigate('/edit-profile')}>Edit Profile</button>
                                <button className="dropdown-item logout-btn" onClick={handleLogout}>Logout</button>
                            </div>
                        )}
                    </li>
                </ul>
            </nav>

            {/* About Us Content */}
            <div className="about-us-scroll-container">
                <div className="about-us-container">
                    <h1 className="about-us-heading">Hi there, we are FitTrack!</h1>

                    {/* Team Members Section */}
                    <div className="team-members">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="team-member">
                                <img src={member.image} alt={`${member.name}`} className="member-image" />
                                <div className="member-info">
                                    <h2 className="member-name">{member.name}</h2>
                                    <p className="member-role">{member.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* About Us Description */}
                    <p className="about-us-description">
                        FitTrack empowers users to reach their fitness goals by making it easy to log, track, and analyze workouts, building a supportive community focused on <strong>progress and wellness</strong>.
                    </p>

                    {/* Mission and Core Values Section */}
                    <div className="mission-core-values">
                        <div className="mission-section">
                            <h2 className="section-heading-mission">Our Mission</h2>
                            <p className="section-text">
                                Our mission is to provide exceptional service and deliver value to our customers while fostering a culture of innovation and excellence.
                            </p>
                        </div>
                        <div className="core-values-section">
                            <h2 className="section-heading-core">Core Values</h2>
                            <ul className="core-values-list">
                                <li>Fit</li>
                                <li>Innovation</li>
                                <li>Team-work</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="footer">© 2024 || <a href="#">FitTrack</a></div>
        </>
    );
};

export default AboutUs;
