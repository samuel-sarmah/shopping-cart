import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { useProducts } from '../../hooks/useProducts';
import { useCart } from '../../hooks/useCart';
import Header from '../Header/Header';
import Loader from '../Loader/Loader';
import classes from './ProductDetail.module.scss';

function ProductDetail() {
    const { id } = useParams();
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [addedToCart, setAddedToCart] = useState(false);

    const API_URL = import.meta.env.VITE_API_URL || 'https://fakestoreapi.com/products';
    const { products, loading, error } = useProducts(API_URL);
    const { cartItemsCount, isInCart, addToCart } = useCart();

    const product = products.find(p => p.id === parseInt(id));

    useEffect(() => {
        if (product) {
            setSelectedImage(0);
            setQuantity(1);
            setAddedToCart(false);
        }
    }, [product]);

    const handleQuantityChange = (type) => {
        if (type === 'increment') {
            setQuantity(prev => Math.min(10, prev + 1));
        } else {
            setQuantity(prev => Math.max(1, prev - 1));
        }
    };

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart(product);
        }
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 3000);
    };

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating || 4);
        const emptyStars = 5 - fullStars;
        return '★'.repeat(fullStars) + '☆'.repeat(emptyStars);
    };

    const relatedProducts = products
        .filter(p => p.category === product?.category && p.id !== product?.id)
        .slice(0, 4);

    if (loading) return <Loader />;
    if (error) return <div className={classes.error}>Error loading product: {error}</div>;
    if (!product) return <div className={classes.error}>Product not found</div>;

    const discountedPrice = product.discount > 0 
        ? ((product.price * (100 - product.discount)) / 100).toFixed(2)
        : product.price;

    return (
        <div className={classes.productDetailPage}>
            <Header cartItemsCount={cartItemsCount} />
            
            <div className={classes.breadcrumb}>
                <Link to="/">Home</Link>
                <span>/</span>
                <Link to="/shop">Shop</Link>
                <span>/</span>
                <Link to={`/shop?category=${encodeURIComponent(product.category)}`}>
                    {product.category}
                </Link>
                <span>/</span>
                <span>{product.title}</span>
            </div>

            <div className={classes.productContainer}>
                {/* Product Images */}
                <div className={classes.imageSection}>
                    <div className={classes.mainImage}>
                        <img src={product.image} alt={product.title} />
                        {product.discount > 0 && (
                            <div className={classes.discountBadge}>
                                -{product.discount}%
                            </div>
                        )}
                    </div>
                    
                    <div className={classes.thumbnails}>
                        {[product.image].map((img, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedImage(index)}
                                className={`${classes.thumbnail} ${selectedImage === index ? classes.active : ''}`}
                            >
                                <img src={img} alt={`Thumbnail ${index + 1}`} />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Details */}
                <div className={classes.detailsSection}>
                    <div className={classes.productInfo}>
                        <h1 className={classes.productTitle}>{product.title}</h1>
                        
                        {product.brand && (
                            <div className={classes.productBrand}>{product.brand}</div>
                        )}
                        
                        <div className={classes.productRating}>
                            <span className={classes.stars}>
                                {renderStars(product.rating?.rate)}
                            </span>
                            <span className={classes.ratingCount}>
                                {product.rating?.rate || 4} ({product.rating?.count || 50} reviews)
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

                        <div className={classes.productDescription}>
                            <h3>Description</h3>
                            <p>{product.description}</p>
                        </div>

                        {/* Product Features */}
                        {product.features && product.features.length > 0 && (
                            <div className={classes.featuresSection}>
                                <h3>Key Features</h3>
                                <ul className={classes.featuresList}>
                                    {product.features.map((feature, index) => (
                                        <li key={index}>{feature}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Product Meta */}
                        <div className={classes.productMeta}>
                            <div className={classes.metaItem}>
                                <span className={classes.metaLabel}>Category:</span>
                                <span className={classes.metaValue}>{product.category}</span>
                            </div>
                            <div className={classes.metaItem}>
                                <span className={styles.metaLabel}>Availability:</span>
                                <span className={`${styles.metaValue} ${styles.inStock}`}>
                                    In Stock
                                </span>
                            </div>
                            <div className={classes.metaItem}>
                                <span className={styles.metaLabel}>SKU:</span>
                                <span className={styles.metaValue}>SKU-{product.id}</span>
                            </div>
                        </div>
                    </div>

                    {/* Purchase Actions */}
                    <div className={classes.purchaseSection}>
                        <div className={classes.quantitySelector}>
                            <label>Quantity:</label>
                            <div className={classes.quantityControls}>
                                <button 
                                    onClick={() => handleQuantityChange('decrement')}
                                    disabled={quantity <= 1}
                                >
                                    -
                                </button>
                                <input 
                                    type="number" 
                                    value={quantity} 
                                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                    min="1" 
                                    max="10"
                                />
                                <button 
                                    onClick={() => handleQuantityChange('increment')}
                                    disabled={quantity >= 10}
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <div className={classes.actionButtons}>
                            <button
                                onClick={handleAddToCart}
                                className={classes.addToCartButton}
                                disabled={isInCart(product.id) || addedToCart}
                            >
                                {addedToCart ? '✓ Added to Cart!' : 
                                 isInCart(product.id) ? 'In Cart' : 
                                 `Add ${quantity} to Cart`}
                            </button>
                            
                            <button className={classes.buyNowButton}>
                                Buy Now
                            </button>
                        </div>

                        <div className={classes.productGuarantees}>
                            <div className={classes.guaranteeItem}>
                                <span className={classes.guaranteeIcon}>🚚</span>
                                <span>Free Shipping</span>
                            </div>
                            <div className={classes.guaranteeItem}>
                                <span className={classes.guaranteeIcon}>↩️</span>
                                <span>30-Day Returns</span>
                            </div>
                            <div className={classes.guaranteeItem}>
                                <span className={classes.guaranteeIcon}>🛡️</span>
                                <span>1 Year Warranty</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <section className={classes.reviewsSection}>
                <h2>Customer Reviews</h2>
                <div className={classes.reviewSummary}>
                    <div className={classes.averageRating}>
                        <span className={classes.ratingNumber}>{product.rating?.rate || 4}</span>
                        <div className={classes.ratingStars}>
                            {renderStars(product.rating?.rate)}
                        </div>
                        <span className={classes.totalReviews}>Based on {product.rating?.count || 50} reviews</span>
                    </div>
                    <button className={classes.writeReviewButton}>
                        Write a Review
                    </button>
                </div>
                
                <div className={classes.reviewsList}>
                    {/* Mock reviews */}
                    <div className={classes.reviewCard}>
                        <div className={classes.reviewHeader}>
                            <span className={classes.reviewerName}>John D.</span>
                            <span className={classes.reviewDate}>January 15, 2024</span>
                            <span className={classes.reviewRating}>
                                {renderStars(5)}
                            </span>
                        </div>
                        <p className={classes.reviewText}>
                            Excellent product! Exactly as described and great quality. Highly recommend!
                        </p>
                    </div>
                    
                    <div className={classes.reviewCard}>
                        <div className={classes.reviewHeader}>
                            <span className={classes.reviewerName}>Sarah M.</span>
                            <span className={classes.reviewDate}>January 10, 2024</span>
                            <span className={styles.reviewRating}>
                                {renderStars(4)}
                            </span>
                        </div>
                        <p className={classes.reviewText}>
                            Good product overall. Fast shipping and nice packaging. Would buy again.
                        </p>
                    </div>
                </div>
            </section>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <section className={classes.relatedSection}>
                    <h2>Related Products</h2>
                    <div className={classes.relatedGrid}>
                        {relatedProducts.map(relatedProduct => (
                            <div key={relatedProduct.id} className={classes.relatedCard}>
                                <img src={relatedProduct.image} alt={relatedProduct.title} />
                                <div className={classes.relatedInfo}>
                                    <h4>{relatedProduct.title}</h4>
                                    <div className={classes.relatedRating}>
                                        {renderStars(relatedProduct.rating?.rate)}
                                    </div>
                                    <p className={classes.relatedPrice}>${relatedProduct.price}</p>
                                    <Link 
                                        to={`/product/${relatedProduct.id}`}
                                        className={classes.viewProductButton}
                                    >
                                        View Product
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}

export default ProductDetail;