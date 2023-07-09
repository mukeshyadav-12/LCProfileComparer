import React, { useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ProblemCircle = ({ problemsSolved, totalProblems }) => {
  const [showSuccessRate, setShowSuccessRate] = useState(false);
  const successRate = Math.round((problemsSolved / totalProblems) * 100);
  const percentage = Math.round((problemsSolved / totalProblems) * 100);

  const toggleSuccessRate = () => {
    console.log("hovers over toggel ")
    setShowSuccessRate(!showSuccessRate);
  };

  const renderCenterText = () => {
    if (showSuccessRate) {
      return `${successRate}%`;
    } else {
      return `${problemsSolved} / ${totalProblems}`;
    }
  };

  return (
    <div style={{ width: '200px' }}>
      <CircularProgressbar
        value={percentage}
        text={renderCenterText()}
        strokeWidth={10}
        styles={buildStyles({
          textSize: '20px',
          pathColor: '#28a745',
          trailColor: '#d3d3d3',
          textColor: '#28a745',
        })}
        onMouseEnter={toggleSuccessRate}
        onMouseLeave={toggleSuccessRate}
      />
    </div>
  );
};

export default ProblemCircle;
