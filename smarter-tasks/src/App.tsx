import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { Suspense, useContext } from "react";
import { ThemeContext } from "./context/theme";
import { ProjectsProvider } from "./context/projects/context";
import { MembersProvider } from "./context/members/context";
import ErrorBoundary from "./components/ErrorBoundary";

const App = () => {
	const { theme } = useContext(ThemeContext);
	return (
		<div
			className={`h-screen w-full mx-auto py-2 ${
				theme === "dark" ? "dark" : ""
			}`}
		>
			<ProjectsProvider>
				<MembersProvider>
					<ErrorBoundary>
						<Suspense
							fallback={
								<div className="min-h-screen flex items-center justify-center">
									<p className="text-8xl font-semibold">Loading...</p>
								</div>
							}
						>
							<RouterProvider router={router} />
						</Suspense>
					</ErrorBoundary>
				</MembersProvider>
			</ProjectsProvider>
		</div>
	);
};

export default App;
