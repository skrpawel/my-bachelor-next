"use client";

import { useGlobalContext } from "@/app/context/store";
import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { ActivityButton } from "./activity-button";
import { postWorkout, deleteWorkout, updateWorkout } from "../../apiUtils";
import InputMask from "react-input-mask";
import { activityIcon } from "../activity-icon";
import { useSession } from "next-auth/react";

export default function EventModal() {
  interface CalendarEvent {
    date: number | string;
    type: string;
    duration: string;
    distance: string;
    userId: number;
  }

  const {
    showModal,
    setShowModal,
    selectedDay,
    setSavedEvents,
    selectedEventId,
    setIsUpdatingEvent,
    isUpdatingEvent,
  } = useGlobalContext();

  const [workout, setWorkout] = useState({
    label: "",
    duration: "",
    distance: "",
  });
  const { data: session } = useSession();

  const [isFormComplete, setIsFormComplete] = useState(false);

  const chooseActivity = (e: Event, label: string) => {
    e.preventDefault();
    setWorkout((prev) => ({ ...prev, label: label }));
  };

  const resetState = () => {
    setShowModal(false);
    setIsUpdatingEvent(false);
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
      distance: workout.distance,
      userId: parseInt(session?.user?.id),
    };

    const data = await postWorkout(calendarEvent);

    if (data) {
      setSavedEvents((prev) => [...prev, data]);
      resetState();
    }
  };

  const handleUpdate = async (e: React.FormEvent, id: string) => {
    e.preventDefault();

    const calendarEvent: CalendarEvent = {
      date: selectedDay.valueOf(),
      type: workout.label,
      duration: workout.duration,
      distance: workout.distance,
      userId: parseInt(session?.user?.id),
    };

    const data = await updateWorkout(id, calendarEvent);
    setSavedEvents((prev) => {
      const indexToUpdate = prev.findIndex(
        (workout) => workout.id === parseInt(id)
      );

      if (indexToUpdate !== -1) {
        const updatedEvents = [...prev];
        updatedEvents[indexToUpdate] = data;
        return updatedEvents;
      }
      return prev;
    });
    resetState();
  };

  const handleComplete = async (e: React.FormEvent, id: string) => {
    e.preventDefault();

    resetState();
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
    if (workout.label === "Day off") return setIsFormComplete(true);

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
            {isUpdatingEvent ? (
              <button
                className="p-2 border border-prime text-prime"
                onClick={(e: any) => handleDelete(e, parseInt(selectedEventId))}
              >
                Delete workout
              </button>
            ) : (
              <></>
            )}

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
          {workout.label !== "Day off" ? (
            <>
              <div className="grid grid-cols-2 w-full">
                <h1>Planned values:</h1>
                <h1>Pace:</h1>
              </div>
              <div className="flex gap-2">
                <div className="flex">
                  <input
                    className="border w-20 p-2"
                    placeholder="Distance"
                    value={workout.distance}
                    onChange={(e) =>
                      setWorkout((prev) => ({
                        ...prev,
                        distance: e.target.value,
                      }))
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
                    setWorkout((prev) => ({
                      ...prev,
                      duration: e.target.value,
                    }))
                  }
                >
                  {(props: any) => <input {...props} />}
                </InputMask>
              </div>
            </>
          ) : (
            <></>
          )}
          {isUpdatingEvent ? (
            <>
              <button
                className="w-full border p-2 disabled:bg-gray-200 text-white bg-prime"
                onClick={(e) => handleUpdate(e, selectedEventId)}
                disabled={!isFormComplete}
              >
                Update
              </button>
              {/* <button
                className="w-full border p-2 disabled:bg-gray-200 text-white bg-green-600"
                onClick={(e) => handleComplete(e, selectedEventId)}
              >
                Mark as complete
              </button> */}
            </>
          ) : (
            <button
              className="w-full border p-2 disabled:bg-gray-200 text-white bg-prime"
              onClick={(e) => handleSubmit(e)}
              disabled={!isFormComplete}
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
