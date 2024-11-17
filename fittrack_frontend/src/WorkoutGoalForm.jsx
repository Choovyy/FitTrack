import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createWorkoutGoal } from './WorkoutGoalService';
import './Style/WorkoutGoalForm.css';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard, faFireAlt, faClock, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

const WorkoutGoalForm = () => {
  const [goalDescription, setGoalDescription] = useState('');
  const [targetCalories, setTargetCalories] = useState('');
  const [targetDuration, setTargetDuration] = useState('');
  const [deadline, setDeadline] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const goalData = {
      goalDescription,
      targetCalories: parseInt(targetCalories, 10),
      targetDuration: parseInt(targetDuration, 10),
      deadline,
    };

    try {
      await createWorkoutGoal(goalData);
      setGoalDescription('');
      setTargetCalories('');
      setTargetDuration('');
      setDeadline('');
      alert('Workout Goal created successfully!');
      navigate('/workout-goals');
    } catch (error) {
      console.error('Error creating workout goal:', error);
    }
  };

  const handleCancel = () => {
    navigate('/workout-goals');
  };

  return (
    <>
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
      <div className="workout-goal-form-page">
        <div className="workout-goal-form-container">
          <h2 className="form-heading">Set Your Goals</h2>

          <form onSubmit={handleSubmit} className="workout-goal-form">
            <div className="form-content">
              {/* Left Column */}
              <div className="left-column">
                <div className="form-group">
                  <label htmlFor="goalDescription">
                    <FontAwesomeIcon icon={faClipboard} className="form-icon" /> Goal Description:
                  </label>
                  <textarea
                    id="goalDescription"
                    value={goalDescription}
                    onChange={(e) => setGoalDescription(e.target.value)}
                    rows="6"
                    maxLength="500"
                    placeholder="Describe your goal in detail..."
                    required
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="right-column">
                <div className="form-group">
                  <label htmlFor="targetCalories">
                    <FontAwesomeIcon icon={faFireAlt} className="form-icon" /> Target Calories:
                  </label>
                  <input
                    type="number"
                    id="targetCalories"
                    value={targetCalories}
                    onChange={(e) => setTargetCalories(e.target.value)}
                    placeholder="Enter target calories"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="targetDuration">
                    <FontAwesomeIcon icon={faClock} className="form-icon" /> Target Duration (minutes):
                  </label>
                  <input
                    type="number"
                    id="targetDuration"
                    value={targetDuration}
                    onChange={(e) => setTargetDuration(e.target.value)}
                    placeholder="Enter duration in minutes"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="deadline">
                    <FontAwesomeIcon icon={faCalendarAlt} className="form-icon" /> Deadline:
                  </label>
                  <input
                    type="date"
                    id="deadline"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    required
                  />
                </div>

                <div className="button-container">
                  <button type="submit" className="save-button-form">SAVE</button>
                  <button type="button" className="cancel-button-form" onClick={handleCancel}>CANCEL</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default WorkoutGoalForm;
