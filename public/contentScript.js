// contentScript.js

const insertEmoji = (emoji) => {
  const activeElement = document.activeElement;

  if (
    activeElement.tagName === 'TEXTAREA' ||
    (activeElement.tagName === 'INPUT') ||
    activeElement.hasAttribute('contenteditable')
  ) {
    // const text = activeElement.value || activeElement.innerText;
    // const cursorPos = activeElement.selectionStart;
    // alert('text=>'+text);
    // alert("word modular::: " + text.slice(0, cursorPos) + emoji + text.slice(cursorPos, text.length))
    document.execCommand("insertText", false, emoji);
    }
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'insertEmoji') {
    insertEmoji(message.emoji);
  }
});

