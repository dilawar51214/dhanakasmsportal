import { auth, firestore } from "../config/fire-config";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection, useDocumentData } from "react-firebase-hooks/firestore";
import {getDoc, doc, collection } from 'firebase/firestore';

export default function useUser() {
  const [user] = useAuthState(auth);
  const verified = user?.emailVerified;
  const ref = doc(firestore,'users',user?.uid ?? 'null')
  const subscriptionsRef = collection(firestore, 'users', user?.uid ?? 'null', 'subscriptions');
  const [value,loading] = useDocumentData(ref);
  const [subscriptionValue] = useCollection(subscriptionsRef);
  const subscribe_for = value?.subscribe_for;
  return {
   user,value,verified,loading,subscribe_for,
   subscriptionValue,
  }
}
 

