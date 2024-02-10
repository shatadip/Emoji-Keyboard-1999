// App.tsx (for chrome popup)

import { useState, useRef } from 'react';
import './App.css';
import appleEmojisData from '@emoji-mart/data/sets/14/apple.json';
import EmojiPicker from '@emoji-mart/react';
import EmojiPopup from './components/EmojiPopup';

const sendMessageToContentScript = (message: any) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id!, message);
  });
};

function App() {
  // const [input, setInput] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState('');
  const emojiRef = useRef<HTMLDivElement>(null);



  const addEmoji = (emoji: any) => {
    setSelectedEmoji(emoji.native);
    const emojiElement = emojiRef.current;


    if (emojiElement) {
      setShowPopup(true);
    }
  };
  const handleClickOutside = () => {
    setShowPopup(false);
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(selectedEmoji).then(() => {
      console.log('Emoji copied to clipboard:', selectedEmoji);
    }, (error) => {
      console.error('Failed to copy emoji to clipboard:', error);
    });
  };

  const handleInsert = () => {
    sendMessageToContentScript({ type: 'insertEmoji', emoji: selectedEmoji });
  };

  return (
    <div>
      {/* Emoji Keyboard 1999 title and logo */}
      <div className="header">
        <img src="icon.png" alt="Emoji Keyboard 1999 logo" />
        <div className='text-holder-area'>
          <h2>Emoji Keyboard 1999</h2>
          <p className="version">v 1.0.0 | Shortcut: <kbd>Alt+Shift+W</kbd></p>
        </div>
      </div>

      <EmojiPicker
        data={appleEmojisData}
        set="apple"
        previewPosition="none"
        autoFocus={true}
        onEmojiSelect={addEmoji}
      // onClickOutside={handleClickOutside}
      />
      {showPopup && (
        <EmojiPopup
          emoji={selectedEmoji}
          onInsert={handleInsert}
          onCopy={handleCopy}
          onClosePopup={handleClickOutside}
        />
      )}
      <div ref={emojiRef}></div>
    </div>
  );
}

export default App;
