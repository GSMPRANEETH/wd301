import React from "react";

const Dashboard: React.FC = () => {
	const userData = JSON.parse(localStorage.getItem("userData") || "{}");

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
			<div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full text-center">
				<h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

				<div className="mb-4">
					<h3 id="user-name" className="text-lg text-gray-700">
						<span className="font-semibold">Name:</span>{" "}
						{userData.name || "N/A"}
					</h3>
				</div>
				<div className="mb-6">
					<h3 id="user-email" className="text-lg text-gray-700">
						<span className="font-semibold">Email:</span>{" "}
						{userData.email || "N/A"}
					</h3>
				</div>

				<a
					href="/logout"
					id="logout-link"
					onClick={() => {
						localStorage.removeItem("authToken");
						localStorage.removeItem("userData");
					}}
					className="inline-block bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition duration-200"
				>
					Logout
				</a>
			</div>
		</div>
	);
};

export default Dashboard;
