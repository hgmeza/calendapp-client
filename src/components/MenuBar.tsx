import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const MenuBar = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "flex", md: "flex" } }}
          >
            Calendapp
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "flex" } }} />

          <Box sx={{ flexGrow: 0 }}>Login or Signup</Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default MenuBar;
