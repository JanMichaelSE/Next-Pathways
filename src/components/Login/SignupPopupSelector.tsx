"use client"

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

function SignupPopupSelector() {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button className="text-blue-500" onClick={onOpen}>
        Create an account.
      </button>
      {(isOpen) && (
        <div
          id="myModal"
          tabIndex={-1}
          className={`flex fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 max-h-full ${isOpen ? '' : 'hidden'}`}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative w-full max-w-3xl max-h-full m-auto">
            <div className="relative bg-white rounded-3xl shadow dark:bg-gray-700 border-2 border-dashed border-blue-500">
              <div className="flex justify-center items-center p-4 rder-b rounded-t dark:border-gray-600">
                <div className="flex flex-col justify-center items-center space-x-4">
                  <div className="absolute left-10 cursor-pointer" onClick={onClose}>
                    <Image src="/assets/back.svg" alt="Back Icon" width={40} height={40} />
                  </div>
                  <div className="text-center font-bold mt-4">
                    <h1 className="text-4xl mb-4">Select Role</h1>
                  </div>
                </div>
              </div>
              <div className="p-2 space-y-6">
                <div className="flex justify-center mb-6">
                  <Link className="m-2 mx-5 mb-10 transition-all duration-300 transform hover:scale-110" href="/auth/signup?role=mentor">
                    <Image src="/assets/select-mentor-logo.svg" width={300} height={200} alt="Select Mentor Icon" />
                  </Link>
                  <Link className="m-2 mx-5 mb-10 transition-all duration-300 transform hover:scale-110" href="/auth/signup?role=student">
                    <Image src="/assets/select-student-logo.svg" width={300} height={200} alt="Select Student Icon" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SignupPopupSelector;
