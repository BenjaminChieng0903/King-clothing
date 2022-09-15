import { createContext, useState,useEffect } from "react";
import { UserChangeListener } from "../../utils/firebase/firebase";
import { CreaeteUserDocFromAuth } from "../../utils/firebase/firebase";
import { Signout } from "../../utils/firebase/firebase";

export const UserContext = createContext({
    currentUser:null,
    setCurrentUser: ()=> null
})

     Signout() // google with redirect will remount the page with user info
    //and the user state will be changed immediately if put Signout()right here.
    // if google pop, the page will not be reloaded, then everything is good.

export const UserProvider = ({children})=>{
    const [currentUser, setCurrentUser] = useState(null)
    const value = {currentUser, setCurrentUser}
    // console.log("remount")
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