import React, { useState } from 'react';
import './ProductDetails.css';

const ProductDetails = ({ onAnalysisUpdate }) => {
    const [url, setUrl] = useState('https://www.aliexpress.com/item/1005001900018013.html');
    const [description, setDescription] = useState('Double Sided Wear Korean Fleece Lining Thickened Wool Padded Jacket Zipper Hooded Women\'s Winter. If You Are Not Sure About The Size, You Can Leave A Message To Customer Service For Your Height And Weight And Preference (Loose Or Fit) After Placing The Order, And You Will Send You The Corresponding Matching Size When Shipping');
    const [loading, setLoading] = useState(false); 

    const handleUrlChange = (e) => {
        setUrl(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleUpload = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://0.0.0.0:8000/verification/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ description }),
            });

            if (!response.ok) {
                throw new Error('Failed to analyze the product.');
            }

            const analysisData = await response.json();
            onAnalysisUpdate(analysisData);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="product-details">
            <div className="product-details-url">
                <label>Product URL</label>
                <input 
                    type="text" 
                    value={url} 
                    onChange={handleUrlChange} 
                />
            </div>
            <div className="product-details-description">
                <label>Description</label>
                <textarea 
                    value={description} 
                    onChange={handleDescriptionChange} 
                />
            </div>
            <div className="product-details-bottom">
                <div className="upload-button">
                    <div className="listing-footnote">
                        <label>Both domestic and current international product listings are accepted.</label>
                    </div>
                    {loading ? (
                        <div className="loading-wrapper-upload">
                            <div className="loader-upload"></div>
                        </div>
                    ) : (
                        <button onClick={handleUpload}>Upload</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;