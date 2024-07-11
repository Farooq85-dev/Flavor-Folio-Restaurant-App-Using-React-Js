import { auth, onAuthStateChanged } from "../config/firebase.config";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log("User data fetched:", currentUser);
        setUser({
          userUid: currentUser.uid,
          userName: currentUser.displayName,
          userEmail: currentUser.email,
          userImage: currentUser.photoURL,
          userVerified: currentUser.emailVerified,
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
