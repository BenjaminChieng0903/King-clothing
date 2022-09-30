import { Route, Routes, useNavigate } from "react-router-dom";
import ProductPreview from "../../product-preview/product-preview";
import Details from "../../details/details";
import { useEffect } from "react";
import { GetCollectionAndDoc } from "../../../utils/firebase/firebase";
import { setProducts } from "../../store/product/product.action";
import { useDispatch } from "react-redux";
import { FetchProductsAsync } from "../../store/product/product.action";

const Shop = ()=>{
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(FetchProductsAsync())
},[])

  return(<Routes>
    <Route index element = {<ProductPreview/>}></Route>
    <Route path=":category" element = {<Details/>}></Route>
  </Routes>
  )
  
}

export default Shop;