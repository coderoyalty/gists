import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { AppContextProvider } from "./contexts/app.context";
import routes from "./routes";

const router = createBrowserRouter(routes);

function App() {
  return (
    <AppContextProvider>
      <RouterProvider router={router} />
    </AppContextProvider>
  );
}

export default App;
