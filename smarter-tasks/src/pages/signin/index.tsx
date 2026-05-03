import React from "react";
// Just import the file
import SigninForm from "./SigninForm";

const Signin: React.FC = () => {
	// And use it after the h1 tag
	return (
		<div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-bg to-surface">
			<div className="w-full max-w-sm space-y-8 view-enter">
				<div className="text-center space-y-2">
					<h2 className="text-4xl font-bold text-display tracking-tight">Welcome back</h2>
					<p className="text-muted text-sm">Sign in to Smarter Tasks to continue</p>
				</div>
				<div className="bg-surface border border-base rounded-2xl p-8 space-y-6 shadow-xl shadow-black/5">
					<SigninForm />
				</div>
			</div>
		</div>
	);
};
export default Signin;
