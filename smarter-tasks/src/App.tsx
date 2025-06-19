// src/App.tsx

import { Suspense, useContext } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { ThemeContext } from "./context/theme";
import { ProjectsProvider } from "./context/projects/context";
import { MembersProvider } from "./context/members/context";

const App = () => {
	const { theme } = useContext(ThemeContext);
	return (
		<div
			className={`h-full w-full mx-auto py-2 ${theme === "dark" ? "dark" : ""}`}
		>
			<ProjectsProvider>
				<MembersProvider>
					<Suspense fallback={<>Loading...</>}>
						<RouterProvider router={router} />
					</Suspense>
				</MembersProvider>
			</ProjectsProvider>
		</div>
	);
};
export default App;
