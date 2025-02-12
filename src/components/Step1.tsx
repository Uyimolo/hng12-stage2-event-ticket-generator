import {
  Dispatch,
  FormEvent,
  KeyboardEvent,
  SetStateAction,
  useState,
} from "react";
import eventLogo from "@/assets/svgs/Heading.svg";
import Image from "next/image";
import { FormDataType } from "@/types/types";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const initialTicketType = [
  { price: "free", type: "regular access", quantity: 20, selected: false },
  { price: "$150", type: "vip access", quantity: 20, selected: false },
  { price: "$150", type: "vvip access", quantity: 20, selected: false },
];

const Step1 = ({
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
  const [ticketType, setTicketType] = useState(initialTicketType);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [errors, setErrors] = useState("");

  const selectTicketType = (selectedTicket: string) => {
    const updatedTicketType = ticketType.map((ticket) =>
      ticket.type === selectedTicket
        ? { ...ticket, selected: true }
        : { ...ticket, selected: false },
    );
    setTicketType(updatedTicketType);
    setFormData({ ...formData, ticketType: selectedTicket });
    setErrors("");
  };

  const handleQuantityChange = (selectedQuantity: string) => {
    setFormData({ ...formData, numberOfTickets: Number(selectedQuantity) });
  };

  const handleKeyDown = (e: KeyboardEvent, index: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      selectTicketType(ticketType[index].type);
    }
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formData.ticketType === "") {
      setErrors("Please select a ticket type");
      return;
    }

    setStep((prev) => prev + 1);
  };

  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      <div className="space-y-3">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h1 className="font-crimson text-2xl font-thin leading-none text-white md:text-[32px]">
            Ticket Selection
          </h1>
          <p className="font-roboto text-sm leading-none text-gray-400 md:text-base">
            Step 1/3
          </p>
        </div>

        {/* step length */}
        <div className="bg-secondaryColor">
          <div className="h-1 w-1/3 bg-primaryColor"></div>
        </div>
      </div>

      <div className="space-y-6 md:rounded-[32px] md:border md:border-secondaryColor md:bg-darkTeal md:p-6">
        {/* banner */}
        <div className="space-y-8 rounded-3xl bg-gradient-to-br from-[#0e3a43] via-darkTeal to-darkTeal px-6 py-6 shadow shadow-secondaryColor">
          <div className="space-y-4">
            <Image
              src={eventLogo}
              alt="event logo"
              className="mx-auto w-full max-w-[400px]"
            />

            <p className="mx-auto max-w-[300px] text-center font-roboto text-sm text-white">
              Join us for an unforgettable experience at [Event Name]! Secure
              your spot now.
            </p>
          </div>

          <p className="text-center font-roboto text-sm leading-7 text-white">
            📍 [Event Location] <br />
            March 15, 2025 | 7:00 PM
          </p>
        </div>

        {/* divider */}
        <div className="h-1 w-full space-y-2 bg-secondaryColor" />
        {/* ticket information */}

        <div className="space-y-3">
          <p className="font-roboto text-base text-white">
            Select Ticket Type:
          </p>
          {/* ticket type */}
          <div className="flex flex-col gap-4 rounded-3xl border border-secondaryColor p-4 md:flex-row">
            {ticketType.map((ticket, index) => (
              <label
                key={ticket.type}
                tabIndex={0}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className={cn(
                  "relative w-full rounded-xl border border-primaryColor p-3 transition duration-300 hover:bg-lightTeal focus:border-white focus:outline-none",
                  ticket.selected && "bg-medTeal",
                )}
              >
                <div className="space-y-3">
                  <p className="font-roboto text-2xl font-semibold capitalize text-white">
                    {ticket.price}
                  </p>
                  <p className="font-roboto text-base text-white">
                    {ticket.type.toUpperCase()}
                  </p>
                  <p className="font-roboto text-sm text-white">{`${ticket.quantity}/52`}</p>
                </div>
                <input
                  type="radio"
                  name="ticketType"
                  value={ticket.type}
                  checked={ticket.selected}
                  className="hidden"
                  onChange={() => selectTicketType(ticket.type)}
                />
              </label>
            ))}
          </div>
          {errors && (
            <p className="font-roboto text-sm text-red-600">{errors}</p>
          )}
        </div>

        {/* ticket booking quantity */}
        <div className="space-y-3">
          <p className="font-roboto text-base text-white">Number of Tickets:</p>
          <Select
            onValueChange={(selectedQuantity) =>
              handleQuantityChange(selectedQuantity)
            }
          >
            <SelectTrigger className="h-[47px] w-full border-secondaryColor font-roboto text-white focus:border-white">
              <SelectValue placeholder="1" />
            </SelectTrigger>
            <SelectContent>
              {[...Array(20)].map((_, index) => (
                <SelectItem key={index + 1} value={`${index + 1}`}>
                  {index + 1}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-4 md:flex-row-reverse md:gap-6">
          <button
            type="submit"
            className="w-full rounded-lg bg-brightTeal px-6 py-3 font-crimson text-base text-white"
            // onClick={proceed}
          >
            Next
          </button>
          <button
            type="button"
            className="w-full rounded-lg border border-primaryColor bg-transparent px-6 py-3 font-crimson text-base text-white"
            // onClick={previous}
            // find out what the cancel button does or where it leads to before hng mentors eat me raw
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default Step1;
