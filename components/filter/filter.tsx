import React, { useState } from "react";
import { activityIcon } from "../activity-icon";

interface FilterProps {
  active: string;
  setActive: (activity: string) => void;
}

export const Filter: React.FC<FilterProps> = ({ active, setActive }) => {
  const week: string[] = [
    "All",
    "Run",
    "Bike",
    "Swim",
    "Day off",
    "Strength",
    "Other",
  ];

  function setFilter(e: React.MouseEvent, label: string) {
    e.preventDefault();
    setActive(label);
  }

  return (
    <div className="grid grid-cols-7 grid-rows-1 bg-white self-center mb-4">
      {week.map((activity, idx) => (
        <button
          key={`${activity}_button_${idx}`}
          className={`flex border px-4 py-2  items-center justify-center gap-2 hover:bg-prime ${
            active === activity ? "bg-prime" : "bg-white"
          }`}
          onClick={(e: any) => setFilter(e, activity)}
        >
          {activityIcon(activity)}
          {activity}
        </button>
      ))}
    </div>
  );
};
