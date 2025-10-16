import { Link } from 'react-router'
import classes from './header.module.scss'
import logo from '../../assets/shopping-icon.svg'

export default function Header() {
    return (
        <>
            <div className={classes.header}>
                    <img src={logo} alt="shopping cart Application" className='classes.logo'/>
            </div>
        </>
    )
}