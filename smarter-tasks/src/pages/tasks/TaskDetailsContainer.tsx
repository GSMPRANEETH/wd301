import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProjectsState } from "../../context/projects/context";
import { useTasksState } from "../../context/task/context";
import { useCommentDispatch } from "../../context/comment/context";
import { fetchComments } from "../../context/comment/actions";
import TaskDetails from "./TaskDetails";

const TaskDetailsContainer = () => {
	const { projectID, taskID } = useParams<{
		projectID: string;
		taskID: string;
	}>();

	const projectState = useProjectsState();
	const taskListState = useTasksState();
	const commentDispatch = useCommentDispatch();

	// Handle case where state is undefined or loading
	if (!projectState || projectState.isLoading) return <>Loading...</>;
	if (!taskListState || taskListState.isLoading) return <>Loading...</>;

	const selectedTask = taskListState.projectData.tasks?.[taskID || ""];

	useEffect(() => {
		if (projectID && taskID) {
			commentDispatch({ type: "CLEAR_COMMENTS" });
			fetchComments(commentDispatch, projectID, taskID);
		}
	}, [projectID, taskID, commentDispatch]);

	if (!selectedTask) return <>No such task!</>;

	return <TaskDetails />;
};

export default TaskDetailsContainer;
