import './cart-dropdown.styles.scss'
import Button from '../Button/Button';
import { useContext } from 'react';
import { CartContext } from '../context/cartContext';
import CartItem from '../cart-item/cart-item';
const CartDropDown = ()=>{
    const {cartItems,totalPrice,quantity}= useContext(CartContext)
    return(
        <div className='cart-dropdown-container'>
            <div className='cart-items' >
                 {
                     cartItems.map((cartItem)=>{
                    return(
                    <CartItem key={cartItem.id} cartItem = {cartItem}/>
                    )
                    })
                }
            {
              quantity!=0 &&  <span className='totalPrice'> Total Price: ${totalPrice}</span>}
            </div>
            <Button>GO TO CHECKOUT</Button>
        </div>
    )
}

export default CartDropDown;