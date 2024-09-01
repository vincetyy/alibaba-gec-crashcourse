import React from 'react';
import './ProductAnalysis.css';
import pmd from '../../../assets/products/pmd.jpg';
import jacket from '../../../assets/products/jacket.png';

const ProductAnalysis = ({ analysis }) => {
    // Initialize variables
    let category = "";
    let keyFeatures = [];
    let imageSrc = null;

    // Determine category, key features, and image based on item_type
    if (analysis.item_type && analysis.item_type.toLowerCase().includes('jacket')) {
        category = "Clothing";
        keyFeatures = [
            "Double Sided Wear",
            "Korean Fleece Lining",
            "Thickened Wool Padded Jacket"
        ];
        imageSrc = jacket;
    } else if (analysis.item_type && analysis.item_type.toLowerCase().includes('pmd')) {
        category = "Active Mobility Device";
        keyFeatures = [
            "UL2272 Certified",
            "48V, suitable for MRT",
            "Can go up to 68KM with full charge"
        ];
        imageSrc = pmd;
    }

    return (
        <div className="product-analysis">
            {analysis.item_type ? (
                <>
                    {imageSrc && <img src={imageSrc} alt="Product" />}
                    <div className="analysis-text">
                        <h3>AliAdapt <span style={{ color: '#000' }}>Analysis</span></h3>
                        <p><strong>Object:</strong> {analysis.item_type}</p>
                        {category && <p><strong>Category:</strong> {category}</p>}
                        {keyFeatures.length > 0 && (
                            <>
                                <p><strong>Key Features:</strong></p>
                                <ul>
                                    {keyFeatures.map((feature, index) => (
                                        <li key={index}>{feature}</li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </div>
                </>
            ) : (
                <div className="upload-prompt">
                    <p>Upload your product to use AliAdapt Analysis!</p>
                </div>
            )}
        </div>
    );
};

export default ProductAnalysis;