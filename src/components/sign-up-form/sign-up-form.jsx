import { useState } from "react";
import FormInput from '../form-input/form-input'
import './sign-up-form.scss'
import Button from "../Button/Button";
import { createAuthUserWithEmailAndPassword, CreaeteUserDocFromAuth,Signout} from "../../utils/firebase/firebase";
const DefaultField = {
    displayName:'',
    email:'',
    password:'',
    confirmPassword:''
}


const Signup = ()=>{
    const [FormField, setFormField] = useState(DefaultField);
    const {displayName, email, password, confirmPassword} = FormField;
    
    const handleChange = (event)=>{
    const{name,value} = event.target;
    // console.log(name,value);
    setFormField({...FormField, [name]: value})
}
    const handlesubmit = async (event)=>{
        event.preventDefault();
        if(password != confirmPassword){
            alert("password do not match, please try again!")
            return;
        }
        try {
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
            console.log(user)
            await CreaeteUserDocFromAuth(user, {displayName:displayName})
            alert('Congrats! You have registered already!')
            await Signout()
            setFormField(DefaultField)
        } catch (error) {
            console.log(error);
        }
    }
    return(
        <div className="sign-up-container"><h1>Don't have any account?</h1>
        <h2>Sign up with your account!</h2>
        <form onSubmit={handlesubmit}>
        <FormInput label='DisplayName' type='text' required onChange={handleChange} name='displayName' value={displayName}></FormInput>
        <FormInput label='Email' type='email' required onChange={handleChange} name='email' value={email}></FormInput>
        <FormInput label='Password' type='password' required onChange={handleChange} name='password' value={password}></FormInput>
        <FormInput label='ConfirmPassword' type='password' required onChange={handleChange} name='confirmPassword' value={confirmPassword}></FormInput>
        <Button type="submit" buttonType='inverted'>Sign up</Button>
        </form>
        </div>
    )

}


export default Signup;