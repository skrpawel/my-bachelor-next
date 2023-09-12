"use client";
import { getMonthMatrix } from "../../util";
import { useEffect, useState } from "react";
import Month from "@/components/calendar/month";
import { CalendarHeader } from "@/components/calendar/calendar-header";
import { useGlobalContext } from "../context/store";
import EventModal from "@/components/event/event-modal";
import { WeekHeader } from "@/components/calendar/week-header";
import { SessionProvider } from "next-auth/react";
export default function Home() {
  const [currentMonth, setCurrentMonth] = useState(getMonthMatrix());
  const { monthIndex } = useGlobalContext();
  useEffect(() => {
    setCurrentMonth(getMonthMatrix(monthIndex));
  }, [monthIndex]);

  return (
    <div className="flex flex-col h-screen justify-center mx-6">
      <div className="h-3/4 bg-white">
        <SessionProvider>
          <EventModal />
        </SessionProvider>
        <CalendarHeader />
        <WeekHeader />
        <Month month={currentMonth} />
      </div>
    </div>
  );
}
