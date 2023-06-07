"use client"

import { useField, ErrorMessage } from "formik";

interface SelectProps {
  id?: string;
  label?: string;
  name: string;
  placeholder?: string;
  isBlue?: boolean;
}

function Select({ label, isBlue, ...props }: SelectProps) {
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
      <label htmlFor={props.id || props.name} className={`block text-[#5c5d60] text-2xl font-bold pb-1 ml-6 ${labelErrorStyles()} ${isBlueStyles()}`}>
        {label}
      </label>
      <select className={`appearance-none bg-select border border-gray-300 rounded-full py-2 px-5 h-15 w-80 shadow-md bg-no-repeat bg-right-5 bg-top-1 bg-opacity-50 text-base ${selectErrorStyles()}`} {...field} {...props} />
      <span className="block ml-5 mt-1 text-rose-500 text-sm">
        <ErrorMessage name={props.name} />
      </span>
    </div>
  );
}

export default Select;
