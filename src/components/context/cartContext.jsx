import { createContext, useState } from "react"

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: ()=>{},
    cartItems: [],
    AddToCart:()=>{},
    quantity: 0,
    totalPrice: 0,
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
export const CartProvider = ({children})=>{
    const [isCartOpen, setIsCartOpen] = useState(false)
    const[ cartItems , setCartItems] = useState([])
    const [ quantity, setQuantity] = useState(0)
    const [ totalPrice, setTotalPrice] = useState(0)
    const AddToCart = (productToAdd)=>{
        setCartItems(AddProductToCart(cartItems,productToAdd))
        setQuantity(quantity + 1)
        const {price} = productToAdd
        setTotalPrice(totalPrice + price)
    }
    const value = {isCartOpen, setIsCartOpen, AddToCart,cartItems,quantity,totalPrice}



    return(
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}