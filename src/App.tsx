// App.tsx (for chrome popup)

import './App.css';
// import { useState } from 'react';
import appleEmojisData from '@emoji-mart/data/sets/14/apple.json';
import EmojiPicker from '@emoji-mart/react';

const sendMessageToContentScript = (message: any) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id!, message);
  });
};

function App() {
  // const [input, setInput] = useState('');

  const addEmoji = (emoji: any) => {
    // setInput((prevInput) => prevInput + emoji.native);
    sendMessageToContentScript({ type: 'insertEmoji', emoji: emoji.native });
  };

  return (
    <div>
      <EmojiPicker data={appleEmojisData} set="apple" previewPosition="none" autoFocus={true} onEmojiSelect={addEmoji} />
      {/* <div>
        <input type="text" value={input} readOnly />
      </div> */}
    </div>
  );
}

export default App;
