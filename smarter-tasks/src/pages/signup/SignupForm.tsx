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
		<form onSubmit={handleSubmit(onSubmit)}>
			<div>
				<label className="block text-gray-700 font-semibold mb-2">
					Organisation Name:
				</label>
				<input
					type="text"
					id="organisationName"
					className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
						errors.organisationName ? "border-red-500 focus:border-red-500" : ""
					}`}
				/>
				{errors.organisationName && (
					<span className="text-red-600 dark:text-red-400 mb-2 block">
						Organization name is required
					</span>
				)}
			</div>
			<div>
				<label className="block text-gray-700 font-semibold mb-2">
					Your Name:
				</label>
				<input
					type="text"
					id="userName"
					{...register("userName", { required: true })}
					className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
						errors.userName ? "border-red-500 focus:border-red-500" : ""
					}`}
				/>
				{errors.userName && (
					<span className="text-red-600 dark:text-red-400 mb-2 block">
						User name is required
					</span>
				)}
			</div>
			<div>
				<label className="block text-gray-700 font-semibold mb-2">Email:</label>
				<input
					type="email"
					id="userEmail"
					{...register("userEmail", { required: true })}
					className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
						errors.userEmail ? "border-red-500 focus:border-red-500" : ""
					}`}
				/>
				{errors.userEmail && (
					<span className="text-red-600 dark:text-red-400 mb-2 block">
						Email is required
					</span>
				)}
			</div>
			<div>
				<label className="block text-gray-700 font-semibold mb-2">
					Password:
				</label>
				<input
					type="password"
					id="userPassword"
					{...register("userPassword", { required: true })}
					className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
						errors.userPassword ? "border-red-500 focus:border-red-500" : ""
					}`}
				/>
				{errors.userPassword && (
					<span className="text-red-600 dark:text-red-400 mb-2 block">
						Create a password
					</span>
				)}
			</div>
			<button
				type="submit"
				className="w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4"
			>
				Sign up
			</button>
			<button
				type="button"
				className="w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4"
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
