// src/context/members/actions.ts

import { API_ENDPOINT } from "../../config/constants";
import { MembersAction, Member } from "./reducer";

export const fetchMembers = async (dispatch: React.Dispatch<MembersAction>) => {
	dispatch({ type: "FETCH_START" });
	try {
		const token = localStorage.getItem("authToken") ?? "";
		const response = await fetch(`${API_ENDPOINT}/users`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		const data = await response.json();
		dispatch({ type: "FETCH_SUCCESS", payload: data });
	} catch (error) {
		dispatch({
			type: "FETCH_ERROR",
			payload: "Failed to fetch members.",
		});
	}
};

export const addMember = async (
	dispatch: React.Dispatch<MembersAction>,
	memberData: { name: string; email: string; password: string }
): Promise<{ ok: boolean; error?: string }> => {
	try {
		const token = localStorage.getItem("authToken") ?? "";
		const response = await fetch(`${API_ENDPOINT}/users`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(memberData),
		});
		const data = await response.json();
		if (!response.ok) {
			return { ok: false, error: data.message || "Failed to add member" };
		}
		dispatch({ type: "ADD_MEMBER", payload: data });
		return { ok: true };
	} catch (error) {
		return { ok: false, error: "Network error" };
	}
};

export const removeMember = async (
	dispatch: React.Dispatch<MembersAction>,
	id: number
) => {
	try {
		const token = localStorage.getItem("authToken") ?? "";
		await fetch(`${API_ENDPOINT}/users/${id}`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		dispatch({ type: "REMOVE_MEMBER", payload: id });
	} catch (error) {
		console.error("Failed to remove member:", error);
	}
};
