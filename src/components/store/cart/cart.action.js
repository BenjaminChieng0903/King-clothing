import { CreateAction } from "../../../utils/firebase/createAction"
import { CART_ACTION_TYPE } from "./cart.type"


const AddProductToCart = (cartItems, productToAdd)=>{
    const existingItems = cartItems.find(
        (cartItem)=> cartItem.id == productToAdd.id)

        if(existingItems){
          return cartItems.map(
               (cartItem)=> cartItem.id == productToAdd.id ? {...cartItem, 'quantity':cartItem.quantity + 1} 
                : cartItem
                )
          
        }else{
            return [...cartItems, {...productToAdd, 'quantity': 1}]
        }
}

const RemoveProductToCart = (cartItems, productToRemove)=>{
    return( cartItems.map(
        (cartItem)=> {
            if(cartItem.id === productToRemove.id){
                if(cartItem.quantity !== 0){
        return {...cartItem, 'quantity':cartItem.quantity - 1}   
    }
  }
    else{
        return cartItem
       }
 } )
    )
}
const OrderCompleteRemoveAll = (cartItems)=>{
    return( cartItems.map(
        (cartItem)=> {
        return {...cartItem, 'quantity':0}   
    }
    )
    )
}
const RemoveCartItemsFromCheckout = (cartItems, CheckoutItem)=>{
    return cartItems.map(
        (cartItem)=> cartItem.id == CheckoutItem.id ? {...cartItem, 'quantity':0} 
         : cartItem
         )
}


const setQuantiyAndPrice = (NewcartItems)=>{
    const setTotalPrice = (NewcartItems.reduce((total, cartItem)=>{
        return total + cartItem.price*cartItem.quantity
    }, 0))

    const setQuantity = (NewcartItems.reduce((total, cartItem)=>{
        return total + cartItem.quantity
    }, 0)) 

   return {setQuantity, setTotalPrice}
}


//Actions

export const setAddToCart = (cartItems,productToAdd)=>{
    const addCartItems = (AddProductToCart(cartItems,productToAdd))
    const {setQuantity, setTotalPrice} = setQuantiyAndPrice(addCartItems)
    return CreateAction(CART_ACTION_TYPE.ADD_OR_DELETE_CART_ITEM, 
        { cartItems:addCartItems, quantity:setQuantity,totalPrice:setTotalPrice})
    
}

export const setRemoveToCart = (cartItems,productToRemove)=>{
    const removeCartItems = (RemoveProductToCart(cartItems, productToRemove))
    const {setQuantity, setTotalPrice} = setQuantiyAndPrice(removeCartItems)
    return CreateAction(CART_ACTION_TYPE.ADD_OR_DELETE_CART_ITEM, 
        { cartItems:removeCartItems, quantity:setQuantity,totalPrice:setTotalPrice})
}
export const setRemoveCheckoutItems = (cartItems,CheckoutItem)=>{
    const NewCartItems = RemoveCartItemsFromCheckout(cartItems, CheckoutItem)
    const {setQuantity, setTotalPrice} = setQuantiyAndPrice(NewCartItems)
    return CreateAction(CART_ACTION_TYPE.ADD_OR_DELETE_CART_ITEM, 
        { cartItems:NewCartItems, quantity:setQuantity,totalPrice:setTotalPrice})
}
export const setOrderComplete = (cartItems)=>{
    const NewCartItems = OrderCompleteRemoveAll(cartItems)
    const {setQuantity, setTotalPrice} = setQuantiyAndPrice(NewCartItems)
    return CreateAction(CART_ACTION_TYPE.ADD_OR_DELETE_CART_ITEM,
        { cartItems:NewCartItems, quantity:setQuantity,totalPrice:setTotalPrice})
}

export const setIsCartOpen = (bool)=>{
   return CreateAction(CART_ACTION_TYPE.SET_IS_CART_OPEN, bool)
}


