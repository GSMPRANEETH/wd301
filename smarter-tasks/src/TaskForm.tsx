import React from "react";
// import { TaskItem } from "./types";
interface TaskFormProps {
	addTask: (task: TaskItem) => void;
}
interface TaskFormState {
	title: string;
	description: string;
	dueDate: Date;
}
interface TaskItem {
	title: string;
	description: string;
	dueDate: Date;
}
class TaskForm extends React.Component<TaskFormProps, TaskFormState> {
	constructor(props: TaskFormProps) {
		super(props);
		this.state = {
			title: "",
			description: "",
			dueDate: undefined as unknown as Date,
		};
	}

	addTask: React.FormEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault();
		const newTask = {
			title: this.state.title,
			description: this.state.description,
			dueDate: this.state.dueDate,
		};
		this.props.addTask(newTask);
		this.setState({ title: "" });
	};
	titleChanged: React.ChangeEventHandler<HTMLInputElement> = (event) => {
		console.log(`${event.target.value}`);
		this.setState({ title: event.target.value });
	};
	descriptionChanged: React.ChangeEventHandler<HTMLInputElement> = (event) => {
		console.log(`${event.target.value}`);
		this.setState({ description: event.target.value });
	};
	dueDateChanged: React.ChangeEventHandler<HTMLInputElement> = (event) => {
		console.log(`${event.target.value}`);
		this.setState({ dueDate: new Date(event.target.value) });
	};
	render() {
		return (
			<form onSubmit={this.addTask}>
				<input
					id="todoTitle"
					type="text"
					value={this.state.title}
					onChange={this.titleChanged}
					required
					placeholder="Title"
				/>
				<input
					type="text"
					id="todoDescription"
					onChange={this.descriptionChanged}
					value={this.state.description}
					placeholder="Description"
				/>
				<input
					type="date"
					id="todoDueDate"
					required
					onChange={this.dueDateChanged}
					value={
						this.state.dueDate
							? this.state.dueDate.toISOString().split("T")[0]
							: ""
					}
				/>
				<button type="submit" id="addTaskButton">
					Add item
				</button>
			</form>
		);
	}
}
export default TaskForm;
