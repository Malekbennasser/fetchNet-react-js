import "./App.css";
import { RouterProvider } from "react-router";
import Router from "./assets/Router/Router";

function App() {
  return (
    <>
      <RouterProvider router={Router} />
    </>
  );
}

export default App;
