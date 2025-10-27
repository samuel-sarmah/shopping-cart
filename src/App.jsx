import { Link } from "react-router";
import { useState } from "react";
import classes from "./App.module.scss";

const featureImages = {
    fastDelivery: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400&h=300&fit=crop&crop=center",
    quality: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop&crop=center",
    security: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop&crop=center",
    support: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop&crop=center",
    pricing: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop&crop=center",
    returns: "https://images.unsplash.com/photo-1580048915913-4f8f5cb481c4?w=400&h=300&fit=crop&crop=center"
};

const dealImages = {
    electronics: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&h=200&fit=crop",
    beauty: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=200&fit=crop",
    shipping: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=300&h=200&fit=crop",
    flash: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=300&h=200&fit=crop"
};

function App() {
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        if (email) {
            setSubscribed(true);
            setEmail("");
            setTimeout(() => setSubscribed(false), 3000);
        }
    };

    return (
        <div className={classes.homePage} >
            {/* Hero Section */}
            <section className={classes.hero}>
                <h1 className={classes.title}>
                    eesto Shoppers
                </h1>
                <p className={classes.subtitle}>
                    Discover amazing products with unbeatable quality and prices. 
                    Your one-stop destination for all your shopping needs.
                </p>
                <Link to="shop" className={classes.ctaButton}>
                    Start Shopping Now!
                </Link>
            </section>

            {/* Hot Deals Banner */}
            <section className={classes.dealsSection}>
                <div className={classes.dealsContainer}>
                    <div className={classes.dealsBadge}>
                        <span className={classes.fire}>🔥</span>
                        <span className={classes.badgeText}>HOT DEALS</span>
                        <span className={classes.fire}>🔥</span>
                    </div>
                    <h2 className={classes.dealsTitle}>
                        Limited Time Offers!
                    </h2>
                    <p className={classes.dealsSubtitle}>
                        Don't miss out on incredible savings across all categories
                    </p>
                    
                    <div className={classes.dealsGrid}>
                        <div className={classes.dealCard}>
                            <div className={classes.dealImage}>
                                <img src={dealImages.electronics} alt="Electronics deals" />
                                <div className={classes.dealOverlay}>
                                    <div className={classes.dealIcon}></div>
                                </div>
                            </div>
                            <div className={classes.dealContent}>
                                <div className={classes.dealDiscount}>UP TO 50% OFF</div>
                                <div className={classes.dealCategory}>Electronics</div>
                            </div>
                        </div>
                        <div className={classes.dealCard}>
                            <div className={classes.dealImage}>
                                <img src={dealImages.beauty} alt="Beauty products" />
                                <div className={classes.dealOverlay}>
                                    <div className={classes.dealIcon}></div>
                                </div>
                            </div>
                            <div className={classes.dealContent}>
                                <div className={classes.dealDiscount}>BUY 2 GET 1</div>
                                <div className={classes.dealCategory}>Beauty</div>
                            </div>
                        </div>
                        <div className={classes.dealCard}>
                            <div className={classes.dealImage}>
                                <img src={dealImages.shipping} alt="Free shipping" />
                                <div className={classes.dealOverlay}>
                                    <div className={classes.dealIcon}></div>
                                </div>
                            </div>
                            <div className={classes.dealContent}>
                                <div className={classes.dealDiscount}>FREE SHIPPING</div>
                                <div className={classes.dealCategory}>Orders $50+</div>
                            </div>
                        </div>
                        <div className={classes.dealCard}>
                            <div className={classes.dealImage}>
                                <img src={dealImages.flash} alt="Flash sale" />
                                <div className={classes.dealOverlay}>
                                    <div className={classes.dealIcon}></div>
                                </div>
                            </div>
                            <div className={classes.dealContent}>
                                <div className={classes.dealDiscount}>FLASH SALE</div>
                                <div className={classes.dealCategory}>Today Only</div>
                            </div>
                        </div>
                    </div>
                    
                    <Link to="shop" className={classes.shopDealsButton}>
                        <span>Shop All Deals Now</span>
                        <span className={classes.arrow}>→</span>
                    </Link>
                    
                    <div className={classes.countdown}>
                        <span className={classes.countdownText}>⏰ Hurry! Deals end in:</span>
                        <div className={classes.countdownTimer}>
                            <div className={classes.timeBlock}>
                                <span className={classes.timeNumber}>23</span>
                                <span className={classes.timeLabel}>Hours</span>
                            </div>
                            <span className={classes.timeSeparator}>:</span>
                            <div className={classes.timeBlock}>
                                <span className={classes.timeNumber}>45</span>
                                <span className={classes.timeLabel}>Mins</span>
                            </div>
                            <span className={classes.timeSeparator}>:</span>
                            <div className={classes.timeBlock}>
                                <span className={classes.timeNumber}>12</span>
                                <span className={classes.timeLabel}>Secs</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className={classes.features}>
                <h2 className={classes.sectionTitle}>Why Choose eesto?</h2>
                <div className={classes.featuresGrid}>
                    <div className={classes.featureCard}>
                        <div className={classes.featureImage}>
                            <img src={featureImages.fastDelivery} alt="Fast Delivery - Delivery truck and packages" />
                        </div>
                        <h3 className={classes.featureTitle}>Fast Delivery</h3>
                        <p className={classes.featureDescription}>
                            Get your orders delivered quickly with our express shipping options. 
                            Free delivery on orders over $50.
                        </p>
                    </div>
                    <div className={classes.featureCard}>
                        <div className={classes.featureImage}>
                            <img src={featureImages.quality} alt="Quality Products - Premium items showcase" />
                        </div>
                        <h3 className={classes.featureTitle}>Top Quality</h3>
                        <p className={classes.featureDescription}>
                            All products are carefully curated and tested for quality. 
                            100% satisfaction guaranteed or your money back.
                        </p>
                    </div>
                    <div className={classes.featureCard}>
                        <div className={classes.featureImage}>
                            <img src={featureImages.security} alt="Secure Shopping - Protected payment and data" />
                        </div>
                        <h3 className={classes.featureTitle}>Secure Shopping</h3>
                        <p className={classes.featureDescription}>
                            Shop with confidence using our secure payment system. 
                            Your personal information is always protected.
                        </p>
                    </div>
                    <div className={classes.featureCard}>
                        <div className={classes.featureImage}>
                            <img src={featureImages.support} alt="24/7 Customer Support - Friendly support team" />
                        </div>
                        <h3 className={classes.featureTitle}>24/7 Support</h3>
                        <p className={classes.featureDescription}>
                            Our friendly customer support team is available around the clock 
                            to help with any questions or concerns.
                        </p>
                    </div>
                    <div className={classes.featureCard}>
                        <div className={classes.featureImage}>
                            <img src={featureImages.pricing} alt="Best Prices - Competitive pricing and savings" />
                        </div>
                        <h3 className={classes.featureTitle}>Best Prices</h3>
                        <p className={classes.featureDescription}>
                            Competitive prices with regular sales and discounts. 
                            Price match guarantee on identical items.
                        </p>
                    </div>
                    <div className={classes.featureCard}>
                        <div className={classes.featureImage}>
                            <img src={featureImages.returns} alt="Easy Returns - Hassle-free return process" />
                        </div>
                        <h3 className={classes.featureTitle}>Easy Returns</h3>
                        <p className={classes.featureDescription}>
                            Hassle-free returns within 30 days. No questions asked 
                            return policy for your peace of mind.
                        </p>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className={classes.stats}>
                <div className={classes.statsGrid}>
                    <div className={classes.statItem}>
                        <span className={classes.statNumber}>20K+</span>
                        <span className={classes.statLabel}>Happy Customers</span>
                    </div>
                    <div className={classes.statItem}>
                        <span className={classes.statNumber}>1000+</span>
                        <span className={classes.statLabel}>Products</span>
                    </div>
                    <div className={classes.statItem}>
                        <span className={classes.statNumber}>99.9%</span>
                        <span className={classes.statLabel}>Uptime</span>
                    </div>
                    <div className={classes.statItem}>
                        <span className={classes.statNumber}>24/7</span>
                        <span className={classes.statLabel}>Support</span>
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className={classes.newsletter}>
                <h2 className={classes.newsletterTitle}>Stay Updated</h2>
                <p className={classes.newsletterDescription}>
                    Subscribe to our newsletter and be the first to know about new products, 
                    exclusive deals, and special offers.
                </p>
                <form className={classes.newsletterForm} onSubmit={handleNewsletterSubmit}>
                    <input
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={classes.emailInput}
                        required
                    />
                    <button type="submit" className={classes.subscribeButton}>
                        {subscribed ? "✅ Subscribed!" : "Subscribe"}
                    </button>
                </form>
            </section>

            {/* Footer */}
            <footer className={classes.footer}>
                <div className={classes.footerContent}>
                    <div className={classes.footerLinks}>
                        <Link to="/shop">Shop</Link>
                        <Link to="/cart">Cart</Link>
                        <a href="#about">About Us</a>
                        <a href="#contact">Contact</a>
                        <a href="#privacy">Privacy Policy</a>
                        <a href="#terms">Terms of Service</a>
                    </div>
                    <p className={classes.copyright}>
                        © 2025 sarmah. All rights reserved. Made with ❤️ for amazing shoppers.
                    </p>
                </div>
            </footer>
        </div>
    )
}

export default App;