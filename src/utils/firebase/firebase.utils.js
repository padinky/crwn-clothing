// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA27G9HeV2ehe4ung3DXaRxIW_itxQkjF4",
  authDomain: "crwn-clothing-db-24f8c.firebaseapp.com",
  projectId: "crwn-clothing-db-24f8c",
  storageBucket: "crwn-clothing-db-24f8c.appspot.com",
  messagingSenderId: "476434432602",
  appId: "1:476434432602:web:9824851772646e808dce63"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth,provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db,'users',userAuth.uid);
    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot)

    if(!userSnapshot.exists()) {
        const {email, displayName} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef,{ displayName,email,createdAt });
        } catch (err) {
            console.log('error creating user : ,',err.message);
        }
    }

    return userDocRef;
}