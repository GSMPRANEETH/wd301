import React from "react";
import "./TaskCard.css";

interface TaskCardProps {
	title: string;
	dueDate?: Date;
	completedAtDate?: Date;
	assigneeName: string;
}

function TaskCard({
	title,
	dueDate,
	completedAtDate,
	assigneeName,
}: TaskCardProps) {
	return (
		<div className="TaskItem space-y-1">
			<p className="text-xl font-bold">{title}</p>

			<p>
				{completedAtDate
					? `Completed On: ${completedAtDate.toLocaleDateString()}`
					: `Due On: ${dueDate?.toLocaleDateString()}`}
			</p>
			<p>Assignee: {assigneeName}</p>
		</div>
	);
}

export default TaskCard;
