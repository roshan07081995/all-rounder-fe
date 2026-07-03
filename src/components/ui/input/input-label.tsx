interface Props {
  children: React.ReactNode;

  required?: boolean;
}

export function InputLabel({
  children,

  required,
}: Props) {
  return (
    <label className="text-sm font-medium">
      {children}

      {required && <span className="ml-1 text-red-500">*</span>}
    </label>
  );
}
