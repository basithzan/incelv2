"use client";

import { Toaster as Sonner, ToasterProps } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "group toast group-[.toaster]:bg-white group-[.toaster]:text-neutral-900 group-[.toaster]:border-neutral-200 group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-neutral-600",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-white",
          cancelButton: "group-[.toast]:bg-neutral-100 group-[.toast]:text-neutral-600",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
