import { getProgressBar } from "./progressBar";
import PrefixSumGraph from "./graphAnalytics";






export const getAnalytics = (v1, v2) => {
  // Your implementation of the getAnalytics function

  const consistencyScore1 = findConsistencyScore(v1);
  const consistencyScore2 = findConsistencyScore(v2);

  const consistencyPercentage1 = consistencyScore1.consistencyPercentage;
  const consistencyPercentage2 = consistencyScore2.consistencyPercentage;

  const consistencyBar = getProgressBar(consistencyPercentage1, consistencyPercentage2);
  const monthlySubmissions1 = generateMonthlyData(v1)
  const monthlySubmissions2=generateMonthlyData(v2);
  console.log(monthlySubmissions1)
  console.log(monthlySubmissions2)

  return (
    <div>
      <div>
        <h3 className="text-center">Consistency</h3>
        {consistencyBar}
      </div>
      <h1 className="text-center" >Submissions Graph</h1><br></br>

      <div className="container">
        <PrefixSumGraph array1={v1} array2={v2} />
      </div>
    </div>
  );
};

function generateMonthlyData(submissions) {
  const monthlyData = new Map();

  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
 

  for (let i = submissions.length - 1; i >= 0; i--) {
    const submissionDate = new Date(today.getFullYear(), currentMonth, today.getDate() - (submissions.length - 1 - i));
    const submissionMonth = submissionDate.toLocaleString('default', { month: 'short' });
    const submissionYear = submissionDate.getFullYear();

    if (submissionYear === currentYear || submissionMonth !== today.toLocaleString('default', { month: 'short' })) {
      // Exclude submissions from the same month of the previous year
      const currentTotal = monthlyData.get(submissionMonth) || 0;
      monthlyData.set(submissionMonth, currentTotal + submissions[i]);
    }
  }

  return monthlyData;
}



  


const findConsistencyScore = (v) =>{

    let idx=0;
    var siz=v.length;

    while(idx<siz){
        if(v[idx]===0) idx++;
        else break;
    }

    var countZeroSubmissions=0;
    for(let i=idx;i<siz;i++){
        if(v[i]===0)
        countZeroSubmissions++;
    }
    
    var totalActiveDays=siz-idx-countZeroSubmissions;
    var totalConsiderableDays=siz-idx;
    var consistencyPercentage
    if(totalActiveDays===0) {
        console.log("zero active days")
        consistencyPercentage=0;
    }else {
        consistencyPercentage= Math.floor(totalActiveDays/totalConsiderableDays *100);
    }
    return  {
        consistencyPercentage: consistencyPercentage,
    };
}
