import { productsContext } from "../context/productContext";
import { Fragment, useContext } from "react";
import Preview from "../preview/preview";
import { useNavigate } from "react-router-dom";
import './product-preview.styles.scss'
import { useSelector } from "react-redux";
import { selectorProducts,selectorIsLoading } from "../store/product/product.selector";
import Spinner from '../spinner/spinner'
const ProductPreview = ()=>{
    // const {products} = useContext(productsContext);
    const products = useSelector(selectorProducts)
    const isLoading = useSelector(selectorIsLoading)
    // console.log(isLoading)
    // console.log(products)
    // console.log('products preview get fired')
    const navigate = useNavigate()
    return(
     <Fragment>      
    { isLoading? <Spinner/>:
        Object.keys(products).map((title)=>{
            return(
            <div className="preview-container">
            <span className="title" onClick={()=>navigate('/shop/'+ title)}>{title.toUpperCase()}</span>
             <div className="preview">
            <Preview items = {products[title]} key={title}/>
            </div>
            </div>
            )
           }  )  
    }
    </Fragment>
    ) 
}

export default ProductPreview;