import React from 'react';
import './EmojiPopup.css';

interface EmojiPopupProps {
    emoji: string;
    onInsert: () => void;
    onCopy: () => void;
    position?: { top: number; left: number };
}

const EmojiPopup: React.FC<EmojiPopupProps> = ({ emoji, onInsert, onCopy, position }) => {
    let { top, left } = position || { top: 0, left: 0 };
    // alert(top + ' <> ' + left);
    return (
        <div className="emoji-popup" style={{ top: top + 'px', left: left + 'px' }}>
            <div className="arrow"></div>
            <span>{emoji}</span>
            <div className="options">
                <button onClick={onInsert}>Insert at Cursor</button>
                <button onClick={onCopy}>Copy</button>
            </div>
        </div>
    );
};

export default EmojiPopup;
