import React, { useEffect } from "react";

function Message({ messageText, removeMessage }) {

    useEffect(() => {
        const messageTimeout = window.setTimeout(() => {
            removeMessage();
        }, 1500);

        return () => window.clearTimeout(messageTimeout);
    }, []);

    return (
        <div className="message">
            <p>{messageText}<span className="close-message" onClick={() => removeMessage()}>x</span></p>
        </div>
    )
}

export default Message;