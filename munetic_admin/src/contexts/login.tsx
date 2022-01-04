import { createContext, useState, Dispatch, useContext } from 'react';

type Login = boolean;
type SetLogin = Dispatch<React.SetStateAction<boolean>>;

const LoginContext = createContext<Login | null>(null);
const LoginUpdateContext = createContext<SetLogin | null>(null);

interface Props {
  children: JSX.Element | JSX.Element[];
}

export default function LoginProvider({ children }: Props) {
  const [login, setLogin] = useState(false);

  return (
    <LoginContext.Provider value={login}>
      <LoginUpdateContext.Provider value={setLogin}>
        {children}
      </LoginUpdateContext.Provider>
    </LoginContext.Provider>
  );
}

export function useLogin() {
  return useContext(LoginContext);
}

export function useLoginUpdate() {
  return useContext(LoginUpdateContext);
}
