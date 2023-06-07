"use client"

import StudentForm from "@/components/signup/StudentForm";
import MentorForm from "@/components/signup/MentorForm";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function Signup() {
    const params = useSearchParams();
    const searchTerm = params.get("role") || "";
    return (
        <>
            <div className="h-screen bg-signup bg-no-repeat bg-cover bg-center p-12">
                <div>
                    <h1 className="text-blue-500 text-4xl pb-2">Create Account</h1>
                    <h4 className="text-xl">
                        Already have an account?{" "}
                        <Link href={"/"} className="text-blue-500 no-underline">
                            Log In
                        </Link>
                    </h4>
                </div>
                {(() => {
                    if (searchTerm == "student") {
                        return <StudentForm />;
                    } else if (searchTerm == "mentor") {
                        return <MentorForm />;
                    }
                })()}
            </div>
        </>
    );
}

export default Signup;
