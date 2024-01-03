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
  title: string;
  isComplete: boolean;
  type: string;
  date: Dayjs;
  distance: string;
  duration: string;
  id: number;
  note: string;
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
  isUpdatingEvent: boolean;
  setIsUpdatingEvent: Dispatch<SetStateAction<boolean>>;
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
  isUpdatingEvent: false,
  setIsUpdatingEvent: () => {},
});

export const GlobalContextProvider = ({ children }: any) => {
  const [monthIndex, setMonthIndex] = useState<number>(dayjs().month());
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedDay, setSelectedDay] = useState<Dayjs>(dayjs());
  const [savedEvents, setSavedEvents] = useState<SavedEvent[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string>("");
  const [isUpdatingEvent, setIsUpdatingEvent] = useState<boolean>(false);

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
        isUpdatingEvent,
        setIsUpdatingEvent,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
