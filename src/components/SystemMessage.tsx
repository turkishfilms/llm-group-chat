interface SystemMessageProps {
  text: string;
}

export default function SystemMessage({ text }: SystemMessageProps) {
  return (
    <div className="flex justify-center">
      <div className="inline-block px-3 py-1 bg-slate-200 rounded-full text-xs text-slate-600">
        {text}
      </div>
    </div>
  );
}
