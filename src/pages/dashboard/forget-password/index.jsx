import { useNavigate } from "react-router-dom";
import AppInputField from "../../../components/form/AppInputField";
import AppSubmitButton from "../../../components/form/AppSubmitButton";
import CustomFormik from "../../../components/form/CustomFormik";
import { loginAdminValues } from "../../../utils/initialValues";
import { validateLogin } from "../../../utils/validations";
import { forgetPassword } from "../../../api";
import { successMessage, errorMessage } from "../../../utils/helpers";

function ForgetPassword() {
  const navigate = useNavigate();
  const initialValues = loginAdminValues();
  const validationSchema = validateLogin();

  const handleSubmit = async (values, formikActions) => {
    try {
      const res = await forgetPassword(values);

      if (res?.status === 200) {
        // backend should return a token in res.data.token (or similar)
        const token = res?.data?.token || res?.data?.data?.token || null;
        if (!token) {
          successMessage(
            res?.data?.message || "Check your email for next steps"
          );
          navigate("/login");
          return;
        }

        successMessage(res?.data?.message || "Token generated");
        // redirect user to reset page and pass token in navigation state (safer than query string)
        navigate("/reset-password", { state: { token } });
      } else {
        errorMessage(
          res?.data?.error || res?.data?.message || "Operation failed"
        );
      }
    } catch (err) {
      console.error("error", err);
      errorMessage(err?.message || "Operation failed");
    } finally {
      if (formikActions && typeof formikActions.setSubmitting === "function") {
        formikActions.setSubmitting(false);
      }
    }
  };

  return (
    <div className="w-screen h-screen bg-primary-deep flex justify-center items-center">
      <div className="w-full lg:w-[500px] mx-auto border-[1px] border-gray-300 rounded-md p-5 lg:px-10 flex flex-col items-center gap-4">
        <div className="flex flex-col gap-2">
          <div className="font-semibold text-secondary-light">
            Forgot Password
          </div>
          <div className="text-sm text-secondary-light">
            Enter your email to receive a reset token
          </div>
        </div>
        <CustomFormik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <div className="w-full mt-4 flex flex-col gap-6">
            <AppInputField name="email" placeholder="Email address" />
            <AppSubmitButton title="Send Reset Token" full={true} />
          </div>
        </CustomFormik>
      </div>
    </div>
  );
}

export default ForgetPassword;
