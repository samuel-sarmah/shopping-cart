import Header from "./components/Header/Header";
import Products from "./components/Products/products";
import useLocalStorageState from "use-local-storage-state";

function App() {
    // Cart state persisted in localStorage
    const [cart, setCart] = useLocalStorageState('shopping-cart', { defaultValue: {}});

    const addToCart = (product) => {
        setCart((prevCart) => {
            // If product already exists, increase quantity
            if (prevCart[product.id]) {
                return {
                    ...prevCart,
                    [product.id] : {
                        ...prevCart[product.id],
                        quantity:prevCart[product.id].quantity + 1
                    }
                };
            }
            // If new product, increase quantity by 1
            return {
                ...prevCart,
                [product.id] : { ...product, quantity : 1}
            };
        });
    };

    const removeFromCart = (productId) => {
        setCart((prevCart) => {
            const newCart = { ...prevCart };
            delete newCart[productId]
            return newCart;
        });
    };

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromCart(productId);
            return;
        }
        setCart((prevCart) => ({
            ...prevCart,
            [productId]: {
                ...prevCart[productId],
                quantity: newQuantity
            }
        }));
    }

    // calculate total items in cart
    const cartItemsCount = Object.values(cart).reduce(
        (total, item) => total + item.quantity,
        0
    );

    return (
        <>
            <Header cartItemsCount={cartItemsCount} />
            <Products cart={cart}
                      addToCart={addToCart} />
        </>
    )
}

export default App;