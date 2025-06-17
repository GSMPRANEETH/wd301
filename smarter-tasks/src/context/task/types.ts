export interface TaskListState {
	projectData: ProjectData;
	isLoading: boolean;
	isError: boolean;
	errorMessage: string;
}

// Actions that are available
export enum TaskListAvailableAction {
	CREATE_TASK_REQUEST = "CREATE_TASK_REQUEST",
	CREATE_TASK_SUCCESS = "CREATE_TASK_SUCCESS",
	CREATE_TASK_FAILURE = "CREATE_TASK_FAILURE",

	REORDER_TASKS = "REORDER_TASKS",
}

// Define the action types and payload
export type TaskActions =
	| { type: TaskListAvailableAction.CREATE_TASK_REQUEST }
	| { type: TaskListAvailableAction.CREATE_TASK_SUCCESS }
	| { type: TaskListAvailableAction.CREATE_TASK_FAILURE; payload: string }
	| { type: TaskListAvailableAction.REORDER_TASKS; payload: ProjectData };
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
