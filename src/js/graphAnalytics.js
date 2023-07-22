import React from 'react';
import { Chart, CategoryScale, LinearScale, LineController, LineElement, PointElement } from 'chart.js';
import 'bootstrap/dist/css/bootstrap.min.css';

Chart.register(CategoryScale, LinearScale, LineController, LineElement, PointElement);



class PrefixSumGraph extends React.Component {
  chartRef = React.createRef();
  chart = null;

  componentDidMount() {
    this.generateChart();
  }

  componentDidUpdate() {
    this.generateChart();
  }

  generateChart() {
    const { array1, array2, user1,user2 } = this.props;

    if (array1.length === 0 && array2.length === 0) return;

    const prefixSum1 = this.calculatePrefixSum(array1);
    const prefixSum2 = this.calculatePrefixSum(array2);

    const labels = this.generateLabels(array1.length, array2.length);
    const data1 = this.extractData(prefixSum1, 5);
    const data2 = this.extractData(prefixSum2, 5);

    if (this.chart) {
      this.chart.destroy();
    }

    const ctx = this.chartRef.current.getContext('2d');
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: user1,
            data: data1,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            pointRadius:0,
            pointHoverRadius:0,
          },
          {
            label: user2,
            data: data2,
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            pointRadius:0,
            pointHoverRadius:0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          x: {
            display: true,
            title: {
              display: false,
              text: 'Index',
            },
          },
          y: {
            display: false,
            title: {
              display: false,
              text: 'Prefix Sum',
            },
          },
        },
    
      },
   
      
    });
  }

  calculatePrefixSum(array) {
    const prefixSum = [];
    let sum = 0;

    for (let i = 0; i < array.length; i++) {
      sum += array[i];
      prefixSum.push(sum);
    }

    return prefixSum;
  }

  generateLabels(length1, length2) {
    const maxLength = Math.max(length1, length2);
    const labels = [];
  
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();
  
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
    for (let i = 0; i < maxLength; i += 5) {
      const daysFromCurrent = 365 - i;
      const date = new Date(currentDate.getFullYear(), currentMonth, currentDay - daysFromCurrent);
      const monthIndex = date.getMonth();
      const monthLabel = months[monthIndex];
      labels.push(monthLabel);
    }
  
    return labels;
  }
  

  extractData(prefixSum, interval) {
    const data = [];

    for (let i = 0; i < prefixSum.length; i += interval) {
      data.push(prefixSum[i]);
    }

    // Include the last index if not divisible by interval
    if (prefixSum.length % interval !== 0) {
      data.push(prefixSum[prefixSum.length - 1]);
    }

    return data;
  }

  render() {
    return <canvas ref={this.chartRef} />;
  }
}

export default PrefixSumGraph;
