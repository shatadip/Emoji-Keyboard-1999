// background.js

chrome.runtime.onInstalled.addListener(function () {
    chrome.tabs.query({}, function (tabs) {
      tabs.forEach(function (tab) {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          function: showIconOnTextFields
        });
      });
    });
  });
  
  function showIconOnTextFields() {
    document.addEventListener('focusin', function (event) {
      const element = event.target;
      if (isTextField(element)) {
        chrome.runtime.sendMessage({ type: 'showIcon' });
      }
    });
  }
  
  function isTextField(element) {
    return (
      (element.tagName === 'TEXTAREA' || (element.tagName === 'INPUT' && element.getAttribute('type') === 'text')) &&
      !element.hasAttribute('readonly') &&
      !element.hasAttribute('disabled')
    );
  }
  