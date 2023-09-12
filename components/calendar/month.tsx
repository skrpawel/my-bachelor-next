"use client";
import React, { useEffect } from "react";
import Day from "./day";
import { Dayjs } from "dayjs";
import { useGlobalContext } from "@/app/context/store";
import axios from "axios";

export default function Month({ month }: { month: Dayjs[][] }) {
  const { setSavedEvents } = useGlobalContext();

  const getWorkouts = async (userId: number) => {
    try {
      const res = await axios.get("/api/workout/get", {
        params: {
          userId,
        },
      });
      setSavedEvents(res.data);
    } catch (error) {
      console.error("Error fetching workouts:", error);
    }
  };

  useEffect(() => {
    getWorkouts(3); // Consider replacing the hardcoded 3 with a dynamic value if needed.
  }, []); // Consider the dependencies you need here.

  return (
    <div className=" grid grid-cols-7 grid-rows-5  bg-white">
      {month.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, idx) => (
            <Day key={`${day.format("DD-MM-YY")}${idx}`} day={day} />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}
