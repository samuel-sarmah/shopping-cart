import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { sanitizeInput, isValidEmail } from "./utils/validation.js";
import { useProducts } from "./hooks/useProducts";
import { useCart } from "./hooks/useCart";
import Header from "./components/Header/Header";
import QuickViewModal from "./components/QuickViewModal/QuickViewModal";
import classes from "./App.module.scss";

const categoryImages = {
    "electronics": "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&h=400&fit=crop&crop=center",
    "jewelery": "https://images.unsplash.com/photo-1611596510844-cb5d39674643?w=600&h=400&fit=crop&crop=center",
    "men's clothing": "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=400&fit=crop&crop=center",
    "women's clothing": "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=400&fit=crop&crop=center"
};

const categoryDescriptions = {
    "electronics": "Latest gadgets and tech essentials for modern living",
    "jewelery": "Elegant accessories and timeless pieces for every style",
    "men's clothing": "Contemporary fashion and essentials for the modern man",
    "women's clothing": "Trendy styles and classic pieces for every woman"
};

function App() {
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);
    const [quickViewProduct, setQuickViewProduct] = useState(null);
    const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

    const API_URL = import.meta.env.VITE_API_URL || 'https://fakestoreapi.com/products';
    const { products, loading, error } = useProducts(API_URL);
    const { cartItemsCount, isInCart, addToCart } = useCart();

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        const sanitizedEmail = sanitizeInput(email);
        if (sanitizedEmail && isValidEmail(sanitizedEmail)) {
            setSubscribed(true);
            setEmail("");
            setTimeout(() => setSubscribed(false), 3000);
        }
    };

    const handleQuickView = (product) => {
        setQuickViewProduct(product);
        setIsQuickViewOpen(true);
    };

    const handleCloseQuickView = () => {
        setIsQuickViewOpen(false);
        setTimeout(() => setQuickViewProduct(null), 300);
    };

    // Group products by category
    const productsByCategory = useMemo(() => {
        if (!products.length) return {};
        
        const grouped = {};
        products.forEach(product => {
            if (!grouped[product.category]) {
                grouped[product.category] = [];
            }
            grouped[product.category].push(product);
        });
        
        // Get top 3 products from each category
        Object.keys(grouped).forEach(category => {
            grouped[category] = grouped[category]
                .sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0))
                .slice(0, 3);
        });
        
        return grouped;
    }, [products]);

    const categories = Object.keys(productsByCategory);

    if (loading) return (
        <div className={classes.loadingContainer}>
            <div className={classes.loadingSpinner}></div>
            <p>Loading amazing products...</p>
        </div>
    );

    if (error) return (
        <div className={classes.errorContainer}>
            <h2>Something went wrong</h2>
            <p>{error}</p>
            <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
    );

    return (
        <div className={classes.homePage}>
            <Header cartItemsCount={cartItemsCount} />
            
            {/* Hero Section */}
            <section className={classes.hero}>
                <div className={classes.heroContent}>
                    <h1 className={classes.title}>
                        Discover Amazing Products
                    </h1>
                    <p className={classes.subtitle}>
                        Shop our curated collection of premium items across multiple categories
                    </p>
                    <div className={classes.heroStats}>
                        <div className={classes.stat}>
                            <span className={classes.statNumber}>{products.length}+</span>
                            <span className={classes.statLabel}>Products</span>
                        </div>
                        <div className={classes.stat}>
                            <span className={classes.statNumber}>{categories.length}</span>
                            <span className={classes.statLabel}>Categories</span>
                        </div>
                        <div className={classes.stat}>
                            <span className={classes.statNumber}>4.8★</span>
                            <span className={classes.statLabel}>Rating</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories with Products */}
            <section className={classes.categoriesSection}>
                <div className={classes.sectionHeader}>
                    <h2 className={classes.sectionTitle}>Shop by Category</h2>
                    <Link to="/shop" className={classes.viewAllLink}>
                        View All Products →
                    </Link>
                </div>

                {categories.map((category) => (
                    <div key={category} className={classes.categorySection}>
                        <div className={classes.categoryHeader}>
                            <div className={classes.categoryInfo}>
                                <h3 className={classes.categoryName}>
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                </h3>
                                <p className={classes.categoryDescription}>
                                    {categoryDescriptions[category] || `Explore our ${category} collection`}
                                </p>
                            </div>
                            <Link 
                                to={`/shop?category=${encodeURIComponent(category)}`} 
                                className={classes.categoryLink}
                            >
                                Shop {category.charAt(0).toUpperCase() + category.slice(1)} →
                            </Link>
                        </div>

                        {/* Category Banner */}
                        <div className={classes.categoryBanner}>
                            <img 
                                src={categoryImages[category] || "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=300&fit=crop&crop=center"}
                                alt={category}
                                className={classes.categoryImage}
                            />
                            <div className={classes.categoryOverlay}>
                                <h4>{category.charAt(0).toUpperCase() + category.slice(1)}</h4>
                                <p>{productsByCategory[category].length} products available</p>
                            </div>
                        </div>

                        {/* Products Grid */}
                        <div className={classes.productsGrid}>
                            {productsByCategory[category].map((product) => (
                                <div key={product.id} className={classes.productCard}>
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
                                            <button 
                                                className={classes.quickViewBtn}
                                                onClick={() => handleQuickView(product)}
                                            >
                                                Quick View
                                            </button>
                                            <button 
                                                className={classes.addToCartBtn}
                                                onClick={() => addToCart(product)}
                                                disabled={isInCart(product.id)}
                                            >
                                                {isInCart(product.id) ? 'In Cart' : 'Add to Cart'}
                                            </button>
                                        </div>
                                    </div>
                                    
                                    <div className={classes.productContent}>
                                        <h4 className={classes.productTitle}>{product.title}</h4>
                                        
                                        <div className={classes.productRating}>
                                            <span className={classes.stars}>
                                                {'★'.repeat(Math.floor(product.rating?.rate || 4))}
                                                {'☆'.repeat(5 - Math.floor(product.rating?.rate || 4))}
                                            </span>
                                            <span className={classes.ratingCount}>
                                                ({product.rating?.count || 50})
                                            </span>
                                        </div>
                                        
                                        <div className={classes.productPrice}>
                                            <span>
                                                {product.discount > 0 && (
                                                    <span className={classes.originalPrice}>
                                                        ${product.price}
                                                    </span>
                                                )}
                                                ${((product.price * (100 - product.discount)) / 100).toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </section>

            {/* Features Section */}
            <section className={classes.featuresSection}>
                <h2 className={classes.sectionTitle}>Why Shop With Us?</h2>
                <div className={classes.featuresGrid}>
                    <div className={classes.featureCard}>
                        <div className={classes.featureIcon}>🚚</div>
                        <h3>Fast Delivery</h3>
                        <p>Free shipping on orders over $50</p>
                    </div>
                    <div className={classes.featureCard}>
                        <div className={classes.featureIcon}>💎</div>
                        <h3>Premium Quality</h3>
                        <p>Curated products you can trust</p>
                    </div>
                    <div className={classes.featureCard}>
                        <div className={classes.featureIcon}>🔒</div>
                        <h3>Secure Shopping</h3>
                        <p>100% secure payment processing</p>
                    </div>
                    <div className={classes.featureCard}>
                        <div className={classes.featureIcon}>↩️</div>
                        <h3>Easy Returns</h3>
                        <p>30-day hassle-free returns</p>
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className={classes.newsletter}>
                <div className={classes.newsletterContent}>
                    <h2 className={classes.newsletterTitle}>Stay in the Loop</h2>
                    <p className={classes.newsletterDescription}>
                        Get exclusive offers and be the first to know about new arrivals
                    </p>
                    <form className={classes.newsletterForm} onSubmit={handleNewsletterSubmit}>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={classes.emailInput}
                            required
                        />
                        <button type="submit" className={classes.subscribeButton}>
                            {subscribed ? "✅ Subscribed!" : "Subscribe"}
                        </button>
                    </form>
                </div>
            </section>

            {/* Footer */}
            <footer className={classes.footer}>
                <div className={classes.footerContent}>
                    <div className={classes.footerSection}>
                        <h4>eesto Shoppers</h4>
                        <p>Your trusted destination for quality products</p>
                    </div>
                    <div className={classes.footerLinks}>
                        <div className={classes.footerColumn}>
                            <h5>Shop</h5>
                            <Link to="/shop">All Products</Link>
                            <Link to="/cart">Cart</Link>
                        </div>
                        <div className={classes.footerColumn}>
                            <h5>Account</h5>
                            <Link to="/login">Login</Link>
                            <Link to="/profile">Profile</Link>
                        </div>
                        <div className={classes.footerColumn}>
                            <h5>Support</h5>
                            <a href="#contact">Contact Us</a>
                            <a href="#returns">Returns</a>
                        </div>
                    </div>
                </div>
                <div className={classes.footerBottom}>
                    <p>© 2026 eesto Shoppers. All rights reserved.</p>
                </div>
            </footer>

            {/* Quick View Modal */}
            <QuickViewModal
                product={quickViewProduct}
                isOpen={isQuickViewOpen}
                onClose={handleCloseQuickView}
                isInCart={isInCart}
                onAddToCart={addToCart}
            />
        </div>
    )
}

export default App;