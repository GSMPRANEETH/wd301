import React from "react";

export interface CommentsListState {
	comments: CommentsData[];
	isLoading: boolean;
	isError: boolean;
	errorMessage: string;
}

export const CommentsAvailableActions = {
	FETCH_COMMENTS_SUCCESS: "FETCH_COMMENTS_SUCCESS",
	FETCH_COMMENTS_REQUEST: "FETCH_COMMENTS_REQUEST",
	FETCH_COMMENTS_FAILURE: "FETCH_COMMENTS_FAILURE",

	ADD_COMMENT_REQUEST: "ADD_COMMENT_REQUEST",
	ADD_COMMENT_SUCCESS: "ADD_COMMENT_SUCCESS",
	ADD_COMMENT_FAILURE: "ADD_COMMENT_FAILURE",
} as const;

export type CommentsData = {
	id: number;
	description: string;
	task_id: number;
	owner: number;
};

export type CommentsActions =
	| {
			type: typeof CommentsAvailableActions.FETCH_COMMENTS_FAILURE;
			payload: string;
	  }
	| { type: typeof CommentsAvailableActions.FETCH_COMMENTS_REQUEST }
	| {
			type: typeof CommentsAvailableActions.FETCH_COMMENTS_SUCCESS;
			payload: CommentsData[];
	  }
	| { type: typeof CommentsAvailableActions.ADD_COMMENT_REQUEST }
	| {
			type: typeof CommentsAvailableActions.ADD_COMMENT_SUCCESS;
	  }
	| {
			type: typeof CommentsAvailableActions.ADD_COMMENT_FAILURE;
			payload: string;
	  };
export type CommentsDispatch = React.Dispatch<CommentsActions>;
