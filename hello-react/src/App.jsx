import TaskCard from "./TaskCard";

function App() {
	return (
		<div>
			<div>
				<h1>Pending</h1>
				<TaskCard title="Task 1" />
				<TaskCard title="Task 2" />
			</div>
			<div>
				<h1>Done</h1>
				<TaskCard title="Task 3" />
				<TaskCard title="Task 4" />
			</div>
		</div>
	);
}

export default App;
