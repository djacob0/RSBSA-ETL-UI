import React from 'react';
import StatusPanel from './StatusPanel';
import Scheduler from './Scheduler';
import { Bar } from 'react-chartjs-2'; // Changed from generic Chart to specific Bar
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const performanceData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Processing Time (ms)',
      data: [1200, 1900, 1500, 2000, 1800, 2100],
      backgroundColor: 'rgba(59, 130, 246, 0.5)',
    }],
  };

  return (
    <div className="space-y-6">
        <div className="flex items-center justify-center space-x-4">
            <img src="/DAlogo.png" alt="DA Logo" className="h-10 w-auto" />
            <h1 className="text-3xl font-bold text-gray-800">RSBSA ETL Control Dashboard</h1>
        </div>


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <StatusPanel />
          <Scheduler />
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Performance Metrics</h2>
          <div className="h-64">
            <Bar
              data={performanceData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}