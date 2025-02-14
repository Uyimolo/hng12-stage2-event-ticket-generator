import { FormDataType } from "@/types/types";
import Image from "next/image";
import { Dispatch, SetStateAction, useRef } from "react";
import ticketContainer from "@/assets/svgs/Subtract.svg";
import eventLogo from "@/assets/svgs/Heading.svg";
import barCode from "@/assets/svgs/Bar Code.svg";
import desktopBarcode from "@/assets/svgs/Desktop Bar Code.svg";
import bg from "@/assets/pngs/bg.png";
import domtoimage from "dom-to-image";

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
  const captureAndDownload = async () => {
    const div = document.getElementById("captureDiv");
    if (!div) return;

    domtoimage
      .toPng(div as HTMLElement)
      .then((dataUrl: string) => {
        const link: HTMLAnchorElement = document.createElement("a");
        link.href = dataUrl;
        link.download = "ticket.png";
        link.click();
      })
      .catch((error: Error) => console.error("Error capturing image:", error));
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h1 className="font-crimson text-2xl font-thin leading-none text-white md:text-[32px]">
            Ready
          </h1>
          <p className="font-roboto text-sm leading-none text-gray-400 md:text-base">
            Step 3/3
          </p>
        </div>

        <div className="bg-secondaryColor">
          <div className="h-1 w-full bg-primaryColor"></div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-3">
        <h2 className="text-center font-roboto text-2xl text-white">
          Your Ticket is Booked!
        </h2>

        <p className="text-center font-roboto text-base leading-none text-gray-400">
          You can download or check your email for a copy
        </p>
      </div>

      <div
        className="relative mx-auto aspect-[1/2] max-w-[300px]"
        id="captureDiv"
      >
        <Image
          src={ticketContainer}
          alt="ticket"
          className="mx-auto"
          priority
        />

        <div className="absolute left-1/2 top-6 flex h-[72.5%] w-[calc(100%-24px)] -translate-x-1/2 flex-col justify-between rounded-2xl border border-brightTeal p-[6px] md:top-6 md:h-[446px]">
          <div className="flex flex-col">
            <Image
              src={eventLogo}
              alt="event logo"
              className="mx-auto w-4/5"
              priority
            />

            <div className="mt-3 flex flex-col gap-1">
              <p className="text-center font-roboto text-[10px] leading-none text-white">
                📍 04 Rumens road, Ikoyi, Lagos
              </p>

              <p className="text-center font-roboto text-[10px] leading-none text-white">
                📅 March 15, 2025 | 7:00 PM
              </p>
            </div>
          </div>

          <div
            className="mx-auto aspect-square w-[80px] rounded-xl border-4 border-brightTeal/50 bg-cover xs:w-[140px]"
            style={{ backgroundImage: `url(${formData.avatarURL})` }}
          />

          <div className="overflow-hidden rounded-lg bg-[#08343c] p-1">
            <div className="grid grid-cols-2">
              <div className="flex flex-col gap-1 border-b border-r border-secondaryColor p-1">
                <p className="text-[10px] text-white/30">Name</p>
                <p className="truncate text-xs text-white">
                  {formData.fullName}
                </p>
              </div>
              <div className="flex flex-col gap-1 border-b border-secondaryColor p-1">
                <p className="text-[10px] text-white/30">Email</p>
                <p className="truncate text-xs text-white">{formData.email}</p>
              </div>
              <div className="flex flex-col gap-1 border-b border-r border-secondaryColor p-1">
                <p className="text-[10px] text-white/30">Ticket Type</p>
                <p className="text-xs capitalize text-white">
                  {formData.ticketType}
                </p>
              </div>
              <div className="flex flex-col gap-1 border-b border-secondaryColor p-1">
                <p className="text-[10px] text-white/30">Quantity</p>
                <p className="text-xs text-white">{formData.numberOfTickets}</p>
              </div>
            </div>
            <div className="flex h-[60px] flex-col gap-1 p-1">
              <p className="text-[10px] text-white/30">Special Request</p>
              <p className="text-xs text-white">{formData.specialRequest}</p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-1 left-1/2 h-[18%] w-[250px] -translate-x-1/2">
          <Image
            src={barCode}
            alt="mobile barcode"
            className="absolute left-1/2 top-1/2 w-[40%] -translate-x-1/2 -translate-y-1/2 md:hidden"
            priority
          />
          <Image
            src={desktopBarcode}
            alt="desktop barcode"
            className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block"
            priority
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row-reverse md:gap-6">
        <button
          className="w-full rounded-lg bg-brightTeal px-6 py-3 font-crimson text-base text-white"
          onClick={captureAndDownload}
        >
          Download Ticket
        </button>
        <button
          className="w-full rounded-lg border border-primaryColor bg-transparent px-6 py-3 font-crimson text-base text-white"
          onClick={() => setStep((prev) => prev - 1)}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default TicketReady;
