import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { Modal } from "flowbite";
import Button from "../UI/Button";

interface MentorSignUpPopupProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function MentorSignUpPopup({ isOpen, setIsOpen }: MentorSignUpPopupProps) {
    const router = useRouter();
    const modalRef = useRef(null);

    useEffect(() => {
        const modal = new Modal(modalRef.current);

        if (isOpen) modal.show();
        else modal.hide();
    }, [isOpen]);

    function navigateToHome() {
        setIsOpen(false);
        router.push("../mentor/records");
    }

    return (
        <div
            id="myModal"
            ref={modalRef}
            tabIndex={-1}
            aria-hidden="true"
            className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 max-h-full"
        >
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative w-full max-w-3xl max-h-full">
                <div className="relative bg-white rounded-3xl shadow dark:bg-gray-700 border-2 border-dashed border-blue-500">
                    <div className="flex justify-center items-center p-8 rder-b rounded-t dark:border-gray-600">
                        <div className="flex flex-col justify-center items-center space-x-4">
                            <div>
                                <Image className="w-28 h-28" src="/assets/checkmark-icon.svg" width={112} height={112} alt="Checkmark Icon" />
                            </div>
                            <div className="text-center text-blue-600 font-bold mt-4">
                                <h1 className="text-3xl mb-4">Your account has been submitted for approval!</h1>
                                <p className="text-2xl">
                                    You'll receive an email once its been verified.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="p-6 space-y-6">
                        <div className="flex justify-center mb-8">
                            <Button onClick={navigateToHome}>
                                Continue
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MentorSignUpPopup;
