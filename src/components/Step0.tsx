import React, { Dispatch, SetStateAction } from "react";
import Button from "./Button";
import Image from "next/image";
import eventLogo from "@/assets/svgs/Heading.svg";

const Step0 = ({ setStep }: { setStep: Dispatch<SetStateAction<number>> }) => {
  return (
    <div className="">
      <div className="grid w-full place-content-center space-y-10">
        <div className="flex flex-col gap-6">
          <Image
            src={eventLogo}
            alt="event logo"
            className="mx-auto w-full md:max-w-[600px]"
          />

          <p className="mx-auto max-w-[400px] text-center font-roboto text-lg text-white">
            Join us for an unforgettable experience at Techember Fest "25!{" "}
            Secure your spot now.
          </p>
        </div>

        <Button
          variant="secondary"
          className="mx-auto max-w-md"
          onClick={() => setStep(1)} 
        >
          Create Your Ticket
        </Button>
      </div>
    </div>
  );
};

export default Step0;
