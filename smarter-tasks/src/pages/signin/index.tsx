// Just import the file
import SigninForm from "./SigninForm";

const Signin: React.FC = () => {
	// To navigate programmatically, use: navigate("/dashboard", { replace: true });
	// And use it after the h1 tag

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="max-w-md w-full px-6 py-8 bg-white rounded-lg shadow-md">
				<h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
					Sign in
				</h1>
				<SigninForm />
				<p className="text-center text-gray-600 mt-4">
					Don&apos;t have an account?{" "}
					<a href="/signup" className="text-blue-600 hover:underline">
						Sign up
					</a>
				</p>
			</div>
		</div>
	);
};
export default Signin;
