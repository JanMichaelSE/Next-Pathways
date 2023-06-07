"use client"

import React, { useState } from "react";

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import { Box } from '@mui/system';
import { styled } from '@mui/system';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

import Link from "next/link";
import Image from "next/image";

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
      <Dialog
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={onClose}
        maxWidth="xl"
      >
        <DialogContentCustom>
          <DialogTitle>
            <Box className="relative flex items-center justify-center">
              <IconButton className="absolute left-0" onClick={onClose}>
                <Image src="/assets/back.svg" alt="Back Icon" width={40} height={40} />
              </IconButton>
              <h1 className="text-5xl font-bold">Select Role</h1>
            </Box>
          </DialogTitle>
          <DialogContent>
            <Box className="flex justify-center pt-5">
              <Link className="m-2 mx-5 mb-10 transition-all duration-300 transform hover:scale-110" href="/auth/signup?role=mentor">
                <Image src="/assets/select-mentor-logo.svg" width={300} height={200} alt="Select Mentor Icon" />
              </Link>
              <Link className="m-2 mx-5 mb-10 transition-all duration-300 transform hover:scale-110" href="/auth/signup?role=student">
                <Image src="/assets/select-student-logo.svg" width={300} height={200} alt="Select Student Icon" />
              </Link>
            </Box>
          </DialogContent>
        </DialogContentCustom>
      </Dialog>
    </>
  );
}

export default SignupPopupSelector;
