interface Props {
  message?: string;
}

export function InputError({ message }: Props) {
  if (!message) return null;

  return <p className="text-xs text-red-500">{message}</p>;
}
