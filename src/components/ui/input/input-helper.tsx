interface Props {
  text?: string;
}

export function InputHelper({ text }: Props) {
  if (!text) return null;

  return <p className="text-xs text-gray-500">{text}</p>;
}
