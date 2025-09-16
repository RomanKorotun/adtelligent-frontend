interface FormButtonProps {
  children: React.ReactNode;
}

export const FormButton = ({ children }: FormButtonProps) => {
  return (
    <button
      type="submit"
      className="w-full py-2 px-4 rounded-md border border-primary text-primary hover:bg-primary hover:text-light transition-colors"
    >
      {children}
    </button>
  );
};
