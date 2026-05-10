import React from "react";
import { API_ENDPOINT } from "../../config/constants";
import { useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";

const SigninForm: React.FC = () => {
	type Inputs = {
		email: string;
		password: string;
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();

	const navigate = useNavigate();

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		const email = data.email;
		const password = data.password;

		try {
			const response = await fetch(`${API_ENDPOINT}/users/sign_in`, {
				method: "POST",
				headers: { "Content-type": "application/json" },
				body: JSON.stringify({ email, password }),
			});

			if (!response.ok) {
				throw new Error("Sign-in failed!");
			}
			const data = await response.json();
			localStorage.setItem("authToken", data.token);
			localStorage.setItem("userData", JSON.stringify(data.user));
			navigate("/account");
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
			<div className="space-y-2">
				<label className="text-[10px] font-bold uppercase tracking-widest text-muted">Email</label>
				<input
					type="email"
					id="email"
					placeholder="name@company.com"
					{...register("email", { required: true })}
					className={`w-full px-4 py-2.5 bg-bg border border-base rounded-xl focus:outline-none focus:border-accent text-sm transition-colors ${
						errors.email ? "border-red-500 focus:border-red-500" : ""
					}`}
				/>
				{errors.email && (
					<span className="text-red-500 mb-2 block text-xs">
						Invalid Email
					</span>
				)}
			</div>
			<div className="space-y-2">
				<label className="text-[10px] font-bold uppercase tracking-widest text-muted">
					Password
				</label>
				<input
					type="password"
					id="password"
					placeholder="••••••••"
					{...register("password", { required: true })}
					className={`w-full px-4 py-2.5 bg-bg border border-base rounded-xl focus:outline-none focus:border-accent text-sm transition-colors ${
						errors.password ? "border-red-500 focus:border-red-500" : ""
					}`}
				/>
				{errors.password && (
					<span className="text-red-500 mb-2 block text-xs">
						Invalid Password
					</span>
				)}
			</div>
			<button
				type="submit"
				className="w-full py-3 bg-accent text-white rounded-xl font-bold hover:opacity-90 transition-all active:scale-[0.98] shadow-lg shadow-accent/20 mt-4"
			>
				Sign In
			</button>
			<button
				type="button"
				className="w-full py-3 bg-surface border border-base text-fg rounded-xl font-bold hover:bg-bg transition-all active:scale-[0.98] mt-4"
				onClick={() => {
					navigate("/signup");
				}}
			>
				No account? Sign up here
			</button>
		</form>
	);
};

export default SigninForm;
