import './details.styles.scss'
import { useParams } from 'react-router-dom';
import Button from '../Button/Button';
import { useContext } from 'react';
import { CartContext } from '../context/cartContext';
import { productsContext } from '../context/productContext';
import { useEffect,useState } from 'react';
import { GetCollectionAndDoc } from '../../utils/firebase/firebase';
import ProductCardItem from '../product-card-item/product-card-item';
const Details = ()=>{
    const {category} = useParams()
    const {products} = useContext(productsContext);
    const {AddToCart} = useContext(CartContext);
     const [Products, setProducts] = useState(products[category])
     console.log(Products)
    useEffect(()=>{
        const getCategoryMap = async()=>{
            const categoryMap =  await GetCollectionAndDoc()
             setProducts(categoryMap[category])
    }
       getCategoryMap()
      
    },[products])

    return(
    <div className='details-container'>
        <span className='title'> {category.toUpperCase()}</span>
    <div className='details'>
    {  Products && Products.map((item)=>{
        return(
            
            <ProductCardItem item = {item} key = {item.id}/>
            
        )
       })} 
       </div>
       </div>
    )

}

export default Details;