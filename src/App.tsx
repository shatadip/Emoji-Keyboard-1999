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
  const [popupPosition, setPopupPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 }); // in px
  const emojiRef = useRef<HTMLDivElement>(null);

  const addEmoji = (emoji: any) => {
    setSelectedEmoji(emoji.native);
    const emojiElement = emojiRef.current;
    const POPUP_HEIGHT = 200; // in px
    const POPUP_WIDTH = 250; // in px
    
    if (emojiElement) {
      const emojiRect = emojiElement.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;
      const emojiTop = emojiRect.top + window.pageYOffset;
      const emojiLeft = emojiRect.left + window.pageXOffset;
  
      let topPosition = emojiTop + emojiRect.height;
      let leftPosition = emojiLeft + emojiRect.width / 2;
  
      // Adjust top position if the popup would extend below the viewport
      if (topPosition + POPUP_HEIGHT > viewportHeight) {
        topPosition = Math.max(0, emojiTop - POPUP_HEIGHT);
      }
  
      // Adjust left position if the popup would extend beyond the right edge of the viewport
      if (leftPosition + POPUP_WIDTH / 2 > viewportWidth) {
        leftPosition = Math.max(0, emojiLeft + emojiRect.width - POPUP_WIDTH);
      }
  
      setPopupPosition({ top: topPosition, left: leftPosition });
      setShowPopup(true);
    }
  };
  
  const handleCopy = () => {
    navigator.clipboard.writeText(selectedEmoji).then(() => {
      console.log('Emoji copied to clipboard:', selectedEmoji);
      setShowPopup(false);
    }, (error) => {
      console.error('Failed to copy emoji to clipboard:', error);
      setShowPopup(false);
    });
  };

  const handleInsert = () => {
    sendMessageToContentScript({ type: 'insertEmoji', emoji: selectedEmoji });
    setShowPopup(false);
  };

  return (
    <div>
      <EmojiPicker
        data={appleEmojisData}
        set="apple"
        previewPosition="none"
        autoFocus={true}
        onEmojiSelect={addEmoji}
      />
      {showPopup && (
        <EmojiPopup
          emoji={selectedEmoji}
          onInsert={handleInsert}
          onCopy={handleCopy}
          position={popupPosition}
        />
      )}
      <div ref={emojiRef}></div>
    </div>
  );
}

export default App;
