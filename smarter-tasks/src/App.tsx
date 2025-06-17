// src/App.tsx

import { useContext } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { ThemeContext } from "./context/theme";
import { CommentProvider } from "./context/comment/context";
import { ProjectsProvider } from "./context/projects/context";

const App = () => {
	const { theme } = useContext(ThemeContext);

	return (
		<div
			className={`h-screen w-full mx-auto py-2 ${
				theme === "dark" ? "dark" : ""
			}`}
		>
			<ProjectsProvider>
				<CommentProvider>
					<RouterProvider router={router} />
				</CommentProvider>
			</ProjectsProvider>
		</div>
	);
};

export default App;
