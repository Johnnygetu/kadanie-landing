import { Loader2 } from 'lucide-react';

export function Spinner({ label = 'Loading' }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-wine-700">
      <Loader2 className="h-8 w-8 animate-spin" />
      <p className="mt-3 text-sm text-wine-900/60">{label}…</p>
    </div>
  );
}

export function ErrorState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <p className="font-serif text-xl text-wine-800">Something went wrong</p>
      <p className="mt-2 text-sm text-wine-900/60 max-w-md">{message}</p>
    </div>
  );
}

export function EmptyState({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <p className="font-serif text-xl text-wine-800">{title}</p>
      {hint && <p className="mt-2 text-sm text-wine-900/60 max-w-md">{hint}</p>}
    </div>
  );
}
