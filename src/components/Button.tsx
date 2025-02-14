import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

const Button = ({
  type = "button",
  children,
  className = "",
  variant = "primary",
  onClick,
}: {
  type?: "submit" | "reset" | "button";
  className?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: "primary" | "secondary";
}) => {
  const buttonClass =
    variant === "primary"
      ? " bg-brightTeal hover:bg-brightTeal/30"
      : " border border-primaryColor bg-transparent hover:bg-brightTeal/30";

  return (
    <button
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
