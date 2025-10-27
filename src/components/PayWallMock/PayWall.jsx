import { useNavigate } from "react-router"
import classes from "./paywallmock.module.scss"

export default function PayWall() {
    const navigate = useNavigate()

    return (
        <div className={classes.paywall}>
            <div className={classes.container}>
                <div className={classes.icon}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                </div>
                
                <h1>Thank You for Shopping with Us!</h1>
                
                <p className={classes.message}>
                    We appreciate your time exploring our demo shopping cart application. 
                    However, we cannot proceed with actual payment processing.
                </p>

                <div className={classes.infoBox}>
                    <h2>This is a Demo Application</h2>
                    <p>
                        This shopping cart is a portfolio project created for demonstration purposes only. 
                        We are not a genuine e-commerce store and do not process real transactions.
                    </p>
                </div>

                <p className={classes.thanks}>
                    Thank you for testing our service! We hope you enjoyed the experience. 
                    Feel free to continue browsing our product catalog.
                </p>

                <div className={classes.buttons}>
                    <button onClick={() => navigate('/shop')} className={classes.primary}>
                        Continue Shopping
                    </button>
                    <button onClick={() => navigate('/')} className={classes.secondary}>
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    )
}