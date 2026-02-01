import { useFormikContext } from "formik";

const AppSubmitButton = ({
  title,
  disabled = false,
  className,
  full = false,
}) => {
  const { handleSubmit, isSubmitting } = useFormikContext();
  return (
    <button
      type="button"
      onClick={handleSubmit}
      disabled={disabled ? true : isSubmitting ? true : false}
      className={`${full ? "w-full" : "w-fit"} primary-btn p-2 ${
        (disabled || isSubmitting) && "opacity-50"
      } ${className}`}
    >
      {isSubmitting ? "Submitting..." : title}
    </button>
  );
};

export default AppSubmitButton;


