import React, { useState, useEffect } from 'react';
import useEtlControl from '../hooks/useEtlControl';
import { PlayIcon, StopIcon, ClockIcon, CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid';

const schedulePresets = [
  { label: 'Every Minute', value: '* * * * *' },
  { label: 'Every 5 Minutes', value: '*/5 * * * *' },
  { label: 'Hourly', value: '0 * * * *' },
  { label: 'Daily', value: '0 0 * * *' },
  { label: 'Weekly', value: '0 0 * * 0' },
  { label: 'Monthly', value: '0 0 1 * *' },
];

export default function StatusPanel() {
  const { status, startEtl, stopEtl } = useEtlControl();
  const [cronSchedule, setCronSchedule] = useState('0 0 * * *');
  const [uptime, setUptime] = useState('0h 0m 0s');

  useEffect(() => {
    let interval;
    if (status?.isRunning && status?.startTime) {
      interval = setInterval(() => {
        const now = new Date();
        const start = new Date(status.startTime);
        const diffMs = now - start;

        const hours = Math.floor(diffMs / (1000 * 60 * 60));
        const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

        setUptime(`${hours}h ${minutes}m ${seconds}s`);
      }, 1000);
    } else {
      setUptime('0h 0m 0s');
    }

    return () => clearInterval(interval);
  }, [status?.isRunning, status?.startTime]);

  const getStatusColor = () => {
    if (status?.isRunning) return 'bg-green-100 text-green-800';
    if (status?.error) return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = () => {
    if (status?.isRunning) return <PlayIcon className="h-5 w-5" />;
    if (status?.error) return <ExclamationCircleIcon className="h-5 w-5" />;
    return <CheckCircleIcon className="h-5 w-5" />;
  };

  const handleStartEtl = () => {
    startEtl(cronSchedule);
  };

  const formatScheduleDisplay = (schedule) => {
    if (!schedule) return 'Not scheduled';
    const preset = schedulePresets.find(p => p.value === schedule);
    return preset ? preset.label : schedule;
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-700">ETL Scheduler Status</h2>
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor()}`}>
          {getStatusIcon()}
          <span className="ml-1">
            {status?.isRunning ? 'Running' : status?.error ? 'Error' : 'Ready'}
          </span>
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded">
          <div className="flex items-center text-sm text-gray-500">
            <ClockIcon className="h-4 w-4 mr-1" />
            <span>Schedule</span>
          </div>
          <p className="font-medium mt-1">
            {formatScheduleDisplay(status?.currentSchedule)}
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded">
          <div className="flex items-center text-sm text-gray-500">
            <ClockIcon className="h-4 w-4 mr-1" />
            <span>Last Run</span>
          </div>
          <p className="font-medium mt-1">
            {formatDateTime(status?.lastRun)}
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded">
          <div className="flex items-center text-sm text-gray-500">
            <ClockIcon className="h-4 w-4 mr-1" />
            <span>Uptime</span>
          </div>
          <p className="font-medium mt-1">
            {status?.isRunning ? uptime : 'Not running'}
          </p>
        </div>
      </div>

      {!status?.isRunning && (
        <div className="mb-4">
          <label htmlFor="cronSchedule" className="block text-sm font-medium text-gray-700">
            Schedule Preset
          </label>
          <select
            id="cronSchedule"
            value={cronSchedule}
            onChange={(e) => setCronSchedule(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
          >
            {schedulePresets.map((preset) => (
              <option key={preset.value} value={preset.value}>
                {preset.label}
              </option>
            ))}
          </select>
          {/* <p className="mt-1 text-xs text-gray-500">
            Current selection: {cronSchedule}
          </p> */}
        </div>
      )}

      <div className="flex space-x-4">
        <button
          onClick={handleStartEtl}
          disabled={status?.isRunning}
          className={`flex items-center px-4 py-2 rounded-md ${
            status?.isRunning ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
          } text-white transition-colors`}
        >
          <PlayIcon className="h-4 w-4 mr-2" />
          {status?.isRunning ? 'ETL Running' : 'Start ETL'}
        </button>

        <button
          onClick={stopEtl}
          disabled={!status?.isRunning}
          className={`flex items-center px-4 py-2 rounded-md ${
            !status?.isRunning ? 'bg-gray-300 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'
          } text-white transition-colors`}
        >
          <StopIcon className="h-4 w-4 mr-2" />
          Stop ETL
        </button>
      </div>

      {status?.error && (
        <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
          <ExclamationCircleIcon className="h-5 w-5 inline mr-2" />
          {status.error}
        </div>
      )}
    </div>
  );
}