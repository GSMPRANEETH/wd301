import Task from "./Task";
// import { TaskItem } from "./types";
interface Props {
	tasks: TaskItem[];
	deleteTask: (index: number) => void;
}
interface TaskItem {
	title: string;
	description: string;
	dueDate: string;
}

const TaskList = (props: Props) => {
	return (
		<ul className="list-disc list-inside space-y-2">
			{props.tasks.map((task, idx) => (
				<li key={idx}>
					<Task
						title={task.title}
						description={task.description}
						dueDate={task.dueDate} // pass dueDate as a string
						onDelete={() => props.deleteTask(idx)}
					/>
				</li>
			))}
		</ul>
	);
};

export default TaskList;
