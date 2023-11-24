import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

interface LineChartProps {
  currentValue: number;
}

const NewLineChart: React.FC<LineChartProps> = ({ currentValue }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Create the chart
    const ctx = chartRef.current?.getContext('2d');

    if (!ctx) {
      return;
    }

    // Define your data
    const data = {
      labels: Array.from({ length: 101 }, (_, i) => i), // X-axis values from 0 to 100
      datasets: [
        {
          label: 'Your Data',
          data: Array.from({ length: 101 }, (_, i) => Math.sin((i * Math.PI) / 50)), // Replace this with your actual data
          borderColor: 'blue', // Line color
          borderWidth: 2, // Line width
          fill: false,
        },
      ],
    };

    // Define the chart options
    const options = {
      responsive: true,
      maintainAspectRatio: false, // Allow the chart to adjust to its container
      scales: {
        x: {
          type: 'linear',
          position: 'bottom',
          min: 0,
          max: 100,
        },
        y: {
          type: 'linear',
          position: 'left',
          suggestedMin: -1, // Minimum y-axis value
          suggestedMax: 1, // Maximum y-axis value
        },
      },
    };

    // Create the chart
    new Chart(ctx, {
      type: 'line',
      data,
      options: options,
    });
  }, [currentValue]);

  return (
    <div>
      <canvas ref={chartRef} />
      <div>Your Current Value: {currentValue}</div>
    </div>
  );
};

export default NewLineChart;
