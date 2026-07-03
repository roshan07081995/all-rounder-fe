import { forwardRef } from "react";

import clsx from "clsx";

import type { ButtonProps } from "./button.types";

import {
  buttonBaseStyles,
  buttonVariantStyles,
  buttonSizeStyles,
} from "./button.styles";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,

      variant = "primary",

      size = "md",

      loading = false,

      disabled,

      fullWidth = false,

      leftIcon,

      rightIcon,

      className,

      ...props
    },

    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={clsx(
          buttonBaseStyles,

          buttonVariantStyles[variant],

          buttonSizeStyles[size],

          {
            "w-full": fullWidth,
          },

          className
        )}
        {...props}>
        {loading ? (
          <span>Loading...</span>
        ) : (
          <>
            {leftIcon}

            {children}

            {rightIcon}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
