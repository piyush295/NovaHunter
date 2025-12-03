// Background script for handling persistent tasks, like intercepting requests or additional API calls
chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed.');
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    // Optionally, auto-scan or log tab changes
    chrome.tabs.sendMessage(tabId, { action: 'tabUpdated', url: tab.url });
  }
});

// Example: Listen for messages from content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'performScan') {
    // Relay scan requests if needed
    fetchShodanData(request.url, request.token).then(data => sendResponse({ data }))
      .catch(error => sendResponse({ error }));
    return true;  // Asynchronous response
  }
});