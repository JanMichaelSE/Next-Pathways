"use client"

import { useField } from "formik";
import CreatableSelect from "react-select/creatable";
import { StylesConfig } from 'react-select';

interface InputCreatableProps {
  id?: string;
  label?: string;
  name: string;
  placeholder?: string;
  width?: string;
  isBlue?: boolean;
  initOptions: string[];
  disabled?: boolean;
}

function InputCreatable({ initOptions, label, width, isBlue, ...props }: InputCreatableProps) {
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;
  const options = initOptions.map((option) => {
    return { value: option, label: option };
  });

  function handleSelectChange(selectValue: any) {
    setValue(selectValue.value);
  }

  function getDefaultValue() {
    let value = field.value.length > 0 ? field.value : "Select Option";
    return { value: value, label: value };
  }

  function labelErrorStyles() {
    return (meta.touched && meta.error) ? "text-rose-500" : "";
  }


  function isBlueStyles() {
    return (isBlue) ? "text-blue-500" : "";
  }

  return (
    <div>
      <label htmlFor={props.id || props.name} className={`block text-base font-bold text-gray-500 pb-1 ml-5 ${labelErrorStyles()} ${isBlueStyles()}`}>
        {label}
      </label>
      <CreatableSelect
        isDisabled={props.disabled}
        onChange={handleSelectChange}
        defaultValue={getDefaultValue()}
        placeholder="Enter Option"
        styles={{
          ...customSelectStyles,
          valueContainer: (styles) => ({
            ...styles,
            backgroundColor: "white",
            height: "60px",
            width: width,
            fontSize: "1rem",
            paddingLeft: "20px",
          }),
        }}
        options={options}
      />
    </div>
  );
}

export default InputCreatable;

const customSelectStyles: StylesConfig<string, false> = {
  control: (styles) => ({
    ...styles,
    textAlign: "left",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: "30px",
    resize: "none",
    overflow: "hidden",
  }),
  indicatorsContainer: (styles) => ({
    ...styles,
    backgroundColor: "white",
  }),
  indicatorSeparator: (styles) => ({
    ...styles,
    display: "none",
  }),
  dropdownIndicator: (styles) => ({
    ...styles,
    transform: "scale(3)",
    padding: "0",
    paddingRight: "1rem",
  }),
  clearIndicator: (styles) => ({
    ...styles,
    transform: "scale(2)",
    paddingRight: "2rem",
    color: "red",
    cursor: "pointer",
  }),
  menuList: (styles) => ({
    ...styles,
    textAlign: "left",
  }),
  placeholder: (styles) => ({
    ...styles,
    opacity: "0.6",
  }),
};
