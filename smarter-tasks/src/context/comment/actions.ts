import { API_ENDPOINT } from "../../config/constants";
import type { Comment } from "./types";

// FETCH COMMENTS
export const fetchComments = async (
	dispatch: React.Dispatch<any>,
	projectId: string,
	taskId: string
): Promise<void> => {
	const token = localStorage.getItem("authToken") ?? "";

	dispatch({ type: "FETCH_COMMENTS_REQUEST" });

	try {
		const response = await fetch(
			`${API_ENDPOINT}/projects/${projectId}/tasks/${taskId}/comments`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			}
		);

		const data: Comment[] = await response.json();
		console.log("[fetchComments] response data:", data);

		const normalized = data.map((c) => ({
			id: c.id,
			text: c.description ?? "",
			timestamp: c.updatedAt ?? new Date().toISOString(),
		}));

		dispatch({ type: "FETCH_COMMENTS_SUCCESS", payload: normalized });
	} catch (error: any) {
		dispatch({
			type: "FETCH_COMMENTS_FAILURE",
			payload: error.message || "Unable to load comments",
		});
	}
};

// POST COMMENT
export const addComment = async (
	dispatch: React.Dispatch<any>,
	projectId: string,
	taskId: string,
	text: string
): Promise<{ ok: boolean; error?: string }> => {
	const token = localStorage.getItem("authToken") ?? "";

	dispatch({ type: "ADD_COMMENT_REQUEST" });

	try {
		const response = await fetch(
			`${API_ENDPOINT}/projects/${projectId}/tasks/${taskId}/comments`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ description: text }),
			}
		);

		const data = await response.json();
		console.log("[addComment] raw response:", data);

		if (!response.ok) {
			const message = data.errors?.[0]?.message || "Failed to post comment";
			dispatch({ type: "ADD_COMMENT_FAILURE", payload: message });
			return { ok: false, error: message };
		}

		const comment: Comment = {
			id: data.id,
			text: data.description ?? "",
			timestamp: data.updatedAt ?? new Date().toISOString(),
			updatedAt: data.updatedAt ?? new Date().toISOString(), // ✅ Required field
			authorName: "", // You can enhance this later
		};

		dispatch({ type: "ADD_COMMENT_SUCCESS", payload: comment });
		return { ok: true };
	} catch (error: any) {
		dispatch({
			type: "ADD_COMMENT_FAILURE",
			payload: error.message || "Unexpected error",
		});
		return { ok: false, error: error.message || "Unexpected error" };
	}
};
