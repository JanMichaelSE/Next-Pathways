import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Image from "next/image";

import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import { Box } from '@mui/system';
import { styled } from '@mui/system';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import useMediaQuery from '@mui/material/useMediaQuery';

// TODO: CHANGE FOR SERVER ACTIONS
import { httpForgotPassword } from "@/actions/auth.actions";
import AlertPopup from "../UI/AlertPopup";


const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogContentCustom = styled(DialogContent)(({ theme }) => ({
  borderWidth: '2px',
  borderStyle: 'dashed',
  borderColor: '#0066CC',
}));

function ForgotPwdLoginPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccessfulAlertOpen, setIsSuccessfulAlertOpen] = useState(false);
  const [isErrorAlertOpen, setIsErrorAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const isLessThan1135 = useMediaQuery("(max-width: 1135px)");

  function onOpen() {
    setIsOpen(true);
  };

  function onClose() {
    setIsOpen(false);
  };

  async function handleEmailSubmit(email: string) {
    const userResponse = await httpForgotPassword(email);

    if (userResponse.hasError) {
      setAlertMessage(userResponse.errorMessage);
      setIsErrorAlertOpen(true);
      return;
    }

    setAlertMessage(userResponse.errorMessage);
    setIsSuccessfulAlertOpen(true);
    onClose();
  }
  function inputWidth() {
    return isLessThan1135 ? "22rem" : "25rem";
  }

  return (
    <>
      <button className="text-blue-500" onClick={onOpen}>
        Forgot password?
      </button>
      <Dialog
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={onClose}
        maxWidth="md"
        fullWidth
      >
        <DialogContentCustom>
          <DialogTitle>
            <Box className="relative flex items-center justify-center">
              <IconButton className="absolute left-0" onClick={onClose}>
                <Image src="/assets/back.svg" alt="Back Icon" width={40} height={40} />
              </IconButton>
              <div className="flex flex-col justify-center items-center">
                <h1 className="text-5xl font-bold">Forgot Password</h1>
                <h2 className="text-xl">Enter an email address you use to sign in to.</h2>
              </div>
            </Box>
          </DialogTitle>
          <DialogContent>
            <Formik
              initialValues={{ email: "" }}
              validationSchema={Yup.object({
                email: Yup.string().email("Invalid email address").required("Email is required"),
              })}
              onSubmit={async (values) => {
                await handleEmailSubmit(values.email);
              }}
            >
              <Form style={{ margin: "auto" }}>
                <div className="flex justify-center my-8">
                  <Input
                    name="email"
                    type="text"
                    placeholder="Email"
                    imgUrl="/assets/mail-icon.svg"
                    width={inputWidth()}
                  />
                </div>
                <div className="flex justify-center mb-8">
                  <Button style={{ width: "12rem" }}>
                    Send
                  </Button>
                </div>
              </Form>
            </Formik>
          </DialogContent>
        </DialogContentCustom>
      </Dialog>
      <AlertPopup type="success" open={isSuccessfulAlertOpen} setOpen={setIsSuccessfulAlertOpen} alertMessage={alertMessage} />
      <AlertPopup type="error" open={isErrorAlertOpen} setOpen={setIsErrorAlertOpen} alertMessage={alertMessage} />
    </>
  );
}

export default ForgotPwdLoginPopup;
