import { forwardRef } from "react";

import clsx from "clsx";

import type { InputProps } from "./input.types";

import { InputLabel } from "./input-label";

import { InputHelper } from "./input-helper";

import { InputError } from "./input-error";

import { containerStyles, wrapperStyles, inputStyles } from "./input.styles";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,

      helperText,

      error,

      leftIcon,

      rightIcon,

      containerClassName,

      required,

      className,

      ...props
    },

    ref
  ) => {
    return (
      <div
        className={clsx(
          containerStyles,

          containerClassName
        )}>
        {label && <InputLabel required={required}>{label}</InputLabel>}

        <div className={wrapperStyles}>
          {leftIcon && <div className="absolute left-3">{leftIcon}</div>}

          <input
            ref={ref}
            className={clsx(
              inputStyles,

              {
                "pl-10": leftIcon,

                "pr-10": rightIcon,

                "border-red-500 ring-red-300": !!error,
              },

              className
            )}
            required={required}
            {...props}
          />

          {rightIcon && <div className="absolute right-3">{rightIcon}</div>}
        </div>

        <InputHelper text={helperText} />

        <InputError message={error} />
      </div>
    );
  }
);

Input.displayName = "Input";
