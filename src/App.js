import { Routes, Route } from 'react-router-dom';

import Home from './components/routes/home/home.jsx';
import Navigation from './components/routes/navigation/navigation';
import Authentication from './components/routes/authentication/authentication';
import Shop from './components/routes/shop/shop.jsx';
import Checkout from './components/checkout/checkout.jsx';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { UserChangeListener, CreaeteUserDocFromAuth} from './utils/firebase/firebase.js';
import { setCurrentUser } from './components/store/user/user.action.js';
const App = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
    const unsubscribe =  UserChangeListener((user)=>{
        if(user){
            CreaeteUserDocFromAuth(user)
        }
       dispatch(setCurrentUser(user)) 
})
    return unsubscribe;
},[])


  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='shop/*' element={<Shop />}/>
        <Route path='auth' element={<Authentication />} />
        <Route path='checkout' element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;
