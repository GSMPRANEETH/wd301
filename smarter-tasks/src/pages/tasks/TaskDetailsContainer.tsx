import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProjectsState } from "../../context/projects/context";
import { useTasksState } from "../../context/task/context";

// pull in your new comment hooks & action
import { useCommentDispatch } from "../../context/comment/context";
import { fetchComments } from "../../context/comment/actions";

import TaskDetails from "./TaskDetails";

const TaskDetailsContainer = () => {
	let { projectID, taskID } = useParams<{
		projectID: string;
		taskID: string;
	}>();

	const projectState = useProjectsState();
	const taskListState = useTasksState();
	const isFetchingTasks = taskListState.isLoading;
	const selectedTask = taskListState.projectData.tasks?.[taskID || ""];

	// set up comment dispatcher
	const commentDispatch = useCommentDispatch();

	// fetch comments using the new signature
	useEffect(() => {
		if (projectID && taskID) {
			// CLEAR_COMMENTS is optional if you want to reset between tasks
			commentDispatch({ type: "CLEAR_COMMENTS" });
			fetchComments(commentDispatch, projectID, taskID);
		}
	}, [projectID, taskID, commentDispatch]);

	if (isFetchingTasks || projectState.isLoading) {
		return <>Loading...</>;
	}
	if (!selectedTask) {
		return <>No such task!</>;
	}

	return <TaskDetails />;
};

export default TaskDetailsContainer;
