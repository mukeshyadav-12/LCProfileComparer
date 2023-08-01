import React, { useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import '../css/analytics.css'

const ProblemCircle = ({ problemsSolved, totalProblems }) => {
  const [showSuccessRate, setShowSuccessRate] = useState(false);
  const percentage = ((problemsSolved / totalProblems) * 100).toFixed(1);

  const toggleSuccessRate = () => {
    setShowSuccessRate(!showSuccessRate);
  };
  const renderCenterText = () => {
    if (showSuccessRate) {
      return `${percentage}%  `;
    } else {
      return `${problemsSolved} / ${totalProblems}`;
    }
  };
  

  return (
    <div className='circularBar' style={{ width: '200px' }}
    onMouseEnter={toggleSuccessRate}
        onMouseLeave={toggleSuccessRate}>
      <CircularProgressbar
        value={percentage}
        text={renderCenterText()}
        strokeWidth={10}
        styles={buildStyles({
          textSize: '10px',
          pathColor: '#28a745',
          trailColor: '#d3d3d3',
          textColor: '#28a745',
        })}
        
      />
    </div>
  );
};

export default ProblemCircle;
