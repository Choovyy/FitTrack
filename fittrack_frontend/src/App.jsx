import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AboutUs from './AboutUs';
import LogWorkout from './LogWorkout';
import Post from './Post';
import AddPost from './AddPost'; 
import WorkoutGoalForm from './WorkoutGoalForm';
import WorkoutGoalPage from './WorkoutGoalPage';
import JoinUs from './JoinUs';
import Login from './Login';
import Register from './Register'; 
import WorkoutHistory from './WorkoutHistory';
import Dashboard from './Dashboard';
import UpdateWorkout from './UpdateWorkout';
import './App.css';

function App() {
    const [posts, setPosts] = useState([]);

    const addPost = (newPost) => {
        setPosts([...posts, newPost]);
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/join-us" />} /> 
                <Route path="/aboutus" element={<AboutUs />} />
                <Route path="/log-workout" element={<LogWorkout />} />
                <Route path="/workout-history" element={<WorkoutHistory />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/update-workout/:workoutID" element={<UpdateWorkout />} />
                <Route path="/" element={<Navigate to="/join-us" />} />
                <Route path="/log-workout" element={<LogWorkout />} />
                <Route path="/add-post" element={<AddPost addPost={addPost} />} /> 
                <Route path="/post" element={<Post />} />
                <Route path="/workout-goals" element={<WorkoutGoalPage />} />
                <Route path="/workout-goals/new" element={<WorkoutGoalForm />} />
                <Route path="/join-us" element={<JoinUs />} />
                <Route path="/login" element={<Login />} /> 
                <Route path="/register" element={<Register />} /> 
            </Routes>
        </Router>
    );
}

export default App;
