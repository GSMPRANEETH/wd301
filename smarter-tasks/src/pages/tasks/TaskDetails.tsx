import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition, Listbox } from "@headlessui/react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useTasksDispatch, useTasksState } from "../../context/task/context";
import { updateTask } from "../../context/task/actions";
import CheckIcon from "@heroicons/react/24/outline/CheckIcon";
import { useProjectsState } from "../../context/projects/context";
import { TaskDetailsPayload } from "../../context/task/types";
import { useMembersState } from "../../context/members/context";

import {
	useCommentState,
	useCommentDispatch,
} from "../../context/comment/context";
import { fetchComments, addComment } from "../../context/comment/actions";

type TaskFormUpdatePayload = TaskDetailsPayload & { selectedPerson: string };

const formatDateForPicker = (isoDate: string) => {
	const d = new Date(isoDate);
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
		2,
		"0"
	)}-${String(d.getDate()).padStart(2, "0")}`;
};

export default function TaskDetails() {
	const [isOpen, setIsOpen] = useState(true);
	const { projectID, taskID } = useParams<{
		projectID: string;
		taskID: string;
	}>();
	const navigate = useNavigate();

	const projectState = useProjectsState();
	const taskState = useTasksState();
	const taskDispatch = useTasksDispatch();
	const memberState = useMembersState();
	const commentState = useCommentState();
	const commentDispatch = useCommentDispatch();

	const [newComment, setNewComment] = useState<string>("");

	// Check if state is ready
	if (!projectState || projectState.isLoading) return <>Loading...</>;
	if (!taskState || taskState.isLoading) return <>Loading...</>;

	// Get task and project
	const project = projectState.projects.find((p) => String(p.id) === projectID);
	const task = taskState.projectData.tasks[taskID!];
	if (!project) return <div>No such project!</div>;
	if (!task) return <div>No such task!</div>;

	// Form setup
	const initialPerson = task.assignedUserName || "";
	const [selectedPerson, setSelectedPerson] = useState<string>(initialPerson);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<TaskFormUpdatePayload>({
		defaultValues: {
			title: task.title,
			description: task.description,
			dueDate: formatDateForPicker(task.dueDate),
			selectedPerson: initialPerson,
		},
	});

	useEffect(() => {
		if (projectID && taskID) {
			commentDispatch({ type: "CLEAR_COMMENTS" });
			fetchComments(commentDispatch, projectID, taskID);
		}
	}, [projectID, taskID, commentDispatch]);

	const closeModal = () => {
		setIsOpen(false);
		navigate("../");
	};

	const onSubmit: SubmitHandler<TaskFormUpdatePayload> = (data) => {
		const assignee = memberState.members.find((m) => m.name === selectedPerson);
		updateTask(taskDispatch, projectID!, {
			...task,
			title: data.title,
			description: data.description,
			dueDate: data.dueDate,
			assignee: assignee?.id,
		});
		closeModal();
	};

	const handleAddComment = async () => {
		if (!newComment.trim()) return;
		const result = await addComment(
			commentDispatch,
			projectID!,
			taskID!,
			newComment
		);
		if (result.ok) {
			setNewComment("");
		} else {
			alert(`Failed to add comment: ${result.error}`);
		}
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
							<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left shadow-xl transition-all">
								<Dialog.Title
									as="h3"
									className="text-lg font-medium text-gray-900"
								>
									Task Details
								</Dialog.Title>

								<form
									onSubmit={handleSubmit(onSubmit)}
									className="mt-4 space-y-4"
								>
									<input
										type="text"
										placeholder="Title"
										{...register("title", { required: true })}
										className="w-full border rounded px-3 py-2"
									/>
									{errors.title && (
										<p className="text-red-500">Title is required.</p>
									)}

									<textarea
										placeholder="Description"
										{...register("description", { required: true })}
										className="w-full border rounded px-3 py-2"
									/>
									{errors.description && (
										<p className="text-red-500">Description is required.</p>
									)}

									<input
										type="date"
										{...register("dueDate", { required: true })}
										className="w-full border rounded px-3 py-2"
									/>
									{errors.dueDate && (
										<p className="text-red-500">Due date is required.</p>
									)}

									<div>
										<label className="block mb-1 font-semibold">Assignee</label>
										<Listbox
											value={selectedPerson}
											onChange={setSelectedPerson}
										>
											<Listbox.Button className="w-full border rounded px-3 py-2 text-left">
												{selectedPerson || "Select member"}
											</Listbox.Button>
											<Listbox.Options className="absolute mt-1 w-full bg-white shadow rounded max-h-40 overflow-auto">
												{memberState.members.map((m) => (
													<Listbox.Option key={m.id} value={m.name}>
														{({ active, selected }) => (
															<div
																className={`px-3 py-2 flex items-center ${
																	active ? "bg-blue-100" : ""
																}`}
															>
																{selected && (
																	<CheckIcon className="w-4 h-4 mr-2" />
																)}
																<span>{m.name}</span>
															</div>
														)}
													</Listbox.Option>
												))}
											</Listbox.Options>
										</Listbox>
									</div>

									<div className="flex justify-end space-x-2">
										<button
											type="button"
											onClick={closeModal}
											className="px-4 py-2 bg-gray-200 rounded"
										>
											Cancel
										</button>
										<button
											type="submit"
											className="px-4 py-2 bg-blue-600 text-white rounded"
										>
											Update
										</button>
									</div>
								</form>

								<hr className="my-4" />
								<h4 className="font-semibold mb-2">Comments</h4>

								<div className="flex space-x-2 mb-4">
									<input
										id="commentBox"
										type="text"
										placeholder="Add a comment…"
										value={newComment}
										onChange={(e) => setNewComment(e.target.value)}
										className="flex-1 border rounded px-3 py-2"
									/>
									<button
										id="addCommentBtn"
										onClick={handleAddComment}
										className="px-4 py-2 bg-blue-600 text-white rounded"
									>
										Add
									</button>
								</div>

								<div className="comment space-y-2 max-h-48 overflow-auto">
									{[...commentState.allIds].map((id) => {
										const comment = commentState.byId[id];
										return (
											<div key={comment.id} className=" p-2 border rounded">
												<div className="text-sm">
													{comment.text?.trim() ? (
														comment.text
													) : (
														<i className="text-gray-400">(no content)</i>
													)}
												</div>
											</div>
										);
									})}
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
}
