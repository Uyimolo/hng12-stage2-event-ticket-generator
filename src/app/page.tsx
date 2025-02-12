"use client";
import Image from "next/image";
import logo from "@/assets/svgs/logo.svg";
import { useEffect, useState } from "react";
import { HiArrowLongRight } from "react-icons/hi2";
import Step1 from "@/components/Step1";
import { FormDataType } from "@/types/types";
import Step2 from "@/components/Step2";

const initialFormData = {
  ticketType: "",
  numberOfTickets: 1,
  avatarURL: "",
  name: "",
  email: "",
  aboutProject: "",
};

export default function Home() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState<FormDataType>(initialFormData);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <div className="flex min-h-screen w-full flex-col gap-4 bg-[#02191D] px-6 py-4 xl:px-28">
      {/* header */}
      <div className="flex items-center justify-between rounded-3xl border border-primaryColor px-4 py-3">
        <Image src={logo} alt="ticz" />
        <button className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 font-crimson text-base text-[#333333] md:px-6 md:py-4">
          MY TICKETS <HiArrowLongRight className="text-xl" />
        </button>
      </div>

      {/* main content */}
      <div className="mx-auto w-full max-w-[700px]">
        {/* step 1 */}
        <div className="space-y-8 rounded-[32px] border border-[#0E464F] bg-darkTeal p-6 lg:p-12">
          {/* step one */}
          {step === 1 && (
            <Step1
              setStep={setStep}
              step={step}
              setFormData={setFormData}
              formData={formData}
            />
          )}
          {/* step two */}
          {step === 2 && <Step2 />}
        </div>
      </div>
    </div>
  );
}
