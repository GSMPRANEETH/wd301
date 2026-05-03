import { useNavigate, useParams } from "react-router-dom";
import {
	getUserDetails,
	updateUserDetails,
} from "../../context/members/actions";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import {
	useMembersDispatch,
	useMembersState,
} from "../../context/members/context";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { Member } from "../../context/members/reducer";

const MemberDetails: React.FC = () => {
	let [isOpen, setIsOpen] = useState(true);
	const { userID } = useParams();
	const navigate = useNavigate();
	const membersDispatch = useMembersDispatch();

	// fetch once when userID is available
	useEffect(() => {
		if (userID) getUserDetails(membersDispatch, { id: userID });
	}, [userID]);

	const membersState = useMembersState();
	const dispatchMembers = useMembersDispatch();
	const selectedUser = membersState?.users.filter(
		(user) => user.id === Number(userID)
	);
	const selectedMember =
		selectedUser && selectedUser.length > 0 ? selectedUser[0] : undefined;

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Member>({
		defaultValues: {
			name: selectedMember?.name ?? "",
			email: selectedMember?.email ?? "",
		},
	});
	function closeModal() {
		setIsOpen(false);
		navigate("../");
	}

	const onSubmit: SubmitHandler<Member> = async (data) => {
		const res = await updateUserDetails(dispatchMembers, {
			id: Number(userID),
			data,
		});
		if (res.ok) {
			closeModal();
		} else {
			console.error(res.error);
		}
	};

	return (
		<>
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
						<div className="flex min-h-full items-center justify-center p-4 text-center ">
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
										Member Details
									</Dialog.Title>
									<div className="mt-4">
										<form onSubmit={handleSubmit(onSubmit)}>
                                            <div className="space-y-4">
                                                <div>
                                                    <label htmlFor="name" className="absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0">
                                                        Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="Enter name"
                                                        id="name"
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
                                                    <label htmlFor="email" className="absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0">
                                                        Email
                                                    </label>
                                                    <input
                                                        type="email"
                                                        placeholder="Enter user mail ID"
                                                        id="email"
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
                                                    Update
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
export default MemberDetails;
