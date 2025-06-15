import "./TaskCard.css";

interface TaskProp {
	title: string;
	dueDate: string;
	description: string;
	onDelete: () => void;
}

const Task = (props: TaskProp) => {
	return (
		<div className="TaskItem shadow-md border border-slate-100">
			<h2 className="text-base font-bold my-1">{props.title}</h2>
			<p className="text-sm text-slate-500">{props.dueDate}</p>
			<p className="text-sm text-slate-500">{props.description}</p>
			<button
				onClick={props.onDelete}
				className="deleteTaskButton ext-red-500 text-sm color-red border border-red-500 px-2 py-1 rounded-md font-color-red"
				id="deleteTaskButton"
			>
				Delete Task
			</button>
		</div>
	);
};
export default Task;
