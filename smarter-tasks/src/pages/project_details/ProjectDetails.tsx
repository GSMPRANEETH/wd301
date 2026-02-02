import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { useTasksDispatch, useTasksState } from "../../context/task/context";

import DragDropList from "./DragDropList";
import { refreshTasks } from "../../context/task/actions";
import { useProjectsState } from "../../context/projects/context";

const ProjectDetails = () => {
	const tasksState = useTasksState();
	const taskDispatch = useTasksDispatch();
	const projectState = useProjectsState();
	let { projectID } = useParams();
	useEffect(() => {
		if (projectID) refreshTasks(taskDispatch, projectID);
	}, [projectID, taskDispatch]);
	const selectedProject = projectState?.projects.filter(
		(project) => `${project.id}` === projectID
	)?.[0];

	if (!selectedProject) {
		return <>No such Project!</>;
	}

	if (tasksState.isLoading) {
		return <>Loading...</>;
	}
	return (
		<>
			<div className="flex justify-between">
				<h2 className="text-2xl font-medium tracking-tight text-slate-700 dark:text-white">
					{selectedProject.name}
				</h2>
				<Link to={"edit"}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						className="size-4"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
						/>
					</svg>
				</Link>
				<Link to={`tasks/new`} className="ml-auto">
					<button
						id="newTaskBtn"
						// className="rounded-md bg-blue-600 px-4 py-2 m-2 text-sm font-medium text-white hover:bg-opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							className="size-10"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
							/>
						</svg>
					</button>
				</Link>
			</div>
			<div className="grid grid-cols-1 gap-2">
				<DragDropList data={tasksState.projectData} />
			</div>
		</>
	);
};

export default ProjectDetails;
