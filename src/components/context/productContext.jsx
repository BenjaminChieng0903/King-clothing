import { createContext, useEffect, useState} from "react"
import SHOP_DATA from '../../shop-data'
import { AddCollectionsAndDoc,GetCollectionAndDoc } from "../../utils/firebase/firebase"


export const productsContext = createContext({
    products: {},
    setProducts:()=>{}
})

export const ProductsProvider = ({children})=>{
    const [products, setProducts] = useState({});
    const value = {products, setProducts}
    // console.log("remount")
    useEffect(()=>{
        const getCategoryMap = async()=>{
            const categoryMap =  await GetCollectionAndDoc()
            // console.log(categoryMap)
            setProducts(categoryMap)
    }
       getCategoryMap()
    },[])
    return(
        <productsContext.Provider value={value}>{children}</productsContext.Provider>
    )
}