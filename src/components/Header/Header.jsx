import { Link } from 'react-router'
import classes from './header.module.scss'
import logo from '../../assets/shopping-icon.svg'
import CartWidget from '../cartWidget/CartWidget'
import { useEffect, useState } from 'react'

export default function Header({ cartItemsCount }) {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const DISTANCE_FROM_TOP = 140;
            const scrollY = window.scrollY || document.documentElement.scrollTop;
            setIsScrolled(scrollY > DISTANCE_FROM_TOP);
        }
        window.addEventListener("scroll", handleScroll, false)

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    return (
        <>
            <div className={`${classes.header} ${isScrolled ? classes.shrink : ''}`}>
                <div>
                    <Link to="/">
                        <img src={logo} alt="shopping cart Application" className={classes.logo}/>
                    </Link>
                </div>
                <h1>
                    Eesto shoppers
                </h1>
                <div>
                    <div>
                        <CartWidget productsCount={cartItemsCount || 0} />
                    </div>
                </div>
            </div>
            
        </>
    )
}