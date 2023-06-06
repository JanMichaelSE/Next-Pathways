"use client";

import { useField, ErrorMessage } from "formik";
import { phoneFormat } from "@/utils/formatters.util";
import { ChangeEvent } from "react";

interface InputProps {
  id?: string;
  label?: string;
  name: string;
  placeholder?: string;
  type: string;
  imgUrl?: string;
  isBlue?: boolean;
  width?: string;
  height?: string;
}

function Input({ label, imgUrl, isBlue, type, ...props }: InputProps) {
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;

  function inputHasErrorStyle() {
     return (meta.touched && meta.error) ? "border-rose-500" : "";
  }

  function inputHasImgStyle() {
    return (imgUrl) ? "bg-no-repeat bg-left pl-20" : "";
  }

  function labelStyles() {
    let classNames = "block text-base font-bold text-gray-500 pb-1 ml-5";

    if (meta.touched && meta.error) {
      classNames += " label-error";
    }
    if (isBlue) {
      classNames += " " + "text-blue-600";
    }
    return classNames;
  }

  function formatInput(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;

    if (type === "tel") {
      return setValue(phoneFormat(value));
    }

    setValue(value);
  }

  return (
    <div>
      {label && (
        <label className={labelStyles()} htmlFor={props.id || props.name}>
          {label}
        </label>
      )}
      <input
        autoComplete="off"
        className={`text-base bg-white border border-gray-400 shadow-md rounded-full px-5 h-16 w-80 transition-width duration-400 ease-in-out ${inputHasErrorStyle()} ${inputHasImgStyle()}`}
        style={{
          width: props.width,
          height: props.height,
          backgroundImage: `url(${imgUrl})`,
          backgroundPosition: "top 0px left 20px"
        }}
        {...field}
        {...props}
        onChange={formatInput}
      />
      <span className="text-sm text-rose-500 block ml-5 mt-1">
        <ErrorMessage name={props.name} />
      </span>
    </div>
  );
}

export default Input;
