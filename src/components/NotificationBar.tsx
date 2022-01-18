import { Snackbar, Alert } from "@mui/material";

type Props = {
  isOpen: boolean;
  onClose?: () => void;
  type: "error" | "info" | "success" | "warning";
  message: string;
};

const NotificationBar = ({ isOpen, onClose, message }: Props) => {
  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={4000}
      onClose={onClose}
      style={{ marginTop: "4em" }}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={onClose} severity="error" sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default NotificationBar;
