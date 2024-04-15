import { RouterProvider } from "react-router-dom";
import "./App.css";
import root from "./router/rootRouter";

function App() {
  return <RouterProvider router={root} />;
}

export default App;
