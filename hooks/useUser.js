import { auth, firestore } from "../config/fire-config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";
import {doc } from 'firebase/firestore';

export default function useUser() {
  
  const [user] = useAuthState(auth);
  const ref = doc(firestore,'users',user?.uid ?? 'null')
  
  const [value,loading] = useDocumentData(ref);
  
  return {
   user,value,loading,
  }
}
 

