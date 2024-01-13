import React from "react";
import { ActivityButtonProps } from "types";

export const ActivityButton = ({
  icon,
  label,
  onClick,
  activeLabel,
}: ActivityButtonProps) => {
  return (
    <button
      className={`flex border px-4 py-2 rounded items-center gap-2 hover:bg-prime w-full ${
        activeLabel === label ? "bg-prime" : ""
      }`}
      onClick={(event: any) => onClick(event, label)}
    >
      {icon}
      {label}
    </button>
  );
};
