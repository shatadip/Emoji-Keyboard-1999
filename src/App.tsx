// App.tsx (for chrome popup)

import { useState, useRef, useEffect, CSSProperties } from 'react';
import './App.css';
import appleEmojisData from '@emoji-mart/data/sets/14/apple.json';
import EmojiPicker from '@emoji-mart/react';
import EmojiPopup from './components/EmojiPopup';
// import ClipLoader from "react-spinners/ClipLoader";
import BarLoader from 'react-spinners/BarLoader';
import Modal from 'react-modal'; // Import the modal library
Modal.setAppElement('#root'); // This line is important for accessibility reasons.


const sendMessageToContentScript = (message: any) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id!, message);
  });
};

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "#F0AC1E",
  marginTop: "20px"
};

function App() {
  // const [input, setInput] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState('');
  const [loading, setLoading] = useState(true); // State for tracking loading status
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isClosing, setIsClosing] = useState<boolean>(false);
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
  let color = "#5778a3";

  const showModal = () => {
    setIsModalOpen(true);
};

const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
        setIsModalOpen(false);
        setIsClosing(false);
    }, 150);
};

  return (
    <div>
      {/* Show spinner/loader if loading */}
      {loading ? (
        <div className="loader">
          <img className='logo-at-loader' src="icon.png" alt="Emoji Keyboard 1999 logo" />
          <div className="sweet-loading">
            <BarLoader
              color={color}
              loading={loading}
              cssOverride={override}
              width={100}
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
              <p className="version">v <a href='#' onClick={() => showModal()}>1.0.0 ℹ️</a> | Shortcut: <kbd className='kbd-shortcut'>Alt+Shift+W</kbd></p>
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
          {/* Modal for India */}
          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="Donation Modal"
            className={`info-modal ${isClosing ? 'ReactModal__Content--before-close' : ''}`}
            overlayClassName="info-modal-overlay"
            shouldCloseOnOverlayClick={true}
          >
            <div className="modal-content">
              <button className="close-button" onClick={closeModal}>
                &times;
              </button>
              <h2>Emoji Keyboard 1999</h2>
              <h4>Disclaimer</h4>
              {/* List why emojis are native, and some emojis you see here are not compatible to windows or Linux */}
              <p>
                <ul>
                  <li>Emoji Keyboard 1999 uses Apple's emoji set.</li>
                  <li>Compatibility with Windows and Linux systems may vary, and some emojis may not display as intended.</li>
                  <li>Windows do not support country flags</li>
                  <li>Emojis are rendered natively by the operating system and may differ in appearance across platforms.</li>
                  <li>This is an <a href='https://github.com/shatadip/Emoji-Keyboard-1999' target='_blank'>Open-Source</a> Project 😍</li>
                </ul>
                </p>
              <h4>About (v 1.0.0)</h4>
                <p>
                <ul>
                  <li>Emoji Keyboard 1999 is a Chrome Extension that allows you to insert emojis into text fields and copy emojis as well.</li>
                  <li>Why 1999 🤔? Cause it's inspired by the first set of emojis introduced in 1999 by Japanese designer Shigetaka Kurita.</li>
                  <li>v 1.0.0 is the initial release of the extension.</li>
                  <li>Changelog is available on the <a href='https://github.com/shatadip/Emoji-Keyboard-1999' target='_blank'>GitHub page</a>.</li>

                </ul>
                </p>
              <h4>Author</h4>
              <div className="img-wrapper">
              <img src="../assets/images/3276sharp.jpg" className='author-shatadip-img' alt="Shatadip Majumder" />
              </div>
              <p className='text-align-center'>Shatadip Majumder (Developer)</p>
              <p className='text-align-center'><a href='https://www.shatadip.com' target='_blank'>Website</a> | <a href='https://github.com/shatadip' target='_blank'>GitHub</a> | <a href='https://chromewebstore.google.com/search/shatadip' target='_blank'>Other Chrome Extensions</a></p>
              {/* <h4>Support</h4>
              <p>
                <ul>
                  <li>Contribute to the Project: GitHub</li>
                  <li>Donate</li>
                  <li>Rate on Chrome Web Store</li>
                </ul>
              </p> */}
            </div>
          </Modal>
        </>
      )}
    </div>
  );
}

export default App;