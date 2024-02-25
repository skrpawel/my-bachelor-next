"use client";
import React, { useEffect, useState } from "react";
import Day from "./day";
import dayjs, { Dayjs } from "dayjs";
import { useGlobalContext } from "@/app/context/store";
import axios from "axios";
import { useSession } from "next-auth/react";
import type { Session } from "next-auth";

interface CustomSession extends Session {
  user: {
    id: number;
    email: string;
  };
}

export default function Month({
  month,
  activeFilter,
}: {
  month: Dayjs[][];
  activeFilter: string;
}) {
  const { setSavedEvents, savedEvents } = useGlobalContext();
  const [weeklyTotals, setWeeklyTotals] = useState<
    { totalDuration: string; totalDistance: number }[]
  >([]);

  const parseDuration = (durationString: string) => {
    const [hours, minutes, seconds] = durationString.split(":").map(Number);

    return hours * 3600 + minutes * 60 + seconds;
  };

  const formatDuration = (totalSeconds: number) => {
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;

    const paddedHours = isNaN(hours) ? "00" : String(hours).padStart(2, "0");
    const paddedMinutes = isNaN(minutes)
      ? "00"
      : String(minutes).padStart(2, "0");
    const paddedSeconds = isNaN(seconds)
      ? "00"
      : String(seconds).padStart(2, "0");

    return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
  };

  const calculateWeeklyTotals = () => {
    const totals = month.map((week) => {
      let totalDurationSeconds = 0;
      let totalDistance = 0;

      week.forEach((day) => {
        const dayEvents = savedEvents.filter(
          (event) =>
            dayjs(event.date).format("DD-MM-YY") === day.format("DD-MM-YY")
        );

        dayEvents.forEach((event) => {
          if (event.isComplete && event.postDuration) {
            totalDurationSeconds += parseDuration(event.postDuration);
            totalDistance += parseFloat(event.postDistance);
          }
        });
      });

      // Convert total duration back into hh:mm:ss format
      const totalDuration = formatDuration(totalDurationSeconds);

      console.log(totalDuration);

      return { totalDuration, totalDistance };
    });

    setWeeklyTotals(totals);
  };

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
    if (session) {
      const customSession = session as CustomSession;
      getWorkouts(customSession?.user?.id);
    }
  }, []);

  useEffect(() => {
    calculateWeeklyTotals();
  }, [calculateWeeklyTotals]);

  return (
    <div className="grid grid-cols-8 bg-white">
      {month.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, idx) => (
            <Day
              firstDay={idx === 0 ? true : false}
              lastDay={idx === 6 ? true : false}
              key={`${day.format("DD-MM-YY")}${idx}`}
              day={day}
              activeFilter={activeFilter}
            />
          ))}
          <div className="flex flex-col border border-gray-200 px-2 py-4">
            <h3>Total duration: {weeklyTotals[i]?.totalDuration || 0}</h3>
            <br></br>
            <h3>Total distance: {weeklyTotals[i]?.totalDistance || 0}</h3>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}
