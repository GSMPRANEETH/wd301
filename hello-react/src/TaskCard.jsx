import "./TaskCard.css";

const TaskCard = (props) => {
	console.log(props);
	return (
		<div className="TaskItem">
			<h2 className="text-xl font-bold text-red-800">{props.title}</h2>
			<p>{props.dueDate ? props.dueDate : props.completedAtDate}</p>
			<p>{props.assigneeName}</p>
		</div>
	);
};

export default TaskCard;
