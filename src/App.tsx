import React from 'react';
import Calendar from './Calendar'; // Import the Calendar component
import './App.css'; // Import CSS file for global styling

const App = () => {
  return (
    <div className="app">
      <h1>Calendar App</h1>
      {/* Render the Calendar component */}
      <Calendar />
    </div>
  );
};

export default App;
