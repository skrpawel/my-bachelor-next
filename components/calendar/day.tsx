import dayjs, { type Dayjs } from "dayjs";
import React from "react";

interface DayProps {
  rowIdx: number;
  day: Dayjs;
}

export default function Day({ day, rowIdx }: DayProps) {
  const getCurrentDay = () => {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-[#EB5E28] text-white rounded-full w-7"
      : "";
  };

  return (
    <div className="border border-grey-200 flex flex-col hover:bg-[#EB5E28] hover:border-black hover:cursor-pointer">
      <div className="flex flex-col items-center">
        {rowIdx === 0 ? (
          <p className={`text-sm mt-1 `}>{day.format("ddd").toUpperCase()}</p>
        ) : (
          ""
        )}
        <p className={`text-sm p-1 my-1 text-center ${getCurrentDay()}`}>
          {day.format("DD")}
        </p>
      </div>
    </div>
  );
}
