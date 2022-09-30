import { CART_ACTION_TYPE } from "./cart.type"
const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    quantity: 0,
    totalPrice: 0
}

export const cartReducer = (state = INITIAL_STATE, action)=>{
    const {type, payload} = action
    // console.log(state)
    // console.log(payload)
    switch(type){
        case CART_ACTION_TYPE.ADD_OR_DELETE_CART_ITEM:
            return {
                ...state,
                ...payload
            }
        case CART_ACTION_TYPE.SET_IS_CART_OPEN:
            return{
                ...state,
                isCartOpen:payload
            }

        default: return state


    }
}