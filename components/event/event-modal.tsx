"use client";
import { useGlobalContext } from "@/app/context/store";
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BiRun } from "react-icons/bi";
import { GrBike, GrSwim } from "react-icons/gr";
import { FaCouch } from "react-icons/fa";
import { ActivityButton } from "./activity-button";

export default function EventModal() {
  const { showModal, setShowModal, selectedDay } = useGlobalContext();
  const [workout, setWorkout] = useState({});

  const handleSubmit = (e: Event, label: string) => {
    e.preventDefault();
    const calendarEvent = {
      date: selectedDay.valueOf(),
      type: label,
    };
    setWorkout(calendarEvent);

  };

  if (!showModal) return <></>;

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      <form className="bg-white rounded-lg shadow-2xl w-1/4 border-grey border p-4">
        <header className="bg-grey-100 py-2 flex justify-between items-center border-b mb-2">
          <h1 className="text-prime text-2xl">
            {selectedDay.format("MMMM D, YYYY	")}
          </h1>
          <AiOutlineClose
            onClick={() => setShowModal(false)}
            className="cursor-pointer"
          />
        </header>
        <div className="flex flex-col gap-2 items-start">
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
        </div>
      </form>
    </div>
  );
}
