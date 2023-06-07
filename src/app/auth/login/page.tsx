"use client";

import Image from "next/image";
import LoginForm from "@/components/Login/LoginForm";
import SignupPopupSelector from "@/components/Login/SignupPopupSelector";
import ForgotPwdLoginPopup from "@/components/Login/ForgotPwdLoginPopup";

export default function Login() {
    return (
        <div className="bg-login bg-no-repeat bg-cover bg-center min-h-screen p-12">
            <div className="flex justify-center">
                <Image
                    width={500}
                    height={300}
                    src={"/assets/Pathway_Logo.png"}
                    alt="Logo"
                />
            </div>
            <div className="flex justify-center mt-6">
                <LoginForm />
            </div>
            <div className="grid justify-center justify-items-center">
                <h2 className="flex gap-1 mt-4 text-sm">
                    New to Pathways? <SignupPopupSelector />
                    <br />
                </h2>
                <h2 className="mt-4 text-sm">
                    <ForgotPwdLoginPopup />
                    <br />
                </h2>
            </div>
        </div>
    );
}
