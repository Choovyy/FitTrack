import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './Home';
import LogWorkout from './LogWorkout';
import Post from './Post';
import WorkoutGoalForm from './WorkoutGoalForm';
import WorkoutGoalPage from './WorkoutGoalPage';
import JoinUs from './JoinUs';
import Login from './Login';
import Register from './Register'; // Import Register component
import WorkoutDashboard from './WorkoutDashboard';
import './App.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/join-us" />} /> 
                <Route path="/home" element={<Home />} />
                <Route path="/log-workout" element={<LogWorkout />} />
                <Route path="/workout-dashboard" element={<WorkoutDashboard />} />
                <Route path="/post" element={<Post />} />
                <Route path="/workout-goals" element={<WorkoutGoalPage />} />
                <Route path="/workout-goals/new" element={<WorkoutGoalForm />} />
                <Route path="/join-us" element={<JoinUs />} />
                <Route path="/login" element={<Login />} /> {/* Login route */}
                <Route path="/register" element={<Register />} /> 
                {/* Add more routes as needed */}
            </Routes>
        </Router>
    );
}

export default App;
