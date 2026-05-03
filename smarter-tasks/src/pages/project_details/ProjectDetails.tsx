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
		return <div className="text-muted p-6">No such Project!</div>;
	}

	if (tasksState.isLoading) {
		return <div className="text-muted p-6">Loading...</div>;
	}
	return (
		<div className="space-y-8 p-6 max-w-7xl mx-auto w-full view-enter">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <Link to="/account/projects" aria-label="Back to projects" className="p-2.5 hover:bg-surface border border-base rounded-xl text-muted transition-all active:scale-[0.95]">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
                    </Link>
                    <div>
                        <h2 className="text-3xl font-bold text-display tracking-tight leading-tight flex items-center gap-2">
                            {selectedProject.name}
                            <Link to={"edit"} aria-label={`Edit ${selectedProject.name}`} className="text-muted hover:text-fg ml-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                    />
                                </svg>
                            </Link>
                        </h2>
                        <p className="text-muted text-sm font-medium">Sprint Active</p>
                    </div>
                </div>
                <div className="flex items-center gap-5">
                    <Link to={`tasks/new`}>
                        <button
                            id="newTaskBtn"
                            className="px-5 py-2.5 bg-accent text-white rounded-xl text-sm font-bold shadow-lg shadow-accent/20 hover:opacity-90 transition-all active:scale-[0.98]"
                        >
                            Add Task
                        </button>
                    </Link>
                </div>
            </div>

            <DragDropList data={tasksState.projectData} />
		</div>
	);
};

export default ProjectDetails;
