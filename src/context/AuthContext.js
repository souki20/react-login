import { createContext, useState, useContext, useEffect } from "react";
import { auth  } from "../firebase";
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';


const AuthContext = createContext();

// firebase.auth().onAuthStateChanged(function(user) {
//   if (user) {
//     // User is signed in.
//   }
// });

export function useAuthContext() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState('');
  const value = {
    user,
  };

  useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged((user) => {
      console.log(user);
      setUser(user);
    });
    return () => {
      unsubscribed();
    };
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}