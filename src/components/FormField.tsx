import type { InputHTMLAttributes } from "react";
import type { UseFormRegister } from "react-hook-form";
import type { SignupFormData } from "../forms/SignupForm";

type FormFieldProps = {
  label: string;
  name: keyof SignupFormData;
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
  register: UseFormRegister<SignupFormData>;
  error?: string;
};

export const FormField = ({
  label,
  name,
  type = "text",
  register,
  error,
}: FormFieldProps) => {
  return (
    <div className="mb-6 relative">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-primary mb-1"
      >
        {label}
      </label>

      <input
        id={name}
        type={type}
        {...register(name)}
        className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-focus ${
          error ? "border-error" : "bordersecondary"
        }`}
      />

      {error && (
        <p className="absolute left-0 top-full mt-1 text-error text-sm">
          {error}
        </p>
      )}
    </div>
  );
};
