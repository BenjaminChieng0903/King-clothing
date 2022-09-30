import { CreateAction } from "../../../utils/firebase/createAction"
import { ORDER_ACTION_TYPE } from "./order.type"

export const setIsOrderComplete = (bool)=>{
   return CreateAction(ORDER_ACTION_TYPE.SET_IS_ORDER_COMPLETE, bool)
}