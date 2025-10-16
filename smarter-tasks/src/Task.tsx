import "./TaskCard.css";

interface TaskProp {
	title: String;
	description: String;
	dueDate: Date;
}

const Task = (props: TaskProp) => {
	return (
		<div className="TaskItem shadow-md border border-slate-100">
			<h3 className="text-base font-bold my-1">{props.title}</h3>
			<p className="text-sm text-slate-500">
				Due Date: {props.dueDate.toLocaleDateString()}
			</p>
			<p className="text-sm text-slate-500">Description: {props.description}</p>
			<button
				id="deleteTaskButton"
				className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
			>
				Delete Task
			</button>
		</div>
	);
};

export default Task;
