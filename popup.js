document.addEventListener('DOMContentLoaded', () => {
  const scanButton = document.getElementById('scanButton');
  const urlInput = document.getElementById('urlInput');
  const resultsDiv = document.getElementById('results');

  scanButton.addEventListener('click', async () => {
    const targetUrl = urlInput.value.trim();
    if (!targetUrl) {
      resultsDiv.innerHTML = 'Error: Enter a valid URL.';
      return;
    }

    try {
      // Get API tokens from storage (set them via another function or manually)
      const tokens = await chrome.storage.local.get(['shodanToken', 'nucleiToken']);
      const shodanToken = tokens.shodanToken;
      const nucleiToken = tokens.nucleiToken;  // Assuming Nuclei has an API

      if (!shodanToken || !nucleiToken) {
        resultsDiv.innerHTML = 'Error: API tokens not set. Use setTokens() in console.';
        return;
      }

      // Perform Shodan scan
      const shodanData = await fetchShodanData(targetUrl, shodanToken);
      
      // Perform Nuclei scan (simulate via API call; adjust for actual Nuclei integration)
      const nucleiData = await fetchNucleiData(targetUrl, nucleiToken);
      
      // Integrate other tools (e.g., Nmap via a third-party API)
      const otherData = await fetchOtherToolsData(targetUrl);  // Placeholder function

      // Compile and display results
      resultsDiv.innerHTML = `
        <h2>Scan Results for ${targetUrl}</h2>
        <h3>Shodan Results:</h3><pre>${JSON.stringify(shodanData, null, 2)}</pre>
        <h3>Nuclei Results:</h3><pre>${JSON.stringify(nucleiData, null, 2)}</pre>
        <h3>Other Tools Results:</h3><pre>${JSON.stringify(otherData, null, 2)}</pre>
      `;
    } catch (error) {
      resultsDiv.innerHTML = `Error: ${error.message}`;
    }
  });

  // Function to set tokens (call from console for testing)
  window.setTokens = async (shodanKey, nucleiKey) => {
    await chrome.storage.local.set({ shodanToken: shodanKey, nucleiToken: nucleiKey });
    alert('Tokens set successfully.');
  };
});

// Fetch data from Shodan API
async function fetchShodanData(url, token) {
  const response = await fetch(`https://api.shodan.io/shodan/host/${url}?key=${token}`);
  if (!response.ok) throw new Error('Shodan API error');
  return await response.json();
}

// Fetch data from Nuclei API (assuming a hypothetical API endpoint)
async function fetchNucleiData(url, token) {
  const response = await fetch(`https://api.nuclei.sh/scan?url=${encodeURIComponent(url)}&key=${token}`);
  if (!response.ok) throw new Error('Nuclei API error');
  return await response.json();
}

// Placeholder for other tools (e.g., Nmap via a service like a custom API)
async function fetchOtherToolsData(url) {
  // Example: Integrate with Nmap via a third-party API
  const response = await fetch(`https://example-nmap-api.com/scan?url=${encodeURIComponent(url)}`);
  if (!response.ok) throw new Error('Other tools API error');
  return await response.json();
}