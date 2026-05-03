import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { addMember } from "../../context/members/actions";
import { useMembersDispatch } from "../../context/members/context";

type Inputs = {
	name: string;
	email: string;
	password: string;
};

const NewMember = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [error, setError] = useState(null);
	const dispatchMembers = useMembersDispatch();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();
	const closeModal = () => {
		setIsOpen(false);
	};
	const openModal = () => {
		setIsOpen(true);
	};
	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		const { name, email, password } = data;
		const response = await addMember(dispatchMembers, {
			name,
			email,
			password,
		});
		if (response.ok) {
			setIsOpen(false);
		} else {
			setError(response.error as React.SetStateAction<null>);
		}
	};
	return (
		<>
			<button
				type="button"
				onClick={openModal}
				className="flex items-center gap-2 px-5 py-2.5 bg-accent text-white rounded-xl text-sm font-bold shadow-lg shadow-accent/20 hover:opacity-90 transition-all active:scale-[0.98]"
			>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
				New Member
			</button>
			<Transition appear show={isOpen} as={Fragment}>
				<Dialog as="div" className="relative z-50" onClose={closeModal}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 modal-overlay" />
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
								<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-surface border border-base p-6 text-left align-middle shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] transition-all">
									<Dialog.Title
										as="h3"
										className="text-2xl font-bold text-display tracking-tight"
									>
										Create new Member
									</Dialog.Title>
									<div className="mt-4">
										<form onSubmit={handleSubmit(onSubmit)}>
                                            <div className="space-y-4">
                                                {/* I'll show the error, if it exists.*/}
                                                {error && (
                                                    <span className="text-red-500 mb-2 block text-xs">
                                                        {error}
                                                    </span>
                                                )}
                                                <div>
                                                    <input
                                                        type="text"
                                                        placeholder="Enter Member name..."
                                                        autoFocus
                                                        {...register("name", { required: true })}
                                                        className={`w-full px-4 py-2.5 bg-bg border border-base rounded-xl focus:outline-none focus:border-accent text-sm transition-colors ${
                                                            errors.name
                                                                ? "border-red-500 focus:border-red-500"
                                                                : ""
                                                        }`}
                                                    />
                                                    {errors.name && (
                                                        <span className="text-red-500 mt-2 block text-xs">
                                                            This field is required
                                                        </span>
                                                    )}
                                                </div>
                                                <div>
                                                    <input
                                                        type="email"
                                                        placeholder="Enter member email..."
                                                        {...register("email", { required: true })}
                                                        className={`w-full px-4 py-2.5 bg-bg border border-base rounded-xl focus:outline-none focus:border-accent text-sm transition-colors ${
                                                            errors.email
                                                                ? "border-red-500 focus:border-red-500"
                                                                : ""
                                                        }`}
                                                    />
                                                    {errors.email && (
                                                        <span className="text-red-500 mt-2 block text-xs">
                                                            This field is required
                                                        </span>
                                                    )}
                                                </div>
                                                <div>
                                                    <input
                                                        type="password"
                                                        placeholder="Enter password"
                                                        {...register("password", { required: true })}
                                                        className={`w-full px-4 py-2.5 bg-bg border border-base rounded-xl focus:outline-none focus:border-accent text-sm transition-colors ${
                                                            errors.password
                                                                ? "border-red-500 focus:border-red-500"
                                                                : ""
                                                        }`}
                                                    />
                                                    {errors.password && (
                                                        <span className="text-red-500 mt-2 block text-xs">
                                                            This field is required
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex gap-3 justify-end mt-6">
                                                <button
                                                    type="button"
                                                    onClick={closeModal}
                                                    className="px-5 py-2.5 bg-surface border border-base text-fg rounded-xl text-sm font-bold hover:bg-bg transition-all active:scale-[0.98]"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="px-5 py-2.5 bg-accent text-white rounded-xl text-sm font-bold shadow-lg shadow-accent/20 hover:opacity-90 transition-all active:scale-[0.98]"
                                                >
                                                    Create
                                                </button>
                                            </div>
										</form>
									</div>
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
