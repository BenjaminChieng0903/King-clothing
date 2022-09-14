import { productsContext } from "../context/productContext";
import { Fragment, useContext } from "react";
import Preview from "../preview/preview";
import { useNavigate } from "react-router-dom";
import './product-preview.styles.scss'

const ProductPreview = ()=>{
    const {products} = useContext(productsContext);
    const navigate = useNavigate()
    return(
     Object.keys(products).map((title)=>{
           return(
            <div className="preview-container">
            <span className="title" onClick={()=>navigate('/shop/'+ title)}>{title.toUpperCase()}</span>
             <div className="preview">
            <Preview items = {products[title]} key={title}/>
            </div>
            </div>
            ) }  )
      
    )
}

export default ProductPreview;