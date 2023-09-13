"use client";
import React, { useEffect, useState } from "react";
import dayjs, { type Dayjs } from "dayjs";
import { AiOutlinePlus } from "react-icons/ai";
import { useGlobalContext } from "@/app/context/store";
import { SavedEvent } from "@/app/context/store";
import { activityIcon } from "../activity-icon";

interface DayProps {
  day: Dayjs;
}

export default function Day({ day }: DayProps) {
  const isCurrentDay = () =>
    day.format("DD-MM-YY") !== dayjs().format("DD-MM-YY");

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
    const events = (savedEvents || []).filter(
      (event) => dayjs(event.date).format("DD-MM-YY") === day.format("DD-MM-YY")
    );
    setWorkouts(events);
  }, [savedEvents]);

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
      <div className=" w-full h-12 my-2">
        {workouts.map((workout, i) => (
          <div
            key={`${workout.type}_${i}`}
            className={`${
              isCurrentDay() ? "border-gray-200" : "border-prime"
            } border grid grid-rows-2 grid-flow-col hover:cursor-pointer w-full py-2 relative text-sm place-items-center`}
            onClick={() => updateDayClick(workout.id.toString())}
          >
            {workout.type !== "Day off" ? (
              <>
                <div className="row-span-2 text-lg">
                  {activityIcon(workout.type)}
                </div>
                <div className="col-span-1">{workout.distance} km</div>
                <div className="row-span-1 col-span-1">{workout.duration}</div>
              </>
            ) : (
              <div className="row-span-2 text-lg">
                {activityIcon(workout.type)}
              </div>
            )}
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
