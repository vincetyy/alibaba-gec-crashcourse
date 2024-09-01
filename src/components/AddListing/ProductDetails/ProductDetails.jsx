import React, { useState } from 'react';
import './ProductDetails.css';

const ProductDetails = ({ onAnalysisUpdate }) => {
    const [url, setUrl] = useState('https://www.aliexpress.com/item/1005001900018013.html');
    const [description, setDescription] = useState('HEODSCU insulated thermos bottles, designed for superior thermal retention. These bottles are constructed from high-quality stainless steel, ensuring durability and resistance to rust...');


    const handleUrlChange = (e) => {
        setUrl(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleUpload = async () => {
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
        }
    };

    return (
        <div className="product-details">
            <div>
                <label>Product URL</label>
                <input 
                    type="text" 
                    value={url} 
                    onChange={handleUrlChange} 
                />
            </div>
            <div>
                <label>Description</label>
                <textarea 
                    value={description} 
                    onChange={handleDescriptionChange} 
                />
            </div>
            <div className="upload-button">
                <div className="listing-footnote">
                    <label>Both domestic and current international product listings are accepted. </label>
                </div>
                <button onClick={handleUpload}>Upload</button>
            </div>
        </div>
    );
};

export default ProductDetails;