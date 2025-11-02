import React, { createContext, useState } from "react";

interface ThemeContextProps {
	theme: string;
	setTheme: (color: string) => void;
}

const ThemeContext = createContext<ThemeContextProps>({
	theme: "light",
	setTheme: () => {},
});

const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
	const localTheme = localStorage.getItem("theme") || "light";
	const [theme, setTheme] = useState(localTheme);

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
