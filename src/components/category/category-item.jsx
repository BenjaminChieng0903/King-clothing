import './category-item.scss'
import { useNavigate } from 'react-router-dom'
const CategoryItem = ({category})=>{
    const {title, imageUrl, route}=category
    const navigate = useNavigate()
    const Navgation = ()=>{navigate(`${route}`)}

    return(
        <div className="category-container" >
      <div className='background-image' style={{
        backgroundImage:`url(${imageUrl})` 
      } } onClick={Navgation}/>
      <div className="category-body-container">
    <h2 onClick={Navgation}>{title}</h2>
    <p onClick={Navgation}>SHOP NOW</p>
    </div>
    </div>
    )
}

export default CategoryItem;