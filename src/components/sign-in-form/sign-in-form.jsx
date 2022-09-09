import { async } from "@firebase/util";
import { useState } from "react";
import FormInput from '../form-input/form-input'
import './sign-in-form.scss'
import Button from "../button/Button";
import { SignInWithGooglePopup,CreaeteUserDocFromAuth,signinAuthUserWithEmailAndPassword} from "../../utils/firebase/firebase";
const DefaultField = {
    email:'',
    password:'',
}


const Signin = ()=>{
    const [FormField, setFormField] = useState(DefaultField);
    const {email, password} = FormField;
    const handleChange = (event)=>{
    const{name,value} = event.target;
    // console.log(name,value);
    setFormField({...FormField, [name]: value})
    // console.log(FormField)
}

const handlesubmit = async (event)=>{
    event.preventDefault();
    try {
        await signinAuthUserWithEmailAndPassword(email, password);
        setFormField(DefaultField);
    } catch (error) {
        console.log(error)
        if(error.code == 'auth/wrong-password'){
            alert('password is incorrect, please try again')
        }
        else if(error.code == 'auth/user-not-found'){
            alert('user not found, please sign up first')
        }
    }
}
    const SignInGoogle = async()=>{
    await SignInWithGooglePopup();

    }
    return(
        <div className="sign-in-container"><h1>Already have account?</h1>
        <h2>Sign in with your account!</h2>
        <form onSubmit={handlesubmit}>
        <FormInput label='Email' type='email' required onChange={handleChange} name='email' value={email}></FormInput>
        <FormInput label='Password' type='password' required onChange={handleChange} name='password' value={password}></FormInput>
        <div className="Button-container">       
            <Button type="submit" buttonType='inverted'>Sign in</Button>
            <Button  onClick={SignInGoogle} buttonType='google'>Sign in google</Button>
        </div>
 
        </form>
        </div>
    )
}


export default Signin;