import ProductCardItem from '../product-card-item/product-card-item'
const Preview = ({items})=>{
    return(
        items.filter((_, id)=> id < 4).map((item)=>{
            return(
               <ProductCardItem item = {item} key={item.id}/>
            )
            
        })
    )

}
export default Preview;