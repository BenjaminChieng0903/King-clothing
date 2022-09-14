import { useContext } from "react";
import { CartContext } from "../context/cartContext";
import './product-card-item.styles.scss'
import Button from "../Button/Button";

const ProductCardItem = ({item})=>{
    const {name, price, imageUrl } = item
    const {AddToCart} = useContext(CartContext);
    const AddProductToCart =()=> AddToCart(item)
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