import React from "react";
import { Alert, AlertColor, Snackbar } from "@mui/material";

interface AlertPopupProps {
  type: AlertColor;
  alertMessage: string;
  vertical?: string;
  horizontal?: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function AlertPopup({type, alertMessage, open, setOpen}: AlertPopupProps) {
  function handleClose(event: any, reason: string) {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar anchorOrigin={{vertical: "top", horizontal: "center"}} open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
        {alertMessage}
      </Alert>
    </Snackbar>
  );
}

export default AlertPopup;
