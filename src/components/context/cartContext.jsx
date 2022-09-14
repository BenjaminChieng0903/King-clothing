import { createContext, useEffect, useState } from "react"

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

export const CartProvider = ({children})=>{
    const [isCartOpen, setIsCartOpen] = useState(false)
    const[ cartItems , setCartItems] = useState([])
    const [ quantity, setQuantity] = useState(0)
    const [ totalPrice, setTotalPrice] = useState(0)
    const AddToCart = (productToAdd)=>{
        setCartItems(AddProductToCart(cartItems,productToAdd))
    }

    const RemoveToCart = (productToRemove)=>{
        setCartItems(RemoveProductToCart(cartItems, productToRemove))
        }

        useEffect(()=>{
           setTotalPrice(cartItems.reduce((total, cartItem)=>{
                return total + cartItem.price*cartItem.quantity
            }, 0)) 
        },[cartItems])
        
        useEffect(()=>{
            setQuantity(cartItems.reduce((total, cartItem)=>{
                 return total + cartItem.quantity
             }, 0)) 
         },[cartItems])

        const RemoveCheckoutItems = (CheckoutItem)=>{
            setCartItems(()=>{
                return cartItems.map(
                    (cartItem)=> cartItem.id == CheckoutItem.id ? {...cartItem, 'quantity':0} 
                     : cartItem
                     )
            })
        }
    const value = {isCartOpen, setIsCartOpen, AddToCart,RemoveToCart,cartItems,quantity, totalPrice,RemoveCheckoutItems}



    return(
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}