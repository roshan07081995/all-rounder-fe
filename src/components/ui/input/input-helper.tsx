interface Props {
  id: string;
  text?: string;
}

export function InputHelper({ id, text }: Props) {
  if (!text) return null;

  return (
    <p id={id} className="text-xs text-slate-500">
      {text}
    </p>
  );
}
