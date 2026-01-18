import { useState, useMemo, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { useProducts } from "../../hooks/useProducts";
import { useCart } from "../../hooks/useCart";
import { sanitizeInput, debounce } from "../../utils/validation";
import classes from './products.module.scss'
import Header from "../Header/Header";
import Loader from "../Loader/Loader"

const API_URL = import.meta.env.VITE_API_URL || 'https://dummyjson.com/products';

function Products() {
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    // Use custom hooks for products and cart
    const { products, loading, error, refetch } = useProducts(API_URL);
    const { cartItemsCount, isInCart, addToCart } = useCart();

    // Debounce search term
    const debouncedSetSearchTerm = useCallback(
        debounce((value) => {
            const sanitizedValue = sanitizeInput(value);
            setDebouncedSearchTerm(sanitizedValue);
        }, 300),
        []
    );

    // Handle search input change
    const handleSearchChange = useCallback((e) => {
        const value = e.target.value;
        setSearchTerm(value);
        debouncedSetSearchTerm(value);
    }, [debouncedSetSearchTerm]);

    if (loading) return <Loader />;
    if (error) return <h3 className={classes.error}>A network error was encountered!</h3>

    // Memoize expensive calculations
    const categories = useMemo(() => ['all', ...new Set(products.map(product => product.category))], [products]);

    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const matchesSearch = debouncedSearchTerm === '' || 
                product.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
            const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [products, debouncedSearchTerm, selectedCategory]);

    return (
        <section className={classes.productPage}> 
            <Header cartItemsCount={cartItemsCount} />

            <div className={classes.searchSection}>
                <div className={classes.searchBar}>
                        <input
                            type="text"
                            placeholder="Search products by name..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className={classes.searchInput}
                            aria-label="Search products"
                            maxLength="100"
                        />
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className={classes.categorySelect}
                    >
                        {categories.map(category => (
                            <option key={category} value={category}>
                                {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>
                        {(debouncedSearchTerm || selectedCategory !== 'all') && (
                            <p className={classes.resultsCount}>
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
                        <button 
                            onClick={() => {
                                setSearchTerm('');
                                setDebouncedSearchTerm('');
                                setSelectedCategory('all');
                            }}
                            className={classes.resetButton}
                        >
                            Clear Filters
                        </button>
                    </div>
                ) : (
                    filteredProducts.map(product => (
                        <div className={classes.product} key={product.id}>
                            <img src={product.thumbnail} alt={product.title} loading="lazy" />
                            <h3>{product.title}</h3>
                            <p className={classes.category}>{product.category}</p>
                            <p>Price: ${product.price}</p>
                            <p>Rating: {product.rating}</p>
                            <button
                                onClick={() => addToCart(product)}
                            >
                                {isInCart(product.id) ? 'In Cart' : 'Add to Cart'}
                            </button>
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