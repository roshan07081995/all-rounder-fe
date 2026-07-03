import type { ButtonSize, ButtonVariant } from "./button.types";

export const buttonBaseStyles = `
inline-flex
items-center
justify-center
gap-2
font-medium
transition-all
duration-200
focus:outline-none
focus:ring-2
focus:ring-blue-500
disabled:cursor-not-allowed
disabled:opacity-60
`;

export const buttonVariantStyles: Record<ButtonVariant, string> = {
  primary: "bg-blue-600 text-white hover:bg-blue-700",

  secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",

  outline: "border border-gray-300 bg-white hover:bg-gray-100",

  ghost: "bg-transparent hover:bg-gray-100",

  danger: "bg-red-600 text-white hover:bg-red-700",
};

export const buttonSizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-2 text-sm rounded-md",

  md: "px-4 py-2 rounded-lg",

  lg: "px-6 py-3 text-lg rounded-xl",
};
