import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { UserProvider } from'./components/context/userContext'
import { ProductsProvider } from './components/context/productContext.jsx';
import { CartProvider } from './components/context/cartContext.jsx';
import { Provider } from 'react-redux';
import { store,persistor } from './components/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from './utils/stripe/stripe';

import './index.scss';

const rootElement = document.getElementById('root');

render(
  <React.StrictMode>
    
    <BrowserRouter>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
          <Elements stripe={stripePromise}>
      {/* <UserProvider> */}
        {/* <ProductsProvider> */}
          {/* <CartProvider> */}
            <App />
            </Elements>
            </PersistGate>
          {/* </CartProvider> */}
        {/* </ProductsProvider> */}
         </Provider>
      {/* </UserProvider> */}
    </BrowserRouter>
   
  </React.StrictMode>,
  rootElement
);
