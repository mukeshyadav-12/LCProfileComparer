import React from 'react';





export const getAnalytics = (v1, v2) => {

    const consistencyScore1=findConsistencyScore(v1);
    const consistencyScore2=findConsistencyScore(v2);
    
    var consistencyPercentage1= consistencyScore1.consistencyPercentage
    var consistencyPercentage2=consistencyScore2.consistencyPercentage
    console.log(consistencyScore1)
    console.log(consistencyScore2)

    return (
        <div className="app">
          <div className="progress-container">
            <div
              className="progress-bar"
              style={{
                width: `${consistencyPercentage1/2}%`,
                backgroundColor: "blue",
                marginLeft: `${50 - consistencyPercentage1 / 2}%`,
              }}
            >{consistencyPercentage1} %</div>
            <div
              className="progress-bar"
              style={{
                width: `${consistencyPercentage2/2}%`,
                backgroundColor: "red",
                marginRight: `${50 - consistencyPercentage2 / 2}%`,
              }}
            > {consistencyPercentage2} % </div>
          </div>
        </div>
      );
      
    
};

    

  


const findConsistencyScore = (v) =>{

    let idx=0;
    var siz=v.length;

    while(idx<siz){
        if(v[idx]===0) idx++;
        else break;
    }
    console.log(idx)

    var countZeroSubmissions=0;
    for(let i=idx;i<siz;i++){
        if(v[i]===0)
        countZeroSubmissions++;
    }
    
    var totalActiveDays=siz-idx-countZeroSubmissions;
    var totalConsiderableDays=siz-idx;
    if(totalActiveDays===0) return 0;
    var consistencyPercentage= Math.floor(totalActiveDays/totalConsiderableDays *100);
    return  {
        consistencyPercentage: consistencyPercentage,
    };




}
