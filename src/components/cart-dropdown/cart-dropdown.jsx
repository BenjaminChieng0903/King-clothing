import './cart-dropdown.styles.scss'
import Button from '../Button/Button';
import { useContext } from 'react';
import { CartContext } from '../context/cartContext';
import CartItem from '../cart-item/cart-item';
import { useNavigate } from 'react-router-dom';
const CartDropDown = ()=>{
    const {cartItems,totalPrice,quantity}= useContext(CartContext)
    const navigate = useNavigate()
    const navigateToCheckout = ()=>{
        navigate('/checkout')
    }

    return(
        <div className='cart-dropdown-container'>
            <div className='cart-items' >
                 {
                     cartItems.map((cartItem)=>{
                    return(
                      cartItem.quantity!==0&&  <CartItem key={cartItem.id} cartItem = {cartItem}/>
                    )
                    })
                }
            {
              quantity!==0 &&  <span className='totalPrice'> Total Price: ${totalPrice}</span>}
            </div>
            <Button onClick = {navigateToCheckout}>GO TO CHECKOUT</Button>
        </div>
    )
}

export default CartDropDown;