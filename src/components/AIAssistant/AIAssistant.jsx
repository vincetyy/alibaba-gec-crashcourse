import React, { useState, useEffect, useRef } from 'react';
import AliAdapt_Logo from '../../assets/logos/AliAdapt_logo.png';
import './AIAssistant.css';

const AIAssistant = () => {
    const [messages, setMessages] = useState([
        { text: "Hello, I'm AliAdapt's AI Assistant! I'm here to solve all your cross-border compliance needs. How can I help?", sender: 'assistant' },
    ]);
    const [inputValue, setInputValue] = useState('');

    // Ref for the chat window
    const chatWindowRef = useRef(null);

    const handleSend = () => {
        if (inputValue.trim() === '') return;

        const newMessage = { text: inputValue, sender: 'user' };
        setMessages([...messages, newMessage]);
        setInputValue('');

        // Simulate assistant reply after 2 seconds
        setTimeout(() => {
            const assistantReply = { text: "I'll look into that for you.", sender: 'assistant' };
            setMessages((prevMessages) => [...prevMessages, assistantReply]);
        }, 2000);
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    // Scroll to the bottom whenever messages change
    useEffect(() => {
        if (chatWindowRef.current) {
            chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className="ai-assistant">
            <div className="assistant-header">
                <img src={AliAdapt_Logo} alt="AI Logo" className="ai-logo" />
                <span>AliAdapt AI Assistant</span>
            </div>
            <div className="chat-window" ref={chatWindowRef}>
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`chat-bubble ${message.sender}`}
                    >
                        {message.text}
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    placeholder="Type a message..."
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                />
                <button className="send-button" onClick={handleSend}>
                    Send
                </button>
            </div>
        </div>
    );
};

export default AIAssistant;