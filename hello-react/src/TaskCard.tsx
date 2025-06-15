import React from "react";
import "./TaskCard.css";

interface TaskCardProps {
	title: string;
	dueDate?: string;
	completedAtDate?: string;
	assigneeName: string;
}

function TaskCard({
	title,
	dueDate,
	completedAtDate,
	assigneeName,
}: TaskCardProps) {
	return (
		<div className="TaskItem">
			<div>{title}</div>
			{dueDate && <div>Due on: {dueDate}</div>}
			{completedAtDate && <div>Completed on: {completedAtDate}</div>}
			<div>Assignee: {assigneeName}</div>
		</div>
	);
}

export default TaskCard;
