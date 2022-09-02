import {Routes, Route} from 'react-router-dom'
import Home from './components/routes/home/home.jsx'
import Navigation from './components/routes/navigation/navigation.jsx'
import Auth from './components/routes/authentication/authentication.jsx'

const Shop = ()=>{
  return(
    <div><h1>this is the shop</h1>
    </div>
  )
}
const App = () =>{

  return(
    <Routes>
    <Route path='/' element={<Navigation/>}>
    <Route index element={<Home />}></Route>
    <Route path='shop' element={<Shop/>}></Route>
    <Route path='auth' element={<Auth/>}></Route>
    </Route>
    
    </Routes>
    
  )

}

export default App;
