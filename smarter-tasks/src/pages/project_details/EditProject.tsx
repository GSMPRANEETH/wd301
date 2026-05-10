import { useNavigate, useParams } from "react-router-dom";
import {
	getProjectDetails,
	updateProject,
} from "../../context/projects/actions";
import type { Project } from "../../context/projects/reducer";
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
	useProjectsDispatch,
	useProjectsState,
} from "../../context/projects/context";
import { useForm, type SubmitHandler } from "react-hook-form";

const ExportProject: React.FC = () => {
	const [isOpen, setIsOpen] = useState(true);
	const navigate = useNavigate();
	const { projectID } = useParams();

	const projectState = useProjectsState();
	const projectDispatch = useProjectsDispatch();
	const selectedProject = projectState?.projects?.filter(
		(prjct: Project) => prjct.id === Number(projectID)
	)[0];
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Project>({
		defaultValues: {
			name: selectedProject?.name ?? "",
		},
	});
	useEffect(() => {
		async function fetchProjectDetails() {
			await getProjectDetails(projectDispatch, { projectID });
		}
		fetchProjectDetails();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [projectID]);
	const onSubmit: SubmitHandler<Project> = async (data) => {
		await updateProject(projectDispatch, {
			id: Number(projectID),
			data,
		});
		closeModal();
	};
	function closeModal() {
		setIsOpen(false);
		navigate("../");
	}
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
										Project Details
									</Dialog.Title>
									<div className="mt-4">
										<form onSubmit={handleSubmit(onSubmit)}>
                                            <div className="space-y-4">
                                                <div>
                                                    <label htmlFor="name" className="absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0">
                                                        Project name
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
export default ExportProject;
