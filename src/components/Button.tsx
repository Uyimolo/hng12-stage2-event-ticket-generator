import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

const Button = ({
  type = "button",
  children,
  className = "",
  variant = "primary",
  disabled = false,
  onClick,
}: {
  type?: "submit" | "reset" | "button";
  className?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: "primary" | "secondary";
  disabled?: boolean;
}) => {
  const buttonClass =
    variant === "primary"
      ? " bg-brightTeal hover:bg-brightTeal/30"
      : " border border-primaryColor bg-transparent hover:bg-brightTeal/30";

  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(
        "w-full rounded-lg px-6 py-3 font-JejuMyeongjo text-base text-white",
        buttonClass,
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
