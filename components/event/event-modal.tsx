"use client";
import { useGlobalContext } from "@/app/context/store";
import React, { ReactNode, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BiRun } from "react-icons/bi";
import { GrBike, GrSwim } from "react-icons/gr";
import { FaCouch } from "react-icons/fa";
import { ActivityButton } from "./activity-button";
import { getServerSession } from "next-auth";
import Link from "next/link";
import axios from "axios";
import { error } from "console";
import { useSession } from "next-auth/react";

export default function EventModal() {
  interface CalendarEvent {
    date: number | string;
    type: string;
    duration: number;
  }
  const { data: session } = useSession();
  const userEmail = session?.user?.email || null;

  const { showModal, setShowModal, selectedDay, setSavedEvents } =
    useGlobalContext();

  const [workout, setWorkout] = useState<CalendarEvent>();

  const handleSubmit = async (e: Event, label: string, icon: any) => {
    e.preventDefault();
    console.log(e);
    const calendarEvent: CalendarEvent = {
      date: selectedDay.valueOf(),
      type: label,
      duration: 1,
    };

    try {
      const response = await fetch("/api/workout/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...calendarEvent,
          email: userEmail, // replace with the actual user ID
        }),
      });

      const data = await response.json();

      setWorkout(data);

      setSavedEvents((prev) => [...prev, data]);
      setShowModal(false);
    } catch (error) {
      console.error("Error posting workout:", error);
    }
  };

  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    workoutId: number
  ) => {
    e.preventDefault();
    try {
      const response = await axios.delete("/api/workout/remove", {
        params: {
          id: workoutId,
        },
      });
    } catch (error) {
      console.error("Error deleting workout:", error);
    }
  };

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
                handleDelete(e, 23)
              }
            >
              Delete workout
            </button>
            <AiOutlineClose
              onClick={() => setShowModal(false)}
              className="cursor-pointer"
            />
          </div>
        </header>
        <div className="flex flex-col gap-2 items-start md:flex-wrap flex-nowrap">
          Choose activity
          <div className="flex w-full justify-items-center">
            <ActivityButton
              icon={<BiRun />}
              label="Run"
              onClick={handleSubmit}
            />
            <ActivityButton
              icon={<GrBike />}
              label="Bike"
              onClick={handleSubmit}
            />
            <ActivityButton
              icon={<GrSwim />}
              label="Swim"
              onClick={handleSubmit}
            />
            <ActivityButton
              icon={<FaCouch />}
              label="Day off"
              onClick={handleSubmit}
            />
          </div>
          Planned values
          <div className="flex gap-2">
            <input
              className="border border-black rounded w-20 p-2"
              placeholder="Distance"
            ></input>
            <input
              className="border border-black rounded w-24 p-2"
              placeholder="hh:mm:ss"
            ></input>
          </div>
          <div className="w-full">
            <ActivityButton
              className="w-full"
              icon={<BiRun />}
              label="Submit"
              onClick={handleSubmit}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
