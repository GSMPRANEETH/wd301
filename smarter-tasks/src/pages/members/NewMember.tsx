import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { useMembersDispatch } from "../../context/members/context";
import { addMember } from "../../context/members/actions";

interface FormData {
	name: string;
	email: string;
	password: string;
}

const NewMember: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [serverError, setServerError] = useState("");
	const dispatch = useMembersDispatch();
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<FormData>();

	const openModal = () => {
		setIsOpen(true);
		setServerError("");
	};

	const closeModal = () => {
		setIsOpen(false);
		reset(); // clears the form
	};

	const onSubmit = async (data: FormData) => {
		const result = await addMember(dispatch, data);

		if (result.ok) {
			closeModal(); // ✅ close dialog after success
		} else {
			setServerError(result.error || "Failed to create member.");
		}
	};

	return (
		<>
			<button
				id="new-member-btn"
				onClick={openModal}
				className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
			>
				New Member
			</button>

			<Transition appear show={isOpen} as={Fragment}>
				<Dialog as="div" className="relative z-10" onClose={closeModal}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black bg-opacity-25" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
									<Dialog.Title className="text-lg font-medium text-gray-900 mb-4">
										Create New Member
									</Dialog.Title>

									<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
										<input
											type="text"
											id="name"
											placeholder="Name"
											{...register("name", { required: true })}
											className="w-full border rounded px-3 py-2"
										/>
										{errors.name && (
											<p className="text-red-500 text-sm">Name is required</p>
										)}

										<input
											type="email"
											id="email"
											placeholder="Email"
											{...register("email", { required: true })}
											className="w-full border rounded px-3 py-2"
										/>
										{errors.email && (
											<p className="text-red-500 text-sm">Email is required</p>
										)}

										<input
											type="password"
											id="password"
											placeholder="Password"
											{...register("password", { required: true })}
											className="w-full border rounded px-3 py-2"
										/>
										{errors.password && (
											<p className="text-red-500 text-sm">
												Password is required
											</p>
										)}

										{serverError && (
											<p className="text-red-600 text-sm">{serverError}</p>
										)}

										<div className="flex justify-end space-x-2 pt-4">
											<button
												type="button"
												onClick={closeModal}
												className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
											>
												Cancel
											</button>
											<button
												type="submit"
												id="create-member-btn"
												className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
											>
												Create
											</button>
										</div>
									</form>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
};

export default NewMember;
