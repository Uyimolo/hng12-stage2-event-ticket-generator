import React from "react";

const Step2 = () => {
  return (
    <form className="space-y-6">
      <div className="space-y-3">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h1 className="font-crimson text-2xl font-thin leading-none text-white md:text-[32px]">
            Attendee Details
          </h1>
          <p className="font-roboto text-sm leading-none text-gray-400 md:text-base">
            Step 2/3
          </p>
        </div>

        {/* step length */}
        <div className="bg-secondaryColor">
          <div className="h-1 w-2/3 bg-primaryColor"></div>
        </div>
      </div>

      <div className="space-y-6 rounded-3xl md:rounded-[32px] md:border md:border-secondaryColor md:bg-darkTeal md:p-6">
        {/* profile picture upload */}
        <p className="p-6 pb-12 font-roboto text-sm leading-none text-white md:text-base">
          Upload Profile Photo
        </p>
      </div>
    </form>
  );
};

export default Step2;
