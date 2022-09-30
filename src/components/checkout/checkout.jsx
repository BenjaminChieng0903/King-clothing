import './checkout.styles.scss'
import { Fragment, useContext, useEffect } from 'react';
import { CartContext } from '../context/cartContext';
import CheckoutItems from '../checkout-item/checkout-item';
import { selectorCartItems, selectorTotalPrice } from '../store/cart/cart.selector';
import { useSelector } from 'react-redux';
import PaymentForm from '../payment/payment-form';
import OrderConfirm from '../order_confirm/order_confirm';
import { selectorOrder } from '../store/order/order.selector';

const Checkout = ()=>{

    // const {cartItems, AddToCart,RemoveToCart,totalPrice} = useContext(CartContext)
     const cartItems = useSelector(selectorCartItems)
     const totalPrice = useSelector(selectorTotalPrice)
     const isOrderComplete = useSelector(selectorOrder)
  return( <Fragment>
    { isOrderComplete? <OrderConfirm/>:
        <div className='checkout-container'>
    
        <div className='checkout-header'>     
        <div className='header-block'>
            <span>Product</span>
        </div>
        <div className='header-block'>
            <span>Description</span>
        </div>
        <div className='header-block'>
            <span>Quantity</span>
        </div>
        <div className='header-block'>
            <span>Price</span>
        </div>
        <div className='header-block'>
            <span>Remove</span>
        </div>
        </div>
            { cartItems.map((cartItem) => {
            return(
               cartItem.quantity !== 0 && 
               <CheckoutItems key={cartItem.id} cartItem ={cartItem}/>
                )         
            }) }
        <span className='total'>Total: ${totalPrice}</span>
        <PaymentForm/>
       </div> 
}   
        </Fragment>
  )
}

export default Checkout;