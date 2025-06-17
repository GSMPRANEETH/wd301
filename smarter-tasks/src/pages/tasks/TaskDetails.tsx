import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useTasksDispatch, useTasksState } from "../../context/task/context";
import { updateTask } from "../../context/task/actions";

import { useProjectsState } from "../../context/projects/context";
import { TaskDetailsPayload } from "../../context/task/types";

type TaskFormUpdatePayload = TaskDetailsPayload;

// Helper function to format the date to YYYY-MM-DD format
const formatDateForPicker = (isoDate: string) => {
	const dateObj = new Date(isoDate);
	const year = dateObj.getFullYear();
	const month = String(dateObj.getMonth() + 1).padStart(2, "0");
	const day = String(dateObj.getDate()).padStart(2, "0");

	// Format the date as per the required format for the date picker (YYYY-MM-DD)
	return `${year}-${month}-${day}`;
};

const TaskDetails = () => {
	let [isOpen, setIsOpen] = useState(true);

	let { projectID, taskID } = useParams();
	let navigate = useNavigate();

	// Extract project and task details.
	const projectState = useProjectsState();
	const taskListState = useTasksState();
	const taskDispatch = useTasksDispatch();

	const selectedProject = projectState?.projects.filter(
		(project) => `${project.id}` === projectID
	)[0];

	const selectedTask = taskListState.projectData.tasks[taskID ?? ""];
	// Use react-form-hook to manage the form. Initialize with data from selectedTask.
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<TaskFormUpdatePayload>({
		defaultValues: {
			title: selectedTask.title,
			description: selectedTask.description,
			dueDate: formatDateForPicker(selectedTask.dueDate),
		},
	});

	if (!selectedProject) {
		return <>No such Project!</>;
	}

	function closeModal() {
		setIsOpen(false);
		navigate("../../");
	}

	const onSubmit: SubmitHandler<TaskFormUpdatePayload> = async (data) => {
		updateTask(taskDispatch, projectID ?? "", {
			...selectedTask,
			...data,
		});
		closeModal();
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
									<div className="mt-2">
										<form onSubmit={handleSubmit(onSubmit)}>
											<input
												type="text"
												required
												placeholder="Enter title"
												id="title"
												{...register("title", { required: true })}
												className="w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
											/>
											<input
												type="text"
												required
												placeholder="Enter description"
												id="description"
												{...register("description", { required: true })}
												className="w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
											/>
											<input
												type="date"
												required
												placeholder="Enter due date"
												id="dueDate"
												{...register("dueDate", { required: true })}
												className="w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
											/>
											<button
												type="submit"
												className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 mr-2 text-sm font-medium text-white hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
											>
												Update
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

export default TaskDetails;
