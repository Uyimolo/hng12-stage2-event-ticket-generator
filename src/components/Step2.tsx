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
import envelope from "@/assets/svgs/envelope.svg";
import { BiError } from "react-icons/bi";
import Button from "./Button";

const initialStep2Data = [
  {
    type: "text",
    name: "avatarURL",
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
  setStep,
}: {
  setFormData: Dispatch<SetStateAction<FormDataType>>;
  formData: FormDataType;
  setStep: Dispatch<SetStateAction<number>>;
}) => {
  const [errors, setErrors] = useState({
    avatarURL: "",
    fullName: "",
    email: "",
    specialRequest: "",
  });

  const [step2Data, setStep2Data] = useState(initialStep2Data);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "avatarURL": {
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

  // sync local form data to parent form data on page mount
  useEffect(() => {
    setStep2Data((prevStep2Data) =>
      prevStep2Data.map((field) => ({
        ...field,
        value: String(formData[field.name as keyof FormDataType]),
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

    // Update parent form state to persist changes (local form state isnt persisted to localStorage)
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

      // handle validation for required fields
      if (field.required && !field.value.trim()) {
        newErrors[field.name as keyof typeof errors] =
          field.name === "avatarURL"
            ? "Please upload an image"
            : "This field is required";
        hasError = true;
      }
    });

    setErrors(newErrors);

    if (hasError) return;

    const updatedFormData = {
      avatarURL:
        step2Data.find((field) => field.name === "avatarURL")?.value || "",
      fullName:
        step2Data.find((field) => field.name === "fullName")?.value || "",
      email: step2Data.find((field) => field.name === "email")?.value || "",
      specialRequest:
        step2Data.find((field) => field.name === "specialRequest")?.value || "",
      ticketType: formData.ticketType,
      numberOfTickets: formData.numberOfTickets,
    };

    setFormData(updatedFormData);

    // Move to the next step
    setStep((prev) => prev + 1);
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    // reset errors cause error messages still show when retrying after an error
    setErrors((prevErrors) => ({
      ...prevErrors,
      avatarURL: "",
    }));

    const file = acceptedFiles[0];

    // validate file type (image only) can't believe i almost forgot this
    if (!file.type.startsWith("image/")) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        avatarURL: "Only image files are allowed",
      }));
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        avatarURL: "File size must be less than 5MB",
      }));
      return;
    }

    // Generate previewURL for showing preview of selected file
    const localPreviewUrl = URL.createObjectURL(file);
    setPreviewUrl(localPreviewUrl);

    // Upload to Cloudinary
    const cloudinaryUrl = await uploadImage(file);

    // Update state with Cloudinary URL
    handleInputChange("avatarURL", cloudinaryUrl);

    // Cleanup the object URL after Cloudinary upload to free memory
    URL.revokeObjectURL(localPreviewUrl);
  }, []);

  const { getInputProps, getRootProps } = useDropzone({ onDrop });

  const uploadImage = async (file: File) => {
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ticket-generator");

      const cloudName = process.env.NEXT_PUBLIC_CLOUD_NAME;
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        { method: "POST", body: formData },
      );

      const data = await response.json();

      if (!response.ok)
        throw new Error(data?.error?.message || "Upload failed");

      setUploading(false);
      return data.secure_url;
    } catch (error) {
      console.error("Image upload error:", error);
      setUploading(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      <div className="space-y-3">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h1 className="font-JejuMyeongjo text-2xl font-thin leading-none text-white md:text-[32px]">
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
              className={cn(
                "group relative z-10 mx-auto grid aspect-square w-full max-w-[240px] cursor-pointer place-content-center gap-4 overflow-hidden rounded-[32px] border-4 border-brightTeal bg-secondaryColor bg-cover text-white",
                errors.avatarURL && "border-red-400",
              )}
              style={{
                backgroundImage: `url(${formData.avatarURL || previewUrl})`,
              }}
            >
              <input {...getInputProps()} />

              <div
                className={cn(
                  !previewUrl === null || !formData.avatarURL
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

                {uploading && (
                  <p className="text-center text-sm">Uploading Image...</p>
                )}

                {errors.avatarURL && (
                  <p className="mx-auto mt-4 flex w-fit items-center gap-1 font-roboto text-sm text-red-400">
                    <BiError className="text-lg text-red-400" />{" "}
                    {errors.avatarURL}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* divider */}
        <div className="h-1 w-full space-y-2 bg-secondaryColor" />

        {/* form inputs */}
        {step2Data.map((input) => (
          <div key={input.name} className="relative flex flex-col space-y-4">
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
                    "h-[127px] rounded-xl border border-secondaryColor bg-transparent p-3 text-white placeholder:text-sm hover:bg-brightTeal/30",
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
                  {`${input.label} ${input.required && "*"}`}
                </label>
                <div className="relative w-full">
                  <input
                    type={input.type}
                    name={input.name}
                    value={input.value}
                    placeholder={input.placeholder}
                    onChange={(e) =>
                      handleInputChange(input.name, e.target.value)
                    }
                    className={cn(
                      "w-full rounded-xl border border-secondaryColor bg-transparent p-3 text-white placeholder:text-sm hover:bg-brightTeal/30",
                      input.style,
                      input.name === "email" && "pl-12",
                      errors[input.name as keyof typeof errors] &&
                        "border-red-400 outline-transparent",
                    )}
                  />

                  {input.name === "email" && (
                    <Image
                      src={envelope}
                      alt="envelope icon"
                      className="absolute left-4 top-1/2 -translate-y-1/2"
                    />
                  )}
                </div>
              </>
            )}

            {/* error messages */}
            {errors[input.name as keyof typeof errors] &&
              input.name !== "avatarURL" && (
                <p className="absolute -bottom-6 right-2 flex items-center gap-1 font-roboto text-sm text-red-400">
                  <BiError className="text-lg text-red-400" />{" "}
                  {errors[input.name as keyof typeof errors]}
                </p>
              )}
          </div>
        ))}

        <div className="flex flex-col gap-4 md:flex-row-reverse md:gap-6">
          <Button type="submit">Get My Free Ticket</Button>

          <Button
            variant="secondary"
            onClick={() => setStep((prev) => prev - 1)}
          >
            Back
          </Button>
        </div>
      </div>
    </form>
  );
};

export default Step2;
