import "./TaskCard.css";

interface TaskCardProps {
	title: string;
	dueDate?: string;
	completedAtDate?: string;
	assigneeName: string;
}

function TaskCard(props: TaskCardProps) {
	return (
		<div className="TaskItem">
			<div>{props.title}</div>
			<div>{props.dueDate}</div>
			<div>{props.completedAtDate}</div>
			<div>{props.assigneeName}</div>
		</div>
	);
}

export default TaskCard;
