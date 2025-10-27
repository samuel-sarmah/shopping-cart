import { useEffect, useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import classes from './products.module.scss'
import Header from "../Header/Header";
import Loader from "../Loader/Loader"

const API_URL = 'https://dummyjson.com/products';

function Products({ }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    // Cart state persisted in localStorage
    const [cartProducts, setCartProducts] = useLocalStorageState('shopping-cart', { defaultValue: {}});

    useEffect(() => {
        fetchData(API_URL)            
    }, [])

    async function fetchData(url) {
        try {
            const response = await fetch(url);
            if (response.ok){
                const data = await response.json();
                setProducts(data.products);
                setLoading(false);
            } else {
                setError(true);
                setLoading(false);
            }
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    }

    if (loading) return <Loader />;
    if (error) return <h3 className={classes.error}>A network error was encountered!</h3>

    const isInCart = (productId) => {
        return cartProducts && cartProducts[productId]
    }

    const addToCart = (product) => {
        setCartProducts((prevCart) => {
            // If product already exists, increase quantity
            if (prevCart[product.id]) {
                return {
                    ...prevCart,
                    [product.id] : {
                        ...prevCart[product.id],
                        quantity:prevCart[product.id].quantity + 1
                    }
                };
            }
            // If new product, increase quantity by 1
            return {
                ...prevCart,
                [product.id] : { ...product, quantity : 1}
            };
        });
    };

    // calculate total items in cart
    const cartItemsCount = Object.values(cartProducts).reduce(
        (total, item) => total + item.quantity,
        0
    );

    // Get unique categories from products
    const categories = ['all', ...new Set(products.map(product => product.category))];

    // Filter products based on search term and category
    const filteredProducts = products.filter(product => {
        const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <section className={classes.productPage}> 
            <Header cartItemsCount={cartItemsCount} />

            <div className={classes.searchSection}>
                <div className={classes.searchBar}>
                    <input
                        type="text"
                        placeholder="Search products by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={classes.searchInput}
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
                {(searchTerm || selectedCategory !== 'all') && (
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
                            <img src={product.thumbnail} alt={product.title} />
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



export default Products;