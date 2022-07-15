import { toBeInTheDocument } from "@testing-library/jest-dom/dist/matchers";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    cartTotal:0,
});

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(
        (item) => item.id === productToAdd.id
    );

    if (existingCartItem) {
        return cartItems.map((item) => 
            item.id === productToAdd.id
            ? {...item, qty : item.qty + 1}
            : item
        );
    }

    return [...cartItems, {...productToAdd, qty:1}];

}

const removeCartItem = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find(
        (item) => item.id === cartItemToRemove.id
    );

    if(existingCartItem.qty === 1) {
        return cartItems.filter(ci => ci.id !== cartItemToRemove.id);
    }

    return cartItems.map((item) => 
            item.id === cartItemToRemove.id
            ? {...item, qty : item.qty - 1}
            : item
        );
}


const clearCartItem = (cartItems, cartItemToRemove) => cartItems.filter(ci => ci.id !== cartItemToRemove.id);

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(()=>{
        const newCartCount = cartItems.reduce((total, item) => total + item.qty,0)
        setCartCount(newCartCount)
    },[cartItems])

    useEffect(()=>{
        const newCartTotal = cartItems.reduce((total, item) => (total + item.qty) * item.price,0)
        setCartTotal(newCartTotal)
    },[cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd))
    }


    const removeItemFromCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove))
    }

    const clearItemFromCart = (cartItemToClear) => {
        setCartItems(clearCartItem(cartItems, cartItemToClear))
    }

    const value = {isCartOpen, setIsCartOpen, addItemToCart, removeItemFromCart,clearItemFromCart, cartItems, cartCount, cartTotal};
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}