import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import LogWorkout from './LogWorkout';
import Post from './Post';
import WorkoutGoalForm from './WorkoutGoalForm';
import WorkoutGoalPage from './WorkoutGoalPage';
import JoinUs from './JoinUs';
import Login from './Login'; 
import './App.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/log-workout" element={<LogWorkout />} />
                <Route path="/post" element={<Post />} />
                <Route path="/workout-goals" element={<WorkoutGoalPage />} />
                <Route path="/workout-goals/new" element={<WorkoutGoalForm />} />
                <Route path="/join-us" element={<JoinUs />} />
                <Route path="/login" element={<Login />} /> {/* Added Login route */}
                {/* Add more routes as needed */}
            </Routes>
        </Router>
    );
}

export default App;
