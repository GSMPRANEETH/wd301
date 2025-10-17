import React from "react";

const Dashboard: React.FC = () => {
	const userData = localStorage.getItem("userData");
	const parsedData = userData ? JSON.parse(userData) : null;

	const handleLogout = (event: React.MouseEvent<HTMLAnchorElement>) => {
		event.preventDefault();
		localStorage.clear();
	};

	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
			<h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
				Dashboard
			</h1>
			<div className="border p-2 border-solid border-gray-600 border-[3px]">
				<div className="flex">
					<p className="font-semibold mr-1">Name: </p>
					<p>{parsedData?.name}</p>
				</div>
				<div className="flex">
					<p className="font-semibold mr-1">Email:</p>
					<p>{parsedData?.email}</p>
				</div>
			</div>
			<a
				href="/sigin"
				id="logout-link"
				onClick={handleLogout}
				className="text-col-red hover:text-red-600 font-semibold p-1 border border-solid border-red-600 border-[3px] mt-4"
			>
				Log-out
			</a>
		</div>
	);
};

export default Dashboard;
