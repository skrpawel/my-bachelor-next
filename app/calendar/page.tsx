"use client";
import { getMonthMatrix } from "../../util";
import { useEffect, useState } from "react";
import Month from "@/components/calendar/month";
import { CalendarHeader } from "@/components/calendar/calendar-header";
import { useGlobalContext } from "../context/store";
import EventModal from "@/components/event/event-modal";
import { WeekHeader } from "@/components/calendar/week-header";
import { Filter } from "@/components/filter/filter";

export default function Home() {
  const [currentMonth, setCurrentMonth] = useState(getMonthMatrix());
  const [activeFilter, setActiveFilter] = useState("All");
  const { monthIndex } = useGlobalContext();
  useEffect(() => {
    setCurrentMonth(getMonthMatrix(monthIndex));
  }, [monthIndex]);

  return (
    <div className="mx-6">
      <div className=" bg-white py-20">
        <EventModal />
        <CalendarHeader />
        <Filter active={activeFilter} setActive={setActiveFilter} />
        <WeekHeader />
        <Month month={currentMonth} activeFilter={activeFilter} />
      </div>
    </div>
  );
}
