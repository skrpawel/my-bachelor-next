import Navbar from "@/components/navbar/navbar";
import Video from "@/components/video";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="flex bg-runner bg-cover h-screen items-center justify-center font-bold p-24">
        <div className="text-center text-black w-1/2">
          <h1 className="text-8xl">
            WELCOME TO&nbsp;
            <span className="text-[#EB5E28] font-outline-0 ">
              {process.env.appName}
            </span>
          </h1>
          <h2 className="text-2xl">YOUR ULTIMATE TRAINING COMPANION.</h2>
        </div>
      </div>
      <div className="flex h-screen items-center justify-center font-bold p-24">
        <div className="text-center text-black w-1/2">
          <h1 className="text-8xl">
            WELCOME TO&nbsp;
            <span className="text-[#EB5E28] font-outline-0 ">
              {process.env.appName}
            </span>
          </h1>
          <h2 className="text-2xl">YOUR ULTIMATE TRAINING COMPANION.</h2>
        </div>
      </div>
    </div>
  );
}
