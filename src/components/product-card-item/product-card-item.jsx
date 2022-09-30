import { useContext } from "react";
import { CartContext } from "../context/cartContext";
import './product-card-item.styles.scss'
import Button from "../Button/Button";
import { setAddToCart } from "../store/cart/cart.action";
import { useSelector } from "react-redux";
import { selectorCartItems } from "../store/cart/cart.selector";
import { useDispatch } from "react-redux";
const ProductCardItem = ({item})=>{
    const cartItems = useSelector(selectorCartItems)
    const dispatch  = useDispatch()
    const {name, price, imageUrl } = item
    // const {AddToCart} = useContext(CartContext);
    const AddProductToCart =()=> dispatch(setAddToCart(cartItems,item))
    return(
        // <div className="product-card-item-container">
        <div className="product-card-item-container">
        <img src={imageUrl}/>
        <div className='footer'>
            <span className='name'>{name}</span>
            <span className='price'>${price}</span>       
        </div>
        <Button onClick = {AddProductToCart}>Add To Cart</Button>
</div>
   )
}

export default ProductCardItem;