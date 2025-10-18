import { Navigate, useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
	const navigate = useNavigate();
	const isAuth = !!localStorage.getItem("authToken");
	const handleNavigate = () => {
		if (isAuth) {
			navigate("/account");
		} else {
			navigate("/");
		}
	};
	return (
		<>
			<div className="min-h-screen flex flex-col items-center justify-center space-y-4">
				<h1 className="text-8xl font-bold">404</h1>
				<h2 className="text-xl font-semibol">Page not found</h2>
				<button
					onClick={handleNavigate}
					className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
					type="button"
				>
					Back to home
				</button>
			</div>
		</>
	);
};

export default NotFound;
