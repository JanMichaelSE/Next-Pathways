import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import useMediaQuery from '@mui/material/useMediaQuery';

import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";

import { useUserStore } from "@/store/user.store";
import { httpLogin } from "@/actions/auth.actions";
import AlertPopup from "../UI/AlertPopup";

// TODO:
// * Create reusable components Button and Input - DONE
// * Create Server Actions to Replace the Login request
// * Replace Chakra Functions with Tailwind equivalent / Headless UI
// * Replace React Router with Next Navigation
// * See how to replace Store

interface UserInfo {
  email: string;
  password: string;
}


function LoginForm() {
  const router = useRouter();
  // const location = useLocation();
  const role = useUserStore((state) => state.role);
  const setUser = useUserStore((state) => state.setUser);
  const setTokens = useUserStore((state) => state.setTokens);
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const isLessThan1135 = useMediaQuery("(max-width: 1135px)");

  useEffect(() => {
    // if (role && location.state?.from) {
      // router.push(location.state.from);
    if (role == "Student") {
      router.push("../student");
    } else if (role == "Mentor") {
      router.push("../mentor");
    } else if (role == "Admin") {
      router.push("../admin");
    }
  }, [role]);

  async function handleSubmit(userInfo: UserInfo) {

    if(!userInfo.email || !userInfo.password) {
      setOpen(true);
      setAlertMessage("Email and Password must be provided.");
      return;
    }

    const userResponse = await httpLogin(userInfo);

    console.log("User Response from Login Form:", userResponse);

    if (userResponse.hasError) {
      setOpen(true);
      setAlertMessage(userResponse.errorMessage ?? "");
      return;
    }

    setUser(userResponse.data.email, userResponse.data.role);
    setTokens(userResponse.data.accessToken, userResponse.data.refreshToken);
  }

  function inputWidth() {
    return isLessThan1135 ? "22rem" : "30rem";
  }

  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
          .email("Invalid email address")
          .required("Email is required"),
          password: Yup.string()
          .min(12, "Must Contain 12 Characters")
          .required("Password is required"),
        })}
        onSubmit={async (userInfo: UserInfo) => {
          await handleSubmit(userInfo);
        }}
      >
        <Form>
          <div className="flex flex-wrap flex-col justify-center items-center pt-8">
            <div className="mb-8">
              <Input
                name="email"
                type="text"
                placeholder="Email"
                imgUrl={"/assets/mail-icon.svg"}
                width={inputWidth()}
              />
            </div>

            <div className="mb-8">
              <Input
                name="password"
                type="password"
                placeholder="Password"
                imgUrl={"/assets/secure-icon.svg"}
                width={inputWidth()}
              />
            </div>

            <div className="my-6">
              <Button type="submit">Log In</Button>
            </div>
          </div>
        </Form>
      </Formik>
      <AlertPopup type="error" open={open} setOpen={setOpen} alertMessage={alertMessage} />
    </>
  );
}

export default LoginForm;
