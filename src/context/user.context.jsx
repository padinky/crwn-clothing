import { createContext, useState, useEffect } from "react";
import { onAuthStateChangedListener,createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";

// --- actual value
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

// --- provider
export const UserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = {currentUser, setCurrentUser};

    useEffect(()=>{
        const unsubscribe = onAuthStateChangedListener(
            (user)=>{
                console.log("from use effect useer context",user);
                if(user) {
                    createUserDocumentFromAuth(user);
                }
                setCurrentUser(user);
            });
        return unsubscribe;
    },[])

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}