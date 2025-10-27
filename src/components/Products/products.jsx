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

    return (
        <section className={classes.productPage}> 
            <Header cartItemsCount={cartItemsCount} />

            <div className={classes.container}>
                {products.map(product => (
                    <div className={classes.product} key={product.id}>
                        <img src={product.thumbnail} alt={product.title} />
                        <h3>{product.title}</h3>
                        <p>Price: ${product.price}</p>
                        <p>Rating: {product.rating}</p>
                        <button
                            onClick={() => addToCart(product)}
                        >
                            {isInCart(product.id) ? 'In Cart' : 'Add to Cart'}
                        </button>
                    </div>
                ))}
            </div>
        </section>
    )
}



export default Products;