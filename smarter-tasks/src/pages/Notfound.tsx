import { useNavigate } from "react-router-dom";

const Notfound = () => {
	const navigate = useNavigate();

	const handleBackToHome = () => {
		navigate("/home");
	};
	return (
		<div className="TaskItem shadow-md border border-slate-100 flex flex-col items-center min-h-screen justify-center">
			<h1 className="text-4xl font-bold mb-4">404 Page Not Found</h1>
			<button
				className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				id="backToHomeButton"
				onAbort={handleBackToHome}
			>
				Go back to Home
			</button>
		</div>
	);
};

export default Notfound;
