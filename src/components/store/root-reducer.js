import { combineReducers } from "redux";
import { userReducer } from "./user/user.reducer";
import { productReducer } from "./product/product.reducer";
import { cartReducer } from "./cart/cart.reducer";
import { orderReducer } from "./order/order.reducer";
export const rootReducer = combineReducers({
    user: userReducer,
    products: productReducer,
    cart: cartReducer,
    order: orderReducer
})