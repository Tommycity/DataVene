import { useFormikContext } from "formik";

const AppTextAreaField = ({
  name,
  placeholder,
  className,
  rows = 4,
}) => {
  const { errors, values, touched, handleBlur, handleChange } =
    useFormikContext();

  const value = name && values ? values[name] : "";
  const error = name && errors ? errors[name] : "";
  const isInputTouched = name && touched ? touched[name] : false;

  return (
    <div className="flex flex-col gap-2">
      <textarea
        name={name}
        id={name}
        onChange={handleChange}
        onBlur={handleBlur}
        value={value}
        rows={rows}
        className={`border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        placeholder={placeholder}
      />
      {error && isInputTouched && <span className="error text-xs text-red-500">{error}</span>}
    </div>
  );
};

export default AppTextAreaField;