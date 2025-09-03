import * as React from "react";
type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "default"|"secondary"|"outline"; size?: "sm"|"md"|"lg" };
export const Button: React.FC<Props> = ({ variant="default", size="md", className="", ...props }) => {
  const base = "inline-flex items-center justify-center rounded-2xl transition px-4 py-2";
  const variants = {
    default: "bg-indigo-600 text-white hover:bg-indigo-700",
    secondary: "bg-indigo-100 text-indigo-900 hover:bg-indigo-200",
    outline: "border border-gray-300 bg-white hover:bg-gray-50",
  } as const;
  const sizes = { sm: "text-sm px-3 py-1.5", md: "text-base", lg: "text-lg px-5 py-3" } as const;
  return <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props} />;
};
