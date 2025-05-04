import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    User
  } from 'firebase/auth';
  import { 
    doc, 
    setDoc, 
    updateDoc, 
    getDoc,
    serverTimestamp 
  } from 'firebase/firestore';
  import { auth, db, googleProvider } from '../lib/firebase';
  
  export type UserData = {
    email: string;
    fullName?: string;
    phone?: string;
    address?: string;
    education?: string;
    course?: string;
    referral?: string;
    paymentStatus?: 'pending' | 'completed' | 'failed';
    transactionReference?: string;
    createdAt?: string;
    updatedAt?: string;
  }
  

  export const registerUser = async (email: string, password: string): Promise<User> => {
   
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        paymentStatus: 'pending'
      });
      
      return userCredential.user;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  };
  
 
  export const signInUser = async (email: string, password: string): Promise<User> => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  };
  
 
  export const signOutUser = async (): Promise<void> => {
    await signOut(auth);
  };
  
  
  export const updateUserData = async (userId: string, data: Partial<UserData>): Promise<void> => {
    try {
      await updateDoc(doc(db, 'users', userId), {
        ...data,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating user data:', error);
      throw error;
    }
  };
  

  export const getUserData = async (userId: string): Promise<UserData | null> => {
    try {
      const docSnap = await getDoc(doc(db, 'users', userId));
      
      if (docSnap.exists()) {
        return docSnap.data() as UserData;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error getting user data:', error);
      throw error;
    }
  };

  export const authenticateWithGooglePopup = async () => {
      try {
        const { user } = await signInWithPopup(auth, googleProvider);
    
        const userDocRef = doc(db, "users", user.uid);
        const userSnapshot = await getDoc(userDocRef);
    
        if (userSnapshot.exists()) {
          console.log("User exists, proceed to the app");
          return { userExists: true, user };
        } else {
          console.log("User does not exist, trigger sign-up flow");
          return { userExists: false, user };
        }
      } catch (error) {
        console.log("Error authenticating with Google:", error);
      }
    };
  

  export const recordPayment = async (
    userId: string, 
    status: 'completed' | 'failed', 
    transactionReference?: string
  ): Promise<void> => {
    try {
      await updateDoc(doc(db, 'users', userId), {
        paymentStatus: status,
        transactionReference,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error recording payment:', error);
      throw error;
    }
  };
  