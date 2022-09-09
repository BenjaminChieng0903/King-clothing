import {Routes, Route} from 'react-router-dom'
import Home from './components/routes/home/home.jsx'
import Navigation from './components/routes/navigation/navigation.jsx'
import Auth from './components/routes/authentication/authentication.jsx'
import Shop from './components/routes/shop/shop.jsx'
const App = () =>{

  return(
    <Routes>
    <Route path='/' element={<Navigation/>}>
    <Route path='/' element={<Home />}></Route>
    <Route path='shop' element={<Shop/>}></Route>
    <Route path='auth' element={<Auth/>}></Route>
    </Route>
 
    </Routes>
    
  )

}

export default App;
