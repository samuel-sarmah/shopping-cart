import { useNavigate } from "react-router";

import shoppingCart from '../../assets/shopping-cart.svg'
import classes from './cart-widget.module.scss'

function CartWidget( { productsCount }) {
    const navigate = useNavigate()

    const navigateToCart = () => {
        navigate('/cart')
    }

    return (
        <button className={classes.container} onClick={navigateToCart}>
            <span className={classes.productsCount}>{productsCount}</span>
            <img src={shoppingCart} className={classes.shoppingCart} alt="Go to the cart" />
        </button>
    )
}

export default CartWidget;