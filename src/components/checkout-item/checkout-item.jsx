import './checkout-item.styles.scss'
import { useContext } from 'react'
import { CartContext } from '../context/cartContext'
const CheckoutItems = ({cartItem})=>{
    const {name, imageUrl, quantity, price} = cartItem
    const {RemoveCheckoutItems,AddToCart,RemoveToCart} = useContext(CartContext)

    const RemoveItems = ()=>{
        RemoveCheckoutItems(cartItem)
    }
    return(
        <div className='checkout-item-container'>
            <div className='image-container'>
            <img src={imageUrl}/>
            </div>
            <span className='name'>{name}</span>
           <span className='quantity'> 
           <div className='arrow' onClick={()=>{
            RemoveToCart(cartItem)
        }}>&#10094;</div>
            {quantity}
            <div className='arrow' onClick={()=>{
            AddToCart(cartItem)
        }}>&#10095;</div></span>
            <span className='price'>{price}</span>
            <div className='remove-button' onClick={RemoveItems}>&#10005;</div>
        </div>

    )
}

export default CheckoutItems;