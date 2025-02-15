import { FormDataType } from "@/types/types";
import Image from "next/image";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import ticketContainer from "@/assets/svgs/Subtract.svg";
import eventLogo from "@/assets/svgs/Heading.svg";
import barCode from "@/assets/svgs/Bar Code.svg";
import desktopBarcode from "@/assets/svgs/Desktop Bar Code.svg";
import Button from "./Button";
import html2canvas from "html2canvas";
// import { toPng } from "html-to-image";

const TicketReady = ({
  setFormData,
  formData,
  setStep,
}: {
  setFormData: Dispatch<SetStateAction<FormDataType>>;
  formData: FormDataType;
  setStep: Dispatch<SetStateAction<number>>;
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const captureRef = useRef<HTMLDivElement>(null);

  const captureAndDownload = async () => {
    setIsGenerating(true);

    if (captureRef.current) {
      const canvas = await html2canvas(captureRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: null,
      });

      // Convert to image and download
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = "my-div-image.png";
      link.click();
      setIsGenerating(false);
    }
  };

  const bookNewTicket = () => {
    setFormData({
      ticketType: "",
      numberOfTickets: 1,
      avatarURL: "",
      fullName: "",
      email: "",
      specialRequest: "",
    });

    setStep(0);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h1 className="font-JejuMyeongjo text-2xl font-thin leading-none text-white md:text-[32px]">
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
        className="relative mx-auto aspect-[1/2]"
        id="captureDiv"
        ref={captureRef}
      >
        <Image
          src={ticketContainer}
          alt="ticket"
          className="mx-auto"
          priority
        />

        <div className="absolute left-1/2 top-6 flex h-[72.5%] w-[calc(100%-24px)] -translate-x-1/2 flex-col justify-between rounded-2xl border border-brightTeal p-[6px] md:top-6 md:h-[446px]">
          <div className="flex flex-col">
            <Image src={eventLogo} alt="event logo" className="mx-auto w-4/5" />

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
            <div className="flex min-h-[60px] flex-col gap-1 p-1">
              <p className="text-[10px] text-white/30">Special Request</p>
              <p className="line-clamp-3 text-xs text-white">
                {formData.specialRequest}
              </p>
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

      <div className="mt-6 flex flex-col gap-4 md:flex-row-reverse md:gap-6">
        <Button onClick={captureAndDownload} disabled={isGenerating}>
          {isGenerating ? "Generating..." : "Download Ticket"}
        </Button>

        <Button variant="secondary" onClick={bookNewTicket}>
          Book Another Ticket
        </Button>
      </div>
    </div>
  );
};

export default TicketReady;
