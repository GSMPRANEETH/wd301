export interface TaskListState {
	projectData: ProjectData;
	isLoading: boolean;
	isError: boolean;
	errorMessage: string;
}

export const TaskListAvailableAction = {
	FETCH_TASKS_REQUEST: "FETCH_TASKS_REQUEST",
	FETCH_TASKS_SUCCESS: "FETCH_TASKS_SUCCESS",
	FETCH_TASKS_FAILURE: "FETCH_TASKS_FAILURE",

	DELETE_TASKS_REQUEST: "DELETE_TASKS_REQUEST",
	DELETE_TASKS_SUCCESS: "DELETE_TASKS_SUCCESS",
	DELETE_TASKS_FAILURE: "DELETE_TASKS_FAILURE",

	CREATE_TASK_REQUEST: "CREATE_TASK_REQUEST",
	CREATE_TASK_SUCCESS: "CREATE_TASK_SUCCESS",
	CREATE_TASK_FAILURE: "CREATE_TASK_FAILURE",

	// Add action types
	UPDATE_TASK_REQUEST: "UPDATE_TASK_REQUEST",
	UPDATE_TASK_SUCCESS: "UPDATE_TASK_SUCCESS",
	UPDATE_TASK_FAILURE: "UPDATE_TASK_FAILURE",

	REORDER_TASKS: "REORDER_TASKS",
} as const;

export type TaskActions =
	| { type: typeof TaskListAvailableAction.REORDER_TASKS; payload: ProjectData }
	| { type: typeof TaskListAvailableAction.FETCH_TASKS_REQUEST }
	| {
			type: typeof TaskListAvailableAction.FETCH_TASKS_SUCCESS;
			payload: ProjectData;
	  }
	| {
			type: typeof TaskListAvailableAction.FETCH_TASKS_FAILURE;
			payload: string;
	  }
	| { type: typeof TaskListAvailableAction.DELETE_TASKS_REQUEST }
	| { type: typeof TaskListAvailableAction.DELETE_TASKS_SUCCESS }
	| {
			type: typeof TaskListAvailableAction.DELETE_TASKS_FAILURE;
			payload: string;
	  }
	| { type: typeof TaskListAvailableAction.CREATE_TASK_REQUEST }
	| { type: typeof TaskListAvailableAction.CREATE_TASK_SUCCESS }
	| {
			type: typeof TaskListAvailableAction.CREATE_TASK_FAILURE;
			payload: string;
	  }
	| { type: typeof TaskListAvailableAction.UPDATE_TASK_REQUEST }
	| { type: typeof TaskListAvailableAction.UPDATE_TASK_SUCCESS }
	| {
			type: typeof TaskListAvailableAction.UPDATE_TASK_FAILURE;
			payload: string;
	  };

// A type to hold dispatch actions in a context.
export type TasksDispatch = React.Dispatch<TaskActions>;
export type TaskDetailsPayload = Omit<TaskDetails, "id" | "assignee" | "state">;
export type AvailableColumns = "pending" | "in_progress" | "done";
export type ColumnData = {
	id: string;
	title: string;
	taskIDs: string[];
};
export type Columns = {
	[k in AvailableColumns]: ColumnData;
};
export type TaskDetails = {
	id: number;
	title: string;
	description: string;
	dueDate: string;
	state: AvailableColumns;
	assignee?: number;
	assignedUserName?: string;
};
export type Tasks = {
	[k: string]: TaskDetails;
};
export type ProjectData = {
	tasks: Tasks;
	columns: Columns;
	columnOrder: AvailableColumns[];
};
