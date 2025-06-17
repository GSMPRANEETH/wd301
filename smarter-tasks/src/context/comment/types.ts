export interface Comment {
	description: string;
	updatedAt: string;
	id: string;
	authorName: string;
	text: string;
	timestamp: string;
}

export interface CommentState {
	byId: Record<string, Comment>;
	allIds: string[];
}

export type CommentAction =
	| { type: "SET_COMMENTS"; payload: Comment[] }
	| { type: "ADD_COMMENT"; payload: Comment }
	| { type: "ADD_COMMENT_SUCCESS"; payload: Comment };
