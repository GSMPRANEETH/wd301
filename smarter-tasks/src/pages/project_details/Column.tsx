import React, { forwardRef } from "react";

import type { ColumnData, TaskDetails } from "../../context/task/types";
import Task from "./Task";
import { Droppable } from "@hello-pangea/dnd";

const Container = (props: React.PropsWithChildren) => {
	return (
		<div className="flex-shrink-0 w-80 kanban-column rounded-2xl p-4 flex flex-col gap-5">
			{props.children}
		</div>
	);
};

const Title = (props: { title: string, count: number }) => {
	return (
        <div className="flex items-center justify-between px-2">
            <h3 className="text-xs font-black uppercase tracking-widest text-muted flex items-center gap-2.5">
                {props.title}
                <span className="bg-white/10 px-2 py-0.5 rounded-full text-[10px] border border-base font-bold text-fg">{props.count}</span>
            </h3>
        </div>
    );
};

const TaskList = forwardRef<HTMLDivElement | null, React.PropsWithChildren>(
	(props: React.PropsWithChildren, ref) => {
		return (
			<div ref={ref} className="flex-1 space-y-4" {...props}>
				{props.children}
			</div>
		);
	}
);

interface Props {
	column: ColumnData;
	tasks: TaskDetails[];
}

const Column: React.FC<Props> = (props) => {
	return (
		<Container>
			<Title title={props.column.title} count={props.tasks.length} />
			<Droppable droppableId={props.column.id}>
				{(provided) => (
					<TaskList ref={provided.innerRef} {...provided.droppableProps}>
						{props.tasks.map((task, idx) => (
							<Task key={task.id} task={task} index={idx} />
						))}
						{provided.placeholder}
					</TaskList>
				)}
			</Droppable>
		</Container>
	);
};

export default Column;
