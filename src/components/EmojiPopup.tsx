import React from 'react';
import './EmojiPopup.css';

interface EmojiPopupProps {
    emoji: string;
    onInsert: () => void;
    onCopy: () => void;
    onClosePopup: () => void;
}

const EmojiPopup: React.FC<EmojiPopupProps> = ({ emoji, onInsert, onCopy, onClosePopup }) => {
    return (
        <div className="emoji-popup">
            <span>{emoji}</span>
            <div className="options">
                <button onClick={onInsert}>Insert at Cursor</button>
                <button onClick={onCopy}>Copy</button>
                <button onClick={onClosePopup}>&times;</button>
            </div>
        </div>
    );
};

export default EmojiPopup;
