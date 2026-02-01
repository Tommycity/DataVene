import { useFormikContext } from "formik";
import { FaEye } from "react-icons/fa";

const AddInputField = ({
  name,
  label,
  type = "text",
  placeholder,
  className,
  defaultValue,
  options,
  required,
}) => {
  const { errors, values, touched, handleBlur, handleChange } =
    useFormikContext();

  const value = values[name];
  const error = errors[name];
  const isInputTouched = touched[name];

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label className="text-gray-600 text-sm">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {options ? (
        <select
          name={name}
          value={value}
          onChange={handleChange}
          className="primary-input w-full h-[35px] p-2 border rounded"
        >
          <option value="">Select {label}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : type === "password" ? (
        <div className="flex gap-2 items-center primary-input h-[35px]">
          <input
            type="password"
            name={name}
            placeholder={placeholder}
            defaultValue={defaultValue}
            onChange={handleChange}
            className="h-full w-[90%] bg-transparent border-0 border-white p-3"
          />
          <FaEye />
        </div>
      ) : (
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          defaultValue={defaultValue}
          onChange={handleChange}
          className="w-full h-[35px] p-3 border rounded"
        />
      )}
      {error && isInputTouched && <span className="error">{error}</span>}
    </div>
  );
};

export default AddInputField;
