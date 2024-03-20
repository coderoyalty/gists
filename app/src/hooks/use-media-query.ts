import React from "react";

export function useMediaQuery(query: string) {
  const [value, setValue] = React.useState(false);

  React.useEffect(() => {
    const onChange = (ev: MediaQueryListEvent) => {
      setValue(ev.matches);
    };

    const result = window.matchMedia(query);
    result.addEventListener("change", onChange);
    setValue(result.matches);

    return () => {
      result.removeEventListener("change", onChange);
    };
  }, [query]);

  return value;
}
