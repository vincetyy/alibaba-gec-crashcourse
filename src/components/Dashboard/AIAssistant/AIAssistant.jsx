import React, { useState, useEffect, useRef } from 'react';
import AliAdapt_Logo from '../../../assets/logos/AliAdapt_logo.png';
import './AIAssistant.css';

const AIAssistant = () => {
    const [messages, setMessages] = useState([
        { text: "Hello, I'm AliAdapt's AI Assistant! I'm here to solve all your cross-border compliance needs. How can I help?", sender: 'assistant' },
    ]);
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);  // Add loading state

    // Ref for the chat window
    const chatWindowRef = useRef(null);

    const handleSend = () => {
        if (inputValue.trim() === '') return;

        const newMessage = { text: inputValue, sender: 'user' };
        setMessages([...messages, newMessage]);
        setInputValue('');
        setLoading(true);  // Set loading to true

        // Simulate a POST request to the API
        fetch('http://0.0.0.0:8000/query/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: inputValue }),
        })
        .then(response => response.json())
        .then(data => {
            const assistantReply = { text: data.response.response, sender: 'assistant' };
            setMessages((prevMessages) => [...prevMessages, assistantReply]);
            setLoading(false);  // Set loading to false
        })
        .catch(error => {
            console.error('Error:', error);
            setLoading(false);  // Set loading to false even if there's an error
        });
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
                {loading && (
                    <div className="chat-bubble assistant loading">
                        <div className="loader"></div>
                    </div>
                )}
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