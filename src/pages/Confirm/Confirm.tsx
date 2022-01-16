import { Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-location";

const Confirm = () => {
  const [count, setCount] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [count]);

  useEffect(() => {
    if (count === 0) {
      navigate({ to: "/" });
    }
  }, [count, navigate]);

  return (
    <Container maxWidth="xl">
      <Typography
        variant="h3"
        component="div"
        style={{
          paddingTop: "3em",
          display: "flex",
          justifyContent: "center",
        }}
      >
        You are all set!
      </Typography>
      <Typography
        variant="subtitle1"
        component="div"
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        You will receive an email confirmation once your provider confirms your
        appointment
      </Typography>
      <Typography
        variant="subtitle2"
        component="div"
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        Redirecting in {count}
      </Typography>
    </Container>
  );
};

export default Confirm;
