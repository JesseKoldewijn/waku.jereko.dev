"use client";

import cookies from "cookie";
import { LucideMoon, LucideSun } from "lucide-react";
import { useRef, useState } from "react";

import { themeCookieKey } from "@/middleware/cookie";
import { Theme } from "@/types/theme";

import { Label } from "../ui/label";
import { Switch } from "../ui/switch";

interface ThemeToggleProps {
  initialTheme?: Theme;
}

const ThemeToggle = ({ initialTheme = "dark" }: ThemeToggleProps) => {
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const ref = useRef<HTMLButtonElement>(null);

  const toggleTheme = () => {
    const isChecked = ref.current?.dataset.state === "checked";

    const newTheme = isChecked ? "light" : "dark";

    setTheme(newTheme);

    const appRoot = document.querySelector("html");

    if (appRoot) {
      if (newTheme === "dark") {
        appRoot.classList.add("dark");
      } else {
        appRoot.classList.remove("dark");
      }

      const cookieJar = cookies.parse(document.cookie);
      cookieJar[themeCookieKey] = newTheme;
      document.cookie = cookies.serialize(themeCookieKey, newTheme, {
        maxAge: 60 * 60 * 24 * 7,
        httpOnly: false,
        sameSite: "lax",
        path: "/",
      });
    }
  };

  return (
    <div className="flex flex-row-reverse items-center gap-2 space-x-2 [view-transition-name:theme_toggle] sm:flex-row">
      <Switch
        id="theme-toggle"
        ref={ref}
        onClick={toggleTheme}
        defaultChecked={initialTheme == "dark"}
        aria-labelledby="theme-toggle-label"
        role="switch"
      />
      <Label id="theme-toggle-label" htmlFor="theme-toggle">
        <span className="sr-only">{theme}-mode</span>
        <span aria-hidden="true">
          {theme === "dark" ? (
            <LucideMoon height={20} />
          ) : (
            <LucideSun height={20} />
          )}
        </span>
      </Label>
    </div>
  );
};

export default ThemeToggle;
