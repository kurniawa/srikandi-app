import {
    addDoc,
    collection,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    query,
    where,
  } from 'firebase/firestore';
  // import bcrypt from 'bcrypt';
  import { now } from 'next-auth/client/_utils';
import { app, db } from '@/firebase.config';
  
  // const firestore = getFirestore(app);
  
  export const retrieveAllDataInCollection = async (collectionName: string) => {
    const snapshot = await getDocs(collection(db, collectionName));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  
    // console.log(data);
    return data;
  };
  
  export const retrieveDataById = async (collectionName: string, id: string) => {
    const snapshot = await getDoc(doc(db, collectionName, id));
    const data = snapshot.data();
  
    return data;
  };
  
  export const register = async (data: {
    username: string;
    password: string;
    fullname: string;
    role?: string;
    created_at?: number;
    updated_at?: number;
  }) => {
    const q = query(
      collection(db, 'users'),
      where('username', '==', data.username)
    );
    const snapshot = await getDocs(q);
    const users = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  
    if (users.length > 0) {
      return {
        status: false,
        statusCode: 400,
        message: 'username already exist',
      };
    } else {
      data.role = 'member';
    }
  
    data.password = await bcrypt.hash(data.password, 10);
    data.created_at = Date.now();
    data.updated_at = Date.now();
  
    try {
      await addDoc(collection(db, 'users'), data);
      return { status: true, message: 'Register success!', statusCode: 200 };
    } catch (error) {
      return { status: false, message: error, statusCode: 400 };
    }
  };
  
  export const login = async (data: any) => {
    // console.log(data);
    const q = query(
      collection(db, 'users'),
      where('username', '==', data.username)
    );
    const snapshot = await getDocs(q);
  
    const users = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  
    // console.log(users[0]);
    if (users) {
      return users[0];
    } else {
      return null;
    }
  };
  