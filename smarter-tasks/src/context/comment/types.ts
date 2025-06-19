export interface Comment {
	id: number;
	content: string;
	updatedAt: string;
	owner: number;
}

export interface CommentState {
	all: Comment[];
	isLoading: boolean;
	error?: string;
}

export type CommentAction =
	| { type: "FETCH_COMMENTS_REQUEST" }
	| { type: "FETCH_COMMENTS_SUCCESS"; payload: Comment[] }
	| { type: "FETCH_COMMENTS_FAILURE"; payload: string }
	| { type: "ADD_COMMENT_REQUEST" }
	| { type: "ADD_COMMENT_SUCCESS"; payload: Comment }
	| { type: "ADD_COMMENT_FAILURE"; payload: string }
	| { type: "CLEAR_COMMENTS" };
