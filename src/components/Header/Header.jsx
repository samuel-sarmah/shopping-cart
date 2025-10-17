import { Link } from 'react-router'
import classes from './header.module.scss'
import logo from '../../assets/shopping-icon.svg'
import CartWidget from '../cartWidget/CartWidget'

export default function Header() {
    return (
        <>
            <div className={classes.header}>
                <div>
                    <Link to="/">
                        <img src={logo} alt="shopping cart Application" className={classes.logo}/>
                    </Link>
                </div>
                <div>
                    <CartWidget productsCount={0} />
                </div>
            </div>
            
        </>
    )
}