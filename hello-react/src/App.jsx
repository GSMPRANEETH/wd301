import TaskCard from "./TaskCard";

function App() {
	return (
		<div>
			<div>
				<h1>Pending</h1>
				<TaskCard
					title="Task 1"
					dueDate="Due on:2034-01-01"
					assigneeName="John Doe"
				/>
				<TaskCard
					title="Task 2"
					dueDate="Due on: 2032-07-14"
					assigneeName="Jane Doe"
				/>
			</div>
			<div>
				<h1>Done</h1>
				<TaskCard
					title="Task 3"
					completedAtDate="Completed on:2012-02-45"
					assigneeName="John Doe"
				/>
				<TaskCard
					title="Task 4"
					completedAtDate="Completed on:2023-05-23"
					assigneeName="Jane Doe"
				/>
			</div>
		</div>
	);
}

export default App;
