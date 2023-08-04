import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase/config';
import { createContext, useState, useEffect } from 'react';



// create context 

export const AuthContext = createContext({
  user: null,
  isLoading: false,
  signOut: () => { }, // Placeholder for the signOut function
})

// create provider
// essentially; if we have a user, it redirects them to home, but if they aren't 
// signed on, it redirects them to the signup page
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  //firebase: Get the currently signed on user]

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false)
    });
    return unsubscribe
  }, [])

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error during sign out:', error);
    }
  };

  const value = {
    user,
    isLoading,
    signOut: handleSignOut, // Add the signOut function to the context
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}