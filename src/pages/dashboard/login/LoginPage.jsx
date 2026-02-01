import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import AppInputField from "../../../components/form/AppInputField";
import AppSubmitButton from "../../../components/form/AppSubmitButton";
import CustomFormik from "../../../components/form/CustomFormik";
import { loginAdminValues } from "../../../utils/initialValues";
import { validateLogin } from "../../../utils/validations";
import { loginAdmin } from "../../../api";
import { successMessage, errorMessage } from "../../../utils/helpers";
import Cookies from "js-cookie";

function LoginPage() {
  const initialValues = loginAdminValues();
  const validationSchema = validateLogin();
  const history = useNavigate();

  const handleSubmit = async (values, formikActions) => {
    console.log("login values", values);
    try {
      const res = await loginAdmin(values);
      console.log("res", res);

      if (res && res.status === 200) {
        // store token/header if provided
        if (res.headers && res.headers["u-x-key"]) {
          Cookies.set("u-x-key", res.headers["u-x-key"]);
        }
        successMessage(res?.data?.message || "Login successful");
        setTimeout(() => {
          history("/dashboard");
        }, 300);
      } else {
        const msg = res?.data?.error || res?.data?.message || "Login failed";
        errorMessage(msg);
      }
    } catch (err) {
      console.error("login error", err);
      errorMessage(err?.message || "Login failed");
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
            Welcome, Admin
          </div>
          <div className="text-sm text-secondary-light">
            Please login to continue
          </div>
        </div>
        <CustomFormik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <div className="w-full mt-4 flex flex-col gap-6">
            <AppInputField name="email" placeholder="Email address" />
            <AppInputField
              name="password"
              type="password"
              placeholder="******"
            />
            <AppSubmitButton title="Login" full={true} />

            <div className="flex justify-between items-center text-xs">
              <Link
                to="/forget-password"
                className="underline text-secondary-light hover:text-secondary-deep"
              >
                FORGET PASSWORD ?
              </Link>
              <Link
                to="/forget-password"
                className="underline text-secondary-light hover:text-secondary-deep"
              >
                RESET PASSWORD ?
              </Link>
            </div>
          </div>
        </CustomFormik>
      </div>
    </div>
  );
}

export default LoginPage;
