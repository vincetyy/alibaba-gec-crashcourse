import React from 'react';
import './ProductDetails.css';

const ProductDetails = () => {
    return (
        <div className="product-details">
            <div>
                <label>Product URL</label>
                <input type="text" value="https://www.aliexpress.com/item/1005001900018013.html" readOnly />
            </div>
            <div>
                <label>Description</label>
                <textarea 
                    value="HEODSCU insulated thermos bottles, designed for superior thermal retention. These bottles are constructed from high-quality stainless steel, ensuring durability and resistance to rust..."
                    readOnly
                />
            </div>
            <div className="upload-button">
                <div className="listing-footnote">
                    <label>Both domestic and current international product listings are accepted. </label>
                </div>
                <button>Upload</button>
            </div>
        </div>
    );
};

export default ProductDetails;