"use client";

import { useGlobalContext } from "@/app/context/store";
import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BiRun } from "react-icons/bi";
import { GrBike, GrSwim } from "react-icons/gr";
import { FaCouch } from "react-icons/fa";
import { ActivityButton } from "./activity-button";
import { postWorkout, deleteWorkout } from "../../apiUtils";
import InputMask from "react-input-mask";

export default function EventModal() {
  interface CalendarEvent {
    date: number | string;
    type: string;
    duration: string;
    userId: number;
  }

  const {
    showModal,
    setShowModal,
    selectedDay,
    setSavedEvents,
    selectedEventId,
  } = useGlobalContext();

  const [workout, setWorkout] = useState({
    label: "",
    duration: "",
    distance: "",
  });

  const [isFormComplete, setIsFormComplete] = useState(false);

  const chooseActivity = (e: Event, label: string) => {
    e.preventDefault();
    setWorkout((prev) => ({ ...prev, label: label }));
  };

  const resetState = () => {
    setShowModal(false);
    setWorkout({
      label: "",
      duration: "",
      distance: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const calendarEvent: CalendarEvent = {
      date: selectedDay.valueOf(),
      type: workout.label,
      duration: workout.duration,
      userId: 3, // Make sure to replace this with a dynamic value in the future
    };

    try {
      const data = await postWorkout(calendarEvent);
      setSavedEvents((prev) => [...prev, data]);
      resetState();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (e: Event, workoutId: number) => {
    e.preventDefault();
    try {
      await deleteWorkout(workoutId);
      setSavedEvents((prevEvents) =>
        prevEvents.filter((event) => event.id !== workoutId)
      );
      resetState();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setIsFormComplete(
      Boolean(workout.label) &&
        Boolean(workout.distance) &&
        Boolean(workout.duration)
    );
  }, [workout]);

  if (!showModal) return <></>;

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center z-50">
      <form className="bg-white rounded-lg shadow-2xl border-grey border p-4">
        <header className="bg-grey-100 py-2 flex justify-between items-center border-b mb-2">
          <h1 className="text-prime text-2xl">
            {selectedDay.format("MMMM D, YYYY	")}
          </h1>
          <div className="flex gap-4 items-center">
            <button
              className="p-2 border border-prime text-prime"
              onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
                handleDelete(e, selectedEventId)
              }
            >
              Delete workout
            </button>
            <AiOutlineClose onClick={resetState} className="cursor-pointer" />
          </div>
        </header>
        <div className="flex flex-col gap-2 items-start md:flex-wrap flex-nowrap">
          Choose activity
          <div className="flex w-full justify-items-center">
            {["Run", "Bike", "Swim", "Day off"].map((activity, idx) => (
              <ActivityButton
                key={`${activity}_${idx}`}
                icon={activityIcon(activity)}
                label={activity}
                onClick={chooseActivity}
                activeLabel={workout.label}
              />
            ))}
          </div>
          Planned values
          <div className="flex gap-2">
            <div className="flex">
              <input
                className="border w-20 p-2"
                placeholder="Distance"
                value={workout.distance}
                onChange={(e) =>
                  setWorkout((prev) => ({ ...prev, distance: e.target.value }))
                }
              ></input>
              <div className="border w-10 p-2">km</div>
            </div>
            <InputMask
              className="border rounded w-24 p-2"
              mask="99:99:99"
              placeholder="hh:mm:ss"
              value={workout.duration}
              onChange={(e) =>
                setWorkout((prev) => ({ ...prev, duration: e.target.value }))
              }
            >
              {(props: any) => <input {...props} />}
            </InputMask>
          </div>
          <button
            className="w-full border p-2 disabled:bg-gray-200 text-white bg-prime"
            onClick={(e) => handleSubmit(e)}
            disabled={!isFormComplete}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

function activityIcon(label: string) {
  switch (label) {
    case "Run":
      return <BiRun />;
    case "Bike":
      return <GrBike />;
    case "Swim":
      return <GrSwim />;
    case "Day off":
    default:
      return <FaCouch />;
  }
}
