import { createContext, useState} from "react"
import ShopData from '../../shop-data.json'


export const productsContext = createContext({
    products: [],
})

export const ProductsProvider = ({children})=>{
    const [products, setProducts] = useState(ShopData);
    const value = {products}
    return(
        <productsContext.Provider value={value}>{children}</productsContext.Provider>
    )
}