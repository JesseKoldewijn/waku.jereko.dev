"use client";

import { useRef, useState } from "react";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Theme } from "@/types/theme";
import { themeCookieKey } from "@/middleware/cookie";

import cookies from "cookie";

interface ThemeToggleProps {
	initialTheme?: Theme;
}

const ThemeToggle = ({ initialTheme = "dark" }: ThemeToggleProps) => {
	const [theme, setTheme] = useState<Theme>(initialTheme);
	const ref = useRef<HTMLButtonElement>(null);

	const toggleTheme = () => {
		const isChecked = ref.current?.dataset.state === "checked";

		const newTheme = isChecked ? "light" : "dark";
		const isStuck =
			(newTheme == initialTheme ? true : false) &&
			isChecked &&
			initialTheme == "dark";

		setTheme(newTheme);

		const appRoot = document.querySelector("[data-app-root='true']");

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
		<div className="flex items-center space-x-2 [view-transition-name:theme_toggle]">
			<Switch
				id="airplane-mode"
				ref={ref}
				onClick={toggleTheme}
				defaultChecked={initialTheme == "dark"}
			/>
			<Label htmlFor="airplane-mode">{theme}-mode</Label>
		</div>
	);
};

export default ThemeToggle;
