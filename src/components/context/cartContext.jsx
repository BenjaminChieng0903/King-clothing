import { createContext, useEffect, useState } from "react"
import { useReducer } from "react"
import { CreateAction } from "../../utils/firebase/createAction"
export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: ()=>{},
    cartItems: [],
    AddToCart:()=>{},
    quantity: 0,
    totalPrice: 0,
    RemoveToCart:()=>{},
    setTotalPrice:()=>{}
})
export const AddProductToCart = (cartItems, productToAdd)=>{
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

export const RemoveProductToCart = (cartItems, productToRemove)=>{
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

const RemoveCartItemsFromCheckout = (cartItems, CheckoutItem)=>{
    return cartItems.map(
        (cartItem)=> cartItem.id == CheckoutItem.id ? {...cartItem, 'quantity':0} 
         : cartItem
         )
}

export const ACTION_TYPE = {
    ADD_OR_DELETE_CART_ITEM: 'ADD_OR_DELETE_CART_ITEM',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
    REMOVE_CHECKOUT_ITEMS:'REMOVE_CHECKOUT_ITEMS'
 

}
const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    quantity: 0,
    totalPrice: 0
}

const cartReducer = (state, action)=>{
    const {type, payload} = action
    // console.log(action)
    switch(type){
        case ACTION_TYPE.ADD_OR_DELETE_CART_ITEM:
            return {
                ...state,
                ...payload
            }
        case ACTION_TYPE.SET_IS_CART_OPEN:
            return{
                ...state,
                isCartOpen:payload
            }

        default: return state


    }
}




export const CartProvider = ({children})=>{
    // const [isCartOpen, setIsCartOpen] = useState(false)
    // const[ cartItems , setCartItems] = useState([])
    // const [ quantity, setQuantity] = useState(0)
    // const [ totalPrice, setTotalPrice] = useState(0)
    const [state, dispatch] 
                        = useReducer(cartReducer,INITIAL_STATE )
    // console.log(state)
    const {isCartOpen, cartItems, quantity, totalPrice} = state
    const AddOrRemoveCartItemsReducer = (NewcartItems)=>{
        const setTotalPrice = (NewcartItems.reduce((total, cartItem)=>{
            return total + cartItem.price*cartItem.quantity
        }, 0))
    
        const setQuantity = (NewcartItems.reduce((total, cartItem)=>{
            return total + cartItem.quantity
        }, 0)) 
    
        dispatch(CreateAction(ACTION_TYPE.ADD_OR_DELETE_CART_ITEM, 
            {isCartOpen:isCartOpen, cartItems:NewcartItems, quantity:setQuantity,totalPrice:setTotalPrice}))
    }

    const AddToCart = (productToAdd)=>{
        const addCartItems = (AddProductToCart(cartItems,productToAdd))
        AddOrRemoveCartItemsReducer(addCartItems)
    }

    const RemoveToCart = (productToRemove)=>{
        const removeCartItems = (RemoveProductToCart(cartItems, productToRemove))
        AddOrRemoveCartItemsReducer(removeCartItems)
        }

        // useEffect(()=>{
        //   const setTotalPrice = (cartItems.reduce((total, cartItem)=>{
        //         return total + cartItem.price*cartItem.quantity
        //     }, 0)) 
        // },[cartItems])
        
        // useEffect(()=>{
        //    const setQuantity = (cartItems.reduce((total, cartItem)=>{
        //          return total + cartItem.quantity
        //      }, 0)) 
        //  },[cartItems])
        const RemoveCheckoutItems = (CheckoutItem)=>{

            const NewCartItems = RemoveCartItemsFromCheckout(cartItems, CheckoutItem)
            AddOrRemoveCartItemsReducer(NewCartItems)
}
            
   

        const setIsCartOpen = (bool)=>{
            dispatch(CreateAction(ACTION_TYPE.SET_IS_CART_OPEN, bool))
        }

    const value = {isCartOpen, setIsCartOpen ,AddToCart,
        RemoveToCart,cartItems,quantity, totalPrice,RemoveCheckoutItems}



    return(
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}