import './cart-icon.styles.scss'
import{ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg'
import { CartContext } from '../context/cartContext'
import { useContext } from 'react'
const CartIcon = ()=>{
    const {isCartOpen, setIsCartOpen, quantity} = useContext(CartContext);
    const showCart = ()=>{
        setIsCartOpen(!isCartOpen)
    }
    return(
        <div className='cart-icon-container'>
            <ShoppingIcon onClick = {showCart} className='shopping-icon'/>
            <span className='item-count'>{quantity}</span>
        </div>
        

    )

}

export default CartIcon;