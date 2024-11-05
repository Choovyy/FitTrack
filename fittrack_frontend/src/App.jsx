import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import LogWorkout from './LogWorkout';
import Post from './Post';
import AddPost from './AddPost'; 
import WorkoutGoalForm from './WorkoutGoalForm';
import WorkoutGoalList from './WorkoutGoalList';
import WorkoutGoalPage from './WorkoutGoalPage';
import './App.css';

function App() {
    const [posts, setPosts] = useState([]);

    const addPost = (newPost) => {
        setPosts([...posts, newPost]);
    };

    return (
        <Router>
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/log-workout" element={<LogWorkout />} />
                <Route path="/post" element={<Post post={posts[posts.length - 1]} />} /> 
                <Route path="/add-post" element={<AddPost addPost={addPost} />} /> 
                <Route path="/workout-goals" element={<WorkoutGoalPage />} />
                <Route path="/workout-goals/new" element={<WorkoutGoalForm />} />
                <Route path="/workout-goals/list" element={<WorkoutGoalList />} />
            </Routes>
        </Router>
    );
}

export default App;
