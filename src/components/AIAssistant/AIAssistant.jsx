import React from 'react';
import './AIAssistant.css';

const AIAssistant = () => {
    return (
        <div className="ai-assistant">
            <div className="assistant-header">
                <img src="logo_url" alt="AI Logo" className="ai-logo" />
                <span>AliAdapt AI Assistant</span>
            </div>
            <div className="chat-window">
                {/* Example of chat bubbles */}
                <div className="chat-bubble assistant">
                    Hello, I'm AliAdapt's AI Assistant! I'm here to solve all your cross-border compliance needs. How can I help?
                </div>
                <div className="chat-bubble user">
                    Explain Indonesia's product regulations
                </div>
            </div>
            <div className="chat-input">
                <input type="text" placeholder="Type a message..." />
                <button className="send-button">Send</button>
            </div>
        </div>
    );
};

export default AIAssistant;