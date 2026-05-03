import React from "react";
// Import the file
import SignupForm from "./SignupForm";

const Signup: React.FC = () => {
	// And use it after the h2 tag
	return (
		<div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-bg to-surface">
			<div className="w-full max-w-sm space-y-8 view-enter">
				<div className="text-center space-y-2">
					<h2 className="text-4xl font-bold text-display tracking-tight">Create an account</h2>
					<p className="text-muted text-sm">Sign up to get started with Smarter Tasks</p>
				</div>
				<div className="bg-surface border border-base rounded-2xl p-8 space-y-6 shadow-xl shadow-black/5">
					<SignupForm />
				</div>
			</div>
		</div>
	);
};
export default Signup;
