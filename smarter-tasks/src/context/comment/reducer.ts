import type { Comment, CommentState, CommentAction } from "./types";

export const initialState: CommentState = {
	all: [],
	isLoading: false,
	error: undefined,
};

export function reducer(
	state: CommentState,
	action: CommentAction
): CommentState {
	switch (action.type) {
		case "FETCH_COMMENTS_REQUEST":
		case "ADD_COMMENT_REQUEST":
			return { ...state, isLoading: true, error: undefined };

		case "FETCH_COMMENTS_SUCCESS":
			return { all: action.payload, isLoading: false, error: undefined };

		case "ADD_COMMENT_SUCCESS":
			return {
				all: [action.payload, ...state.all],
				isLoading: false,
				error: undefined,
			};

		case "FETCH_COMMENTS_FAILURE":
		case "ADD_COMMENT_FAILURE":
			return { ...state, isLoading: false, error: action.payload };

		case "CLEAR_COMMENTS":
			return initialState;

		default:
			return state;
	}
}
