import { Route, ReactLocation } from "react-location";
import Book from "./pages/Book/Book";
import Confirm from "./pages/Confirm/Confirm";
import Home from "./pages/Home/Home";

export const routes: Route[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/book",
    element: <Book />,
  },
  {
    path: "/confirm",
    element: <Confirm />,
  },
];
export const location = new ReactLocation();
