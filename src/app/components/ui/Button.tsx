"use client";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", isLoading, children, disabled, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] hover:scale-[1.02]";
    
    const variants = {
      primary: "bg-white text-black hover:bg-neutral-200 focus:ring-white",
      secondary: "bg-transparent border border-neutral-700 text-white hover:bg-neutral-900 focus:ring-neutral-700",
      danger: "bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500/20 focus:ring-red-500",
      ghost: "bg-transparent text-neutral-400 hover:text-white hover:bg-neutral-800 focus:ring-neutral-700",
    };

    return (
      <button 
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${variants[variant]} ${className}`}
        {...props}
      >
        {isLoading ? "Loading..." : children}
      </button>
    );
  }
);
Button.displayName = "Button";
