import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classes from './ProductCard.module.scss';

const ProductCard = memo(({ product, isInCart, onAddToCart }) => {
    const handleAddToCart = () => {
        onAddToCart(product);
    };

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating || 4);
        const emptyStars = 5 - fullStars;
        return '★'.repeat(fullStars) + '☆'.repeat(emptyStars);
    };

    return (
        <article className={classes.productCard} role="article" aria-label={`${product.title}, ${product.formattedPrice}, ${product.rating?.rate || 4} stars`}>
            {product.discount > 0 && (
                <div className={classes.discountBadge}>
                    -{product.discount}%
                </div>
            )}
            
            <div className={classes.productImage}>
                <img 
                    src={product.image} 
                    alt={product.title} 
                    loading="lazy"
                />
                <div className={classes.productOverlay}>
                    <button className={classes.quickViewBtn}>
                        Quick View
                    </button>
                </div>
            </div>
            
            <div className={classes.productContent}>
                <h3 className={classes.productTitle}>
                    {product.title}
                </h3>
                
                {product.brand && (
                    <div className={classes.productBrand}>
                        {product.brand}
                    </div>
                )}
                
                <div className={classes.productRating}>
                    <span className={classes.stars}>
                        {renderStars(product.rating?.rate)}
                    </span>
                    <span className={classes.ratingCount}>
                        ({product.rating?.count || 50})
                    </span>
                </div>
                
                {product.features && product.features.length > 0 && (
                    <div className={classes.productFeatures}>
                        {product.features.slice(0, 2).map((feature, index) => (
                            <span key={index} className={classes.feature}>
                                {feature}
                            </span>
                        ))}
                    </div>
                )}
                
                <div className={classes.productPrice}>
                    <span>
                        {product.discount > 0 && (
                            <span className={classes.originalPrice}>
                                ${product.price}
                            </span>
                        )}
                        ${((product.price * (100 - product.discount)) / 100).toFixed(2)}
                    </span>
                    {product.discount > 0 && (
                        <span className={classes.discountBadge}>
                            Save {product.discount}%
                        </span>
                    )}
                </div>
                
                <button
                    onClick={handleAddToCart}
                    className={classes.addToCartBtn}
                    disabled={isInCart(product.id)}
                    aria-label={`Add ${product.title} to cart`}
                >
                    {isInCart(product.id) ? '' : 'Add to Cart'}
                </button>
            </div>
        </article>
    );
});

ProductCard.propTypes = {
    product: PropTypes.object.isRequired,
    isInCart: PropTypes.func.isRequired,
    onAddToCart: PropTypes.func.isRequired,
};

export default ProductCard;