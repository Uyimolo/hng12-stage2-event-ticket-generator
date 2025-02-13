import { FormDataType } from "@/types/types";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import ticketContainer from "@/assets/svgs/Subtract.svg";
import eventLogo from "@/assets/svgs/Heading.svg";
import barCode from "@/assets/svgs/Bar Code.svg";

const TicketReady = ({
  setFormData,
  formData,
  step,
  setStep,
}: {
  setFormData: Dispatch<SetStateAction<FormDataType>>;
  formData: FormDataType;
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
}) => {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h1 className="font-crimson text-2xl font-thin leading-none text-white md:text-[32px]">
            Ready
          </h1>
          <p className="font-roboto text-sm leading-none text-gray-400 md:text-base">
            Step 3/3
          </p>
        </div>

        {/* step length */}
        <div className="bg-secondaryColor">
          <div className="w-3/3 h-1 bg-primaryColor"></div>
        </div>
      </div>

      {/* ticket status info */}
      <div className="space-y-3">
        <h2 className="text-center font-roboto text-2xl text-white">
          Your TIcket is Booked!
        </h2>

        <p className="text-center font-roboto text-base leading-none text-gray-400">
          You can download or check your email for a copy
        </p>
      </div>

      {/* main ticket information */}
      <div className="relative h-fit w-fit">
        <Image
          src={ticketContainer}
          alt="ticket"
          className="max-w-300 mx-auto"
        />

        {/* inner ticket info div */}
        <div className="absolute left-1/2 top-6 h-[420px] w-[250px] -translate-x-1/2 rounded-2xl  bg-black"></div>

        {/* barcode */}
        <div className="absolute bottom-2 left-1/2 h-[100] w-[250px] -translate-x-1/2 ">
          <Image
            src={barCode}
            alt="ticket"
            className="max-w-300 absolute left-1/2 top-1/2 mx-auto -translate-x-1/2 -translate-y-1/2"
          />
        </div>
      </div>
    </div>
  );
};

export default TicketReady;
