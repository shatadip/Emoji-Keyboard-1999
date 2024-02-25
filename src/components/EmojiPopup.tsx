import React, { useState } from 'react';
import './EmojiPopup.css';

interface EmojiPopupProps {
    emoji: string;
    onInsert: (event: React.MouseEvent<HTMLButtonElement>) => void;
    onCopy: (event: React.MouseEvent<HTMLButtonElement>) => void;
    onClosePopup: () => void;
}

const EmojiPopup: React.FC<EmojiPopupProps> = ({ emoji, onInsert, onCopy, onClosePopup }) => {
    const [buttonText, setButtonText] = useState('Copy');

    const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setButtonText('Copied');
        onCopy(event);
        setTimeout(() => setButtonText('Copy'),  1000); // Change back to 'Copy' after  1 second
    };

    return (
        <div className="emoji-popup">
            <span>{emoji}</span>
            <div className="options">
                <button onClick={onInsert}>Insert at Cursor</button>
                <button onClick={handleButtonClick}>{buttonText}</button>
                <button onClick={onClosePopup}>&times;</button>
            </div>
        </div>
    );
};

export default EmojiPopup;
