import { createBrowserRouter, Navigate } from "react-router-dom";

import Signin from "../pages/signin";
import Signup from "../pages/signup";
import AccountLayout from "../layouts/account";
import ProtectedRoute from "./ProtectedRoute";
import Projects from "../pages/projects";
import Members from "../pages/members";
import Logout from "../pages/logout";
import NotFound from "./NotFound";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Signin />,
	},
	{
		path: "/signin",
		element: <Signin />,
	},
	{
		path: "/signup",
		element: <Signup />,
	},
	{
		path: "/logout",
		element: <Logout />,
	},
	{
		path: "account",
		element: (
			<ProtectedRoute>
				<AccountLayout />
			</ProtectedRoute>
		),
		children: [
			{ index: true, element: <Navigate to="/account/projects" replace /> },
			{
				path: "projects",
				element: <Projects />,
			},
			{
				path: "members",
				element: <Members />,
			},
			{
				path: "*",
				element: <NotFound />,
			},
		],
	},
	{
		path: "*",
		element: <NotFound />,
	},
]);

export default router;
