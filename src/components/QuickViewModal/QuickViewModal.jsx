import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import classes from './QuickViewModal.module.scss';

const QuickViewModal = ({ product, isOpen, onClose, isInCart, onAddToCart }) => {

    const [quantity, setQuantity] = useState(1);

    if (!isOpen || !product) return null;

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            onAddToCart(product);
        }
        onClose();
    };

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating || 4);
        const emptyStars = 5 - fullStars;
        return '★'.repeat(fullStars) + '☆'.repeat(emptyStars);
    };

    const discountedPrice = product.discount > 0 
        ? ((product.price * (100 - product.discount)) / 100).toFixed(2)
        : product.price;

    return (
        <div className={classes.modalOverlay} onClick={handleBackdropClick}>
            <div className={classes.modalContent}>
                <button className={classes.closeButton} onClick={onClose} aria-label="Close quick view">
                    ×
                </button>
                
                <div className={classes.modalBody}>
                    {/* Product Images */}
                    <div className={classes.imageSection}>
                        <div className={classes.mainImage}>
                            <img 
                                src={product.image} 
                                alt={product.title}
                                className={classes.productImage}
                            />
                            {product.discount > 0 && (
                                <div className={classes.discountBadge}>
                                    -{product.discount}%
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className={classes.detailsSection}>
                        <div className={classes.productInfo}>
                            <h2 className={classes.productTitle}>{product.title}</h2>
                            
                            {product.brand && (
                                <div className={classes.productBrand}>{product.brand}</div>
                            )}
                            
                            <div className={classes.productRating}>
                                <span className={classes.stars}>
                                    {renderStars(product.rating?.rate)}
                                </span>
                                <span className={classes.ratingCount}>
                                    ({product.rating?.count || 50} reviews)
                                </span>
                            </div>
                            
                            <div className={classes.productPrice}>
                                {product.discount > 0 && (
                                    <span className={classes.originalPrice}>
                                        ${product.price}
                                    </span>
                                )}
                                <span className={classes.currentPrice}>
                                    ${discountedPrice}
                                </span>
                                {product.discount > 0 && (
                                    <span className={classes.savings}>
                                        You save ${(product.price - discountedPrice).toFixed(2)}
                                    </span>
                                )}
                            </div>

                            <p className={classes.productDescription}>
                                {product.description || 'Premium quality product with exceptional features and reliability.'}
                            </p>

                            {/* Product Features */}
                            {product.features && product.features.length > 0 && (
                                <div className={classes.featuresSection}>
                                    <h4>Key Features:</h4>
                                    <ul className={classes.featuresList}>
                                        {product.features.slice(0, 4).map((feature, index) => (
                                            <li key={index}>{feature}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Purchase Actions */}
                        <div className={classes.purchaseSection}>
                            <div className={classes.quantitySelector}>
                                <label htmlFor="quantity">Quantity:</label>
                                <div className={classes.quantityControls}>
                                    <button 
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className={classes.quantityButton}
                                        disabled={quantity <= 1}
                                    >
                                        -
                                    </button>
                                    <input 
                                        id="quantity"
                                        type="number" 
                                        value={quantity} 
                                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                        min="1" 
                                        max="10"
                                        className={classes.quantityInput}
                                    />
                                    <button 
                                        onClick={() => setQuantity(Math.min(10, quantity + 1))}
                                        className={classes.quantityButton}
                                        disabled={quantity >= 10}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <div className={classes.actionButtons}>
                                <button
                                    onClick={handleAddToCart}
                                    className={classes.addToCartBtn}
                                    disabled={isInCart(product.id)}
                                >
                                    {isInCart(product.id) ? '✓ In Cart' : `Add ${quantity} to Cart`}
                                </button>
                                
                                <Link 
                                    to={`/product/${product.id}`}
                                    className={classes.viewDetailsBtn}
                                    onClick={onClose}
                                >
                                    View Full Details
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

QuickViewModal.propTypes = {
    product: PropTypes.object,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    isInCart: PropTypes.func.isRequired,
    onAddToCart: PropTypes.func.isRequired,
};

export default QuickViewModal;