import { initializeApp, } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {GoogleAuthProvider,getAuth,signInWithPopup,
    createUserWithEmailAndPassword,signInWithEmailAndPassword,signInWithRedirect,signOut, onAuthStateChanged} from 'firebase/auth'
import{getDoc,setDoc,doc,getFirestore}from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyB31EUGoyLrPrIvvEsUY1jt13dd8fKx3k8",
  authDomain: "king-clothing-dde05.firebaseapp.com",
  projectId: "king-clothing-dde05",
  storageBucket: "king-clothing-dde05.appspot.com",
  messagingSenderId: "509463141302",
  appId: "1:509463141302:web:711da91030a352df997f17",
  measurementId: "G-PME9TB0EG7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt:'select_account'
})
export const auth = new getAuth();
export const SignInWithGooglePopup = ()=> signInWithPopup(auth,provider);
export const SignInWithRedirect = ()=> signInWithRedirect(auth, provider)

export const db = getFirestore();
export const CreaeteUserDocFromAuth = async(userAuth, additionalInfo)=>{
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);
    const userInfo = await getDoc(userDocRef);
    if(!userInfo.exists()){
        const{displayName, email} = userAuth;
        const CreeateDate = new Date();
        try {
            await setDoc(userDocRef,{
                displayName,
                email,
                CreeateDate,
                ...additionalInfo
            })
        } catch (error) {
            console.log('there is an error when create data'+ error)
        }

    }
}

export const createAuthUserWithEmailAndPassword = (email, password)=>{
    if(!email || !password)return;
    return createUserWithEmailAndPassword(auth, email, password);
}

export const signinAuthUserWithEmailAndPassword = (email, password)=>{
    if(!email || !password)return;
    return signInWithEmailAndPassword(auth, email, password);
}

export const Signout = async()=> signOut(auth);

export const UserChangeListener = (callback)=>onAuthStateChanged(auth, callback)