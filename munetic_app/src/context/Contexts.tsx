import { createContext, useState } from 'react';

const Contexts = createContext({
  state: { write: false, validationMode: false },
  actions: {
    setWrite: (bool: boolean) => {},
    setValidationMode: (bool: boolean) => {},
  },
});

interface IProps {
  children: React.ReactNode;
}

const ContextProvider = ({ children }: IProps) => {
  const [write, setWrite] = useState(false);
  const [validationMode, setValidationMode] = useState(false);

  const value = {
    state: { write, validationMode },
    actions: { setWrite, setValidationMode },
  };

  return <Contexts.Provider value={value}>{children}</Contexts.Provider>;
};

export { ContextProvider };

export default Contexts;
