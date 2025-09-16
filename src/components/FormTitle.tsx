interface FormTitleProps {
  children: React.ReactNode;
}

const FormTitle = ({ children }: FormTitleProps) => {
  return <h1 className="text-3xl font-bold text-primary">{children}</h1>;
};

export default FormTitle;
