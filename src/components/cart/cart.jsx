import { useNavigate } from "react-router"
import useLocalStorageState from "use-local-storage-state"
import classes from "./cart.module.scss"

const Cart = () => {
    const [cartProducts, setCartProducts] = useLocalStorageState('shopping-cart', {
        defaultValue: {}
    })
    const cartItems = Object.values(cartProducts);

    const navigate = useNavigate()
    const navigateToProducts = () => {
        navigate('/shop')
    }

    const navigateToCheckout = () => {
        navigate('/checkout')
    }

    const increaseQuantity = (product) => {
        setCartProducts((prevCart) => ({
            ...prevCart,
            [product.id]: {
                ...product,
                quantity: product.quantity + 1
            }
        }));
    };

    const decreaseQuantity = (product) => {
        if (product.quantity <= 1) {
            removeFromCart(product.id);
            return;
        }
        setCartProducts((prevCart) => ({
            ...prevCart,
            [product.id]: {
                ...product,
                quantity: product.quantity - 1
            }
        }));
    };

    const removeFromCart = (productId) => {
        setCartProducts((prevCart) => {
            const newCart = { ...prevCart };
            delete newCart[productId];
            return newCart;
        });
    };

    return (
        <section className={classes.cart}>
            <h1>Your Shopping Cart</h1>
            <div className={classes.container}>
                {cartItems.length === 0 ? (
                    <p>You cart is empty! Add a product to it!</p>
                ) : (
                    cartItems.map(item => (
                        <div key={item.id} className={classes.product}>
                            <img src={item.thumbnail} alt={item.title} />
                            <h3>{item.title}</h3> 
                            <div className={classes.productCalc}>
                                <p><b>Price:</b> ${item.price}</p>&ensp;
                                <p>
                                    <b>Quantity:</b>
                                    <button className={classes.qtyRmv} onClick={() => decreaseQuantity(item)}>-</button>
                                    {item.quantity}
                                    <button className={classes.qty} onClick={() => increaseQuantity(item)}>+</button>
                                </p>&ensp;
                                <p><b>Subtotal:</b> ${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                        </div>
                    ))
                )}
                <div className={classes.total}>
                    <h3>Total</h3>
                    <h4>
                        $ {cartItems.reduce(
                        (total, item) => total + (item.price * item.quantity),
                        0
                        ).toFixed(2)}
                    </h4> 
                </div>
                <div className={classes.cta}>
                    <button onClick={navigateToProducts} className={classes.back}>Back to products</button>
                    <button onClick={navigateToCheckout}>Proceed to checkout</button>
                </div>
            </div>
        </section>
    )
}

export default Cart;