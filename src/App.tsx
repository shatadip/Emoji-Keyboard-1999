// App.tsx (for chrome popup)

import { useState, useRef, useEffect, CSSProperties } from 'react';
import './App.css';
import appleEmojisData from '@emoji-mart/data/sets/14/apple.json';
import EmojiPicker from '@emoji-mart/react';
import EmojiPopup from './components/EmojiPopup';
// import ClipLoader from "react-spinners/ClipLoader";
import GridLoader from 'react-spinners/GridLoader';


const sendMessageToContentScript = (message: any) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id!, message);
  });
};

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

function App() {
  // const [input, setInput] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState('');
  const [loading, setLoading] = useState(true); // State for tracking loading status
  const emojiRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after delay (simulating content loading)
    }, 1500); // Adjust delay time as needed
    
    return () => clearTimeout(timer); // Cleanup timeout on component unmount
  }, []);
  
  
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
  let color = "#36d7b7";
  
  return (
    <div>
      {/* Show spinner/loader if loading */}
      {loading ? (
        <div className="loader">
          <div className="sweet-loading">
            <GridLoader
              color={color}
              loading={loading}
              cssOverride={override}
              size={25}
              aria-label="Loading Spinner"
              data-testid="loader"
              speedMultiplier={1.5}
            />
          </div>
        </div>
      ) : (
        <>
          {/* Emoji Keyboard 1999 title and logo */}
          <div className="header">
            <img src="icon.png" alt="Emoji Keyboard 1999 logo" />
            <div className='text-holder-area'>
              <h2>Emoji Keyboard 1999</h2>
              <p className="version">v 1.0.0 | Shortcut: <kbd className='kbd-shortcut'>Alt+Shift+W</kbd></p>
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
        </>
      )}
    </div>
  );
}

export default App;