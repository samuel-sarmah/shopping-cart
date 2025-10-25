import { Link } from "react-router";
import { useState } from "react";
import classes from "./App.module.scss";

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
        <div className={classes.homePage}>
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

            {/* Features Section */}
            <section className={classes.features}>
                <h2 className={classes.sectionTitle}>Why Choose Eesto Shoppers?</h2>
                <div className={classes.featuresGrid}>
                    <div className={classes.featureCard}>
                        <span className={classes.featureIcon}>🚚</span>
                        <h3 className={classes.featureTitle}>Fast Delivery</h3>
                        <p className={classes.featureDescription}>
                            Get your orders delivered quickly with our express shipping options. 
                            Free delivery on orders over $50.
                        </p>
                    </div>
                    <div className={classes.featureCard}>
                        <span className={classes.featureIcon}>⭐</span>
                        <h3 className={classes.featureTitle}>Top Quality</h3>
                        <p className={classes.featureDescription}>
                            All products are carefully curated and tested for quality. 
                            100% satisfaction guaranteed or your money back.
                        </p>
                    </div>
                    <div className={classes.featureCard}>
                        <span className={classes.featureIcon}>🔒</span>
                        <h3 className={classes.featureTitle}>Secure Shopping</h3>
                        <p className={classes.featureDescription}>
                            Shop with confidence using our secure payment system. 
                            Your personal information is always protected.
                        </p>
                    </div>
                    <div className={classes.featureCard}>
                        <span className={classes.featureIcon}>💬</span>
                        <h3 className={classes.featureTitle}>24/7 Support</h3>
                        <p className={classes.featureDescription}>
                            Our friendly customer support team is available around the clock 
                            to help with any questions or concerns.
                        </p>
                    </div>
                    <div className={classes.featureCard}>
                        <span className={classes.featureIcon}>💰</span>
                        <h3 className={classes.featureTitle}>Best Prices</h3>
                        <p className={classes.featureDescription}>
                            Competitive prices with regular sales and discounts. 
                            Price match guarantee on identical items.
                        </p>
                    </div>
                    <div className={classes.featureCard}>
                        <span className={classes.featureIcon}>📱</span>
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
                        <span className={classes.statNumber}>50K+</span>
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
                        © 2025 Eesto Shoppers. All rights reserved. Made with ❤️ for amazing shoppers.
                    </p>
                </div>
            </footer>
        </div>
    )
}

export default App;