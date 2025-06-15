import React from "react";
import Task from "./Task";
// import { TaskItem } from "./types";
interface Props {
	tasks: TaskItem[];
}
interface TaskItem {
	title: string;
	description: string;
	dueDate: string;
}

const TaskList = (props: Props) => {
	const list = props.tasks.map((task, idx) => (
		<Task
			key={idx}
			title={task.title}
			description={task.description}
			dueDate={task.dueDate}
		/>
	));
	return <>{list}</>;
};

export default TaskList;
