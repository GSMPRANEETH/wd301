import type { Comment } from "./types";

export interface CommentState {
	byId: Record<number, Comment>;
	allIds: number[];
	isLoading: boolean;
	error?: string;
}

export const initialState: CommentState = {
	byId: {},
	allIds: [],
	isLoading: false,
};

export type CommentActions =
	| { type: "FETCH_COMMENTS_REQUEST" }
	| { type: "FETCH_COMMENTS_SUCCESS"; payload: Comment[] }
	| { type: "FETCH_COMMENTS_FAILURE"; payload: string }
	| { type: "ADD_COMMENT_REQUEST" }
	| { type: "ADD_COMMENT_SUCCESS"; payload: Comment }
	| { type: "ADD_COMMENT_FAILURE"; payload: string }
	| { type: "CLEAR_COMMENTS" };

export const reducer = (
	state: CommentState,
	action: CommentActions
): CommentState => {
	switch (action.type) {
		case "FETCH_COMMENTS_REQUEST":
			return { ...state, isLoading: true };

		case "FETCH_COMMENTS_SUCCESS": {
			const byId: Record<number, Comment> = {};
			const allIds: number[] = [];

			action.payload.forEach((c) => {
				byId[c.id] = c;
				allIds.push(c.id);
			});

			return {
				...state,
				byId,
				allIds: allIds.sort(
					(a, b) =>
						new Date(byId[b].timestamp).getTime() -
						new Date(byId[a].timestamp).getTime()
				),
				isLoading: false,
			};
		}

		case "ADD_COMMENT_SUCCESS":
			return {
				...state,
				byId: { ...state.byId, [action.payload.id]: action.payload },
				allIds: [action.payload.id, ...state.allIds],
			};

		case "FETCH_COMMENTS_FAILURE":
		case "ADD_COMMENT_FAILURE":
			return { ...state, isLoading: false, error: action.payload };

		case "CLEAR_COMMENTS":
			return initialState;

		default:
			return state;
	}
};
