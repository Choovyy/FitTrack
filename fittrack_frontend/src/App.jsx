import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import LogWorkout from './LogWorkout';
import Post from './Post';
import WorkoutGoalForm from './WorkoutGoalForm';
import WorkoutGoalList from './WorkoutGoalList';
import WorkoutGoalPage from './WorkoutGoalPage';
import './App.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/log-workout" element={<LogWorkout />} />
                <Route path="/post" element={<Post />} /> {/* Adjusted without samplePost */}
                <Route path="/workout-goals" element={<WorkoutGoalPage />} /> {/* Page for viewing all goals */}
                <Route path="/workout-goals/new" element={<WorkoutGoalForm />} /> {/* Form for new goal */}
                <Route path="/workout-goals/list" element={<WorkoutGoalList />} /> {/* List of workout goals */}
                {/* Add more routes as needed */}
            </Routes>
        </Router>
    );
}

export default App;
