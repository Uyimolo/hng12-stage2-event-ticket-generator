import { FormDataType } from "@/types/types";
import { Dispatch, SetStateAction } from "react";

const StepFormActions = ({
  canProceed = false,
  step,
  setStep,
  setValidate,
}: {
  canProceed: boolean;
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  setValidate: Dispatch<SetStateAction<boolean>>;
}) => {
  const proceed = () => {
    if (!canProceed) {
      setValidate(true);
      return;
    }

    setStep((prev) => prev + 1);
  };

  const previous = () => {
    if (step === 1) {
      return;
    }
    setStep((prev) => prev - 1);
  };

  return (
    <div className="flex flex-col gap-4 md:flex-row-reverse md:gap-6">
      <button
        type="button"
        className="w-full rounded-lg bg-brightTeal px-6 py-3 font-crimson text-base text-white"
        onClick={proceed}
      >
        Next
      </button>
      <button
        type="button"
        className="border-primaryColor w-full rounded-lg border bg-transparent px-6 py-3 font-crimson text-base text-white"
        onClick={previous}
      >
        Cancel
      </button>
    </div>
  );
};

export default StepFormActions;
