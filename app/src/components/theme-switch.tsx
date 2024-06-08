import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import React from "react";
import { Button } from "./ui/button";

type ThemeType = "dark" | "light";

export function ThemeSwitch({ render = true }) {
  const [theme, setTheme] = React.useState<ThemeType>(
    (localStorage.getItem("theme") as ThemeType) ?? "light"
  );

  React.useEffect(() => {
    localStorage.setItem("theme", theme);

    const body = document.querySelector("html")!;
    body.classList.toggle("dark", theme === "dark");
  }, [theme]);

  if (!render) {
    return <></>;
  }

  return (
    <>
      <div className="flex items-center space-x-2">
        <Button
          size="icon"
          variant="outline"
          onClick={() => {
            setTheme((value) => (value === "dark" ? "light" : "dark"));
          }}
        >
          {theme === "dark" ? (
            <MoonIcon className="w-5 h-5" />
          ) : (
            <SunIcon className="w-5 h-5" />
          )}
        </Button>
      </div>
    </>
  );
}
