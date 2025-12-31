import { cn } from "@/lib/utils";
import { forwardRef, type TextareaHTMLAttributes } from "react";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[120px] w-full rounded-lg border bg-white px-4 py-3 text-base text-[#1F2933] transition-all duration-200 resize-none",
          "placeholder:text-[#888888]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1F33] focus-visible:ring-offset-0 focus-visible:border-transparent",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error
            ? "border-red-500 focus-visible:ring-red-500"
            : "border-[#e5e7eb] hover:border-[#1F3A5F]",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };


