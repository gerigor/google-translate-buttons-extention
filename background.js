// Listen for incoming messages to update language buttons in relevant tabs
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'updateLanguageButtons') {
    updateLanguageButtonsForTabs();
  }
});

// Function to update language buttons and send a message to any tab with Google Translate
function updateLanguageButtonsForTabs() {
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      if (tab.url && tab.url.includes('https://translate.google.com/')) {
        chrome.tabs.sendMessage(tab.id, { action: 'updateButtons' });
      }
    });
  });
}

