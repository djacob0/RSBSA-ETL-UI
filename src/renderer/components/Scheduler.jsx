import React, { useState } from 'react';
import  useEtlControl from '../hooks/useEtlControl';
import { ClockIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

const schedulePresets = [
  { label: 'Every Minute', value: '* * * * *' },
  { label: 'Every 5 Minutes', value: '*/5 * * * *' },
  { label: 'Hourly', value: '0 * * * *' },
  { label: 'Daily', value: '0 0 * * *' },
  { label: 'Weekly', value: '0 0 * * 0' },
  { label: 'Monthly', value: '0 0 1 * *' },
];

export default function Scheduler() {
  const { status, startEtl } = useEtlControl();
  const [schedule, setSchedule] = useState('* * * * *');
  const [customSchedule, setCustomSchedule] = useState('');
  const [showCustom, setShowCustom] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    startEtl(showCustom ? customSchedule : schedule);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Custom Scheduler</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Schedule Presets</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {schedulePresets.map((preset) => (
              <button
                key={preset.value}
                type="button"
                onClick={() => {
                  setSchedule(preset.value);
                  setShowCustom(false);
                }}
                className={`text-left p-2 rounded border ${!showCustom && schedule === preset.value ? 'bg-green-50 border-green-300' : 'border-gray-200 hover:bg-gray-50'}`}
              >
                <div className="flex items-center">
                  <ClockIcon className="h-4 w-4 mr-2 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">{preset.label}</p>
                    <p className="text-xs text-gray-500">{preset.value}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center mb-2">
            <input
              id="custom-schedule"
              type="checkbox"
              checked={showCustom}
              onChange={() => setShowCustom(!showCustom)}
              className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
            />
            <label htmlFor="custom-schedule" className="ml-2 block text-sm font-medium text-gray-700">
              Custom Cron Scheduler
            </label>
          </div>

          {showCustom && (
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={customSchedule}
                onChange={(e) => setCustomSchedule(e.target.value)}
                placeholder="* * * * *"
                className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              />
              <button
                type="button"
                onClick={() => setCustomSchedule('')}
                className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              >
                <ArrowPathIcon className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={status.isRunning}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${status.isRunning ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
        >
          {status.isRunning ? 'ETL is Running...' : 'Apply Schedule'}
        </button>
      </form>
    </div>
  );
}