import { Route, Routes, useNavigate } from "react-router-dom";
import ProductPreview from "../../product-preview/product-preview";
import Details from "../../details/details";

const Shop = ()=>{
  return(<Routes>
    <Route index element = {<ProductPreview/>}></Route>
    <Route path=":category" element = {<Details/>}></Route>
  </Routes>
  )
  
}

export default Shop;