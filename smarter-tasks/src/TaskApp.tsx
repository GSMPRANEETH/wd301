import type { TaskItem } from "./types";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";
import { useLocalStorage } from "./hooks/useLocalStorage";

interface TaskAppState {
	tasks: TaskItem[];
}

const TaskApp = () => {
	const [taskAppState, setTaskAppState] = useLocalStorage<TaskAppState>(
		"tasks",
		{
			tasks: [],
		}
	);

	const addTask = (task: TaskItem) => {
		setTaskAppState({
			tasks: [...taskAppState.tasks, task],
		});
	};

	const removeTask = (task: TaskItem) => {
		setTaskAppState({
			tasks: taskAppState.tasks.filter((t) => t.id !== task.id),
		});
	};

	return (
		<div className="container py-10 max-w-7xl mx-auto">
			<h1 className="text-3xl mb-2 font-bold text-slate-700">Smarter Tasks</h1>
			<h1 className="text-lg mb-6 text-slate-600">
				<span className="font-bold">Project: </span>
				Graduation Final Year Project (Revamp college website)
			</h1>
			<div className="border border-slate-200 rounded-xl p-4">
				<h1 className="text-slate-500 text-xl font-bold text-center mb-2">
					Pending
				</h1>
				<TaskForm addTask={addTask} />
				<TaskList tasks={taskAppState.tasks} removeTask={removeTask} />
			</div>
		</div>
	);
};

export default TaskApp;
