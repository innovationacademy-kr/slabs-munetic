import { createContext, useState, Dispatch, useContext } from 'react';

type User = object;
type SetUser = Dispatch<React.SetStateAction<object>>;

const UserContext = createContext<User | null>(null);
const UserUpdateContext = createContext<SetUser | null>(null);

interface Props {
  children: JSX.Element | JSX.Element[];
}

export default function UserProvider({ children }: Props) {
  const [user, setUser] = useState<object>({});

  return (
    <UserContext.Provider value={user}>
      <UserUpdateContext.Provider value={setUser}>
        {children}
      </UserUpdateContext.Provider>
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}

export function useUserUpdate() {
  return useContext(UserUpdateContext);
}
