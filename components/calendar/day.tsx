"use client";
import { useGlobalContext } from "@/app/context/store";
import dayjs, { type Dayjs } from "dayjs";
import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

interface DayProps {
  rowIdx: number;
  day: Dayjs;
}

export default function Day({ day, rowIdx }: DayProps) {
  const getCurrentDay = () => {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-[#EB5E28] text-white rounded-full w-7"
      : "";
  };

  const { setShowModal, setSelectedDay } = useGlobalContext();
  const [isShown, setIsShown] = useState(false);

  const [savedEvents, setSavedEvents] = useState([{ date: dayjs() }]);
  const [workouts, setWorkouts] = useState([
    {
      type: "Run",
      duration: "1h",
      date: day,
    },
  ]);

  const handleDayClick = () => {
    setShowModal(true);
    setSelectedDay(day);
  };

  useEffect(() => {
    const events = savedEvents.filter(
      (event) => dayjs(event.date).format("DD-MM-YY") === day.format("DD-MM-YY")
    );
  }, [savedEvents]);

  return (
    <div
      className="border border-gray-200 flex flex-col items-center hover:bg-[#EB5E28] hover:border-gray-400 hover:cursor-pointer justify-between py-4"
      onClick={handleDayClick}
      onMouseOver={() => setIsShown(true)}
      onMouseOut={() => setIsShown(false)}
    >
      <div className="flex flex-col items-center">
        {rowIdx === 0 ? (
          <p className={`text-sm mt-1 `}>{day.format("ddd").toUpperCase()}</p>
        ) : (
          ""
        )}
        <p className={`text-sm p-1 my-1 text-center ${getCurrentDay()}`}>
          {day.format("DD")}
        </p>
      </div>
      {isShown ? (
        <>
          <AiOutlinePlus />
        </>
      ) : (
        ""
      )}
    </div>
  );
}
