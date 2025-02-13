import { FormDataType } from "@/types/types";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import ticketContainer from "@/assets/svgs/Subtract.svg";
import eventLogo from "@/assets/svgs/Heading.svg";
import barCode from "@/assets/svgs/Bar Code.svg";
import desktopBarcode from "@/assets/svgs/Desktop Bar Code.svg";

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
      <div className="mx-auto w-fit space-y-3">
        <h2 className="text-center font-roboto text-2xl text-white">
          Your TIcket is Booked!
        </h2>

        <p className="text-center font-roboto text-base leading-none text-gray-400">
          You can download or check your email for a copy
        </p>
      </div>

      {/* main ticket information */}
      <div className="relative mx-auto h-fit w-fit space-y-6">
        <Image
          src={ticketContainer}
          alt="ticket"
          className="mx-auto max-h-[600px] max-w-[300px]"
        />

        {/* inner ticket info div */}
        <div className="absolute left-1/2 top-0 h-[446px] w-[260px] -translate-x-1/2 space-y-6 rounded-2xl border border-brightTeal p-[14px]">
          <div className="space-y-3">
            <Image src={eventLogo} alt="event logo" className="mx-auto w-4/5" />

            <div className="space-y-1">
              <p className="text-center font-roboto text-[10px] text-white">
                📍 04 Rumens road, Ikoyi, Lagos
              </p>

              <p className="text-center font-roboto text-[10px] text-white">
                📅 March 15, 2025 | 7:00 PM
              </p>
            </div>
          </div>

          {/* profile image */}
          <div
            className="mx-auto aspect-square w-[140px] rounded-xl border-4 border-brightTeal/50 bg-cover"
            style={{ backgroundImage: `url(${formData.avatarURL})` }}
          ></div>

          {/* guest info */}
          <div className="absolute bottom-4 w-[90%] overflow-hidden rounded-lg bg-[#08343c] p-1">
            <div className="grid grid-cols-2">
              {/* name */}
              <div className="flex flex-col gap-1 border-b border-r border-secondaryColor p-1">
                <p className="text-[10px] text-white/30">Enter your name</p>
                <p className="truncate text-xs text-white">{formData.name}</p>
              </div>
              {/* email */}
              <div className="flex flex-col gap-1 truncate border-b border-secondaryColor p-1">
                <p className="text-[10px] text-white/30">Enter your email</p>
                <p className="text-xs text-white">{formData.email}</p>
              </div>
              {/* ticket type */}
              <div className="flex flex-col gap-1 border-b border-r border-secondaryColor p-1">
                <p className="text-[10px] text-white/30">Ticket Type:</p>
                <p className="text-xs capitalize text-white">
                  {formData.ticketType}
                </p>
              </div>
              {/* ticket quantity */}
              <div className="flex flex-col gap-1 border-b border-secondaryColor p-1">
                <p className="text-[10px] text-white/30">Ticket for:</p>
                <p className="text-xs text-white">{formData.numberOfTickets}</p>
              </div>
            </div>
            {/* special request */}
            <div className="flex flex-col gap-1 p-1">
              <p className="text-[10px] text-white/30">Special Request?</p>
              <p className="text-xs text-white">{formData.specialRequest}</p>
            </div>
          </div>
        </div>

        {/* barcode */}
        <div className="absolute bottom-1 left-1/2 h-[100] w-[250px] -translate-x-1/2">
          <Image
            src={barCode}
            alt="ticket"
            className="max-w-300 absolute left-1/2 top-1/2 mx-auto -translate-x-1/2 -translate-y-1/2 md:hidden"
          />
          <Image
            src={desktopBarcode}
            alt="ticket"
            className="max-w-300 absolute left-1/2 top-1/2 mx-auto hidden -translate-x-1/2 -translate-y-1/2 md:block"
          />
        </div>
      </div>
    </div>
  );
};

export default TicketReady;
