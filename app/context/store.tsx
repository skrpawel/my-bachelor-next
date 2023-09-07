"use client";
import dayjs from "dayjs";
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface ContextProps {
  monthIndex: number;
  setMonthIndex: Dispatch<SetStateAction<number>>;
}

const GlobalContext = createContext<ContextProps>({
  monthIndex: 0,
  setMonthIndex: (): number => 0,
});

export const GlobalContextProvider = ({ children }: any) => {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  return (
    <GlobalContext.Provider value={{ monthIndex, setMonthIndex }}>
      {children}{" "}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
