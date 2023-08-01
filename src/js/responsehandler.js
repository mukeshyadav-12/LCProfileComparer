import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import ProblemCircle from './circularprogressbar';
import 'react-calendar-heatmap/dist/styles.css';

export const handleResponse = (responseData, username) => {
  const totalEasyProblems = responseData.totalEasy;
  const easySolved = responseData.easySolved;
  // const easyProgress = (easySolved / totalEasyProblems) * 100;
  const totalMediumProblems= responseData.totalMedium
  const totalHardProblems=responseData.totalHard
  const mediumSolved = responseData.mediumSolved
  // const mediumProgress = (responseData.mediumSolved / totalMediumProblems) * 100;
 const hardSolved = responseData.hardSolved
 // const hardProgress = (responseData.hardSolved / totalHardProblems) * 100;
  const submissionVector = Array(365).fill(0); // Initialize an array of size 365 with 0 values
  const totalsolved = responseData.totalSolved
  const totalQuestions= responseData.totalQuestions

  const successRates = {};

  responseData.totalSubmissions.forEach(submission => {
  const successRate = (submission.count / submission.submissions) * 100;
  successRates[submission.difficulty] = successRate.toFixed(1);
});

  Object.entries(responseData.submissionCalendar).forEach(([timestamp, count]) => {
    const date = new Date(parseInt(timestamp) * 1000);
    const daysAgo = Math.floor((Date.now() - date) / (24 * 60 * 60 * 1000));

    if (daysAgo < 365) {
      submissionVector[365 - daysAgo - 1] = count;
    }
  });
  //  console.log(submissionVector)

  const submissionCalendar = Object.entries(responseData.submissionCalendar).map(([timestamp, count]) => ({
    date: new Date(parseInt(timestamp) * 1000),
    count: count,
  }));

  
  

  return {
    responseComponent : (
    <div className='text-center'>
      <h1 className="username">{username}</h1>
      <div>
        <div className='col mt-5 mb-5'>
      <h4>Easy
         {/* <span id="easy-solved">{easySolved} / {totalEasyProblems}</span> */}
         </h4>
      {/* <img onMouseEnter={toggleSuccessRate}
      src={`https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png`}/> */}
      
      <ProblemCircle  problemsSolved={easySolved} totalProblems={totalEasyProblems}  successRate={successRates["Easy"]} />

      <h4>Medium
        {/* <span id="medium-solved">{responseData.mediumSolved} / {totalMediumProblems} </span> */}
        </h4>
      <ProblemCircle problemsSolved={mediumSolved} totalProblems={totalMediumProblems} successRate={successRates["Medium"]} />

      <h4>Hard
         {/* <span id="hard-solved">{responseData.hardSolved}  / {totalHardProblems}</span> */}
         </h4>
      <ProblemCircle problemsSolved={hardSolved} totalProblems={totalHardProblems}  successRate={successRates["Hard"]}  />
      <h4>Total
        {/* <span id="medium-solved">{totalsolved}  / {totalQuestions}</span> */}
        </h4>
      <ProblemCircle problemsSolved={totalsolved} totalProblems={totalQuestions} successRate={successRates["All"]} />
      </div>
      </div>
      
      
      <div className='mb-4 mt-4'>
      <h2 className='mt-4 mb-4' > Submission Calendar</h2>
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
      </div></div>
    </div> ),
    submissionVector : submissionVector,
};
};
