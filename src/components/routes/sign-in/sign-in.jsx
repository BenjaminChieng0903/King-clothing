import { Fragment } from 'react';
import {SignInWithPopup,CreaeteUserDocFromAuth} from'../../../utils/firebase/firebase.js'



const Sign = ()=>{
const SignWithGoogle = async()=>{
    const response = await SignInWithPopup();
    console.log(response);
    const {user} = response;
    CreaeteUserDocFromAuth(user);
}
return(
    <Fragment>
    <h1>Sign in page</h1>
    <button onClick={SignWithGoogle}>sign in</button>
    </Fragment>
)
}


export default Sign;