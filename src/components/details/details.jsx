import './details.styles.scss'
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { productsContext } from '../context/productContext';
import { useEffect,useState } from 'react';
import { GetCollectionAndDoc } from '../../utils/firebase/firebase';
import ProductCardItem from '../product-card-item/product-card-item';
const Details = ()=>{
    const {category} = useParams()
    const {products} = useContext(productsContext);
    console.log(products)
    //  const [Products, setProducts] = useState(products[category])
    //  console.log(Products)
    // useEffect(()=>{
    //     const getCategoryMap = async()=>{
    //         const categoryMap =  await GetCollectionAndDoc()
    //          setProducts(categoryMap[category])
    // }
    //    getCategoryMap()
      
    // },[products])    //if we try to refresh manually this page, 
                        //every component will remount again. 
                        //Once we import products from productContext,
                        //  it will show {} what we set at first.
                        //Because the way to get products' value is async.
                        //Which means that products' value do not be set the 
                        // moment we try to use it. So we use useEffect to deal
                        // with it. Let useEffect keep inspecting products' value change.


    return(
    <div className='details-container'>
        <span className='title'> {category.toUpperCase()}</span>
    <div className='details'>
    {  products && products[category].map((item)=>{
        return(
            
            <ProductCardItem item = {item} key = {item.id}/>
            
        )
       })} 
       </div>
       </div>
    )

}

export default Details;