import React from "react";

interface Day {
  label: string;
}

const week: Day[] = [
  { label: "Sunday" },
  { label: "Monday" },
  { label: "Tuesday" },
  { label: "Wednesday" },
  { label: "Thursday" },
  { label: "Friday" },
  { label: "Saturday" },
  { label: "Summary" },
];

export const WeekHeader: React.FC = () => {
  return (
    <div className="grid grid-cols-8 grid-rows-1 bg-white">
      {week.map((day, i) => (
        <div
          key={`Day_${i}`}
          className="border border-gray-200 flex flex-col items-center justify-between py-4"
        >
          {day.label}
        </div>
      ))}
    </div>
  );
};
