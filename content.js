// Content script to interact with the page
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'tabUpdated') {
    console.log(`New tab loaded: ${request.url}`);
    // You could inject scripts or perform on-page actions here, e.g., check for vulnerabilities
  }
});