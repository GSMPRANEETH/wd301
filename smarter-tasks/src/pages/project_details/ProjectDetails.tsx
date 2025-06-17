import { Link, useParams } from "react-router-dom";

import { useTasksState } from "../../context/task/context";
import DragDropList from "./DragDropList";
import { useProjectsState } from "../../context/projects/context";

const ProjectDetails = () => {
	// Extract task and project from context
	const tasksState = useTasksState();
	const projectState = useProjectsState();
	const { projectID } = useParams();

	// Get the selected project based on `projectID`
	const selectedProject = projectState?.projects.filter(
		(project) => `${project.id}` === projectID
	)?.[0];

	// Display error if there is no project with given id.
	if (!selectedProject) {
		return <>No such Project!</>;
	}

	if (tasksState.isLoading) {
		return <>Loading...</>;
	}
	return (
		<>
			<div className="flex justify-between">
				<h2 className="text-2xl font-medium tracking-tight text-slate-700">
					{selectedProject.name}
				</h2>
				<Link to={`tasks/new`}>
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
