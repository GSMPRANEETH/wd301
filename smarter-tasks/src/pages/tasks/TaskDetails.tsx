import { Dialog, Transition, Listbox } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useProjectsState } from "../../context/projects/context";
import { useTasksDispatch, useTasksState } from "../../context/task/context";
import { updateTask } from "../../context/task/actions";
import { CheckIcon } from "@heroicons/react/20/solid";
import { useMembersState } from "../../context/members/context";
import {
	useCommentsDispatch,
	useCommentsState,
} from "../../context/comments/context";
import { addComment, getComments } from "../../context/comments/actions";

type TaskFormUpdatePayload = {
	title: string;
	description: string;
	dueDate: string;
	selectedPerson: string;
	commentBox: string;
};

const formatDateForPicker = (isoDate: string) => {
	const dateObj = new Date(isoDate);
	const year = dateObj.getFullYear();
	const month = String(dateObj.getMonth() + 1).padStart(2, "0");
	const day = String(dateObj.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
};

const TaskDetails = () => {
	const [isOpen, setIsOpen] = useState(true);

	const { projectID, taskID } = useParams();
	const navigate = useNavigate();
	const projectState = useProjectsState();
	const taskListState = useTasksState();
	const memberState = useMembersState();
	const commentsDispatch = useCommentsDispatch();
	const commentsState = useCommentsState();

	const selectedProject = projectState?.projects.filter(
		(project) => `${project.id}` === projectID
	)?.[0];
	const selectedTask = taskListState.projectData.tasks[taskID ?? ""];
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
		return <div className="p-6 text-muted">No such Project!</div>;
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

	const assigneeInitial = selectedPerson ? selectedPerson.charAt(0).toUpperCase() : "-";

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
						<div className="flex min-h-full items-center justify-center p-6 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-3xl bg-surface border border-base text-left align-middle shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] transition-all">
                                    <div className="px-8 py-6 border-b border-base flex items-center justify-between bg-[var(--bg)]/30">
                                        <div className="flex items-center gap-4">
                                            <div className="px-3 py-1 rounded-full bg-border text-[10px] font-black uppercase tracking-widest text-muted border border-base">Task Details</div>
                                            <h3 className="text-2xl font-bold text-display tracking-tight">Update Task</h3>
                                        </div>
                                        <button onClick={closeModal} className="p-2 hover:bg-bg rounded-full transition-all text-muted hover:text-fg">
                                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                                        </button>
                                    </div>

									<div className="p-8">
										<form onSubmit={handleSubmit(onSubmit)}>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                                                <div className="md:col-span-2 space-y-10">
                                                    <section className="space-y-4">
                                                        <div className="space-y-2">
                                                            <h4 className="text-[10px] font-black uppercase tracking-widest text-muted">Title</h4>
                                                            <input
                                                                type="text"
                                                                placeholder="Enter title"
                                                                id="title"
                                                                {...register("title", { required: true })}
                                                                className={`w-full px-5 py-3 bg-bg border border-base rounded-2xl text-sm font-medium focus:outline-none focus:border-accent transition-colors ${
                                                                    errors.title
                                                                        ? "border-red-500 focus:border-red-500"
                                                                        : ""
                                                                }`}
                                                            />
                                                            {errors.title && (
                                                                <span className="text-red-500 mb-2 block text-xs">
                                                                    This field is required
                                                                </span>
                                                            )}
                                                        </div>

                                                        <div className="space-y-2">
                                                            <h4 className="text-[10px] font-black uppercase tracking-widest text-muted">Description</h4>
                                                            <textarea
                                                                placeholder="Enter description"
                                                                id="description"
                                                                rows={3}
                                                                {...register("description")}
                                                                className={`w-full px-5 py-3 bg-bg border border-base rounded-2xl text-sm font-medium focus:outline-none focus:border-accent transition-colors ${
                                                                    errors.description
                                                                        ? "border-red-500 focus:border-red-500"
                                                                        : ""
                                                                }`}
                                                            />
                                                            {errors.description && (
                                                                <span className="text-red-500 mb-2 block text-xs">
                                                                    Invalid description
                                                                </span>
                                                            )}
                                                        </div>
                                                    </section>

                                                    <section className="space-y-6">
                                                        <h4 className="text-[10px] font-black uppercase tracking-widest text-muted">Activity Feed</h4>
                                                        <div className="space-y-6 max-h-60 overflow-y-auto custom-scroll pr-2">
                                                            {commentsState.comments.length > 0 ? (
                                                                commentsState.comments.map((comment) => (
                                                                    <div key={comment.id} className="flex gap-5">
                                                                        <div className="h-9 w-9 rounded-full bg-accent flex items-center justify-center text-[10px] font-black text-white flex-shrink-0 shadow-lg shadow-accent/20">
                                                                            {getMember(comment.owner).charAt(0).toUpperCase()}
                                                                        </div>
                                                                        <div className="space-y-2 flex-1">
                                                                            <div className="flex items-center gap-2">
                                                                                <span className="text-xs font-black">{getMember(comment.owner)}</span>
                                                                            </div>
                                                                            <p className="text-sm text-muted bg-bg/50 p-4 rounded-2xl border border-base font-medium">{comment.description}</p>
                                                                        </div>
                                                                    </div>
                                                                ))
                                                            ) : (
                                                                <span className="text-sm text-muted font-medium block p-4">
                                                                    No comments yet
                                                                </span>
                                                            )}
                                                        </div>

                                                        <div className="flex gap-5 pt-4">
                                                            <div className="flex-1 relative">
                                                                <input
                                                                    type="text"
                                                                    {...register("commentBox")}
                                                                    id="commentBox"
                                                                    placeholder="Add a comment..."
                                                                    className={`w-full pl-5 pr-20 py-3 bg-bg border border-base rounded-2xl text-sm font-medium focus:outline-none focus:border-accent transition-colors ${
                                                                        errors.commentBox
                                                                            ? "border-red-500 focus:border-red-500"
                                                                            : ""
                                                                    }`}
                                                                />
                                                                {errors.commentBox && (
                                                                    <span className="text-red-500 mt-2 block text-xs">
                                                                        No comment
                                                                    </span>
                                                                )}
                                                                <button
                                                                    type="button"
                                                                    id="addCommentBtn"
                                                                    onClick={handleSubmit(onAddComment)}
                                                                    className="absolute right-3 top-2.5 text-accent text-xs font-black uppercase tracking-widest px-3 py-1.5 bg-accent/10 rounded-lg hover:bg-accent/20 transition-colors"
                                                                >
                                                                    Post
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </section>
                                                </div>

                                                <div className="space-y-8 bg-bg/20 p-6 rounded-2xl border border-base h-fit">
                                                    <div className="space-y-5">
                                                        <div className="space-y-2.5">
                                                            <h4 className="text-[10px] font-black uppercase tracking-widest text-muted">Assigned To</h4>
                                                            <Listbox
                                                                value={selectedPerson}
                                                                onChange={setSelectedPerson}
                                                            >
                                                                <div className="relative">
                                                                    <Listbox.Button className="w-full flex items-center justify-between gap-3 bg-surface p-2.5 rounded-xl border border-base cursor-pointer hover:border-muted transition-all">
                                                                        <div className="flex items-center gap-3">
                                                                            {selectedPerson && <div className="h-7 w-7 rounded-full bg-accent flex items-center justify-center text-[10px] font-black text-white">{assigneeInitial}</div>}
                                                                            <span className="text-xs font-bold">{selectedPerson || "Select assignee"}</span>
                                                                        </div>
                                                                        <svg className="w-4 h-4 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
                                                                    </Listbox.Button>
                                                                    <Listbox.Options className="absolute z-10 w-full mt-1 max-h-60 rounded-xl bg-surface py-1 text-xs border border-base shadow-lg overflow-auto focus:outline-none">
                                                                        {memberState?.users?.map((person) => (
                                                                            <Listbox.Option
                                                                                key={person.id}
                                                                                className={({ active }) =>
                                                                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                                                        active
                                                                                            ? "bg-bg text-fg"
                                                                                            : "text-muted"
                                                                                    }`
                                                                                }
                                                                                value={person.name}
                                                                            >
                                                                                {({ selected }) => (
                                                                                    <>
                                                                                        <span
                                                                                            className={`block truncate ${
                                                                                                selected ? "font-bold text-fg" : "font-medium"
                                                                                            }`}
                                                                                        >
                                                                                            {person.name}
                                                                                        </span>
                                                                                        {selected ? (
                                                                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-accent">
                                                                                                <CheckIcon
                                                                                                    className="h-4 w-4"
                                                                                                    aria-hidden="true"
                                                                                                />
                                                                                            </span>
                                                                                        ) : null}
                                                                                    </>
                                                                                )}
                                                                            </Listbox.Option>
                                                                        ))}
                                                                    </Listbox.Options>
                                                                </div>
                                                            </Listbox>
                                                        </div>
                                                        <div className="space-y-2.5">
                                                            <h4 className="text-[10px] font-black uppercase tracking-widest text-muted">Due Date</h4>
                                                            <div className="relative">
                                                                <input
                                                                    type="date"
                                                                    id="dueDate"
                                                                    {...register("dueDate", { required: true })}
                                                                    className={`w-full appearance-none px-4 py-2.5 bg-surface border border-base rounded-xl text-xs font-bold focus:outline-none focus:border-accent transition-colors cursor-pointer ${
                                                                        errors.dueDate
                                                                            ? "border-red-500 focus:border-red-500"
                                                                            : ""
                                                                    }`}
                                                                />
                                                            </div>
                                                            {errors.dueDate && (
                                                                <span className="text-red-500 mb-2 block text-xs">
                                                                    This field is required
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="pt-6 border-t border-base space-y-3">
                                                        <button
                                                            type="submit"
                                                            className="w-full py-3 bg-accent text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-accent/20 hover:opacity-90 transition-all active:scale-[0.98]"
                                                        >
                                                            Update Task
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={closeModal}
                                                            className="w-full py-3 bg-surface border border-base text-fg rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-bg transition-all active:scale-[0.98]"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </div>
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

export default TaskDetails;
