import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import * as Switch from "@radix-ui/react-switch";
import React from "react";

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
        <Switch.Root
          checked={theme === "dark"}
          onCheckedChange={() => {
            setTheme((value) => (value === "dark" ? "light" : "dark"));
          }}
          className="peer inline-flex h-8 w-14 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-slate-900 data-[state=unchecked]:bg-slate-200 dark:focus-visible:ring-slate-300 dark:focus-visible:ring-offset-slate-950 dark:data-[state=checked]:bg-slate-50 dark:data-[state=unchecked]:bg-slate-800"
        >
          <Switch.Thumb className="pointer-events-none bg-white rounded-full flex justify-center items-center p-[2px] shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-0 dark:bg-slate-950">
            {theme === "dark" ? (
              <MoonIcon className="w-5 h-5" />
            ) : (
              <SunIcon className="w-5 h-5" />
            )}
          </Switch.Thumb>
        </Switch.Root>
      </div>
    </>
  );
}
