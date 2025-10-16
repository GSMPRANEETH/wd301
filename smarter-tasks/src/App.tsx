import Layout from "./Layout";
import HomePage from "./pages/HomePage";
import Signin from "./pages/Signin";
import TaskDetailsPage from "./pages/TaskDetailsPage";
import TaskListPage from "./pages/TaskListPage";
import {
	createBrowserRouter,
	Navigate,
	RouterProvider,
} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Navigate to="/signin" replace />,
	},
	{
		path: "/signin",
		element: <Signin />,
	},
	{
		element: (
			<ProtectedRoute>
				<Layout />
			</ProtectedRoute>
		),
		children: [
			{
				path: "/home",
				element: <HomePage />,
			},
			{
				path: "tasks",
				element: <TaskListPage />,
			},
			{
				path: "tasks/:id",
				element: <TaskDetailsPage />,
			},
		],
	},
	{
		path: "/notfound",
		element: (
			<ProtectedRoute>
				<NotFound />
			</ProtectedRoute>
		),
	},
	{
		element: (
			<ProtectedRoute>
				<NotFound />
			</ProtectedRoute>
		),
		children: [
			{
				path: "*",
				element: <Navigate to="/notfound" replace />,
			},
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
