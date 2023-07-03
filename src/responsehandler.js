import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

export const handleResponse = (responseData, username) => {
  const totalEasyProblems = responseData.totalEasy;
  const easySolved = responseData.easySolved;
  const easyProgress = (easySolved / totalEasyProblems) * 100;
  const totalMediumProblems= responseData.totalMedium
  const totalHardProblems=responseData.totalHard

  const mediumProgress = (responseData.mediumSolved / totalMediumProblems) * 100;
  const hardProgress = (responseData.hardSolved / totalHardProblems) * 100;
  const submissionVector = Array(365).fill(0); // Initialize an array of size 365 with 0 values

  Object.entries(responseData.submissionCalendar).forEach(([timestamp, count]) => {
    const date = new Date(parseInt(timestamp) * 1000);
    const daysAgo = Math.floor((Date.now() - date) / (24 * 60 * 60 * 1000));

    if (daysAgo < 365) {
      submissionVector[365 - daysAgo - 1] = count;
    }
  });
  // console.log(submissionVector)

  const submissionCalendar = Object.entries(responseData.submissionCalendar).map(([timestamp, count]) => ({
    date: new Date(parseInt(timestamp) * 1000),
    count: count,
  }));

  return (
    <div>
      <div className="username">{username}</div>
      <p>Easy: <span id="easy-solved">{easySolved} / {totalEasyProblems}</span></p>
      <div className="progress-bar">
        <div className="progress-bar-fill" style={{ width: `${easyProgress}%` }}></div>
      </div>
      <p>Medium: <span id="medium-solved">{responseData.mediumSolved} / {totalMediumProblems} </span></p>
      <div className="progress-bar">
        <div className="progress-bar-fill" style={{ width: `${mediumProgress}%` }}></div>
      </div>
      <p>Hard: <span id="hard-solved">{responseData.hardSolved}  / {totalHardProblems}</span></p>
      <div className="progress-bar">
        <div className="progress-bar-fill" style={{ width: `${hardProgress}%` }}></div>
      </div>

      <h2>Submission Calendar</h2>
      <div className="calendar">
        <CalendarHeatmap
          startDate={new Date(Date.now() - 365 * 24 * 60 * 60 * 1000)} // Set the start date to one year ago
          endDate={new Date()} // Set the end date to today
          values={submissionCalendar}
          showWeekdayLabels={true}
          classForValue={(value) => {
            if (!value) {
              return 'color-empty';
            }
           
            return `color-scale-${value.count > 6 ? 7 : value.count}`;
          }}
          titleForValue={(value) => {
  return value ? `${value.count} submissions` : '0 submissions';
}}

          
          
        />
      </div>
    </div>
  );
};
