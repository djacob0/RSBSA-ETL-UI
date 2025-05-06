import React, { useState, useEffect } from 'react';
import useLogs from '../hooks/useLogs';
import { TrashIcon, ArrowPathIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function LogViewer() {
  const { logs, loading, error, clearLogs, refreshLogs } = useLogs();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredLogs, setFilteredLogs] = useState([]);

  useEffect(() => {
    console.log('Logs:', logs); // Debug: Check raw logs
    if (searchTerm) {
      setFilteredLogs(
        logs.filter(log =>
          log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
          log.timestamp.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredLogs(logs);
    }
  }, [searchTerm, logs]);

  useEffect(() => {
    console.log('Filtered Logs:', filteredLogs); // Debug: Check filtered logs
  }, [filteredLogs]);

  const getLogColor = (message) => {
    if (message.includes('error') || message.includes('failed')) return 'text-red-600';
    if (message.includes('warning')) return 'text-yellow-600';
    if (message.includes('success') || message.includes('completed')) return 'text-green-600';
    return 'text-gray-800';
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 ">Logs</h1>
        <div className="flex space-x-2">
          <button
            onClick={refreshLogs}
            disabled={loading}
            className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 disabled:opacity-50"
          >
            <ArrowPathIcon className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={clearLogs}
            disabled={loading || logs.length === 0}
            className="p-2 rounded-md bg-red-100 hover:bg-red-200 text-red-700 disabled:opacity-50"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search logs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      {error && (
        <div className="p-4 bg-red-50 rounded-md">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-y-auto" style={{ maxHeight: '60vh' }}>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timestamp
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Message
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLogs.length > 0 ? (
                filteredLogs.map((log, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td className={`px-6 py-4 whitespace-pre-wrap text-sm ${getLogColor(log.message)}`}>
                      {log.message}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="px-6 py-4 text-center text-sm text-gray-500">
                    {loading ? 'Loading logs...' : 'No logs available'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}