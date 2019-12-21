import React, { useEffect, useState, ReactNode } from 'react';
import { auth } from '../../../../firebase';


interface IProps {
  children: ReactNode;
}

// TODO: use proper type
export const AuthContext = React.createContext<any>(null);

export const AuthProvider = ({ children }: IProps) => {

  const [currentUser, setCurrentUser] = useState<any>(undefined); // TODO: use proper type

  useEffect(() => {
    auth.onAuthStateChanged((data) => {
      setCurrentUser(data);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};