import { useNavigate } from "react-router";
import PropTypes from "prop-types";

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

CartWidget.propTypes = {
    productsCount: PropTypes.number.isRequired,
}

export default CartWidget;