import { createContext, PropsWithChildren, useState } from "react";

type PeriodContextValue = {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
};

export const PeriodContext = createContext<PeriodContextValue | undefined>(undefined);

export const PeriodProvider = ({ children }: PropsWithChildren) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <PeriodContext.Provider value={{ activeIndex, setActiveIndex }}>
      {children}
    </PeriodContext.Provider>
  );
};

