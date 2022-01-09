import { createContext, useState, Dispatch, useContext } from 'react';

type Info = object;
type SetInfo = Dispatch<React.SetStateAction<object>>;

const InfoContext = createContext<Info | null>(null);
const InfoUpdateContext = createContext<SetInfo | null>(null);

interface Props {
  children: JSX.Element | JSX.Element[];
}

export default function InfoProvider({ children }: Props) {
  const [info, setInfo] = useState<object>({});

  return (
    <InfoContext.Provider value={info}>
      <InfoUpdateContext.Provider value={setInfo}>
        {children}
      </InfoUpdateContext.Provider>
    </InfoContext.Provider>
  );
}

export function useInfo() {
  return useContext(InfoContext);
}

export function useInfoUpdate() {
  return useContext(InfoUpdateContext);
}
