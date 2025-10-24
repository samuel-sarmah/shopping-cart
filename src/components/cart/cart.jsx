import { useNavigate } from "react-router"

const Cart = () => {
    const navigate = useNavigate()

    const navigateToProducts = () => {
        navigate('/shop')
    }

    return (
        <>
            <h1>This is where the cart will be displayed</h1>
            <button onClick={navigateToProducts}>Back to products</button>
        </>
    )
}

export default Cart;