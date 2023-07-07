import React from 'react';
import Chart from 'chart.js/auto';
import 'bootstrap/dist/css/bootstrap.min.css';

class BarGraph extends React.Component {
  chartRef = React.createRef();
  chart = null;

  componentDidMount() {
    this.generateChart();
  }

  componentDidUpdate() {
    this.generateChart();
  }

  componentWillUnmount() {
    this.destroyChart();
  }

  destroyChart() {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
  }

  generateChart() {
    const { map1, map2,user1,user2 } = this.props;

    const labels = Array.from(map1.keys());
    const data1 = Array.from(map1.values());
    const data2 = Array.from(map2.values());
    console.log("data1 is ",data1)
    console.log("labels is ",labels)

    if (labels.length === 0) return;

    this.destroyChart();

    const ctx = this.chartRef.current.getContext('2d');
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: user1,
            data: data1,
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
          {
            label: user2,
            data: data2,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Number of Submissions',
              font: {
                weight: 'bold',
              },
            },
          },
          x: {
            title: {
              display: true,
              text: 'Month',
              font: {
                weight: 'bold',
              },
            },
          },
        },
      },
    });
  }

  render() {
    return <canvas ref={this.chartRef} />;
  }
}

export default BarGraph;
