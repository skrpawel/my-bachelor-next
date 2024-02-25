"use client";
import { BiRun, BiDotsHorizontalRounded } from "react-icons/bi";
import { GrBike, GrSwim } from "react-icons/gr";
import { FaCouch } from "react-icons/fa";
import { IoBarbellSharp } from "react-icons/io5";
import { MdEmojiEvents } from "react-icons/md";

import {
  FaRegFaceDizzy,
  FaRegFaceFrown,
  FaRegFaceLaughBeam,
  FaRegFaceGrinWide,
  FaRegFaceSmile,
} from "react-icons/fa6";

export function activityIcon(label: string, size: number = 20) {
  switch (label) {
    case "Run":
      return <BiRun size={size} />;
    case "Bike":
      return <GrBike size={size} />;
    case "Swim":
      return <GrSwim size={size} />;
    case "Day off":
      return <FaCouch size={size} />;
    case "Strength":
      return <IoBarbellSharp size={size} />;
    case "Other":
      return <BiDotsHorizontalRounded size={size} />;
    case "Event":
      return <MdEmojiEvents size={size} />;
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
