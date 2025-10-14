import React from "react";
import "./TaskCard.css";

interface TaskProp {
	title: String;
	description: String;
	dueDate: Date;
}

class Task extends React.Component<TaskProp> {
	render() {
		return (
			<div className="TaskItem shadow-md border border-slate-100">
				<h3 className="text-base font-bold my-1">{this.props.title}</h3>
				<p className="text-sm text-slate-500">
					Due Date: {this.props.dueDate.toLocaleDateString()}
				</p>
				<p className="text-sm text-slate-500">
					Description: {this.props.description}
				</p>
			</div>
		);
	}
}

export default Task;
