"use client";
import React, { useEffect, useState } from "react";
import dayjs, { type Dayjs } from "dayjs";
import { AiOutlinePlus } from "react-icons/ai";
import { SavedEvent, useGlobalContext } from "@/app/context/store";
import { activityIcon } from "../activity-icon";

interface DayProps {
  day: Dayjs;
  activeFilter: string;
  firstDay: boolean;
  lastDay: boolean;
}

export default function Day({ day, activeFilter }: DayProps) {
  const isCurrentDay = () =>
    day.format("DD-MM-YY") !== dayjs().format("DD-MM-YY");

  const isPast = () => day.format("DD-MM-YY") < dayjs().format("DD-MM-YY");

  const {
    setShowModal,
    setSelectedDay,
    savedEvents,
    setSelectedEventId,
    setIsUpdatingEvent,
  } = useGlobalContext();
  const [isShown, setIsShown] = useState(false);
  const [workouts, setWorkouts] = useState<SavedEvent[]>([]);

  const handleDayClick = () => {
    setShowModal(true);
    setIsUpdatingEvent(false);
    setSelectedDay(day);
  };

  const updateDayClick = (id: string) => {
    setShowModal(true);
    setIsUpdatingEvent(true);
    setSelectedEventId(id);
    setSelectedDay(day);
  };

  useEffect(() => {
    let events = (savedEvents || []).filter(
      (event) => dayjs(event.date).format("DD-MM-YY") === day.format("DD-MM-YY")
    );

    if (activeFilter !== "All") {
      events = events.filter((event) => event.type === activeFilter);
    }

    setWorkouts(events);
  }, [savedEvents, activeFilter]);

  return (
    <div
      className="border border-gray-200 flex flex-col items-center p-2"
      onMouseOver={() => setIsShown(true)}
      onMouseOut={() => setIsShown(false)}
    >
      <div
        className={`flex flex-col items-center border-b w-full ${
          isCurrentDay() ? "border-gray-200" : "border-prime"
        }`}
      >
        <p className="text-sm text-center">{day.format("DD")}</p>
      </div>
      <div className=" w-full min-h-12 my-2">
        {workouts.map((workout, i) => (
          <div
            key={`${workout.type}_${i}`}
            className={`${
              isCurrentDay() ? "border-gray-200" : "border-prime"
            } border grid ${
              workout.title ? "grid-rows-3" : "grid-rows-2"
            } grid-flow-col my-2 hover:cursor-pointer w-full py-2 relative text-sm place-items-center ${
              workout.isComplete
                ? "bg-green-500"
                : isPast()
                ? "bg-red-500"
                : "bg-white"
            }`}
            onClick={() => updateDayClick(workout.id.toString())}
          >
            {workout.title ? (
              <div className="row-span-1 col-span-2 w-full ">
                <h2 className="mx-4 font-bold border-b">{workout.title}</h2>
              </div>
            ) : (
              ""
            )}
            <>
              <div className="row-span-2 text-lg">
                {activityIcon(workout.type)}
              </div>
              {workout.distance ? (
                <div className="col-span-1">{workout.distance} km</div>
              ) : (
                <>&nbsp;</>
              )}
              {workout.duration ? (
                <div className="row-span-1 col-span-1">{workout.duration}</div>
              ) : (
                <>&nbsp;</>
              )}
            </>
          </div>
        ))}
        {isShown ? (
          <div
            className="border-gray-200 border flex justify-center hover:cursor-pointer w-full py-2 "
            onClick={handleDayClick}
          >
            <AiOutlinePlus />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
