// contentScript.js
const insertEmoji = (emoji) => {
    const activeElement = document.activeElement;
  
    if (activeElement.tagName === 'TEXTAREA' || (activeElement.tagName === 'INPUT' && activeElement.getAttribute('type') === 'text')) {
      const cursorPos = activeElement.selectionStart;
      const textBefore = activeElement.value.substring(0, cursorPos);
      const textAfter = activeElement.value.substring(cursorPos);
  
      activeElement.value = `${textBefore}${emoji}${textAfter}`;
      activeElement.setSelectionRange(cursorPos + emoji.length, cursorPos + emoji.length);
    }
  };
  
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'insertEmoji') {
      insertEmoji(message.emoji);
    }
  });
  
  