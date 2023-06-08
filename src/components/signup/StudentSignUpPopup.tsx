import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { Modal } from "flowbite";

interface StudentSignUpPopupProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function StudentSignUpPopup({ isOpen, setIsOpen }: StudentSignUpPopupProps) {
    const router = useRouter();
    const modalRef = useRef(null);

    useEffect(() => {
        const modal = new Modal(modalRef.current);

        if (isOpen) modal.show();
        else modal.hide();
    }, [isOpen]);

    function proceedApp() {
        setIsOpen(false);
        router.push("../student/assessments");
    }

    return (
        <div
            id="myModal"
            ref={modalRef}
            tabIndex={-1}
            aria-hidden="true"
            className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
            <div className="relative w-full max-w-3xl max-h-full">
                <div className="relative bg-white rounded-3xl shadow dark:bg-gray-700 border-2 border-dashed border-blue-500">
                    <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                        <div className="flex items-center space-x-4">
                            <div>
                                <Image className="w-24 h-24" src="/assets/checkmark-icon.svg" width={96} height={96} alt="Checkmark Icon" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold">Your account has been created!</h1>
                                <p>
                                    Please click continue where you&#39ll have the opportunity to fill out an assessment.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="p-6 space-y-6">
                        <div className="flex justify-center">
                            <button
                                onClick={proceedApp}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudentSignUpPopup;
