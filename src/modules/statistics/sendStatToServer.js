export function sendStatToServer(payload) {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const url = `${backendUrl}/statistics`;
  const body = JSON.stringify(payload);
  if (navigator.sendBeacon) {
    const blob = new Blob([body], {
      type: "application/json",
    });
    navigator.sendBeacon(url, blob);
  } else {
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    }).catch(console.error);
  }
}
