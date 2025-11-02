import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { useTasksDispatch, useTasksState } from "../../context/task/context";

import DragDropList from "./DragDropList";
import { refreshTasks } from "../../context/task/actions";
import { useProjectsState } from "../../context/projects/context";
import { ThemeContext, ThemeProvider } from "../../context/theme";

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

	console.log(ThemeProvider);
	return (
		<>
			<div className="flex justify-between">
				<h2 className="text-2xl font-medium tracking-tight text-slate-700 dark:text-white">
					{selectedProject.name}
				</h2>
				<Link to={"edit"}>
					<button
						id="editPrjctBtn"
						className="rounded-md bg-blue-600 px-4 py-2 m-2 mr-10 text-sm font-medium text-white hover:bg-opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
					>
						Edit Project
					</button>
				</Link>
				<Link to={`tasks/new`} className="ml-auto">
					<button
						id="newTaskBtn"
						className="rounded-md bg-blue-600 px-4 py-2 m-2 text-sm font-medium text-white hover:bg-opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
					>
						New Task
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
