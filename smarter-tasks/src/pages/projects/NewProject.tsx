/* eslint-disable @typescript-eslint/no-unused-vars */
// src/pages/projects/NewProject.tsx

// First we will import Dialog and Transition component from '@headlessui/react'

import { Dialog, Transition } from "@headlessui/react";
import { API_ENDPOINT } from "../../config/constants";

// Next we will import Fragment and useState component from 'react'

import { Fragment, useState } from "react";
const NewProject = () => {
	// Then we will use useState hook to handle local state for dialog component

	let [isOpen, setIsOpen] = useState(false);
	const [name, setName] = useState("");

	// Then we add the openModal function.
	// If you don't know, Modal and Dialog are almost same thing.

	const openModal = () => {
		setIsOpen(true);
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const token = localStorage.getItem("authToken") ?? "";
		try {
			const response = await fetch(`${API_ENDPOINT}/projects`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ name }),
			});
			// If response is not OK, in that case I'll throw an error.

			if (!response.ok) {
				throw new Error("Failed to create project");
			}
			// Next, I'll extract the response body as JSON data

			const data = await response.json();

			// Let's print the data in console

			console.log(data);
		} catch (error) {
			// And in catch block, I'll print the error in console.

			console.error("Operation failed:", error);
		}
	};
	// Then we add the closeModal function
	const closeModal = () => {
		setIsOpen(false);
	};

	// In the return statement, we will use the code for modal
	// that we've obtained from https://headlessui.com/react/dialog

	return (
		<>
			<button
				type="button"
				onClick={openModal}
				className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
			>
				New Project
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
									<Dialog.Title
										as="h3"
										className="text-lg font-medium leading-6 text-gray-900"
									>
										Create new project
									</Dialog.Title>
									<div className="mt-2">
										<form onSubmit={handleSubmit}>
											<input
												type="text"
												required
												placeholder="Enter project name..."
												autoFocus
												name="name"
												id="name"
												value={name}
												onChange={(e) => setName(e.target.value)}
												className="w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
											/>
											<button
												type="submit"
												className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 mr-2 text-sm font-medium text-white hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
											>
												Submit
											</button>
											<button
												type="submit"
												onClick={closeModal}
												className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
											>
												Cancel
											</button>
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

export default NewProject;
