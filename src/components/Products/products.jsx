import { useState, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { useProducts } from "../../hooks/useProducts";
import { useCart } from "../../hooks/useCart";

import classes from './products.module.scss'
import Header from "../Header/Header";
import Loader from "../Loader/Loader"

const API_URL = import.meta.env.VITE_API_URL || 'https://fakestoreapi.com/products';

function Products() {
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    // Use custom hooks for products and cart
    const { products, categories, loading, error, retryCount, refetch, search } = useProducts(API_URL);
    const { cartItemsCount, isInCart, addToCart } = useCart();

    // Handle search input change
    const handleSearchChange = useCallback((e) => {
        const value = e.target.value;
        setSearchTerm(value);
        
        // Use debounced search from API
        if (value.length > 2 || value.length === 0) {
            search(value);
        }
    }, [search]);

    // Handle category filter
    const handleCategoryChange = useCallback((e) => {
        const category = e.target.value;
        setSelectedCategory(category);
        
        // Trigger search with category filter
        search(debouncedSearchTerm, category);
    }, [search, debouncedSearchTerm]);

    // Filter products based on current category
    const filteredProducts = useMemo(() => {
        if (selectedCategory === 'all') return products;
        return products.filter(product => product.category === selectedCategory);
    }, [products, selectedCategory]);

    // Clear all filters
    const clearFilters = useCallback(() => {
        setSearchTerm('');
        setDebouncedSearchTerm('');
        setSelectedCategory('all');
        search('');
    }, [search]);

    if (loading) return <Loader />;
    if (error) return (
        <div className={classes.errorContainer}>
            <h3 className={classes.error}>Failed to load products</h3>
            <p className={classes.errorMessage}>{error}</p>
            {retryCount > 0 && <p className={classes.retryInfo}>Retrying... Attempt {retryCount}</p>}
            <button onClick={refetch} className={classes.retryButton}>
                Try Again
            </button>
        </div>
    );

    return (
        <section className={classes.productPage}> 
            <Header cartItemsCount={cartItemsCount} />

            <div className={classes.searchSection}>
                <div className={classes.searchBar}>
                    <input
                        type="text"
                        placeholder="Search for premium products..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className={classes.searchInput}
                        aria-label="Search products"
                        maxLength="100"
                    />
                    <select
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        className={classes.categorySelect}
                        aria-label="Filter by category"
                    >
                        {categories.map(category => (
                            <option key={category} value={category}>
                                {category === 'all' ? 'All Categories' : category}
                            </option>
                        ))}
                    </select>
                </div>
                {(debouncedSearchTerm || selectedCategory !== 'all') && (
                    <p className={classes.resultsCount} role="status" aria-live="polite">
                        Found {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
                    </p>
                )}
            </div>

            <div className={classes.container}>
                {filteredProducts.length === 0 ? (
                    <div className={classes.noResults}>
                        <div className={classes.noResultsIcon}>🔍</div>
                        <h2>No Products Found</h2>
                        <p>
                            We couldn't find any products matching your search criteria.
                            <br />
                            Try adjusting your filters or search term.
                        </p>
                        <button onClick={clearFilters} className={classes.resetButton}>
                            Clear Filters
                        </button>
                    </div>
                ) : (
                    filteredProducts.map(product => (
                        <div className={classes.product} key={product.id} role="article" aria-label={`${product.title}, ${product.formattedPrice}, ${product.rating?.rate || 4} stars`}>
                            {product.discount > 0 && (
                                <div className={classes.productBadge}>
                                    -{product.discount}%
                                </div>
                            )}
                            
                            <div className={classes.productImage}>
                                <img src={product.image} alt={product.title} loading="lazy" />
                                <div className={classes.productOverlay}>
                                    <button className={classes.quickViewBtn}>
                                        Quick View
                                    </button>
                                </div>
                            </div>
                            
                            <div className={classes.productContent}>
                                <h3 className={classes.productTitle}>{product.title}</h3>
                                
                                {product.brand && (
                                    <div className={classes.productBrand}>{product.brand}</div>
                                )}
                                
                                <div className={classes.productRating}>
                                    <span className={classes.stars}>
                                        {'★'.repeat(Math.floor(product.rating?.rate || 4))}
                                        {'☆'.repeat(5 - Math.floor(product.rating?.rate || 4))}
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
                                    onClick={() => addToCart(product)}
                                    className={classes.addToCartBtn}
                                    disabled={isInCart(product.id)}
                                    aria-label={`Add ${product.title} to cart`}
                                >
                                    {isInCart(product.id) ? '' : 'Add to Cart'}
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </section>
    )
}



Products.propTypes = {
    // No props for now, but keeping for future extensibility
}

export default Products;