import Task from "./Task";
import type { TaskItem } from "./types";

interface Props {
	tasks: TaskItem[];
	removeTask: (task: TaskItem) => void;
}

const TaskList = ({ tasks, removeTask }: Props) => {
	return (
		<ol>
			{tasks.map((task) => (
				<li key={task.id}>
					<Task item={task} removeTask={removeTask} />
				</li>
			))}
		</ol>
	);
};

export default TaskList;
