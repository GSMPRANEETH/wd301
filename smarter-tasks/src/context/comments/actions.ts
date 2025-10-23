import { API_ENDPOINT } from "../../config/constants";
import {
	CommentsAvailableActions,
	type CommentsData,
	type CommentsDispatch,
} from "./types";

export const getComments = async (
	dispatch: CommentsDispatch,
	projectID: string,
	taskID: string
) => {
	const token = localStorage.getItem("authToken");
	try {
		dispatch({ type: CommentsAvailableActions.FETCH_COMMENTS_REQUEST });
		const response = await fetch(
			`${API_ENDPOINT}/projects/${projectID}/tasks/${taskID}/comments`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			}
		);
		if (!response.ok) {
			throw new Error("Failed to get comments");
		}
		const data = await response.json();
		console.log("Comments got: ", data);
		dispatch({
			type: CommentsAvailableActions.FETCH_COMMENTS_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: CommentsAvailableActions.FETCH_COMMENTS_FAILURE,
			payload: "Error in getting comments",
		});
	}
};

export const addComment = async (
	dispatch: CommentsDispatch,
	projectID: string,
	taskID: string,
	comment: Omit<CommentsData, "id">
) => {
	const token = localStorage.getItem("authToken");
	try {
		dispatch({ type: CommentsAvailableActions.ADD_COMMENT_REQUEST });
		const response = await fetch(
			`${API_ENDPOINT}/projects/${projectID}/tasks/${taskID}/comments`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(comment),
			}
		);
		if (!response.ok) {
			throw new Error("Failed to create comment");
		}
		const data = await response.json();
		console.log("Comment created: ", data);
		getComments(dispatch, projectID, taskID);
		dispatch({
			type: CommentsAvailableActions.ADD_COMMENT_SUCCESS,
		});
	} catch (error) {
		dispatch({
			type: CommentsAvailableActions.ADD_COMMENT_FAILURE,
			payload: "Error in creating comment",
		});
	}
};
