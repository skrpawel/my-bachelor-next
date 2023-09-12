import React from "react";

interface ActivityButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: (label: string) => void;
}
export const ActivityButton = ({ icon, label, onClick, activeLabel }: any) => {
  return (
    <button
      className={`flex border px-4 py-2 rounded items-center gap-2 hover:bg-prime w-32 ${
        activeLabel === label ? "bg-prime" : ""
      }`}
      onClick={(e) => onClick(e, label)}
    >
      {icon}
      {label}
    </button>
  );
};
