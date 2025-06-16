// src/pages/notfound/index.tsx

import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 text-center">
			<h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
			<h2 className="text-2xl font-semibold text-gray-800 mb-2">
				Page Not Found
			</h2>
			<p className="text-gray-600 mb-6">
				The page you’re looking for doesn’t exist or has been moved.
			</p>
			<Link
				to="/account/projects"
				className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
			>
				Go to Dashboard
			</Link>
		</div>
	);
};

export default NotFound;
