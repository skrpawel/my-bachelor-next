"use client";

import { useGlobalContext } from "@/app/context/store";
import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { ActivityButton } from "./activity-button";
import { postWorkout, deleteWorkout, updateWorkout } from "../../apiUtils";
import InputMask from "react-input-mask";
import { activityIcon, effortIcon } from "../activity-icon";
import { useSession } from "next-auth/react";
import { calculatePace } from "../helper/helper";

export default function EventModal() {
  interface CalendarEvent {
    title: string;
    date: number | string;
    type: string;
    duration: string;
    distance: string;
    userId: number;
    isComplete: boolean;
    note: string;
    effort: string;
    postNote: string;
    postDistance: string;
    postDuration: string;
  }

  interface Event {
    title: string;
    date: number | string;
    type: string;
    duration: string;
    distance: string;
    userId: number;
    note: string;
  }

  const {
    showModal,
    setShowModal,
    selectedDay,
    setSavedEvents,
    savedEvents,
    selectedEventId,
    setSelectedEventId,
    setIsUpdatingEvent,
    isUpdatingEvent,
  } = useGlobalContext();

  const [workout, setWorkout] = useState({
    title: "",
    label: "",
    duration: "",
    distance: "",
    postDuration: "",
    postDistance: "",
    note: "",
    postNote: "",
    effort: "",
    isComplete: false,
  });

  const [event, setEvent] = useState({
    title: "",
    label: "",
    duration: "",
    distance: "",
    postDuration: "",
    postDistance: "",
    note: "",
    postNote: "",
    effort: "",
    isComplete: false,
  });

  const { data: session } = useSession();

  const [isFormComplete, setIsFormComplete] = useState(false);

  const chooseInput = (
    e: React.MouseEvent<HTMLButtonElement>,
    label: string,
    property: "label" | "effort"
  ) => {
    e.preventDefault();
    setWorkout((prev) => ({ ...prev, [property]: label }));
  };

  const resetState = () => {
    setShowModal(false);
    setIsUpdatingEvent(false);
    setWorkout({
      title: "",
      label: "",
      duration: "",
      distance: "",
      note: "",
      postNote: "",
      effort: "",
      postDistance: "",
      postDuration: "",
      isComplete: false,
    });
    setSelectedEventId("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const calendarEvent: CalendarEvent = {
      title: workout.title,
      date: selectedDay.valueOf(),
      type: workout.label,
      duration: workout.duration,
      distance: workout.distance,
      userId: parseInt(session?.user?.id),
      note: workout.note,
      effort: workout.effort,
      isComplete: workout.isComplete,
      postNote: workout.postNote,
      postDuration: workout.postDuration,
      postDistance: workout.postDistance,
    };

    const data = await postWorkout(calendarEvent);

    if (data) {
      setSavedEvents((prev) => [...prev, data]);
      resetState();
    }
  };

  const handleUpdate = async (
    e: React.FormEvent,
    id: string,
    isComplete: boolean = false
  ) => {
    e.preventDefault();

    workout.isComplete ? (isComplete = true) : "";

    const calendarEvent: CalendarEvent = {
      title: workout.title,
      date: selectedDay.valueOf(),
      type: workout.label,
      duration: workout.duration,
      distance: workout.distance,
      userId: parseInt(session?.user?.id),
      isComplete: isComplete,
      note: workout.note,
      effort: workout.effort,
      postNote: workout.postNote,
      postDistance: workout.postDistance,
      postDuration: workout.postDuration,
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

  const handleDelete = async (e: MouseEvent, workoutId: number) => {
    e.preventDefault();
    try {
      await deleteWorkout(workoutId);
      removeEventFromState(workoutId);
    } catch (error) {
      console.error("Error during workout deletion:", error);
    }
  };

  const removeEventFromState = (workoutId) => {
    setSavedEvents((prevEvents) =>
      prevEvents.filter((event) => event.id !== workoutId)
    );
    resetState();
  };

  useEffect(() => {
    if (workout.label === "Day off") return setIsFormComplete(true);

    setIsFormComplete(
      Boolean(workout.label) ||
        Boolean(workout.distance) ||
        Boolean(workout.duration) ||
        Boolean(workout.note)
    );
  }, [workout]);

  useEffect(() => {
    if (selectedEventId) {
      const workout = savedEvents.filter(
        (val) => val.id == parseInt(selectedEventId)
      );

      setWorkout({
        title: workout[0].title,
        label: workout[0].type,
        duration: workout[0].duration,
        distance: workout[0].distance,
        note: workout[0].note,
        effort: workout[0].effort,
        postNote: workout[0].postNote,
        postDistance: workout[0].postDistance,
        postDuration: workout[0].postDuration,
        isComplete: workout[0].isComplete,
      });
    }
  }, [selectedEventId, showModal]);

  if (!showModal) return <></>;

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center z-50">
      <form className="bg-white rounded-lg shadow-2xl border-grey border p-4 w-1/2">
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
        <div className="flex flex-col gap-2 items-start">
          {workout.label ? (
            <>
              <div
                className="flex items-center gap-4 border p-2 cursor-pointer"
                onClick={() => {
                  setWorkout((prev) => ({ ...prev, label: "" }));
                }}
              >
                Change activity
                {activityIcon(workout.label)}
              </div>
              {workout.label === "Event" ? (
                <div>Event name</div>
              ) : (
                <div>Title</div>
              )}
              <input
                className="border p-2 w-full"
                placeholder=""
                value={workout.title}
                onChange={(e) =>
                  setWorkout((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
              />
              {workout.label !== "Day off" && workout.label !== "Event" ? (
                <>
                  {workout.label !== "Strength" ? (
                    <>
                      <div className="grid grid-cols-2 w-full">
                        <div>
                          <h1>Planned values:</h1>
                          <div className="flex">
                            <input
                              className="border w-24 p-2"
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
                        </div>

                        <div>
                          <h1>Pace:</h1>
                          <div className="flex justify-center items-center p-2 text-green-600 font-bold	">
                            {workout.distance && workout.duration
                              ? `${calculatePace(
                                  workout.distance,
                                  workout.duration
                                )} min/km`
                              : ""}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                  <div className="w-full">
                    <h1>Notes:</h1>
                    <textarea
                      className="border w-full p-2 text-sm"
                      value={workout.note}
                      onChange={(e) =>
                        setWorkout((prev) => ({
                          ...prev,
                          note: e.target.value,
                        }))
                      }
                    ></textarea>
                  </div>
                  {workout.label !== "Strength" ? (
                    <div className="grid grid-cols-2 w-full">
                      <div>
                        <h1>Completed values:</h1>
                        <div className="flex">
                          <input
                            className="border w-24 p-2"
                            placeholder="Distance"
                            value={workout.postDistance}
                            onChange={(e) =>
                              setWorkout((prev) => ({
                                ...prev,
                                postDistance: e.target.value,
                              }))
                            }
                          ></input>
                          <div className="border w-10 p-2">km</div>
                          <InputMask
                            className="border rounded w-24 p-2"
                            mask="99:99:99"
                            placeholder="hh:mm:ss"
                            value={workout.postDuration}
                            onChange={(e) =>
                              setWorkout((prev) => ({
                                ...prev,
                                postDuration: e.target.value,
                              }))
                            }
                          >
                            {(props: any) => <input {...props} />}
                          </InputMask>
                        </div>
                      </div>

                      <div>
                        <h1>Pace:</h1>
                        <div className="flex justify-center items-center p-2 text-green-600 font-bold	">
                          {workout.postDistance && workout.postDuration
                            ? `${calculatePace(
                                workout.postDistance,
                                workout.postDuration
                              )} min/km`
                            : ""}
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="w-full">
                    <h1>Post workout notes:</h1>
                    <textarea
                      className="border w-full p-2 text-sm"
                      value={workout.postNote}
                      onChange={(e) =>
                        setWorkout((prev) => ({
                          ...prev,
                          postNote: e.target.value,
                        }))
                      }
                    ></textarea>
                  </div>
                  How did you feel:
                  <div className="flex w-full justify-items-center justify-center">
                    {Array.from({ length: 5 }, (__value, index) => index).map(
                      (number, idx) => (
                        <ActivityButton
                          key={`${number}_${idx}`}
                          onClick={(e) =>
                            chooseInput(e, number.toString(), "effort")
                          }
                          activeLabel={workout.effort}
                          icon={effortIcon(number)}
                          label={`${number}`}
                        />
                      )
                    )}
                  </div>
                </>
              ) : workout.label === "Event" ? (
                <>
                  <div className="w-full">
                    <h1>Description:</h1>
                    <textarea
                      className="border w-full p-2 text-sm"
                      value={workout.note}
                      onChange={(e) =>
                        setWorkout((prev) => ({
                          ...prev,
                          note: e.target.value,
                        }))
                      }
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="w-full">
                    <h1>Notes:</h1>
                    <textarea
                      className="border w-full p-2 text-sm"
                      value={workout.note}
                      onChange={(e) =>
                        setWorkout((prev) => ({
                          ...prev,
                          note: e.target.value,
                        }))
                      }
                    />
                  </div>
                </>
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
                  <button
                    className="w-full border p-2 disabled:bg-gray-200 text-white bg-green-600"
                    onClick={(e) => handleUpdate(e, selectedEventId, true)}
                  >
                    Mark as complete
                  </button>
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
            </>
          ) : (
            <>
              Choose activity
              <div className="flex w-full justify-items-center  flex-wrap gap-2">
                {["Run", "Bike", "Swim", "Day off", "Strength", "Other"].map(
                  (activity, idx) => (
                    <ActivityButton
                      key={`${activity}_${idx}`}
                      icon={activityIcon(activity)}
                      label={activity}
                      onClick={(e) => chooseInput(e, activity, "label")}
                      activeLabel={workout.label}
                    />
                  )
                )}
              </div>
              Add other
              <div className="flex w-full gap-2 justify-items-center">
                <ActivityButton
                  key="event_button"
                  icon={activityIcon("Event")}
                  label="Event"
                  onClick={(e) => chooseInput(e, "Event", "label")}
                  activeLabel="Evenet"
                />
              </div>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
