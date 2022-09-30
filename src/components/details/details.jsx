import './details.styles.scss'
import { useParams } from 'react-router-dom';
import { Fragment, useContext } from 'react';
import { productsContext } from '../context/productContext';
import { useEffect,useState } from 'react';
import { GetCollectionAndDoc } from '../../utils/firebase/firebase';
import ProductCardItem from '../product-card-item/product-card-item';
import { useSelector } from 'react-redux';
import { selectorProducts,selectorIsLoading } from '../store/product/product.selector';
import Spinner from '../spinner/spinner';
const Details = ()=>{
    const {category} = useParams()
    // const {products} = useContext(productsContext);
    // console.log(products)
    const products = useSelector(selectorProducts)
    const isLoading = useSelector(selectorIsLoading)
    console.log('details get fired')
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
    <Fragment>
     {  isLoading? <Spinner/> :
    <div className='details-container'>
        <span className='title'> {category.toUpperCase()}</span>
    <div className='details'>
     {products && products[category].map((item)=>{
            return(
            <ProductCardItem item = {item} key = {item.id}/>
            )
       })
       }
       </div>
       </div>
       } 
       </Fragment>
    )

}

export default Details;