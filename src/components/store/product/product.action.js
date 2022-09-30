import { async } from "@firebase/util"
import { CreateAction } from "../../../utils/firebase/createAction"
import { PRODUCT_ACTION_TYPE } from "./product.type"
import { GetCollectionAndDoc } from "../../../utils/firebase/firebase"

// export const setProducts = (products)=>{
//    return CreateAction(PRODUCT_ACTION_TYPE.SET_PRODUCTS, products)
// }

export const FetchProductsStart = ()=>{
    return CreateAction(PRODUCT_ACTION_TYPE.FETCH_PRODUCTS_START)

}
export const FetchProductsSuccess = (products)=>{
    return CreateAction(PRODUCT_ACTION_TYPE.FETCH_PRODUCTS_SUCCESS, products)
}
export const FetchProductsFailed = (error)=>{
    return CreateAction(PRODUCT_ACTION_TYPE.FETCH_PRODUCTS_FAILED, error)
}

export const FetchProductsAsync = () => async (dispatch)=>{
    dispatch(FetchProductsStart())
    try {
        const products = await GetCollectionAndDoc('categories')
        dispatch(FetchProductsSuccess(products))
    } catch (error) {
        dispatch(FetchProductsFailed(error))
    }

}