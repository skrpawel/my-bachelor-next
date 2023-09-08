"use client";
import SignOut from "@/components/sign-out";
import { getMonthMatrix } from "../../util";
import { useEffect, useState } from "react";
import Month from "@/components/calendar/month";
import { CalendarHeader } from "@/components/calendar/calendar-header";
import { useGlobalContext } from "../context/store";
import EventModal from "@/components/event/event-modal";
export default function Home() {
  const [currentMonth, setCurrentMonth] = useState(getMonthMatrix());
  const { monthIndex } = useGlobalContext();
  useEffect(() => {
    setCurrentMonth(getMonthMatrix(monthIndex));
  }, [monthIndex]);

  return (
    <div className="flex flex-col h-screen justify-center mx-6">
      <div className="h-3/4 bg-white">
        <EventModal />
        <CalendarHeader />
        <Month month={currentMonth} />
        <SignOut />
      </div>
    </div>
  );
}
