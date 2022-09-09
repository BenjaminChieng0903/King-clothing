import { productsContext } from "../../context/productContext";
import { useContext } from "react";
import ProductCard from "../../product-card/product-card";
import './shop.styles.scss'

const Shop = ()=>{
    const {products} = useContext(productsContext);
    return(
      <div className="products-container">
        {products.map((product)=>{
            return <ProductCard key={product.id} product = {product}/>
        })}
      </div>  
        
    )

}

export default Shop;