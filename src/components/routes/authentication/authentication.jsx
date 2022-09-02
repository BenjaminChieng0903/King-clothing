import { Fragment } from 'react';
import {SignInWithPopup,CreaeteUserDocFromAuth} from'../../../utils/firebase/firebase.js'
import Signup from '../../sign-up-form/sign-up-form';
import Signin from '../../sign-in-form/sign-in-form';
import './authentication.scss'

const Auth = ()=>{

return(
    <Fragment>
    <div className='autentication-container'> <Signin/>
    <Signup/></div>
   
    </Fragment>
)
}


export default Auth;