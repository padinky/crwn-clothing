// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged 
    } 
    from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch } from 'firebase/firestore'

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

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth,googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth,googleProvider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);
    objectsToAdd.forEach((obj)=>{
        const docRef = doc(collectionRef, obj.title.toLowerCase());
        batch.set(docRef,obj);
    })

    await batch.commit();
    console.log("doneeeee");
};


export const createUserDocumentFromAuth = async (userAuth, additionalInfo = {}) => {
    if (!userAuth) return;

    const userDocRef = doc(db,'users',userAuth.uid);
    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot)

    if(!userSnapshot.exists()) {
        const {email, displayName} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef,{ displayName,email,createdAt,...additionalInfo });
        } catch (err) {
            console.log('error creating user : ,',err.message);
        }
    }

    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth,email,password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth,email,password);
}

export const signOutUser = () => signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth,callback);