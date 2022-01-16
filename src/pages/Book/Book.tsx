import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { CalendarPicker, LocalizationProvider } from "@mui/lab";
import {
  Alert,
  Backdrop,
  Box,
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  Container,
  FormControlLabel,
  Grid,
  Modal,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { useSearch, useNavigate } from "react-location";
import { useGetProvider } from "../../hooks/useGetSpecialties";

import styles from "./Book.module.scss";

type UserInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
};

const Book = () => {
  const { specialty, provider } = useSearch() as {
    specialty: string;
    provider: string;
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (!specialty || !provider) {
      navigate({ to: "/" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { data, isLoading } = useGetProvider(specialty, provider);
  const [date, setDate] = useState<Date | null>(new Date());
  const [selected, setSelected] = useState<number>();
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [isError, setIsError] = useState(false);

  const defaultUserInfo: UserInfo = useMemo(
    () => ({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      city: "",
      state: "",
    }),
    [],
  );

  useEffect(() => {
    if (isConfirmed) {
      setTimeout(() => {
        setIsConfirmed(false);
        setUserInfo(defaultUserInfo);
        navigate({ to: "/confirm" });
      }, 1500);
    }
  }, [defaultUserInfo, isConfirmed, navigate]);

  const [userInfo, setUserInfo] = useState(defaultUserInfo);
  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 6);
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isDateSelected) {
      setIsError(true);
      return;
    }
    setIsOpen(true);
  };

  const onChange = (key: keyof UserInfo, value: string) => {
    setUserInfo({
      ...userInfo,
      [key]: value,
    });
  };
  const onClick = (idx: number) => {
    if (idx === selected) {
      setSelected(undefined);
      setIsDateSelected(false);
    } else {
      setSelected(idx);
      setIsDateSelected(true);
    }
  };
  const handleClose = () => {
    setIsConfirmed(false);
    setIsError(false);
  };
  const style = {
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

  const closeModal = () => {
    setIsOpen(false);
  };

  const onConfirm = () => {
    setIsOpen(false);
    setIsConfirmed(true);
  };
  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: theme => theme.zIndex.drawer + 1 }}
        open={isLoading || isConfirmed}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Container maxWidth="xl">
        <div className={styles.title}>
          <Typography variant="h5" component="div">
            Book your appointment
          </Typography>
          <Typography variant="subtitle1" component="div">
            {specialty} - {provider}
          </Typography>
        </div>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <CalendarPicker
                date={date}
                onChange={newDate => setDate(newDate)}
                minDate={minDate}
                maxDate={maxDate}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              Select time
              <Stack direction="row" spacing={1} style={{ flexWrap: "wrap" }}>
                {data?.availability.map((time, idx) => {
                  return (
                    <div
                      onClick={() => onClick(idx)}
                      style={{ paddingBottom: "1em" }}
                      key={`chip-${idx}`}
                    >
                      <Chip
                        label={time}
                        style={{
                          cursor: "pointer",
                          width: 90,
                        }}
                        color={idx === selected ? "primary" : undefined}
                      />
                    </div>
                  );
                })}
              </Stack>
            </Grid>
          </Grid>
        </LocalizationProvider>
        <div>
          <Grid container spacing={2}>
            <Grid item xs={12} md={9}>
              <h1>Your information</h1>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "25ch" },
                }}
                noValidate={false}
                autoComplete="off"
                onSubmit={onSubmit}
              >
                <TextField
                  required
                  id="firstName"
                  label="First Name"
                  variant="standard"
                  value={userInfo.firstName}
                  onChange={event => onChange("firstName", event.target.value)}
                  className={styles.textfield}
                />
                <TextField
                  required
                  id="lastName"
                  label="Last Name"
                  variant="standard"
                  value={userInfo.lastName}
                  onChange={event => onChange("lastName", event.target.value)}
                  className={styles.textfield}
                />
                <br />
                <TextField
                  required
                  id="email"
                  label="email"
                  type="email"
                  variant="standard"
                  value={userInfo.email}
                  onChange={event => onChange("email", event.target.value)}
                  className={styles.textfield}
                />
                <TextField
                  id="phone"
                  label="phone"
                  variant="standard"
                  value={userInfo.phone}
                  onChange={event => onChange("phone", event.target.value)}
                  className={styles.textfield}
                />
                <br />
                <TextField
                  id="city"
                  label="city"
                  variant="standard"
                  value={userInfo.city}
                  onChange={event => onChange("city", event.target.value)}
                  className={styles.textfield}
                />
                <TextField
                  id="state"
                  label="state"
                  variant="standard"
                  value={userInfo.state}
                  onChange={event => onChange("state", event.target.value)}
                  className={styles.textfield}
                />
                <br />
                <FormControlLabel
                  control={<Checkbox />}
                  label="This is my first time"
                />
                <br />
                <Button
                  type="submit"
                  variant="contained"
                  style={{ marginBottom: "5em" }}
                >
                  SUBMIT
                </Button>
              </Box>
            </Grid>
          </Grid>
        </div>
        <Modal open={isOpen}>
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Confirm Appointment Information
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <div>
                Date of your appointment:{" "}
                <i>{date?.toLocaleDateString("en-US", dateOptions)}</i>
              </div>
              <div>
                Time of your appointment:{" "}
                <i>{data?.availability[selected || 0]}</i>
              </div>

              <div>
                First name: <i>{userInfo.firstName}</i>
              </div>
              <div>
                Last name: <i>{userInfo.lastName}</i>
              </div>
              <div>
                Email:<i> {userInfo.email}</i>
              </div>
              <div>
                Phone: <i>{userInfo.phone}</i>
              </div>
              <div>
                City: <i>{userInfo.city}</i>
              </div>
              <div>
                State: <i>{userInfo.state}</i>
              </div>
            </Typography>
            <Button variant="contained" color="error" onClick={closeModal}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={onConfirm}>
              Confirm
            </Button>
          </Box>
        </Modal>
      </Container>
      <Snackbar open={isError} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Please select a date.
        </Alert>
      </Snackbar>
    </>
  );
};

export default Book;
