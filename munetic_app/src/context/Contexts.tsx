import { createContext, useState } from 'react';

const Contexts = createContext({
  state: { write: false, validationMode: false, loggedin: false },
  actions: {
    setWrite: (bool: boolean) => {},
    setValidationMode: (bool: boolean) => {},
    setLoggedin: (bool: boolean) => {},
  },
});

interface IProps {
  children: React.ReactNode;
}

const ContextProvider = ({ children }: IProps) => {
  const [write, setWrite] = useState(false);
  const [validationMode, setValidationMode] = useState(false);
  const [loggedin, setLoggedin] = useState(false);
  const value = {
    state: { write, validationMode, loggedin },
    actions: { setWrite, setValidationMode, setLoggedin },
  };

  return <Contexts.Provider value={value}>{children}</Contexts.Provider>;
};

export { ContextProvider };

export default Contexts;
