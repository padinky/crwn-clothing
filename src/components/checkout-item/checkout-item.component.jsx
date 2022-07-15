import './checkout-item.styles.scss';
import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';

const CheckoutItem = ({cartItem}) => {
    const {price,name,qty,imageUrl} = cartItem;
    const { clearItemFromCart, removeItemFromCart, addItemToCart } = useContext(CartContext);
    const clearItemHandler = () => clearItemFromCart(cartItem);
    const increaseHandler = () => addItemToCart(cartItem);
    const decreaseHandler = () => removeItemFromCart(cartItem);
    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`} />
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div className='arrow' onClick={decreaseHandler}>&#10094;</div>
                <span className='value'>
                    {qty}
                </span>
                <div className='arrow' onClick={increaseHandler}>&#10095;</div>
            </span>
            <span className='price'>{price}</span>
            <span className='remove-button' onClick={clearItemHandler}>&#10005;</span>
        </div>
    )
}

export default CheckoutItem;