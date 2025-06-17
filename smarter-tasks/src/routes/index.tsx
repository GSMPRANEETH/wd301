import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";

import AccountLayout from "../layouts/account";
import ProtectedRoute from "./ProtectedRoutes";
import Signin from "../pages/signin";
import Signup from "../pages/signup";
import Projects from "../pages/projects";
import MembersPage from "../pages/members";
import Logout from "../pages/logout";
import NotFound from "../pages/Notfound"; // make sure this component exists
import { MembersProvider } from "../context/members/context";
import ProjectContainer from "../pages/projects/ProjectContainer";
import ProjectDetails from "../pages/project_details";
import NewTask from "../pages/tasks/NewTask";
const router = createBrowserRouter([
	{ path: "/", element: <Navigate to="/account/projects" replace /> },
	{ path: "/signin", element: <Signin /> },
	{ path: "/signup", element: <Signup /> },
	{ path: "/logout", element: <Logout /> },
	{
		path: "account",
		element: (
			<ProtectedRoute>
				<MembersProvider>
					<AccountLayout />
				</MembersProvider>
			</ProtectedRoute>
		),
		children: [
			{ index: true, element: <Navigate to="/account/projects" replace /> },
			{
				path: "projects",
				element: <ProjectContainer />,
				children: [
					{ index: true, element: <Projects /> },
					{
						path: ":projectID",
						element: <ProjectDetails />,
						children: [
							{ index: true, element: <></> },
							{
								path: "tasks",
								children: [
									{ index: true, element: <Navigate to="../" /> },
									{
										path: "new",
										// Render `NewTask` component
										element: <NewTask />,
									},
									{
										path: ":taskID",
										children: [
											{ index: true, element: <>Show Task Details</> },
										],
									},
								],
							},
						],
					},
				],
			},
			{ path: "members", element: <MembersPage /> },
		],
	},

	// Not Found Route
	{ path: "/notfound", element: <NotFound /> },
	{ path: "*", element: <Navigate to="/notfound" replace /> },
]);

export default router;
