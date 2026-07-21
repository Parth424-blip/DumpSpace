"use client";
import { Button } from "./Button";

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
  isConfirming?: boolean;
}

export function ConfirmDialog({ isOpen, title, description, onConfirm, onCancel, isConfirming }: ConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onCancel} aria-hidden="true"></div>
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        className="relative w-full max-w-md rounded-2xl border border-neutral-800 bg-neutral-900 p-6 shadow-2xl animate-in zoom-in-95 fade-in duration-200"
      >
        <h3 id="dialog-title" className="text-lg font-medium text-white mb-2">{title}</h3>
        <p className="text-sm text-neutral-400 mb-6">{description}</p>
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={onCancel} disabled={isConfirming}>Cancel</Button>
          <Button variant="danger" onClick={onConfirm} isLoading={isConfirming}>Confirm</Button>
        </div>
      </div>
    </div>
  );
}
