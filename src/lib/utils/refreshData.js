import { onMount } from 'svelte';

export function setupDataRefresh(callback, apiUrl, apiKey, intervalMs = 300000) { // 300000ms = 5 minutes
    async function refreshData() {
    try {
      const res = await fetch(apiUrl, {
        headers: {
            'x-api-key': apiKey // zie volgende stap
        }
      });
      if (!res.ok) throw new Error('Failed to fetch general data');
      const data = await res.json();
      callback(data);
    } catch (err) {
      console.error(err);
    }
  }

  onMount(() => {
    // Initieel alvast een keer ophalen als je wilt
    refreshData();

    const interval = setInterval(refreshData, intervalMs);
    return () => clearInterval(interval);
  });
}