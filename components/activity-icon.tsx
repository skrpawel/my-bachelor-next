"use client";
import { BiRun } from "react-icons/bi";
import { GrBike, GrSwim } from "react-icons/gr";
import { FaCouch } from "react-icons/fa";

export function activityIcon(label: string) {
  switch (label) {
    case "Run":
      return <BiRun />;
    case "Bike":
      return <GrBike />;
    case "Swim":
      return <GrSwim />;
    case "Day off":
      return <FaCouch />;
    default:
      return "";
  }
}
