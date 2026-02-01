import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import CustomFormik from "../../../components/form/CustomFormik";
import AppInputField from "../../../components/form/AppInputField";
import AppSubmitButton from "../../../components/form/AppSubmitButton";
import { resetPassword } from "../../../api";
import { successMessage, errorMessage } from "../../../utils/helpers";
import * as yup from "yup";

const validationSchema = yup.object({
  password: yup
    .string()
    .min(6, "Password too short")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Please confirm password"),
});

function ResetPasswordPage() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  // Prefer token from navigation state (safer), fallback to query param
  const token =
    (location?.state && location.state.token) ||
    searchParams.get("token") ||
    null;
  const navigate = useNavigate();

  const initialValues = { password: "", confirmPassword: "" };

  const handleSubmit = async (values, formikActions) => {
    if (!token) {
      errorMessage("Missing reset token");
      return;
    }
    try {
      const payload = { token, password: values.password };
      const res = await resetPassword(payload);
      if (res && (res.status === 200 || res.status === 201)) {
        successMessage(res?.data?.message || "Password reset successful");
        navigate("/login");
      } else {
        errorMessage(res?.data?.error || res?.data?.message || "Reset failed");
      }
    } catch (err) {
      console.error("reset error", err);
      errorMessage(err?.message || "Reset failed");
    } finally {
      if (formikActions && typeof formikActions.setSubmitting === "function")
        formikActions.setSubmitting(false);
    }
  };

  return (
    <div className="w-screen h-screen bg-primary-deep flex justify-center items-center">
      <div className="w-full lg:w-[500px] mx-auto border-[1px] border-gray-300 rounded-md p-5 lg:px-10 flex flex-col items-center gap-4">
        <div className="flex flex-col gap-2">
          <div className="font-semibold text-secondary-light">
            Reset Password
          </div>
          <div className="text-sm text-secondary-light">
            Enter your new password
          </div>
        </div>
        <CustomFormik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <div className="w-full mt-4 flex flex-col gap-6">
            <AppInputField
              name="password"
              type="password"
              placeholder="New password"
            />
            <AppInputField
              name="confirmPassword"
              type="password"
              placeholder="Confirm password"
            />
            <AppSubmitButton title="Reset Password" full={true} />
          </div>
        </CustomFormik>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
