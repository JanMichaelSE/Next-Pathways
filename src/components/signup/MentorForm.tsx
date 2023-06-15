import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { httpSignupMentor } from "@/actions/auth.actions";
import { useUserStore } from "@/store/user.store";

import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import Select from "@/components/UI/Select";
import AlertPopup from "@/components/UI/AlertPopup";
import InputCreatable from "@/components/UI/InputCreatable";
import { MentorInfo } from "@/types";
import MentorSignUpPopup from "./MentorSignupPopup";

function MentorForm() {
    const setUser = useUserStore((state) => state.setUser);
    const setTokens = useUserStore((state) => state.setTokens);
    const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const departmentValues = [
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

    async function handleSubmit(mentorInfo: MentorInfo) {
        const userResponse = await httpSignupMentor(mentorInfo);

        console.log("MENTOR SIGNUP RESPONSE: ", userResponse);

        if (userResponse.hasError) {
            setAlertMessage(userResponse.errorMessage);
            setIsAlertOpen(true);
            return;
        }

        setUser(userResponse.data.email, "Mentor");
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
                    academicDegree: "",
                    department: "",
                    facultyStatus: "",
                    areaOfInterest: "",
                }}
                validationSchema={Yup.object({
                    firstName: Yup.string().required("First Name is required"),
                    lastName: Yup.string().required("Last Name is required"),
                    phone: Yup.string()
                        .matches(
                            /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
                            "Phone number is not valid"
                        )
                        .min(10, "Phone number must be 10 digits")
                        .required("Phone is required"),
                    email: Yup.string().email("Invalid email address").required("Email is required"),
                    password: Yup.string()
                        .min(12, "Password must be at least 12 characters")
                        .required("Password is required"),
                    confirmPassword: Yup.string()
                        .oneOf([Yup.ref("password"), null], "Passwords must match")
                        .required("Password Confirmation is required"),
                    gender: Yup.string().oneOf(["Male", "Female", "Other"]).required("Gender is required"),
                    academicDegree: Yup.string().required("Academic Degree is required"),
                    department: Yup.string().required("Department is required"),
                    areaOfInterest: Yup.string().required("Area of Interest is required"),
                    facultyStatus: Yup.string()
                        .oneOf(["Instructor", "Assistant", "Associate", "Professor"])
                        .required("Faculty Status is required"),
                })}
                onSubmit={async (values) => {
                    await handleSubmit(values);
                }}
            >
                <Form className="max-w-7xl">
                    <div className="flex flex-wrap gap-7 pt-8">
                        <Input label="First Name *" name="firstName" type="text" />
                        <Input label="Last Name *" name="lastName" type="text" />
                        <Select label="Academic Degree *" name="academicDegree">
                            <option value="">Select Option</option>
                            <option value="Master">Master</option>
                            <option value="Doctorate">Doctorate</option>
                            <option value="Post Doctoral">Post Doctoral</option>
                        </Select>
                        <Input label="Phone *" name="phone" type="tel" />
                        <Input label="Email *" name="email" type="text" />
                        <Input label="Password *" name="password" type="password" />
                        <Input label="Confirm Password *" name="confirmPassword" type="password" />
                        <InputCreatable
                            label="Department *"
                            name="department"
                            initOptions={departmentValues}
                            width="16rem"
                        />
                        <Input label="Area of Interest *" name="areaOfInterest" type="text" />
                        <Select label="Gender *" name="gender">
                            <option value="">Select Option</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </Select>
                        <Select label="Faculty Status *" name="facultyStatus">
                            <option value="">Select Option</option>
                            <option value="Instructor">Instructor</option>
                            <option value="Assistant">Assistant</option>
                            <option value="Associate">Associate</option>
                            <option value="Professor">Professor</option>
                        </Select>
                    </div>

                    <div className="flex justify-end mr-16 mt-16">
                        <Button type="submit">Sign Up</Button>
                    </div>
                </Form>
            </Formik>
            <MentorSignUpPopup isOpen={isConfirmationPopupOpen} setIsOpen={setIsConfirmationPopupOpen} />
            <AlertPopup type="error" open={isAlertOpen} setOpen={setIsAlertOpen} alertMessage={alertMessage} />
        </div>
    );
}

export default MentorForm;
