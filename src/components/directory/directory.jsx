import './directory-style.scss'
import CategoryItem from '../category/category-item'
const directory = ({categories})=>{
    return(
        <div className="directory-container">
           {categories.map((category)=>{
        return(       
        <CategoryItem key={category.id} category={category}/>
      )
      })
      }
        </div>
    )
}

export default directory;