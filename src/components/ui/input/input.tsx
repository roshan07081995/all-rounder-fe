import { forwardRef, useId, useMemo, useState } from "react";

import clsx from "clsx";

import type { InputProps } from "./input.types";
import { InputLabel } from "./input-label";
import { InputHelper } from "./input-helper";
import { InputError } from "./input-error";
import { InputPasswordToggle } from "./input-password-toggle";

import { containerStyles, wrapperStyles, inputStyles } from "./input.styles";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      leftIcon,
      rightIcon,
      required,
      className,
      containerClassName,
      id,
      type = "text",
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    const helperId = useMemo(() => `${inputId}-helper`, [inputId]);

    const errorId = useMemo(() => `${inputId}-error`, [inputId]);

    const [showPassword, setShowPassword] = useState(false);

    const inputType =
      type === "password" ? (showPassword ? "text" : "password") : type;

    const describedBy = [helperText ? helperId : "", error ? errorId : ""]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={clsx(containerStyles, containerClassName)}>
        {label && (
          <InputLabel htmlFor={inputId} required={required}>
            {label}
          </InputLabel>
        )}

        <div className={wrapperStyles}>
          {leftIcon && (
            <div className="absolute left-3 text-slate-400">{leftIcon}</div>
          )}

          <input
            ref={ref}
            id={inputId}
            type={inputType}
            aria-invalid={!!error}
            aria-describedby={describedBy || undefined}
            className={clsx(
              inputStyles,
              {
                "pl-10": leftIcon,
                "pr-10": rightIcon || type === "password",
                "border-red-500": !!error,
              },
              className
            )}
            {...props}
          />

          {type === "password" ? (
            <InputPasswordToggle
              visible={showPassword}
              onToggle={() => setShowPassword((value) => !value)}
            />
          ) : (
            rightIcon && (
              <div className="absolute right-3 text-slate-400">{rightIcon}</div>
            )
          )}
        </div>

        <InputHelper id={helperId} text={helperText} />

        <InputError id={errorId} message={error} />
      </div>
    );
  }
);

Input.displayName = "Input";
