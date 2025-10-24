import { Link } from "react-router"
import classes from "./not-found.module.scss"

const NotFound = () => {
    return (
        <div className={classes.container}>
            <h1>Something went wrong!!</h1>
            <p>Let's get you back to the shop please, click the button below!</p>
            <Link to="shop">
                <button className={classes.button}>Back</button>
            </Link>
        </div>
    )
}

export default NotFound;