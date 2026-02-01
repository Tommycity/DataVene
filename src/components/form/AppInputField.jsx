import { useFormikContext } from "formik";
import { useState } from "react";
import { FaEye } from "react-icons/fa";

const AppInputField = ({
  name,
  type,
  placeholder,
  className,
  defaultValue,
  splitComma = false,
}) => {
  const { errors, values, touched, handleBlur, setFieldValue } =
    useFormikContext() || {};
  const [showPassword, setshowPassword] = useState(false);

  const value = name && values ? values[name] : undefined;
  const error = name && errors ? errors[name] : undefined;
  const isInputTouched = name && touched ? touched[name] : undefined;

  const togglePassword = () => {
    setshowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const val = e.target.value;
    if (name && typeof setFieldValue === "function") {
      if (splitComma) {
        const arr = val
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
        setFieldValue(name, arr);
      } else {
        setFieldValue(name, val);
      }
    }
  };

  // input display value: if Formik value is array and splitComma, join it for display
  const displayValue =
    splitComma && Array.isArray(value)
      ? value.join(", ")
      : value ?? defaultValue ?? "";

  return (
    <div className={`flex w-full flex-col gap-1 ${className}`}>
      {type == "password" ? (
        <div className=" flex flex-col gap-2">
          <div className="flex gap-2 items-center primary-input h-[35px]">
            <input
              onChange={handleChange}
              onBlur={handleBlur}
              value={displayValue}
              type={showPassword ? "text" : "password"}
              name={name}
              id={name}
              placeholder={placeholder}
              className="h-full w-[90%] bg-transparent border-0 border-black outline-0 p-3"
            />
            <FaEye onClick={togglePassword} className="cursor-pointer" />
          </div>
          {error && <span className="error">{error}</span>}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <input
            name={name}
            id={name}
            onChange={handleChange}
            onBlur={handleBlur}
            value={displayValue}
            defaultValue={defaultValue}
            type={type}
            placeholder={placeholder}
            className="primary-input w-full h-[35px] p-3"
          />
          {error && isInputTouched && <span className="error">{error}</span>}
        </div>
      )}
    </div>
  );
};

export default AppInputField;
