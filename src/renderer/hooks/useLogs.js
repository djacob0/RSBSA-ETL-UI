import { useState, useEffect } from 'react';
import api from '../services/api';

export default function useLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/logs');
      console.log('API Response:', response.data); // Debug: Check response
      setLogs(response.data.logs || []); // Fallback to empty array
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch logs');
      console.error('Fetch Logs Error:', err); // Debug: Log errors
    } finally {
      setLoading(false);
    }
  };

  const clearLogs = async () => {
    try {
      await api.delete('/api/logs');
      await fetchLogs();
    } catch (err) {
      setError(err.message || 'Failed to clear logs');
      console.error('Clear Logs Error:', err); // Debug: Log errors
    }
  };

  useEffect(() => {
    fetchLogs();

    // Set up SSE connection for real-time logs
    const eventSource = new EventSource('http://localhost:5005/api/logs/stream');

    eventSource.addEventListener('log', (event) => {
      try {
        const log = JSON.parse(event.data);
        console.log('SSE Log:', log); // Debug: Check SSE data
        setLogs(prev => [log, ...prev.slice(0, 99)]);
      } catch (err) {
        console.error('SSE Parse Error:', err); // Debug: Log parse errors
      }
    });

    eventSource.addEventListener('clear', () => {
      console.log('SSE Clear Event'); // Debug: Check clear event
      setLogs([]);
    });

    eventSource.addEventListener('error', (err) => {
      console.error('SSE Error:', err); // Debug: Log SSE errors
    });

    return () => {
      eventSource.close();
    };
  }, []);

  return { logs, loading, error, fetchLogs, clearLogs };
}