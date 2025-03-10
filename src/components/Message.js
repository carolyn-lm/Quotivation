import React from "react";

function Message({ messageText, removeMessage }) {
    return (
        <div className="message">
            <p>{messageText}<span className="close-message" onClick={() => removeMessage()}>x</span></p>
        </div>
    )
}

export default Message;