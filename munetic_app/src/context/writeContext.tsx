import { createContext, useState } from 'react';

const WriteContext = createContext({
  state: { write: false },
  actions: { setWrite: (bool: boolean) => {} },
});

interface IProps {
  children: React.ReactNode;
}

const WriteProvider = ({ children }: IProps) => {
  const [write, setWrite] = useState(false);

  const value = {
    state: { write },
    actions: { setWrite },
  };

  return (
    <WriteContext.Provider value={value}>{children}</WriteContext.Provider>
  );
};

export { WriteProvider };

export default WriteContext;
