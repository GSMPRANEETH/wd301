import React from "react";

export interface CommentsListState {
	comments: CommentsData[];
	isLoading: boolean;
	isError: boolean;
	errorMessage: string;
}

export enum CommentsAvailableActions {
	FETCH_COMMENTS_SUCCESS = "FETCH_COMMENTS_SUCCESS",
	FETCH_COMMENTS_REQUEST = "FETCH_COMMENTS_REQUEST",
	FETCH_COMMENTS_FAILURE = "FETCH_COMMENTS_FAILURE",

	ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST",
	ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS",
	ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE",
}

export type CommentsData = {
	id: number;
	description: string;
	task_id: number;
	owner: number;
};

export type CommentsActions =
	| { type: CommentsAvailableActions.FETCH_COMMENTS_FAILURE; payload: string }
	| { type: CommentsAvailableActions.FETCH_COMMENTS_REQUEST }
	| {
			type: CommentsAvailableActions.FETCH_COMMENTS_SUCCESS;
			payload: CommentsData[];
	  }
	| { type: CommentsAvailableActions.ADD_COMMENT_REQUEST }
	| {
			type: CommentsAvailableActions.ADD_COMMENT_SUCCESS;
	  }
	| { type: CommentsAvailableActions.ADD_COMMENT_FAILURE; payload: string };
export type CommentsDispatch = React.Dispatch<CommentsActions>;
