import { ORDER_ACTION_TYPE } from "./order.type"
const ORDER_INITIAL_STATE = {
    isOrderComplete:false
}

export const orderReducer = (state = ORDER_INITIAL_STATE, action)=>{
    const {type, payload} = action

    switch(type){
        case ORDER_ACTION_TYPE.SET_IS_ORDER_COMPLETE:
            return{...state, isOrderComplete:payload}


        default: return state
    }

}