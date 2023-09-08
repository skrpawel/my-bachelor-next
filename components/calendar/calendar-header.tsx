import { useGlobalContext } from "@/app/context/store";
import dayjs from "dayjs";
import React from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
export const CalendarHeader = () => {
  const { monthIndex, setMonthIndex } = useGlobalContext();

  function handlePrevMonth() {
    setMonthIndex(monthIndex - 1);
  }
  function handleNextMonth() {
    setMonthIndex(monthIndex + 1);
  }

  function handleReset() {
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
    );
  }

  return (
    <header className="px-4 py-2 flex items-center">
      <div className="w-48">
        <h1 className="mx-4 text-xl text-grey-500 font-bold">
          {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
        </h1>
      </div>
      <button className="border rounded py-2 px-4 mr-5" onClick={handleReset}>
        Today
      </button>
      <button className="mx-2 cursor-pointer" onClick={handlePrevMonth}>
        <AiOutlineArrowLeft />
      </button>
      <button className="mx-2 cursor-pointer" onClick={handleNextMonth}>
        <AiOutlineArrowRight />
      </button>
    </header>
  );
};
