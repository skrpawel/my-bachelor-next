"use client";
import dayjs, { Dayjs } from "dayjs";
import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

export interface SavedEvent {
  type: string;
  date: Dayjs;
  id: number;
}

interface ContextProps {
  monthIndex: number;
  setMonthIndex: Dispatch<SetStateAction<number>>;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  selectedDay: Dayjs;
  setSelectedDay: Dispatch<SetStateAction<Dayjs>>;
  savedEvents: SavedEvent[];
  setSavedEvents: Dispatch<SetStateAction<SavedEvent[]>>;
  selectedEventId: string;
  setSelectedEventId: Dispatch<SetStateAction<string>>;
}

const GlobalContext = createContext<ContextProps>({
  monthIndex: 0,
  setMonthIndex: () => {},
  showModal: false,
  setShowModal: () => {},
  selectedDay: dayjs(),
  setSelectedDay: () => {},
  savedEvents: [],
  setSavedEvents: () => {},
  selectedEventId: "",
  setSelectedEventId: () => {},
});

export const GlobalContextProvider = ({ children }: any) => {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [showModal, setShowModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState(dayjs());
  const [savedEvents, setSavedEvents] = useState<SavedEvent[]>([]);
  const [selectedEventId, setSelectedEventId] = useState("");

  return (
    <GlobalContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        showModal,
        setShowModal,
        selectedDay,
        setSelectedDay,
        savedEvents,
        setSavedEvents,
        selectedEventId,
        setSelectedEventId,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
