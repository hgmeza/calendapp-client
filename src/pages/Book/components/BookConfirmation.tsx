import { Modal, Box, Typography, Button, Grid, Divider } from "@mui/material";
import { UserInfo } from "../Book";

type Props = {
  date?: Date | null;
  isOpen: boolean;
  userInfo: UserInfo;
  onCloseModal: () => void;
  onConfirm: () => void;
};

const BookConfirmation = ({
  date,
  isOpen,
  userInfo,
  onCloseModal,
  onConfirm,
}: Props) => {
  const modalStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: 250,
    maxWidth: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const dateOptions = {
    weekday: "long" as "long",
    year: "numeric" as "numeric",
    month: "long" as "long",
    day: "numeric" as "numeric",
  };

  return (
    <Modal open={isOpen}>
      <Box sx={modalStyle}>
        <Typography id="modal-modal-title" variant="h5" component="div">
          Confirma los Datos
        </Typography>
        <Divider variant="inset" component="div" style={{ marginLeft: 0 }} />
        <Typography
          id="modal-modal-description"
          variant="subtitle1"
          component="div"
        >
          Dia de tu cita: <br />
          <Typography
            id="modal-modal-description"
            variant="subtitle1"
            component="i"
          >
            {date?.toLocaleDateString("es-ES", dateOptions)}
          </Typography>
        </Typography>
        <Typography
          id="modal-modal-description"
          variant="subtitle1"
          component="div"
        >
          Tu nombre: <br />
          <Typography
            id="modal-modal-description"
            variant="subtitle1"
            component="i"
          >
            {userInfo.firstName.value} {userInfo.lastName.value}
          </Typography>
        </Typography>
        <Typography
          id="modal-modal-description"
          variant="subtitle1"
          component="div"
        >
          Tu correo electronico: <br />
          <Typography
            id="modal-modal-description"
            variant="subtitle1"
            component="i"
          >
            {userInfo.email.value}
          </Typography>
        </Typography>
        {userInfo.phone.value && (
          <Typography
            id="modal-modal-description"
            variant="subtitle1"
            component="div"
          >
            Tu numero móvil: <br />
            <Typography
              id="modal-modal-description"
              variant="subtitle1"
              component="i"
            >
              {userInfo.phone.value}
            </Typography>
          </Typography>
        )}
        <Grid container spacing={2}>
          <Grid item xs={6} md={6}>
            <Button variant="contained" color="error" onClick={onCloseModal}>
              Cancelar
            </Button>
          </Grid>
          <Grid item xs={6} md={6}>
            <Button variant="contained" color="primary" onClick={onConfirm}>
              Confirmar
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default BookConfirmation;
