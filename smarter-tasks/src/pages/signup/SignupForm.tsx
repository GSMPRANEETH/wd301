import React from "react";
import { API_ENDPOINT } from "../../config/constants";
import { useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";

const SignupForm: React.FC = () => {
	const navigate = useNavigate();

	type Inputs = {
		organisationName: string;
		userName: string;
		userEmail: string;
		userPassword: string;
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		const organisationName = data.organisationName;
		const userName = data.organisationName;
		const userEmail = data.userEmail;
		const userPassword = data.userPassword;

		try {
			const response = await fetch(`${API_ENDPOINT}/organisations`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: organisationName,
					user_name: userName,
					email: userEmail,
					password: userPassword,
				}),
			});

			if (!response.ok) {
				throw new Error("Sign-up failed");
			}
			navigate("/account");
			// Dialogue: After successful signup we have to redirect the user to the secured page. We will do that later.
		} catch (error) {
			console.error("Sign-up failed:", error);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
			<div className="space-y-2">
				<label className="text-[10px] font-bold uppercase tracking-widest text-muted">
					Organisation Name
				</label>
				<input
					type="text"
					id="organisationName"
                    {...register("organisationName", { required: true })}
					className={`w-full px-4 py-2.5 bg-bg border border-base rounded-xl focus:outline-none focus:border-accent text-sm transition-colors ${
						errors.organisationName ? "border-red-500 focus:border-red-500" : ""
					}`}
				/>
				{errors.organisationName && (
					<span className="text-red-500 mb-2 block text-xs">
						Organization name is required
					</span>
				)}
			</div>
			<div className="space-y-2">
				<label className="text-[10px] font-bold uppercase tracking-widest text-muted">
					Your Name
				</label>
				<input
					type="text"
					id="userName"
					{...register("userName", { required: true })}
					className={`w-full px-4 py-2.5 bg-bg border border-base rounded-xl focus:outline-none focus:border-accent text-sm transition-colors ${
						errors.userName ? "border-red-500 focus:border-red-500" : ""
					}`}
				/>
				{errors.userName && (
					<span className="text-red-500 mb-2 block text-xs">
						User name is required
					</span>
				)}
			</div>
			<div className="space-y-2">
				<label className="text-[10px] font-bold uppercase tracking-widest text-muted">Email</label>
				<input
					type="email"
					id="userEmail"
                    placeholder="name@company.com"
					{...register("userEmail", { required: true })}
					className={`w-full px-4 py-2.5 bg-bg border border-base rounded-xl focus:outline-none focus:border-accent text-sm transition-colors ${
						errors.userEmail ? "border-red-500 focus:border-red-500" : ""
					}`}
				/>
				{errors.userEmail && (
					<span className="text-red-500 mb-2 block text-xs">
						Email is required
					</span>
				)}
			</div>
			<div className="space-y-2">
				<label className="text-[10px] font-bold uppercase tracking-widest text-muted">
					Password
				</label>
				<input
					type="password"
					id="userPassword"
                    placeholder="••••••••"
					{...register("userPassword", { required: true })}
					className={`w-full px-4 py-2.5 bg-bg border border-base rounded-xl focus:outline-none focus:border-accent text-sm transition-colors ${
						errors.userPassword ? "border-red-500 focus:border-red-500" : ""
					}`}
				/>
				{errors.userPassword && (
					<span className="text-red-500 mb-2 block text-xs">
						Create a password
					</span>
				)}
			</div>
			<button
				type="submit"
				className="w-full py-3 bg-accent text-white rounded-xl font-bold hover:opacity-90 transition-all active:scale-[0.98] shadow-lg shadow-accent/20 mt-4"
			>
				Sign up
			</button>
			<button
				type="button"
				className="w-full py-3 bg-surface border border-base text-fg rounded-xl font-bold hover:bg-bg transition-all active:scale-[0.98] mt-4"
				onClick={() => {
					navigate("/signin");
				}}
			>
				Already have an account? Sign in here
			</button>
		</form>
	);
};

export default SignupForm;
