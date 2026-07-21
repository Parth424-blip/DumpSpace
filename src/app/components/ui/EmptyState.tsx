import Link from "next/link";

export function EmptyState({ title, description, actionText, actionHref }: { title: string, description: string, actionText: string, actionHref: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-neutral-800 border-dashed bg-neutral-900/30 px-6 py-24 text-center animate-in fade-in duration-500">
      <h3 className="text-lg font-medium text-white mb-2">{title}</h3>
      <p className="text-neutral-400 mb-6 max-w-sm">{description}</p>
      <Link 
        href={actionHref}
        className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition-transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
      >
        {actionText}
      </Link>
    </div>
  );
}
