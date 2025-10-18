import React from "react";
import { API_ENDPOINT } from "../../config/constants";
import { useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";

const SigninForm: React.FC = () => {
	type Inputs = {
		email: String;
		password: String;
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
			console.log("Sign-in sucessful");
			const data = await response.json();
			localStorage.setItem("authToken", data.token);
			localStorage.setItem("userData", JSON.stringify(data.user));
			navigate("/account");
		} catch (error) {
			console.log(error);
		}
	};

	const authToken = localStorage.getItem("authToken");
	console.log(`localStorage authToken = ${authToken}`);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div>
				<label className="block text-gray-700 font-semibold mb-2">Email:</label>
				<input
					type="email"
					id="email"
					{...register("email", { required: true })}
					className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
				/>
				{errors.email && <span>Invalid Email</span>}
			</div>
			<div>
				<label className="block text-gray-700 font-semibold mb-2">
					Password:
				</label>
				<input
					type="password"
					id="password"
					{...register("password", { required: true })}
					className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
				/>
				{errors.password && <span>Invalid Password</span>}
			</div>
			<button
				type="submit"
				className="w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4"
			>
				Sign In
			</button>
		</form>
	);
};

export default SigninForm;
