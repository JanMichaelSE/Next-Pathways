"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      className="bg-btn-gradient cursor-pointer text-4xl font-bold text-white w-60 h-20 shadow rounded-3xl border-none"
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
