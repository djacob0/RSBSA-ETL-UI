export const API_ENDPOINTS = {
  ETL_STATUS: '/api/etl-status',
  START_ETL: '/api/start-etl',
  STOP_ETL: '/api/stop-etl',
  LOGS: '/api/logs',
};

export const CRON_PRESETS = [
  { label: 'Every Minute', value: '* * * * *' },
  { label: 'Every 5 Minutes', value: '*/5 * * * *' },
  { label: 'Hourly', value: '0 * * * *' },
  { label: 'Daily', value: '0 0 * * *' },
  { label: 'Weekly', value: '0 0 * * 0' },
  { label: 'Monthly', value: '0 0 1 * *' },
];