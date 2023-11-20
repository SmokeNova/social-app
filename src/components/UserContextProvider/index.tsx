'use client';

import { ReactNode, createContext, useContext } from 'react';

type Props = {
  id: string;
  username: string;
  email: string;
  image: string;
  children: ReactNode;
};

const INITIAL_STATE = {
  id: '',
  username: '',
  email: '',
  image: '',
};

const UserContext = createContext<IUser>(INITIAL_STATE);

export default function UserContextProvider({
  id,
  username,
  email,
  image,
  children,
}: Props) {
  const value = {
    id,
    username,
    email,
    image,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const useUser = () => useContext(UserContext);
