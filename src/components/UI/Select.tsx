"use client"

import { useField, ErrorMessage } from "formik";
import { ReactNode } from "react";

interface SelectProps {
  id?: string;
  label?: string;
  name: string;
  placeholder?: string;
  isBlue?: boolean;
  children?: ReactNode;
}

function Select({ label, isBlue, children, ...props }: SelectProps) {
  const [field, meta] = useField(props);

  function selectErrorStyles() {
    return (meta.touched && meta.error) ? "border-rose-500" : "";
  }

  function labelErrorStyles() {
    return (meta.touched && meta.error) ? "text-rose-500" : "";
  }

  function isBlueStyles() {
    return (isBlue) ? "text-blue-600" : "";
  }

  return (
    <div>
      <label htmlFor={props.id || props.name} className={`block text-base font-bold text-gray-500 pb-1 ml-5 ${labelErrorStyles()} ${isBlueStyles()}`}>
        {label}
      </label>
      <select className={`appearance-none bg-select text-base bg-white border border-gray-400 shadow-md rounded-full px-5 h-16 w-80 transition-width duration-400 ease-in-out ${selectErrorStyles()}`} {...field} {...props}>
        {children}
      </select>
      <span className="block ml-5 mt-1 text-rose-500 text-sm">
        <ErrorMessage name={props.name} />
      </span>
    </div>
  );
}

export default Select;
