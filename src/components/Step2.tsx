import Image from "next/image";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useDropzone } from "react-dropzone";
import cloudDownload from "@/assets/svgs/cloud-download.svg";
import { cn } from "@/lib/utils";
import { FormDataType } from "@/types/types";

const initialStep2Data = [
  {
    type: "text",
    name: "avatarUrl",
    value: "",
    placeholder: "https://avatar.example.com.png",
    label: "Avatar URL",
    style: "hidden",
    required: true,
  },
  {
    type: "text",
    name: "fullName",
    value: "",
    placeholder: "John Doe",
    style: "",
    label: "Enter your name",
    required: true,
  },
  {
    type: "text",
    name: "email",
    value: "",
    placeholder: "JohnDoe@example.com",
    style: "",
    label: "Enter your email",
    required: true,
  },
  {
    type: "textarea",
    name: "specialRequest",
    value: "",
    placeholder: "My special requests are ...",
    style: "",
    label: "Special request?",
    required: false,
  },
];
const Step2 = ({
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
  const [errors, setErrors] = useState({
    avatarURL: "",
    fullName: "",
    email: "",
    specialRequest: "",
  });

  const [step2Data, setStep2Data] = useState(initialStep2Data);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    formData.avatarURL || null,
  );
  const [uploading, setUploading] = useState(false);

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "avatarUrl": {
        const regex =
          /^(https?:\/\/)?([a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})(\/[^\s]*)?$/;
        return regex.test(value) ? "" : "Invalid URL";
      }
      case "fullName": {
        const regex = /^[A-Za-z\s]+$/;
        return regex.test(value) ? "" : "Invalid name (letters only)";
      }
      case "email": {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(value) ? "" : "Invalid email format";
      }
      case "specialRequest": {
        return value.trim().length > 60
          ? "Special request too long (max 60 chars)"
          : "";
      }
      default:
        return "";
    }
  };

  // sync local form data to parent form data
  useEffect(() => {
    setStep2Data((prevStep2Data) =>
      prevStep2Data.map((field) => ({
        ...field,
        value: String(formData[field.name as keyof FormDataType] || ""),
      })),
    );
  }, []);

  const handleInputChange = (name: string, value: string) => {
    const errorMessage = validateField(name, value);

    // Update error state
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));

    // Update local form state only if valid
    setStep2Data((prevStep2Data) =>
      prevStep2Data.map((field) =>
        field.name === name ? { ...field, value } : field,
      ),
    );

    // Update parent form state to persist changes
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let hasError = false;
    const newErrors: typeof errors = {
      avatarURL: "",
      fullName: "",
      email: "",
      specialRequest: "",
    };

    // Validate each field
    step2Data.forEach((field) => {
      const errorMessage = validateField(field.name, field.value);

      if (errorMessage) {
        newErrors[field.name as keyof typeof errors] = errorMessage;
        hasError = true;
      }

      // Ensure required fields are filled
      if (field.required && !field.value.trim()) {
        newErrors[field.name as keyof typeof errors] = "This field is required";
        hasError = true;
      }
    });

    // Update error state
    setErrors(newErrors);

    // If errors exist, stop submission
    if (hasError) return;

    // Extract values from `step2Data`
    const updatedFormData = {
      avatarURL: step2Data.find((f) => f.name === "avatarUrl")?.value || "",
      name: step2Data.find((f) => f.name === "fullName")?.value || "",
      email: step2Data.find((f) => f.name === "email")?.value || "",
      specialRequest:
        step2Data.find((f) => f.name === "specialRequest")?.value || "",
      ticketType: formData.ticketType, // Preserve previous steps' data
      numberOfTickets: formData.numberOfTickets,
    };

    // Update parent form state
    setFormData(updatedFormData);

    // Move to the next step
    setStep(step + 1);
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];

    // Generate local preview URL
    const localPreviewUrl = URL.createObjectURL(file);
    setPreviewUrl(localPreviewUrl);

    // Upload to Cloudinary
    const cloudinaryUrl = await uploadImage(file);

    // Update state with Cloudinary URL
    handleInputChange("avatarUrl", cloudinaryUrl);

    // Cleanup the object URL after Cloudinary upload to free memory
    URL.revokeObjectURL(localPreviewUrl);
  }, []);

  const { getInputProps, getRootProps } = useDropzone({ onDrop });

  const uploadImage = async (file: File) => {
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ticket-generator");

    const cloudName = process.env.NEXT_PUBLIC_CLOUD_NAME;
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await response.json();
    if (data) {
      setUploading(false);
      return data.secure_url;
    }
    // return data.secure_url;
  };

  return (
    <form className="space-y-6" onSubmit={onSubmit}>
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

      <div className="space-y-6 rounded-3xl md:rounded-[32px] md:border md:border-[#0E464F] md:bg-darkTeal md:p-6">
        {/* profile picture upload */}
        <div className="space-y-6 rounded-3xl border border-[#0E464F] p-6 pb-12 md:rounded-3xl md:p-6">
          <p className="font-roboto text-sm leading-none text-white md:text-base">
            Upload Profile Photo
          </p>

          {/* drag and drop or click upload */}
          <div className="relative">
            {/* dark box on desktop */}
            <div className="absolute top-1/2 z-0 hidden aspect-[3/1.2] w-full -translate-y-1/2 bg-black/20 md:block"></div>

            <div
              {...getRootProps()}
              className="group relative z-10 mx-auto grid aspect-square w-full max-w-[240px] cursor-pointer place-content-center gap-4 overflow-hidden rounded-[32px] border-4 border-brightTeal bg-secondaryColor bg-cover text-white"
              style={{ backgroundImage: `url(${previewUrl})` }}
            >
              <input {...getInputProps()} />
              {/* {previewUrl ? (
                <Image
                  src={previewUrl}
                  alt="Uploaded preview"
                  width={240}
                  height={240}
                  className="aspect-squar h-full w-full rounded-[32px] object-center"
                />
              ) : ( */}
              <div
                className={cn(
                  previewUrl === null
                    ? "block"
                    : "hidden aspect-square w-fit place-content-center gap-2 bg-secondaryColor/70 transition duration-300 group-hover:grid",
                )}
              >
                <Image
                  src={cloudDownload}
                  alt="cloud download"
                  className="mx-auto w-fit"
                />
                <p className="px-6 text-center">
                  Drag & drop or click to upload
                </p>
              </div>
              {/* )} */}
            </div>
          </div>
        </div>
        {/* divider */}
        <div className="h-1 w-full space-y-2 bg-secondaryColor" />

        {/* form inputs */}
        {step2Data.map((input) => (
          <div key={input.name} className="flex flex-col space-y-4">
            {input.type === "textarea" ? (
              <>
                <label
                  className={cn(
                    "font-roboto text-base leading-none text-white",
                    input.style,
                  )}
                >
                  {input.label}
                </label>

                <textarea
                  name={input.name}
                  value={input.value}
                  placeholder={input.placeholder}
                  onChange={(e) =>
                    handleInputChange(input.name, e.target.value)
                  }
                  className={cn(
                    "h-[127px] rounded-xl border border-secondaryColor bg-transparent p-3 text-white placeholder:text-sm",
                    input.style,
                  )}
                />
              </>
            ) : (
              <>
                <label
                  className={cn(
                    "font-roboto text-base leading-none text-white",
                    input.style,
                  )}
                >
                  {input.label}
                </label>
                <input
                  type={input.type}
                  name={input.name}
                  value={input.value}
                  placeholder={input.placeholder}
                  onChange={(e) =>
                    handleInputChange(input.name, e.target.value)
                  }
                  className={cn(
                    "rounded-xl border border-secondaryColor bg-transparent p-3 text-white placeholder:text-sm",
                    input.style,
                  )}
                />
              </>
            )}

            {/* error messages */}
            {errors[input.name as keyof typeof errors] && (
              <p className="font-roboto text-xs text-red-500">
                {errors[input.name as keyof typeof errors]}
              </p>
            )}
          </div>
        ))}

        <div className="flex flex-col gap-4 md:flex-row-reverse md:gap-6">
          <button
            type="submit"
            className="w-full rounded-lg bg-brightTeal px-6 py-3 font-crimson text-base text-white"
            // onClick={() => setStep((prev) => prev + 1)}
          >
            Next
          </button>
          <button
            type="button"
            className="w-full rounded-lg border border-primaryColor bg-transparent px-6 py-3 font-crimson text-base text-white"
            onClick={() => setStep((prev) => prev - 1)}
          >
            Back
          </button>
        </div>
      </div>
    </form>
  );
};

export default Step2;
