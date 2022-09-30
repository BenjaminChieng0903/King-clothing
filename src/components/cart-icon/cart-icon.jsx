import './cart-icon.styles.scss'
import{ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg'
import { CartContext } from '../context/cartContext'
import { useContext } from 'react'
import { setIsCartOpen } from '../store/cart/cart.action'
import { useDispatch } from 'react-redux'
import { selectorCartIsCartOpen,selectorQuantity } from '../store/cart/cart.selector'
import { useSelector } from 'react-redux'
import { selectorOrder } from '../store/order/order.selector'
const CartIcon = ()=>{
    // const {isCartOpen, setIsCartOpen, quantity} = useContext(CartContext);
    const dispatch = useDispatch()
    const isCartOpen = useSelector(selectorCartIsCartOpen)
    const quantity = useSelector(selectorQuantity)
    const isOrderComplete = useSelector(selectorOrder)
    const showCart = ()=>{
        // setIsCartOpen(!isCartOpen)
        dispatch(setIsCartOpen(!isCartOpen))
    }
    return(
        <div className='cart-icon-container'>
            <ShoppingIcon onClick = {showCart} className='shopping-icon'/>
            <span className='item-count'>{quantity}</span>
        </div>
        

    )

}

export default CartIcon;