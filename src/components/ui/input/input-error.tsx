interface Props {
  id: string;
  message?: string;
}

export function InputError({ id, message }: Props) {
  if (!message) return null;

  return (
    <p id={id} className="text-xs text-red-500">
      {message}
    </p>
  );
}
