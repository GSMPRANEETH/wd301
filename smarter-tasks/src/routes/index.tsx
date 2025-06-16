import { createBrowserRouter, Navigate } from "react-router-dom";

import AccountLayout from "../layouts/account";
import ProtectedRoute from "./ProtectedRoute";
import Signin from "../pages/signin";
import Signup from "../pages/signup";
import Projects from "../pages/projects";
import MembersPage from "../pages/members";
import Logout from "../pages/logout";
import NotFound from "../pages/notfound"; // make sure this component exists
import { MembersProvider } from "../context/members/context";
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
			{ path: "projects", element: <Projects /> },
			{ path: "members", element: <MembersPage /> },
		],
	},
	// Protected Routes
	{
		path: "account",
		element: (
			<ProtectedRoute>
				<AccountLayout />
			</ProtectedRoute>
		),
		children: [
			{ index: true, element: <Navigate to="/account/projects" replace /> },
			{ path: "projects", element: <Projects /> },
			{ path: "members", element: <MembersPage /> },
		],
	},

	// Not Found Route
	{ path: "/notfound", element: <NotFound /> },
	{ path: "*", element: <Navigate to="/notfound" replace /> },
]);

export default router;
