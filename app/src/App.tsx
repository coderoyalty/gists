import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "./App.css";
import Header from "./components/header";
import Home from "./pages/home";
import { LoginPage, SignupPage } from "./pages/auth-page";
import { ThemeSwitch } from "./components/theme-switch";

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
  return <RouterProvider router={routers} />;
}

export default App;
