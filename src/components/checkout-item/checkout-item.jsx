import './checkout-item.styles.scss'
import { useContext } from 'react'
import { CartContext } from '../context/cartContext'
import { useDispatch } from 'react-redux'
import { setRemoveCheckoutItems, setAddToCart, setRemoveToCart } from '../store/cart/cart.action'
import { useSelector } from 'react-redux'
import { selectorCartItems } from '../store/cart/cart.selector'
const CheckoutItems = ({cartItem})=>{
    const {name, imageUrl, quantity, price} = cartItem
    // const {RemoveCheckoutItems,AddToCart,RemoveToCart} = useContext(CartContext)
    const dispatch = useDispatch()
    const cartItems = useSelector(selectorCartItems)
    const RemoveItems = ()=>{
        dispatch(setRemoveCheckoutItems(cartItems,cartItem))
    }
    return(
        <div className='checkout-item-container'>
            <div className='image-container'>
            <img src={imageUrl}/>
            </div>
            <span className='name'>{name}</span>
           <span className='quantity'> 
           <div className='arrow' onClick={()=>{
            dispatch(setRemoveToCart(cartItems ,cartItem))
        }}>&#10094;</div>
            {quantity}
            <div className='arrow' onClick={()=>{
            dispatch(setAddToCart( cartItems,cartItem)) 
        }}>&#10095;</div></span>
            <span className='price'>{price}</span>
            <div className='remove-button' onClick={RemoveItems}>&#10005;</div>
        </div>

    )
}

export default CheckoutItems;