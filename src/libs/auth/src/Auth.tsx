import React, { useEffect, useState, useContext, ReactNode } from 'react';
import { User } from 'firebase';

import { FirebaseContext, Firebase } from '../../firebase';
import { addEntityId } from '../../firebase/src/firebase-helpers';


interface IAuth {
  currentUser: User | undefined | null;
  userData: any | undefined;
  isAdmin: boolean;
  signOut: () => void;
}

interface IProps {
  children: ReactNode;
}


export const AuthContext = React.createContext<IAuth>({
  currentUser: null,
  userData: undefined,
  isAdmin: false,
  signOut: () => null
});

export const AuthProvider = ({ children }: IProps) => {

  const firebase = useContext(FirebaseContext) as Firebase;
  const [currentUser, setCurrentUser] = useState<User | undefined | null>(undefined);
  const [userData, setUserData] = useState();
  const [isAdmin, setIsAdmin] = useState(false);

  const signOut = () => {
    firebase.auth.signOut();
  }
  

  useEffect(() => {
    firebase.auth.onAuthStateChanged((data) => {
      setCurrentUser(data);
      if (data) {
        firebase.db.doc(`users/${data.uid}`).get().then(user => {
          const model = addEntityId(user);
          if (model) {
            setUserData(model);
            setIsAdmin(model.role && (model.role === 'admin'));
          }
        })
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, userData, isAdmin, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};