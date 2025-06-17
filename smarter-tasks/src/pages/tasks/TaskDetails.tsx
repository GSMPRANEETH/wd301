import React, { Fragment, useState } from "react";
import { Dialog, Transition, Listbox } from "@headlessui/react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useTasksDispatch, useTasksState } from "../../context/task/context";
import { updateTask } from "../../context/task/actions";
import CheckIcon from "@heroicons/react/24/outline/CheckIcon";
import { useProjectsState } from "../../context/projects/context";
import { TaskDetailsPayload } from "../../context/task/types";
import { useMembersState } from "../../context/members/context";

type TaskFormUpdatePayload = TaskDetailsPayload & {
	selectedPerson: string;
};

// Helper function to format ISO date to YYYY-MM-DD
const formatDateForPicker = (isoDate: string) => {
	const dateObj = new Date(isoDate);
	const year = dateObj.getFullYear();
	const month = String(dateObj.getMonth() + 1).padStart(2, "0");
	const day = String(dateObj.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
};

export default function TaskDetails() {
	const [isOpen, setIsOpen] = useState(true);
	const { projectID, taskID } = useParams();
	const navigate = useNavigate();

	const projectState = useProjectsState();
	const taskListState = useTasksState();
	const taskDispatch = useTasksDispatch();
	const memberState = useMembersState();

	const selectedProject = projectState.projects.find(
		(proj) => String(proj.id) === projectID
	);

	if (!selectedProject) {
		return <div>No such Project!</div>;
	}

	const selectedTask = taskListState.projectData.tasks[taskID!];

	// Initialize selected person
	const initialPerson = selectedTask.assignedUserName || "";
	const [selectedPerson, setSelectedPerson] = useState(initialPerson);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<TaskFormUpdatePayload>({
		defaultValues: {
			title: selectedTask.title,
			description: selectedTask.description,
			dueDate: formatDateForPicker(selectedTask.dueDate),
			selectedPerson: initialPerson,
		},
	});

	const closeModal = () => {
		setIsOpen(false);
		navigate("../");
	};

	const onSubmit: SubmitHandler<TaskFormUpdatePayload> = (data) => {
		const assignee = memberState.members.find((m) => m.name === selectedPerson);

		updateTask(taskDispatch, projectID || "", {
			...selectedTask,
			title: data.title,
			description: data.description,
			dueDate: data.dueDate,
			assignee: assignee?.id,
		});

		closeModal();
	};

	return (
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
									Task Details
								</Dialog.Title>
								<form onSubmit={handleSubmit(onSubmit)} className="mt-4">
									<input
										type="text"
										placeholder="Enter title"
										{...register("title", { required: true })}
										className="w-full border rounded-md py-2 px-3 mb-4"
									/>
									{errors.title && (
										<p className="text-red-500">Title is required.</p>
									)}

									<textarea
										placeholder="Enter description"
										{...register("description", { required: true })}
										className="w-full border rounded-md py-2 px-3 mb-4"
									/>
									{errors.description && (
										<p className="text-red-500">Description is required.</p>
									)}

									<input
										type="date"
										{...register("dueDate", { required: true })}
										className="w-full border rounded-md py-2 px-3 mb-4"
									/>
									{errors.dueDate && (
										<p className="text-red-500">Due date is required.</p>
									)}

									<div className="mb-4">
										<label className="block font-semibold mb-1">Assignee</label>
										<Listbox
											value={selectedPerson}
											onChange={setSelectedPerson}
										>
											<Listbox.Button className="w-full border rounded-md py-2 px-3 text-left">
												{selectedPerson || "Select a member"}
											</Listbox.Button>
											<Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
												{memberState.members.map((person) => (
													<Listbox.Option
														key={person.id}
														value={person.name}
														className={({ active }) =>
															`cursor-default select-none py-2 pl-10 pr-4 ${
																active
																	? "bg-blue-100 text-blue-900"
																	: "text-gray-900"
															}`
														}
													>
														{({ selected }) => (
															<>
																<span
																	className={`block truncate ${
																		selected ? "font-medium" : "font-normal"
																	}`}
																>
																	{person.name}
																</span>
																{selected && (
																	<span className="absolute inset-y-0 left-0 flex items-center pl-3">
																		<CheckIcon className="h-5 w-5 text-blue-600" />
																	</span>
																)}
															</>
														)}
													</Listbox.Option>
												))}
											</Listbox.Options>
										</Listbox>
									</div>

									<div className="flex justify-end">
										<button
											type="button"
											onClick={closeModal}
											className="mr-2 rounded-md bg-gray-200 px-4 py-2"
										>
											Cancel
										</button>
										<button
											type="submit"
											className="rounded-md bg-blue-600 px-4 py-2 text-white"
										>
											Update
										</button>
									</div>
								</form>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
}
