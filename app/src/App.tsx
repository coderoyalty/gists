import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "./App.css";
import Header from "./components/header";
import Home from "./pages/home";
import { LoginPage, SignupPage } from "./pages/auth-page";
import { ThemeSwitch } from "./components/theme-switch";
import { AppContextProvider } from "./contexts/app.context";
import { Toaster } from "./components/ui/toaster";

function Root() {
  return (
    <div className="dark:text-white">
      <Header />
      <Home />
    </div>
  );
}

const routers = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <ThemeSwitch render={false} />
        <Toaster />
        <Outlet />
      </>
    ),
    children: [
      {
        path: "/",
        element: <Root />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
    ],
  },
]);

function App() {
  return (
    <AppContextProvider>
      <RouterProvider router={routers} />
    </AppContextProvider>
  );
}

export default App;
