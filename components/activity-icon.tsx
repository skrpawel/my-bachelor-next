"use client";
import { BiRun, BiDotsHorizontalRounded } from "react-icons/bi";
import { GrBike, GrSwim } from "react-icons/gr";
import { FaCouch } from "react-icons/fa";
import { IoBarbellSharp } from "react-icons/io5";

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
    case "Strength":
      return <IoBarbellSharp />;
    case "Other":
      return <BiDotsHorizontalRounded />;
    default:
      return "";
  }
}
