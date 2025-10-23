import type { Reducer } from "react";
import {
	type CommentsListState,
	type CommentsActions,
	CommentsAvailableActions,
} from "./types";

export const initialState: CommentsListState = {
	comments: [],
	isLoading: false,
	isError: false,
	errorMessage: "",
};

export const commentsReducer: Reducer<CommentsListState, CommentsActions> = (
	state = initialState,
	action
) => {
	switch (action.type) {
		case CommentsAvailableActions.FETCH_COMMENTS_SUCCESS:
			return {
				...state,
				isLoading: false,
				comments: action.payload,
			};
		case CommentsAvailableActions.FETCH_COMMENTS_REQUEST:
			return {
				...state,
				isLoading: true,
			};
		case CommentsAvailableActions.FETCH_COMMENTS_FAILURE:
			return {
				...state,
				isLoading: false,
				isError: true,
				errorMessage: action.payload,
			};

		case CommentsAvailableActions.ADD_COMMENT_REQUEST:
			return {
				...state,
				isLoading: true,
			};
		case CommentsAvailableActions.ADD_COMMENT_SUCCESS:
			return {
				...state,
				isLoading: false,
			};
		case CommentsAvailableActions.ADD_COMMENT_FAILURE:
			return {
				...state,
				isLoading: false,
				isError: true,
				errorMessage: action.payload,
			};
		default:
			return state;
	}
};
