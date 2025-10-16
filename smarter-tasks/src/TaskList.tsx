import Task from "./Task";
import type { TaskItem } from "./types";

interface Props {
	tasks: TaskItem[];
}

const TaskList = (props: Props) => {
	return (
		<ol>
			{props.tasks.map((task, idx) => (
				<li>
					<Task
						key={idx}
						title={task.title}
						description={task.description}
						dueDate={new Date(task.dueDate)}
					/>
				</li>
			))}
		</ol>
	);
};

export default TaskList;
