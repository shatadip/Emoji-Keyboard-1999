// contentScript.js

const insertEmoji = (emoji) => {
  const activeElement = document.activeElement;

  if (
    activeElement.tagName === 'TEXTAREA' ||
    (activeElement.tagName === 'INPUT' && activeElement.getAttribute('type') === 'text') ||
    activeElement.hasAttribute('contenteditable')
  ) {
    document.execCommand("insertText", false, emoji);
    }
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'insertEmoji') {
    insertEmoji(message.emoji);
  }
});

