import React, { forwardRef } from "react";

import type { TaskDetails } from "../../context/task/types";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useTasksDispatch } from "../../context/task/context";
import { deleteTask } from "../../context/task/actions";
import { Draggable } from "@hello-pangea/dnd";

const Task = forwardRef<
	HTMLDivElement,
	React.PropsWithChildren<{ task: TaskDetails }>
>((props, ref) => {
	const taskDispatch = useTasksDispatch();
	const { projectID } = useParams();
	const { task } = props;

    const assigneeInitial = task.assignedUserName ? task.assignedUserName.charAt(0).toUpperCase() : "-";
    const dateFormatted = new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

	return (
		<div ref={ref} {...props} className="cursor-grab active:cursor-grabbing block">
			<Link
				className="task-card p-5 rounded-2xl block relative group"
				to={`tasks/${task.id}`}
			>
				<h4 className="text-sm font-bold mb-4 leading-relaxed pr-8">{task.title}</h4>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-[10px] text-muted font-bold uppercase tracking-wider">
                        <svg className="w-3.5 h-3.5 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        {dateFormatted}
                    </div>
                    <div className="h-7 w-7 rounded-full bg-accent flex items-center justify-center text-[10px] font-black text-white shadow-md shadow-accent/20">
                        {assigneeInitial}
                    </div>
                </div>

                <button
                    className="deleteTaskButton absolute top-4 right-4 text-muted hover:text-red-500 transition-opacity"
                    onClick={(event) => {
                        event.preventDefault();
                        deleteTask(taskDispatch, projectID ?? "", task);
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className="w-4 h-4"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
			</Link>
		</div>
	);
});

const Container = (
	props: React.PropsWithChildren<{
		task: TaskDetails;
		index: number;
	}>
) => {
	return (
		<Draggable index={props.index} draggableId={`${props.task.id}`}>
			{(provided) => (
				<Task
					task={props.task}
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
				/>
			)}
		</Draggable>
	);
};

export default Container;
