import React from "react";
import type { TaskItem } from "./types";
interface TaskFormProps {
	addTask: (task: TaskItem) => void;
}
interface TaskFormState {
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
			dueDate: new Date(),
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
		this.setState({ title: "", description: "", dueDate: new Date() });
	};

	titleChanged: React.ChangeEventHandler<HTMLInputElement> = (event) => {
		console.log(`${event.target.value}`);
		this.setState({ title: event.target.value });
	};

	descChanged: React.ChangeEventHandler<HTMLInputElement> = (event) => {
		console.log(`${event.target.value}`);
		this.setState({ description: event.target.value });
	};

	dateChanged: React.ChangeEventHandler<HTMLInputElement> = (event) => {
		console.log(`${new Date(event.target.value).toLocaleDateString()}`);
		this.setState({ dueDate: new Date(event.target.value) });
	};
	render() {
		return (
			<form onSubmit={this.addTask}>
				<input
					type="text"
					id="todoTitle"
					value={this.state.title}
					onChange={this.titleChanged}
					required
					placeholder="Title"
				/>
				<input
					type="text"
					id="todoDescription"
					value={this.state.description}
					onChange={this.descChanged}
					placeholder="Description"
				/>
				<input
					type="date"
					id="todoDueDate"
					value={this.state.dueDate.toISOString().split("T")[0]}
					onChange={this.dateChanged}
				/>
				<button type="submit">Add item</button>
			</form>
		);
	}
}

export default TaskForm;
