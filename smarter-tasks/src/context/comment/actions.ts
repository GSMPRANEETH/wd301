import { API_ENDPOINT } from "../../config/constants";
import type { Comment, CommentAction } from "./types";

function normalize(raw: any): Comment {
	return {
		id: raw.id,
		content: raw.content ?? raw.description ?? raw.text ?? "",
		updatedAt: raw.updatedAt ?? raw.timestamp ?? raw.createdAt ?? "",
		owner: raw.owner ?? raw.userId ?? 0,
	};
}

export async function fetchComments(
	dispatch: React.Dispatch<CommentAction>,
	projectId: string,
	taskId: string
) {
	dispatch({ type: "FETCH_COMMENTS_REQUEST" });
	try {
		const token = localStorage.getItem("authToken") ?? "";
		const res = await fetch(
			`${API_ENDPOINT}/projects/${projectId}/tasks/${taskId}/comments`,
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			}
		);
		if (!res.ok) throw new Error(`Fetch failed (${res.status})`);
		const data = await res.json();
		console.log("💥 RAW COMMENTS PAYLOAD:", data);

		const list: any[] = Array.isArray(data)
			? data
			: Array.isArray(data.comments)
			? data.comments
			: Array.isArray(data.data)
			? data.data
			: [];
		const comments = list
			.map(normalize)
			.sort(
				(a, b) =>
					new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
			);
		dispatch({ type: "FETCH_COMMENTS_SUCCESS", payload: comments });
	} catch (e) {
		dispatch({ type: "FETCH_COMMENTS_FAILURE", payload: (e as Error).message });
	}
}

export async function addComment(
	dispatch: React.Dispatch<CommentAction>,
	projectId: string,
	taskId: string,
	content: string
): Promise<{ ok: boolean; error?: string }> {
	dispatch({ type: "ADD_COMMENT_REQUEST" });
	try {
		const token = localStorage.getItem("authToken") ?? "";
		const res = await fetch(
			`${API_ENDPOINT}/projects/${projectId}/tasks/${taskId}/comments`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ description: content }),
			}
		);
		const data = await res.json();
		console.log("💥 RAW NEW COMMENT:", data);

		if (!res.ok)
			throw new Error(
				data.errors?.[0]?.message || `Add failed (${res.status})`
			);
		const comment = normalize(data.comment ?? data);
		dispatch({ type: "ADD_COMMENT_SUCCESS", payload: comment });
		return { ok: true };
	} catch (e) {
		const msg = (e as Error).message;
		dispatch({ type: "ADD_COMMENT_FAILURE", payload: msg });
		return { ok: false, error: msg };
	}
}
