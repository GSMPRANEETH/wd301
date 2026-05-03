import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useProjectsState } from "../../context/projects/context";
import { useTasksDispatch } from "../../context/task/context";
import { addTask } from "../../context/task/actions";
import type { TaskDetailsPayload } from "../../context/task/types";

const NewTask = () => {
	let [isOpen, setIsOpen] = useState(true);

	let { projectID } = useParams();
	let navigate = useNavigate();

	// Use react-hook-form to create form submission handler and state.
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<TaskDetailsPayload>();
	const projectState = useProjectsState();
	const taskDispatch = useTasksDispatch();

	// We do some sanity checks to make sure the `projectID` passed is a valid one
	const selectedProject = projectState?.projects.filter(
		(project) => `${project.id}` === projectID
	)?.[0];
	if (!selectedProject) {
		return <div className="text-muted p-6">No such Project!</div>;
	}
	function closeModal() {
		setIsOpen(false);
		navigate("../../");
	}
	const onSubmit: SubmitHandler<TaskDetailsPayload> = async (data) => {
		try {
			// Invoke the actual API and create a task.
			addTask(taskDispatch, projectID ?? "", data);
			closeModal();
		} catch (error) {
			console.error("Operation failed:", error);
		}
	};

	const today = new Date().toISOString().split("T")[0];
	return (
		<>
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
										Create new Task
									</Dialog.Title>
									<div className="mt-4">
										<form onSubmit={handleSubmit(onSubmit)}>
                                            <div className="space-y-4">
                                                <div>
                                                    <input
                                                        type="text"
                                                        placeholder="Enter title"
                                                        autoFocus
                                                        id="title"
                                                        // Register the title field
                                                        {...register("title", { required: true })}
                                                        className={`w-full px-4 py-2.5 bg-bg border border-base rounded-xl focus:outline-none focus:border-accent text-sm transition-colors ${
                                                            errors.title
                                                                ? "border-red-500 focus:border-red-500"
                                                                : ""
                                                        }`}
                                                    />
                                                    {errors.title && (
                                                        <span className="text-red-500 mt-2 block text-xs">
                                                            This field is required
                                                        </span>
                                                    )}
                                                </div>
                                                <div>
                                                    <input
                                                        type="text"
                                                        placeholder="Enter description"
                                                        id="description"
                                                        // register the description field
                                                        {...register("description")}
                                                        className={`w-full px-4 py-2.5 bg-bg border border-base rounded-xl focus:outline-none focus:border-accent text-sm transition-colors ${
                                                            errors.description
                                                                ? "border-red-500 focus:border-red-500"
                                                                : ""
                                                        }`}
                                                    />
                                                    {errors.description && (
                                                        <span className="text-red-500 mt-2 block text-xs">
                                                            Invalid description
                                                        </span>
                                                    )}
                                                </div>
                                                <div>
                                                    <input
                                                        type="date"
                                                        placeholder="Enter due date"
                                                        id="dueDate"
                                                        // register due date field
                                                        {...register("dueDate", { required: true })}
                                                        defaultValue={today}
                                                        className={`w-full px-4 py-2.5 bg-bg border border-base rounded-xl focus:outline-none focus:border-accent text-sm transition-colors ${
                                                            errors.dueDate
                                                                ? "border-red-500 focus:border-red-500"
                                                                : ""
                                                        }`}
                                                    />
                                                    {errors.dueDate && (
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
                                                    id="newTaskSubmitBtn"
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
export default NewTask;
