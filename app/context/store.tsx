"use client";
import dayjs, { Dayjs } from "dayjs";
import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface ContextProps {
  monthIndex: number;
  setMonthIndex: Dispatch<SetStateAction<number>>;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  selectedDay: Dayjs;
  setSelectedDay: Dispatch<SetStateAction<Dayjs>>;
}

const GlobalContext = createContext<ContextProps>({
  monthIndex: 0,
  setMonthIndex: () => {},
  showModal: false,
  setShowModal: () => {},
  selectedDay: dayjs(),
  setSelectedDay: () => {},
});

export const GlobalContextProvider = ({ children }: any) => {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [showModal, setShowModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState(dayjs());

  return (
    <GlobalContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        showModal,
        setShowModal,
        selectedDay,
        setSelectedDay,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
