import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB31EUGoyLrPrIvvEsUY1jt13dd8fKx3k8",
    authDomain: "king-clothing-dde05.firebaseapp.com",
    projectId: "king-clothing-dde05",
    storageBucket: "king-clothing-dde05.appspot.com",
    messagingSenderId: "509463141302",
    appId: "1:509463141302:web:711da91030a352df997f17",
    measurementId: "G-PME9TB0EG7"
  };

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();
export const AddCollectionsAndDoc = async(collectionKey, objectAdd)=>{
  const collectionRef = collection(db, collectionKey)
  const batch = writeBatch(db)

  // Array.prototype.forEach.call( )
objectAdd.forEach((object) => {
     const docRef = doc(collectionRef, object.title.toLowerCase())
     batch.set(docRef, object)
  }) 
 await batch.commit()
 console.log('done')

}
export const GetCollectionAndDoc = async()=>{
  const collectionRef = collection(db, 'categories')
  const q = query(collectionRef)
  const querySnapshot = await getDocs(q)
  const categoryMap = querySnapshot.docs.reduce((acc, doceSnapshot)=>{
    const{title, items} = doceSnapshot.data()
    acc[title.toLowerCase()] = items
    return acc
  },{})
  return categoryMap
}

export const CreaeteUserDocFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const Signout = async () => await signOut(auth);

export const UserChangeListener = (callback) =>
  onAuthStateChanged(auth, callback);