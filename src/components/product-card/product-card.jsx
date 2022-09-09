import './product-card.styles.scss'
import Button from '../button/Button'
import { useContext } from 'react'
import { CartContext } from '../context/cartContext'
const ProductCard = ({product})=>{
    const {name, price, imageUrl } = product
    const {AddToCart} = useContext(CartContext);
    const AddProductToCart =()=> AddToCart(product)
    return(
    <div className='product-card-container'>
        <img src={imageUrl}/>
        <div className='footer'>
            <span className='name'>{name}</span>
            <span className='price'>{price}</span>       
        </div>
        <Button onClick = {AddProductToCart}>Add To Cart</Button>
    </div>
    )

}
export default ProductCard;