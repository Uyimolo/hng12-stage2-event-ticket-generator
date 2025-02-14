"use client";
import Image from "next/image";
import logo from "@/assets/svgs/logo.svg";
import { useEffect, useState } from "react";
import { HiArrowLongRight } from "react-icons/hi2";
import Step1 from "@/components/Step1";
import { FormDataType } from "@/types/types";
import Step2 from "@/components/Step2";
import TicketReady from "@/components/TicketReady";
import Step0 from "@/components/Step0";
import Link from "next/link";

const initialFormData = {
  ticketType: "",
  numberOfTickets: 1,
  avatarURL: "",
  fullName: "",
  email: "",
  specialRequest: "",
};

const navItems = ["Events", "My Tickets", "About Project"];

export default function Home() {
  const [step, setStep] = useState<number>(0);
  const [formData, setFormData] = useState<FormDataType>(initialFormData);
  const [isClient, setIsClient] = useState(false);

  // to ensure localStorage is only used in the client
  useEffect(() => {
    setIsClient(true);
    const savedStep = localStorage.getItem("step");
    const savedFormData = localStorage.getItem("formData");

    if (savedStep) setStep(parseInt(savedStep, 10));
    if (savedFormData) setFormData(JSON.parse(savedFormData));
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem("step", step.toString());
      localStorage.setItem("formData", JSON.stringify(formData));
    }
  }, [step, formData, isClient]);

  useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: 0 }); // scroll to top on step change
  }, [step]);

  if (!isClient) return null; // Prevent rendering on server

  return (
    <div className="flex min-h-screen w-full flex-col gap-4 bg-[] bg-[radial-gradient(circle_at_bottom,#0E464F_0%,#02191D_50%)] bg-cover px-6 py-4 md:bg-[radial-gradient(circle_at_bottom,#0E464F_0%,#02191D_50%)] xl:px-28">
      {/* header */}
      <div className="mx-2 flex items-center justify-between rounded-3xl border border-primaryColor px-4 py-3">
        <Image src={logo} alt="ticz" />

        <nav className="hidden gap-4 lg:flex">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href="/"
              className={`font-roboto text-sm text-white transition duration-300 hover:text-[#d9d9d9] ${
                index === step ? "border-b-4 border-[#d9d9d9]" : ""
              }`}
            >
              {item}
            </Link>
          ))}
        </nav>
        <button className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 font-JejuMyeongjo text-base text-[#333333] transition duration-300 hover:border-[#d9d9d9] hover:bg-brightTeal hover:text-[#d9d9d9] md:px-6 md:py-4">
          MY TICKETS <HiArrowLongRight className="hidden text-xl xs:block" />
        </button>
      </div>

      {/* main content */}
      <div className="mx-auto w-full max-w-[700px]">
        {/* steps */}
        <div className="space-y-8 rounded-[32px] border border-[#0E464F] bg-darkTeal p-6 md:p-12">
          {step === 0 && <Step0 setStep={setStep} />}
          {step === 1 && (
            <Step1
              setStep={setStep}
              setFormData={setFormData}
              formData={formData}
            />
          )}
          {step === 2 && (
            <Step2
              setStep={setStep}
              setFormData={setFormData}
              formData={formData}
            />
          )}
          {step === 3 && (
            <TicketReady
              setStep={setStep}
              setFormData={setFormData}
              formData={formData}
            />
          )}
        </div>
      </div>
    </div>
  );
}
