interface InputLabelProps {
  children: React.ReactNode;
  htmlFor: string;
  required?: boolean;
}

export function InputLabel({ children, htmlFor, required }: InputLabelProps) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block text-sm font-medium">
      {children}

      {required && <span className="ml-1 text-red-500">*</span>}
    </label>
  );
}
