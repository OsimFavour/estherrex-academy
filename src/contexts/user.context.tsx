import { createContext, useEffect, useState, ReactNode, useContext } from "react";
import { createUserDocumentFromAuth, onAuthStateChangedListener } from "../utils/firebase/firebase.utils";
import { User } from "firebase/auth";


type UserContextType = {
    currentUser: User | null;
    setCurrentUser: (user: User | null) => void;
}

type UserProviderProps = {
    children: ReactNode;
}

export const UserContext = createContext<UserContextType | undefined>({
    currentUser: null,
    setCurrentUser: () => null
})


export const UserProvider = ({children}: UserProviderProps) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null)
    const value = { currentUser, setCurrentUser }

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {

            if (user) {
                createUserDocumentFromAuth(user)
            }

            setCurrentUser(user)
            console.log('Unsubscribe>>>>>', user);
        })

        return unsubscribe
    }, [])

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}


export const useUserData = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUserData must be within a UserProvider")
    }

    return context
}