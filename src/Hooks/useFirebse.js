import { useEffect, useState } from "react"
import initializeFirebase from "../Firebase/firebase.init";
import {
    onAuthStateChanged,
    signOut,
    getAuth
   } from "firebase/auth";



initializeFirebase()

const useFirebase= ()=>{
    const [user, setUser]= useState({});
    const[isloading, setIsLoading]= useState(true);


      const auth = getAuth()

    // observe
    useEffect(() => {
        const unsubcribed= onAuthStateChanged(auth, (user) => {
          if (user) {
            setUser(user);
          } else {
            setUser({})
          }
          setIsLoading(false)
        });
        return ()=>unsubcribed;
      }, []);

      const logOut = ()=>{
        setIsLoading(true)
          signOut(auth)
          .then(() => {
            setUser({});
          })
          .finally(() => setIsLoading(false));
      };


    

      return{
          user,
          isloading,
          logOut,
      }


}


export default useFirebase;
