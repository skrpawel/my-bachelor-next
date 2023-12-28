"use client";
import React, { use, useEffect } from "react";
import Day from "./day";
import { Dayjs } from "dayjs";
import { useGlobalContext } from "@/app/context/store";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function Month({
  month,
  activeFilter,
}: {
  month: Dayjs[][];
  activeFilter: string;
}) {
  const { setSavedEvents } = useGlobalContext();

  const { data: session } = useSession();

  const getWorkouts = async (userId: number) => {
    try {
      const res = await axios.get(`/api/workout/get?id=${userId}`);
      setSavedEvents(res.data);
    } catch (error) {
      console.error("Error fetching workouts:", error);
    }
  };

  useEffect(() => {
    getWorkouts(session?.user?.id);
  }, []);

  return (
    <div className="grid grid-cols-8 bg-white">
      {month.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, idx) => (
            <Day
              key={`${day.format("DD-MM-YY")}${idx}`}
              day={day}
              activeFilter={activeFilter}
            />
          ))}
          <div className="flex flex-col border border-gray-200 px-2 py-4">
            <h3>Total duration:</h3>
            <br></br>
            <h3>Total distance:</h3>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}
