import classes from './loader.module.scss'

export default function Loader({ message = "Loading..." }) {
    return (
        <div className={classes.loader}>
            <div className={classes.spinner}></div>
            {message && <p className={classes.message}>{message}</p>}
        </div>
    )
}