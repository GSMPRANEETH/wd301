export interface TaskItem {
	id: string; // Required — don't allow undefined anymore
	title: string;
	description: string;
	dueDate: string;
}
