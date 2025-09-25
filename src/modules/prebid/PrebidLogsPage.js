export function PrebidLogsPage() {
  const logs = window.__PREBID_LOGS__ || [];

  logs.forEach((log) => {
    if (log.data) {
      console.log(`${log.event}:`, log.data);
    } else {
      console.log(log.event);
    }
  });
}
