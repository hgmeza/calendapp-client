import { Search } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  AlertTitle,
  Autocomplete,
  Avatar,
  Box,
  Button,
  Container,
  Modal,
  Rating,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { Link } from "react-location";
import { useQueryClient } from "react-query";

import {
  useGetBySpecialties,
  useGetSpecialties,
} from "../../hooks/useGetSpecialties";
import ProvidersCard from "./components/ProviderCard";

import styles from "./Home.module.scss";

const Home = () => {
  const queryClient = useQueryClient();
  const [specialty, setSpecialty] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(-1);
  const { data, error, isLoading } = useGetSpecialties();

  const hello = useGetBySpecialties(specialty);
  const onSearch = () => {
    if (!queryClient.getQueryData(["specialties", specialty])) {
      hello.refetch();
    }
  };

  const onChange = (
    e: SyntheticEvent<Element, Event>,
    value: { label: string } | null,
  ) => {
    e.preventDefault();
    setSpecialty(value?.label || "");
  };

  const modalStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: 250,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const onViewProvider = (idx: number) => {
    setSelectedIdx(idx);
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
    setSelectedIdx(-1);
  };
  return (
    <>
      <Container maxWidth="xl" className={styles.pageContainer}>
        <Snackbar
          open={!!error}
          autoHideDuration={4000}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {(error as Error)?.message}
          </Alert>
        </Snackbar>
        <div className={styles.logo}>
          <Typography variant="h5" component="div">
            LOGO GOES HERE
          </Typography>
        </div>
        <Typography variant="subtitle1" component="div">
          Reserva tu próxima cita seleccionando la especialidad
        </Typography>
        <div className={styles.textfieldContainer}>
          <Autocomplete
            options={data || []}
            onChange={onChange}
            renderInput={params => (
              <TextField
                {...params}
                label={isLoading ? "Cargando..." : "Busca por especialidad"}
              />
            )}
          />
        </div>
        <div className={styles.container}>
          <LoadingButton
            disabled={!specialty || hello.isLoading}
            variant="contained"
            endIcon={<Search />}
            loading={isLoading || hello.isLoading}
            loadingPosition="end"
            onClick={onSearch}
          >
            Search
          </LoadingButton>
        </div>
        <ProvidersCard
          data={hello.data || []}
          onViewProvider={onViewProvider}
        />
        <Modal
          open={isOpen}
          onClose={handleModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <Avatar alt={hello?.data?.[selectedIdx]?.provider} src="" />
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {hello?.data?.[selectedIdx]?.provider}
            </Typography>
            <Rating value={null} readOnly={true} />
            <Typography component="div" sx={{ mt: 2 }}>
              City: {hello?.data?.[selectedIdx]?.address.city}
            </Typography>
            <Typography component="div" sx={{ mt: 2 }}>
              Suite: {hello?.data?.[selectedIdx]?.address.suite}
            </Typography>
            <Typography component="div" sx={{ mt: 2 }}>
              Street: {hello?.data?.[selectedIdx]?.address.street}
            </Typography>
            <Typography component="div" sx={{ mt: 2 }}>
              Zipcode: {hello?.data?.[selectedIdx]?.address.zipcode}
            </Typography>
            <Link
              to={`/book?specialty=${hello?.data?.[selectedIdx]?.specialty}&provider=${hello?.data?.[selectedIdx]?.provider}`}
            >
              <Button variant="contained">Choose</Button>
            </Link>
          </Box>
        </Modal>
      </Container>
    </>
  );
};

export default Home;
