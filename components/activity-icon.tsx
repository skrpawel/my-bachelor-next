"use client";
import { BiRun, BiDotsHorizontalRounded } from "react-icons/bi";
import { GrBike, GrSwim } from "react-icons/gr";
import { FaCouch } from "react-icons/fa";
import { IoBarbellSharp } from "react-icons/io5";

import {
  FaRegFaceDizzy,
  FaRegFaceFrown,
  FaRegFaceLaughBeam,
  FaRegFaceGrinWide,
  FaRegFaceSmile,
} from "react-icons/fa6";

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

export function effortIcon(label: number) {
  switch (label) {
    case 0:
      return <FaRegFaceDizzy />;
    case 1:
      return <FaRegFaceFrown />;
    case 2:
      return <FaRegFaceSmile />;
    case 3:
      return <FaRegFaceGrinWide />;
    case 4:
      return <FaRegFaceLaughBeam />;
    default:
      return undefined;
  }
}
