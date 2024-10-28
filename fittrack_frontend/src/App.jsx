import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import LogWorkout from './LogWorkout';
import './App.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/log-workout" element={<LogWorkout />} />
                {/* Add more routes as needed */}
            </Routes>
        </Router>
    );
}

export default App;
