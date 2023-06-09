import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { httpSignupStudent } from "@/actions/auth.actions";
import { useUserStore } from "@/store/user.store";

import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import Select from "@/components/UI/Select";
import AlertPopup from "@/components/UI/AlertPopup";
import InputCreatable from "@/components/UI/InputCreatable";
import StudentSignUpPopup from "@/components/signup/StudentSignUpPopup";
import { StudentInfo } from "@/types";

// TODO:
// * Need to create the Student Signup Up Popup
// * Define the httpSignupStudent Server Actions 

function StudentForm() {
    const setUser = useUserStore((state) => state.setUser);
    const setTokens = useUserStore((state) => state.setTokens);
    const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const fieldOfStudyValues = [
        "Architecture",
        "Business Administration",
        "Civil Engineering",
        "Computer Engineering",
        "Computer Science",
        "Electrical Engineering",
        "Environmental Engineering",
        "Industrial Engineering",
        "Mechanical Engineering",
    ];

    async function handleSubmit(studentInfo: StudentInfo) {
        const userResponse = await httpSignupStudent(studentInfo);

        console.log("SIGNUP RESPONSE: ", userResponse);

        if (userResponse.hasError) {
            setAlertMessage(userResponse.errorMessage);
            setIsAlertOpen(true);
            return;
        }

        setUser(userResponse.data.email, "Student");
        setTokens(userResponse.data.accessToken, userResponse.data.refreshToken);
        setIsConfirmationPopupOpen(true);
    }

    return (
        <div className="max-w-7xl">
            <Formik
                initialValues={{
                    firstName: "",
                    lastName: "",
                    phone: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                    gender: "",
                    fieldOfStudy: "",
                    institution: "",
                    gpa: "",
                }}
                validationSchema={Yup.object({
                    firstName: Yup.string().required("First Name is required"),
                    lastName: Yup.string().required("Last Name is required"),
                    phone: Yup.string()
                        .matches(
                            /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
                            "Phone number is not valid"
                        )
                        .min(10, "Phone number must be 10 digits"),
                    email: Yup.string().email("Invalid email address").required("Email is required"),
                    password: Yup.string()
                        .min(12, "Password must be at least 12 characters")
                        .required("Password is required"),
                    confirmPassword: Yup.string()
                        .oneOf([Yup.ref("password"), null], "Passwords must match")
                        .required("Password Confirmation is required"),
                    gender: Yup.string().oneOf(["Male", "Female", "Other"]).required("Gender is required"),
                    fieldOfStudy: Yup.string().required("Field of Study is required"),
                    institution: Yup.string().required("Institution is required"),
                    gpa: Yup.number()
                        .min(0.01, "GPA can not be less than 0.01")
                        .max(4, "GPA can not be more than 4.00"),
                })}
                onSubmit={async (values) => {
                    await handleSubmit(values);
                }}
            >
                <Form className="max-w-7xl">
                    <div className="flex flex-wrap gap-6 pt-8">
                        <Input label="First Name *" name="firstName" type="text" />
                        <Input label="Last Name *" name="lastName" type="text" />
                        <Input label="Phone" name="phone" type="tel" />
                        <Input label="Email *" name="email" type="text" />
                        <Input label="Password *" name="password" type="password" />
                        <Input label="Confirm Password *" name="confirmPassword" type="password" />
                        <InputCreatable
                            label="Field Of Study *"
                            name="fieldOfStudy"
                            initOptions={fieldOfStudyValues}
                            width="16rem"
                        />
                        <Input label="Institution *" name="institution" type="institution" />
                        <Select label="Gender *" name="gender">
                            <option value="">Select Option</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </Select>
                        <Input label="GPA" name="gpa" type="numeric" width="120px" />
                    </div>

                    <div className="flex justify-end mr-16 mt-16">
                        <Button type="submit">Sign Up</Button>
                    </div>
                </Form>
            </Formik>
            <StudentSignUpPopup isOpen={isConfirmationPopupOpen} setIsOpen={setIsConfirmationPopupOpen} />
            <AlertPopup type="error" open={isAlertOpen} setOpen={setIsAlertOpen} alertMessage={alertMessage} />
        </div>
    );
}

export default StudentForm;
