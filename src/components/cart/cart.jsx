import { useNavigate } from "react-router"
import useLocalStorageState from "use-local-storage-state"
import classes from "./cart.module.scss"

const Cart = () => {
    const [cartProducts] = useLocalStorageState('shopping-cart', {
        defaultValue: {}
    })
    const cartItems = Object.values(cartProducts);

    const navigate = useNavigate()
    const navigateToProducts = () => {
        navigate('/shop')
    }

    return (
        <section className={classes.cart}>
            <h1>Shopping Cart</h1>
            <div className={classes.container}>
                {cartItems.length === 0 ? (
                    <p>You cart is empty! Add a product to it!</p>
                ) : (
                    cartItems.map(item => (
                        <div key={item.id} className={classes.product}>
                            <img src={item.thumbnail} alt={item.title} />
                            <h3>{item.title}</h3> 
                            <p>Price: ${item.price}</p>&ensp;
                            <p>Quantity: <button className={classes.qtyRmv}>-</button>{item.quantity}<button className={classes.qty}>+</button></p>&ensp;
                            <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
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
                    <button >Proceed to checkout</button>
                </div>
            </div>
        </section>
    )
}

export default Cart;