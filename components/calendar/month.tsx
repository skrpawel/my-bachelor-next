"use client";
import React, { useContext } from "react";
import Day from "./day";
import { Dayjs } from "dayjs";

export default function Month({ month }: { month: Dayjs[][] }) {
  return (
    <div className="flex-1 grid grid-cols-7 grid-rows-5 h-full bg-white">
      {month.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, idx) => (
            <Day key={idx} day={day} rowIdx={i} />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}
