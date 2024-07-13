import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  auth,
  db,
  doc,
  getDoc,
  getDocs,
  collection,
} from "../config/firebase.config";

// Create a UserContext
const UserContext = createContext();

// Hook to use the UserContext
export const useUser = () => useContext(UserContext);

// UserProvider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        console.log("User data fetched :: ", currentUser);
        try {
          //For userImage
          const userImageDocRef = doc(db, "usersImages", currentUser.uid);
          const userImageDocSnap = await getDoc(userImageDocRef);
          //For userProducts
          const userPrductsDocRef = collection(
            db,
            "usersProducts",
            currentUser.uid,
            "orders"
          );
          const userProductsDocSnap = await getDocs(userPrductsDocRef);
          let userOrdersInformation = [];
          userProductsDocSnap.forEach((doc) => {
            userOrdersInformation.push({ id: doc.id, ...doc.data() });
          });

          //Filtering on orders to get pending
          const pendingOrders = userOrdersInformation.filter(
            (order) => order.orderStatus === "pending"
          );

          //Filtering on orders to get pending
          const deliveredOrders = userOrdersInformation.filter(
            (order) => order.orderStatus === "delivered"
          );
          console.log(pendingOrders.length);
          console.log(deliveredOrders.length);

          //Displaying userImage
          const userImageUrl = userImageDocSnap.exists()
            ? userImageDocSnap.data().userImageUrl
            : null;
          setUser({
            userUid: currentUser.uid,
            userName: currentUser.displayName,
            userEmail: currentUser.email,
            userImage: currentUser.photoURL,
            userVerified: currentUser.emailVerified,
            userPic: userImageUrl,
            userPlacedOrders: userOrdersInformation.length,
            userPendingOrders: pendingOrders.length,
            userDeilveredOrders: deliveredOrders.length,
          });
        } catch (error) {
          console.error("Error fetching user profile picture:", error);
          // Set user data without profile picture if there's an error
          setUser({
            userUid: currentUser.uid,
            userName: currentUser.displayName,
            userEmail: currentUser.email,
            userImage: currentUser.photoURL,
            userVerified: currentUser.emailVerified,
          });
        }
      } else {
        setUser(null);
      }
    });

    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
