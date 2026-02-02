import React, { createContext, useEffect, useState } from "react";

interface ThemeContextProps {
	theme: string;
	setTheme: (color: string) => void;
}

const ThemeContext = createContext<ThemeContextProps>({
	theme: "light",
	setTheme: () => {},
});

const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
	const [theme, setTheme] = useState(
		() => localStorage.getItem("theme") || "light"
	);

	useEffect(() => {
		localStorage.setItem("theme", theme);
		// Apply dark class to document root so it works with HeadlessUI Portals
		if (theme === "dark") {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, [theme]);

	const valueToShare = {
		theme: theme,
		setTheme: setTheme,
	};

	return (
		<ThemeContext.Provider value={valueToShare}>
			{children}
		</ThemeContext.Provider>
	);
};

export { ThemeContext, ThemeProvider };
