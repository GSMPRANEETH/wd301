import { Dialog, Transition, Listbox } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useTasksDispatch, useTasksState } from "../../context/task/context";
import { useMembersState } from "../../context/members/context";
import { useProjectsState } from "../../context/projects/context";
import type { TaskDetailsPayload } from "../../context/task/types";
import CheckIcon from "@heroicons/react/24/outline/CheckIcon";
import {
	useCommentsDispatch,
	useCommentsState,
} from "../../context/comments/context";
import { addComment, getComments } from "../../context/comments/actions";
import { updateTask } from "../../context/task/actions";

type TaskFormUpdatePayload = TaskDetailsPayload & {
	selectedPerson: string;
	commentBox: string;
};

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
	const memberState = useMembersState();
	const selectedProject = projectState?.projects.filter(
		(project) => `${project.id}` === projectID
	)[0];
	const commentsState = useCommentsState();
	const commentsDispatch = useCommentsDispatch();

	const selectedTask = taskListState.projectData.tasks[taskID ?? ""];
	// Use react-form-hook to manage the form. Initialize with data from selectedTask.
	const [selectedPerson, setSelectedPerson] = useState(
		selectedTask.assignedUserName ?? ""
	);
	const taskDispatch = useTasksDispatch();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<TaskFormUpdatePayload>({
		defaultValues: {
			title: selectedTask.title,
			description: selectedTask.description,
			selectedPerson: selectedTask.assignedUserName,
			dueDate: formatDateForPicker(selectedTask.dueDate),
			commentBox: "",
		},
	});

	useEffect(() => {
		if (projectID && taskID) {
			getComments(commentsDispatch, projectID, taskID);
		}
	}, [projectID, taskID, commentsDispatch]);

	if (!selectedProject) {
		return <>No such Project!</>;
	}

	function closeModal() {
		setIsOpen(false);
		navigate("../");
	}

	const onSubmit: SubmitHandler<TaskFormUpdatePayload> = async (data) => {
		const assignee = memberState?.users.filter(
			(member) => member.name === selectedPerson
		)?.[0];
		updateTask(taskDispatch, projectID ?? "", {
			...selectedTask,
			...data,
			assignee: assignee?.id,
		});
		closeModal();
	};
	const onAddComment: SubmitHandler<TaskFormUpdatePayload> = async (data) => {
		const assignee = memberState?.users?.find(
			(member) => member.name === selectedPerson
		);
		if (!data.commentBox?.trim()) return;
		await addComment(commentsDispatch, projectID ?? "", taskID ?? "", {
			description: data.commentBox,
			owner: assignee?.id ?? 0,
			task_id: parseInt(taskID ?? "0"),
		});
	};

	const getMember = (ownerID: number) => {
		const member = memberState?.users.filter((user) => ownerID === user.id);
		return member?.[0]?.name ?? "Unknown";
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
								<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
									<Dialog.Title
										as="h3"
										className="text-lg font-medium leading-6 text-gray-900"
									>
										Task Details
									</Dialog.Title>
									<div className="mt-2">
										<form onSubmit={handleSubmit(onSubmit)}>
											<h3>
												<strong>Title</strong>
											</h3>
											<input
												type="text"
												placeholder="Enter title"
												id="title"
												{...register("title", { required: true })}
												className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
													errors.title
														? "border-red-500 focus:border-red-500"
														: ""
												}`}
											/>
											{errors.title && (
												<span className="text-red-600 dark:text-red-400 mb-2 block">
													This field is required
												</span>
											)}
											<h3>
												<strong>Description</strong>
											</h3>
											<input
												type="text"
												placeholder="Enter description"
												id="description"
												{...register("description")}
												className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
													errors.description
														? "border-red-500 focus:border-red-500"
														: ""
												}`}
											/>
											{errors.description && (
												<span className="text-red-600 dark:text-red-400 mb-2 block">
													Invalid description
												</span>
											)}
											<h3>
												<strong>Date</strong>
											</h3>
											<input
												type="date"
												placeholder="Enter due date"
												id="dueDate"
												{...register("dueDate", { required: true })}
												className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
													errors.dueDate
														? "border-red-500 focus:border-red-500"
														: ""
												}`}
											/>
											{errors.dueDate && (
												<span className="text-red-600 dark:text-red-400 mb-2 block">
													This field is required
												</span>
											)}
											<h3>
												<strong>Assignee</strong>
											</h3>
											<Listbox
												value={selectedPerson}
												onChange={setSelectedPerson}
											>
												<Listbox.Button className="w-full border rounded-md py-2 px-3 my-2 text-gray-700 text-base text-left">
													{selectedPerson || "Select assignee"}
												</Listbox.Button>
												<Listbox.Options className="max-w absolute mt-1 max-h-60 rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
													{memberState?.users?.map((person) => (
														<Listbox.Option
															key={person.id}
															className={({ active }) =>
																`relative cursor-default select-none py-2 pl-10 pr-4 ${
																	active
																		? "bg-blue-100 text-blue-900"
																		: "text-gray-900"
																}`
															}
															value={person.name}
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
																	{selected ? (
																		<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
																			<CheckIcon
																				className="h-5 w-5"
																				aria-hidden="true"
																			/>
																		</span>
																	) : null}
																</>
															)}
														</Listbox.Option>
													))}
												</Listbox.Options>
											</Listbox>

											<div className="flex flex-col space-y-4 mb-4">
												<h3>
													<strong>Comments:</strong>
												</h3>
												{commentsState.comments.length > 0
													? commentsState.comments.map((comment) => (
															<div key={comment.id} className="comment">
																<p>
																	<b>Name: </b>
																	{getMember(comment.owner)}
																</p>
																<p>{comment.description}</p>
															</div>
													  ))
													: "No comments yet"}
												<input
													type="text"
													{...register("commentBox")}
													id="commentBox"
													placeholder="Type your comment..."
													className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
														errors.commentBox
															? "border-red-500 focus:border-red-500"
															: ""
													}`}
												/>
												{errors.commentBox && (
													<span className="text-red-600 dark:text-red-400 mb-2 block">
														No comment
													</span>
												)}
												<button
													type="button"
													id="addCommentBtn"
													onClick={handleSubmit(onAddComment)}
													className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 mr-2 text-sm font-medium text-white hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
												>
													Add Comment
												</button>
											</div>

											<button
												type="submit"
												className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 mr-2 text-sm font-medium text-white hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
											>
												Update
											</button>
											<button
												type="button"
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
