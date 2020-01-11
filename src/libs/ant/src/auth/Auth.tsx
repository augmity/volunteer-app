import React, { useEffect, useState, useContext, ReactNode } from 'react';
import { User } from 'firebase';

import { FirebaseContext, Firebase } from '../../../firebase';


interface IAuth {
  currentUser: User | undefined | null;
  signOut: () => void;
}

interface IProps {
  children: ReactNode;
}


export const AuthContext = React.createContext<IAuth>({
  currentUser: null,
  signOut: () => null
});

export const AuthProvider = ({ children }: IProps) => {

  const firebase = useContext(FirebaseContext) as Firebase;
  const [currentUser, setCurrentUser] = useState<User | undefined | null>(undefined);

  const signOut = () => {
    firebase.auth.signOut();
  }
  

  useEffect(() => {
    firebase.auth.onAuthStateChanged((data) => {
      setCurrentUser(data);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};