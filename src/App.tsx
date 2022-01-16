import { Router, Outlet } from "react-location";
import MenuBar from "./components/MenuBar";
import { routes, location } from "./Routes";

const App = () => {
  return (
    <>
      <MenuBar />
      <Router routes={routes} location={location}>
        <Outlet />
      </Router>
    </>
  );
};

export default App;
