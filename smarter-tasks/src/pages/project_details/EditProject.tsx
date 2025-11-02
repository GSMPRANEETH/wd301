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
	let [isOpen, setIsOpen] = useState(true);
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
	}, [projectID]);
	const onSubmit: SubmitHandler<Project> = async (data) => {
		await updateProject(projectDispatch, {
			id: Number(projectID),
			data,
		});
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
								<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
									<Dialog.Title
										as="h3"
										className="text-lg font-medium leading-6 text-gray-900"
									>
										Project Details
									</Dialog.Title>
									<div className="mt-2">
										<form onSubmit={handleSubmit(onSubmit)}>
											<h3>
												<strong>Name</strong>
											</h3>
											<input
												type="text"
												placeholder="Enter name"
												id="name"
												{...register("name", { required: true })}
												className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
													errors.name
														? "border-red-500 focus:border-red-500"
														: ""
												}`}
											/>
											{errors.name && (
												<span className="text-red-600 dark:text-red-400 mb-2 block">
													This field is required
												</span>
											)}
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
export default ExportProject;
