import { useCallback } from 'react';
import useLocalStorageState from 'use-local-storage-state';

export function useCart() {
    const [cartProducts, setCartProducts] = useLocalStorageState('shopping-cart', { defaultValue: {}});

    const isInCart = useCallback((productId) => {
        return cartProducts && cartProducts[productId];
    }, [cartProducts]);

    const addToCart = useCallback((product) => {
        setCartProducts((prevCart) => {
            // If product already exists, increase quantity
            if (prevCart[product.id]) {
                return {
                    ...prevCart,
                    [product.id]: {
                        ...prevCart[product.id],
                        quantity: prevCart[product.id].quantity + 1
                    }
                };
            }
            // Add new product with quantity 1
            return {
                ...prevCart,
                [product.id]: { ...product, quantity: 1 }
            };
        });
    }, [setCartProducts]);

    const removeFromCart = useCallback((productId) => {
        setCartProducts((prevCart) => {
            const newCart = { ...prevCart };
            delete newCart[productId];
            return newCart;
        });
    }, [setCartProducts]);

    const updateQuantity = useCallback((productId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        
        setCartProducts((prevCart) => ({
            ...prevCart,
            [productId]: {
                ...prevCart[productId],
                quantity: quantity
            }
        }));
    }, [setCartProducts, removeFromCart]);

    const clearCart = useCallback(() => {
        setCartProducts({});
    }, [setCartProducts]);

    const cartItems = Object.values(cartProducts || {});
    const cartItemsCount = cartItems.reduce((total, item) => total + (item.quantity || 0), 0);
    const cartTotal = cartItems.reduce((total, item) => total + (item.price * (item.quantity || 0)), 0);

    return {
        cartProducts,
        cartItems,
        cartItemsCount,
        cartTotal,
        isInCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart
    };
}