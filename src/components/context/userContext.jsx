import { createContext, useState,useEffect } from "react";
import { UserChangeListener } from "../../utils/firebase/firebase";
import { CreaeteUserDocFromAuth } from "../../utils/firebase/firebase";
import { Signout } from "../../utils/firebase/firebase";
import { useReducer } from "react";
import { CreateAction } from "../../utils/firebase/createAction";
export const UserContext = createContext({
    currentUser:null,
    setCurrentUser: ()=> null
})

     Signout() // google with redirect will remount the page with user info
    //and the user state will be changed immediately if put Signout()right here.
    // if google pop, the page will not be reloaded, then everything is good.
export const ACTION_TYPE ={
    SET_CURRENT_USER: 'SET_CURRENT_USER'
}
const INITIAL_STATE = {
    currentUser: null
}
export const userReducer = (state, action)=>{
    const {type , payload} = action

    switch(type){
        case ACTION_TYPE.SET_CURRENT_USER:
         return {currentUser: payload}

         default: return state
    }

   
}


export const UserProvider = ({children})=>{

    const [state, dispatch] = useReducer(userReducer,INITIAL_STATE )
    const {currentUser}  = state
    // console.log(state)
    const setCurrentUser = (user)=>{
        dispatch(CreateAction(ACTION_TYPE.SET_CURRENT_USER, user))
    }
    // const [currentUser, setCurrentUser] = useState(null)
    const value = {currentUser, setCurrentUser}
    useEffect(()=>{
    const unsubscribe =  UserChangeListener((user)=>{
        if(user){
            CreaeteUserDocFromAuth(user)
        }
        console.log(user);
        setCurrentUser(user);
})
    return unsubscribe;
},[])
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}