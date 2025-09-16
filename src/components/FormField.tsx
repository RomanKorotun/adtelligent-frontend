import type { InputHTMLAttributes } from "react";
import type { FieldValues, Path, UseFormRegister } from "react-hook-form";

type FormFieldProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
  register: UseFormRegister<T>;
  error?: string;
};

export const FormField = <T extends FieldValues>({
  label,
  name,
  type = "text",
  register,
  error,
}: FormFieldProps<T>) => {
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
        <p className="absolute left-0 top-full text-error text-sm">{error}</p>
      )}
    </div>
  );
};
