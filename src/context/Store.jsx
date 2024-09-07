import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  auth,
  db,
  doc,
  getDoc,
  collection,
  onSnapshot,
} from "../config/firebase.config";

// Create a UserContext
const UserContext = createContext();

// Hook to use the UserContext
export const useUser = () => useContext(UserContext);

// UserProvider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [adminProducts, setAdminProducts] = useState([]);
  const [allUserReviews, setAllUserReviews] = useState([]);
  const [userOrdersInformation, setUserOrdersInformation] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          // For userImage
          const userImageDocRef = doc(db, "usersImages", currentUser.uid);
          const userImageDocSnap = await getDoc(userImageDocRef);
          const userImageUrl = userImageDocSnap.exists()
            ? userImageDocSnap.data().userImageUrl
            : null;

          // Getting Admin Products in real-time
          const adminProductsRef = collection(db, "adminProducts");
          const adminProductsUnsub = onSnapshot(
            adminProductsRef,
            (snapshot) => {
              const products = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }));
              setAdminProducts(products);

              setUser((prevUser) => ({
                ...prevUser,
                adminProducts: products,
              }));
            }
          );

          // Getting User Reviews in real-time
          const userReviewsDocRef = collection(db, "userReviews");
          const userReviewsUnsub = onSnapshot(userReviewsDocRef, (snapshot) => {
            const reviews = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setAllUserReviews(reviews);

            setUser((prevUser) => ({
              ...prevUser,
              allUserReviews: reviews,
            }));
          });

          // For userProducts
          const userProductsDocRef = collection(
            db,
            "usersProducts",
            currentUser.uid,
            "orders"
          );
          const userProductsUnsub = onSnapshot(
            userProductsDocRef,
            (snapshot) => {
              const orders = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }));
              setUserOrdersInformation(orders);

              // Filtering orders
              const pendingOrders = orders.filter(
                (order) => order.orderStatus === "pending"
              );

              const deliveredOrders = orders.filter(
                (order) => order.orderStatus === "delivered"
              );

              const cancelledOrders = orders.filter(
                (order) => order.orderStatus === "cancelled"
              );

              setUser((prevUser) => ({
                ...prevUser,
                userUid: currentUser.uid,
                userName: currentUser.displayName,
                userEmail: currentUser.email,
                userImage: currentUser.photoURL,
                userVerified: currentUser.emailVerified,
                userPic: userImageUrl,
                userPlacedOrders: orders.length,
                userPendingOrders: pendingOrders.length,
                userDeliveredOrders: deliveredOrders.length,
                userCancelledOrders: cancelledOrders.length,
                userOrdersInformation: orders,
              }));
            }
          );

          return () => {
            adminProductsUnsub();
            userReviewsUnsub();
            userProductsUnsub();
          };
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

    return () => unsubscribe();
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default UserProvider;
