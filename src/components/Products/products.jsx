import { useEffect, useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import classes from './products.module.scss'

const API_URL = 'https://dummyjson.com/products';

function Products({ cart, addToCart}) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

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

    if (loading) return <p>Loading...</p>;
    if (error) return <h3 className={classes.error}>A network error was encountered!</h3>

    const isInCart = (productId) => {
        return cart && cart[productId]
    }

    return (
        <section className={classes.productPage}> 
            <h1>Products</h1>

            <div className={classes.container}>
                {products.map(product => (
                    <div className={classes.product} key={product.id}>
                        <img src={product.thumbnail} alt={product.title} />
                        <h3>{product.title}</h3>
                        <p>Price: </p>
                        <button
                            onClick={() => addToCart(product)}
                            disabled={isInCart(product.id)}
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