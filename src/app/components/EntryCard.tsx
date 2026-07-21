"use client";
import Link from "next/link";
import { formatRelativeDate } from "@/lib/utils/date";
import type { Entry } from "./DashboardClient";

interface EntryCardProps {
  entry: Entry;
  onDeleteClick: (id: string) => void;
  isDeleting: boolean;
}

export function EntryCard({ entry, onDeleteClick, isDeleting }: EntryCardProps) {
  return (
    <div className={`group flex flex-col gap-4 rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6 transition-colors hover:bg-neutral-900 relative ${isDeleting ? "opacity-50 pointer-events-none" : "animate-in fade-in slide-in-from-bottom-2 duration-300"}`}>
      <Link href={`/dashboard/entries/${entry.id}`} className="absolute inset-0 z-0" aria-label="View Entry" />
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 relative z-10 pointer-events-none">
        <span className="text-xs font-medium text-neutral-500">
          {formatRelativeDate(entry.created_at)}
        </span>
        
        <div className="flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity focus-within:opacity-100 pointer-events-auto">
          <Link 
            href={`/dump/edit/${entry.id}`}
            className="text-xs font-medium text-neutral-400 hover:text-white px-3 py-1.5 rounded-full hover:bg-neutral-800 transition-colors focus:ring-2 focus:ring-neutral-700 focus:outline-none"
            title="Edit Entry"
          >
            Edit
          </Link>
          <button 
            onClick={() => onDeleteClick(entry.id)}
            disabled={isDeleting}
            className="text-xs font-medium text-red-400 hover:text-red-300 px-3 py-1.5 rounded-full hover:bg-red-900/30 transition-colors focus:ring-2 focus:ring-red-900 focus:outline-none disabled:opacity-50"
            title="Delete Entry"
          >
            Delete
          </button>
        </div>
      </div>
      
      <p className="text-base leading-relaxed text-neutral-300 whitespace-pre-wrap line-clamp-4 relative z-10 pointer-events-none">
        {entry.content}
      </p>
      
      {entry.ai_reflection && (
        <div className="relative z-10 pointer-events-none">
          <div className="h-px w-full bg-neutral-800 my-2"></div>
          <div className="space-y-2 mt-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              AI Reflection
            </h4>
            <p className="text-sm leading-relaxed text-neutral-400 whitespace-pre-wrap line-clamp-3">
              {entry.ai_reflection}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
