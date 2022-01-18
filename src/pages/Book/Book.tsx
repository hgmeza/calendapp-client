import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { CalendarPicker, LocalizationProvider } from "@mui/lab";
import {
  Backdrop,
  Box,
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  Container,
  FormControlLabel,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React, { FormEvent, useEffect, useMemo, useState } from "react";
import { useSearch, useNavigate } from "react-location";
import { useGetProvider } from "../../hooks/useGetSpecialties";

import styles from "./Book.module.scss";
import TextInput from "./components/TextInput";
import BookConfirmation from "./components/BookConfirmation";
import NotificationBar from "../../components/NotificationBar";

type UserData = {
  label: string;
  value: string;
};

export type UserInfo = {
  firstName: UserData;
  lastName: UserData;
  email: UserData;
  phone: UserData;
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
      firstName: {
        label: "Nombre",
        value: "",
      },
      lastName: {
        label: "Apellido",
        value: "",
      },
      email: {
        label: "Correo Electrónico",
        value: "",
      },
      phone: {
        label: "Numbero Móvil",
        value: "",
      },
    }),
    [],
  );

  const requiredInfo = ["firstName", "lastName", "email"];

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
    console.log(key, value);
    setUserInfo({
      ...userInfo,
      [key]: {
        ...userInfo[key],
        value: value,
      },
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
          <Typography variant="h4" component="div">
            Selecciona tu cita
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
              Selecciona la hora
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
              <Typography variant="h4" component="div">
                Tu Información
              </Typography>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "25ch" },
                }}
                noValidate={false}
                autoComplete="off"
                onSubmit={onSubmit}
              >
                {Object.keys(userInfo).map((key, idx) => {
                  const keyData = userInfo[key as keyof UserInfo];
                  return (
                    <React.Fragment key={`user-info-${idx}`}>
                      <TextInput
                        label={keyData.label}
                        userKey={key as keyof UserInfo}
                        value={keyData.value}
                        onChange={onChange}
                        required={requiredInfo.includes(key)}
                      />
                    </React.Fragment>
                  );
                })}

                <FormControlLabel
                  control={<Checkbox />}
                  label="Es mi primera vez"
                />
                <br />
                <Button
                  type="submit"
                  variant="contained"
                  style={{ marginBottom: "5em" }}
                >
                  Verificar
                </Button>
              </Box>
            </Grid>
          </Grid>
        </div>
      </Container>
      <BookConfirmation
        date={date}
        isOpen={isOpen}
        onCloseModal={() => setIsOpen(false)}
        onConfirm={onConfirm}
        userInfo={userInfo}
      />
      <NotificationBar
        isOpen={isError}
        onClose={handleClose}
        message="Tienes que seleccionar una hora."
        type="error"
      />
    </>
  );
};

export default Book;
