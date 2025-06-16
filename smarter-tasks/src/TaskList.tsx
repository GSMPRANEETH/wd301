import Task from "./Task";
// import { TaskItem } from "./types";
interface Props {
	tasks: TaskItem[];
	deleteTask: (index: number) => void;
}
interface TaskItem {
	id: string; // Required — don't allow undefined anymore
	title: string;
	description: string;
	dueDate: string;
}

const TaskList = (props: Props) => {
	return (
		<ul className="list-disc list-inside space-y-2">
			{props.tasks
				.filter(
					(task): task is TaskItem => !!task && typeof task.id === "string"
				)
				.map((task, idx) => (
					<li key={task.id}>
						<Task item={task} removeTask={() => props.deleteTask(idx)} />
					</li>
				))}
		</ul>
	);
};

export default TaskList;
