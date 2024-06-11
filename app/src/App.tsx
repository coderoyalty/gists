import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "./App.css";
import Header from "./components/header";
import Home from "./pages/home";
import { LoginPage, SignupPage } from "./pages/auth-page";
import { ThemeSwitch } from "./components/theme-switch";
import { AppContextProvider } from "./contexts/app.context";
import { Toaster } from "./components/ui/toaster";
import Discover from "./components/gists/discover";
import NotFound from "./components/not-found";

function Root() {
  return (
    <div className="dark:text-white">
      <Header />
      <Outlet />
    </div>
  );
}

const routers = createBrowserRouter([
  {
    path: "/",
    errorElement: <NotFound />,
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
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/discover",
            element: <Discover />,
          },
        ],
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
