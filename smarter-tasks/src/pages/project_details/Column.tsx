import React, { forwardRef } from "react";
import Task from "./Task";
import { ColumnData, TaskDetails } from "../../context/task/types";
import { Droppable } from "react-beautiful-dnd";

const Container = (props: React.PropsWithChildren) => (
	<div className="m-2 border border-gray rounded w-1/3 flex flex-col">
		{props.children}
	</div>
);

const Title = (props: React.PropsWithChildren) => (
	<h3 className="p-2 font-semibold">{props.children}</h3>
);

const TaskList = forwardRef<HTMLDivElement | null, React.PropsWithChildren>(
	(props, ref) => (
		<div ref={ref} className="grow min-h-100 dropArea" {...props}>
			{props.children}
		</div>
	)
);

interface Props {
	column: ColumnData;
	tasks: TaskDetails[];
}

const Column: React.FC<Props> = ({ column, tasks }) => (
	<Container>
		<Title>{column.title}</Title>

		<Droppable
			droppableId={column.id}
			isDropDisabled={false}
			isCombineEnabled={false}
			ignoreContainerClipping={false}
		>
			{(provided, snapshot) => (
				<TaskList ref={provided.innerRef} {...provided.droppableProps}>
					{tasks.map((task, idx) => (
						<Task key={task.id} task={task} index={idx} />
					))}
					{provided.placeholder}
				</TaskList>
			)}
		</Droppable>
	</Container>
);

export default Column;
