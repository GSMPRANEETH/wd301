import NotFound from "../pages/Notfound"; // make sure this component exists
import { MembersProvider } from "../context/members/context";
import ProjectContainer from "../pages/projects/ProjectContainer";

import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import AccountLayout from "../layouts/account";
import ProtectedRoute from "./ProtectedRoutes";

const Signin = React.lazy(() => import("../pages/signin"));
const Signup = React.lazy(() => import("../pages/signup"));
const Projects = React.lazy(() => import("../pages/projects"));
const MembersPage = React.lazy(() => import("../pages/members"));
const Logout = React.lazy(() => import("../pages/logout"));
const ProjectDetails = React.lazy(() => import("../pages/project_details"));
const NewTask = React.lazy(() => import("../pages/tasks/NewTask"));
const TaskDetailsContainer = React.lazy(
	() => import("../pages/tasks/TaskDetailsContainer")
);
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
		ErrorBoundary: () => <>Failed to load the page</>,
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
										element: <NewTask />,
									},
									{
										path: ":taskID",
										children: [
											{ index: true, element: <TaskDetailsContainer /> },
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
