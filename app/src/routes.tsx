import { Outlet, RouteObject } from "react-router-dom";
import Header from "./components/header";
import Home from "./pages/home";
import { LoginPage, SignupPage } from "./pages/auth-page";
import { ThemeSwitch } from "./components/theme-switch";
import { Toaster } from "./components/ui/toaster";
import Discover from "./components/gists/discover";
import NotFound from "./components/not-found";
import GistPage from "./pages/gist-page";
import ProfilePage from "./pages/profile-page";

function Root() {
  return (
    <div className="dark:text-white">
      <Header />
      <Outlet />
    </div>
  );
}

const routes: RouteObject[] = [
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
          { path: "/:username", element: <ProfilePage /> },
          {
            path: "/:username/:gistId",
            element: <GistPage />,
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
];

export default routes;
