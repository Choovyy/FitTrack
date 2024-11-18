import React from 'react';
import { Link } from 'react-router-dom';
import JohnD from './assets/JohnD.png';
import Scott from './assets/Scott.png';
import JohnG from './assets/JohnG.png';
import Vincent from './assets/Vincent.png';
import Tovi from './assets/Tovi.png';
import './Style/AboutUs.css';

const teamMembers = [
    {
        name: 'John David Calimpong',
        role: 'Senior Developer',
        image: JohnD,
    },
    {
        name: 'Scott Benzer Gitgano',
        role: 'Frontend Specialist',
        image: Scott,
    },
    {
        name: 'John Gerard Donaire',
        role: 'Frontend Specialist',
        image: JohnG,
    },
    {
        name: 'Vincent Paul Dumangcas',
        role: 'Backend Specialist',
        image: Vincent,
    },
    {
        name: 'Tovi Joshua Hermosisima',
        role: 'Backend Specialist',
        image: Tovi,
    },
];

const AboutUs = () => {
    return (
        <>
            {/* Navbar */}
            <nav className="navbar">
                <ul className="navList">
                    <li className="navDashboard">
                        <Link to="/dashboard" className="navLink">Dashboard</Link>
                    </li>
                    <li className="navHistory">
                        <Link to="/workout-history" className="navLink">History</Link>
                    </li>
                    <li className="navAboutUs">
                        <Link to="/aboutus" className="navLink">About Us</Link>
                    </li>
                </ul>
            </nav>

            {/* About Us Content */}
            <div className="about-us-container">
                <h1 className="about-us-heading">Hi there, we are FitTruck!</h1>
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
                <p className="about-us-description">
                    FitTrack empowers users to reach their fitness goals by making it easy to log, track, and analyze
                    workouts, building a supportive community focused on <strong>progress and wellness</strong>.
                </p>
            </div>
        </>
    );
};

export default AboutUs;
