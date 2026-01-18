import { Link } from 'react-router'
import PropTypes from 'prop-types'
import classes from './header.module.scss'
import logo from '../../assets/shopping-icon.svg'
import CartWidget from '../cartWidget/CartWidget'
import { useEffect, useState } from 'react'

Header.propTypes = {
    cartItemsCount: PropTypes.number.isRequired,
}

export default function Header({ cartItemsCount }) {
    const [isScrolled, setIsScrolled] = useState(false);

        useEffect(() => {
        const handleScroll = () => {
            const DISTANCE_FROM_TOP = 50;
            const scrollY = window.scrollY || document.documentElement.scrollTop;
            setIsScrolled(scrollY > DISTANCE_FROM_TOP);
        }
        window.addEventListener("scroll", handleScroll, { passive: true })

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    return (
        <>
            <div className={`${classes.header} ${isScrolled ? classes.shrink : ''}`}>
                <div>
                    <Link to="/" aria-label="Go to home page">
                        <img src={logo} alt="eesto Shoppers logo" className={classes.logo}/>
                    </Link>
                </div>
                <h1>
                    eesto Shoppers
                </h1>
                <div className={classes.cartSection}>
                    <div>
                        <CartWidget productsCount={cartItemsCount || 0} />
                    </div>
                </div>
            </div>
            
        </>
    )
}