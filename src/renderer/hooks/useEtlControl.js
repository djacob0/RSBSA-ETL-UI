import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';

export default function useEtlControl() {
  const [status, setStatus] = useState({
    isRunning: false,
    currentSchedule: null,
    lastRun: null,
    startTime: null,
    stopTime: null,
    error: null,
  });

  const fetchStatus = useCallback(async () => {
    try {
      const response = await api.get('/api/etl-status');
      setStatus({
        isRunning: response.data.isRunning,
        currentSchedule: response.data.currentSchedule,
        lastRun: response.data.lastRun,
        startTime: response.data.startTime,
        stopTime: response.data.stopTime,
        error: null,
      });
    } catch (error) {
      setStatus(prev => ({
        ...prev,
        error: error.message || 'Failed to fetch ETL status',
      }));
    }
  }, []);

  const startEtl = useCallback(async (schedule = '* * * * *') => {
    try {
      await api.post('/api/start-etl', { schedule });
      await fetchStatus();
    } catch (error) {
      setStatus(prev => ({
        ...prev,
        error: error.response?.data?.message || error.message || 'Failed to start ETL',
      }));
    }
  }, [fetchStatus]);

  const stopEtl = useCallback(async () => {
    try {
      await api.post('/api/stop-etl');
      await fetchStatus();
    } catch (error) {
      setStatus(prev => ({
        ...prev,
        error: error.response?.data?.message || error.message || 'Failed to stop ETL',
      }));
    }
  }, [fetchStatus]);

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 5000);
    return () => clearInterval(interval);
  }, [fetchStatus]);

  return { status, startEtl, stopEtl, fetchStatus };
}