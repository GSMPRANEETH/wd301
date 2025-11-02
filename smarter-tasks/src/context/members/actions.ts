import { API_ENDPOINT } from "../../config/constants";
import type { Member, MemberActions } from "./reducer";

export const fetchMembers = async (dispatch: any) => {
	const token = localStorage.getItem("authToken") ?? "";
	try {
		dispatch({ type: "FETCH_MEMBERS_REQUEST" });
		const response = await fetch(`${API_ENDPOINT}/users`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		const data = await response.json();
		dispatch({ type: "FETCH_MEMBERS_SUCCESS", payload: data });
	} catch (error) {
		dispatch({
			type: "FETCH_MEMBERS_FAILURE",
			payload: "Unable to load members",
		});
	}
};

export const addMember = async (dispatch: any, args: any) => {
	const token = localStorage.getItem("authToken") ?? "";
	try {
		const response = await fetch(`${API_ENDPOINT}/users`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(args),
		});
		if (!response.ok) {
			throw new Error("Member creation failed");
		}
		const data = await response.json();
		if (data.errors && data.errors.length > 0) {
			return { ok: false, error: data.errors[0].message };
		}
		dispatch({ type: "ADD_MEMBER_SUCCESS", payload: data.user });

		return { ok: true };
	} catch (error) {
		console.error("Operation failed:", error);
		return { ok: false, error };
	}
};

export const deleteUser = async (dispatch: any, args: any) => {
	const token = localStorage.getItem("authToken") ?? "";
	const { id } = args;
	try {
		dispatch({ type: "DELETE_MEMBER_REQUEST" });
		const response = await fetch(`${API_ENDPOINT}/users/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		if (!response.ok) {
			throw new Error("Member deletion failed");
		}

		dispatch({ type: "DELETE_MEMBER_SUCCESS", payload: Number(id) });
	} catch (error) {
		dispatch({ type: "DELETE_MEMBER_FAILURE", payload: error });
	}
};

export const getUserDetails = async (dispatch: any, args: any) => {
	const token = localStorage.getItem("authToken") ?? "";
	const { id } = args;
	dispatch({ type: "FETCH_MEMBER_REQUEST" });
	try {
		const response = await fetch(`${API_ENDPOINT}/users/${id}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		if (!response.ok) {
			throw new Error("Member details fetching failed");
		}
		dispatch({ type: "FETCH_MEMBER_SUCCESSS" });
	} catch (error) {
		dispatch({ type: "FETCH_MEMBER_FAILURE", payload: error });
	}
};

export const updateUserDetails = async (
	dispatch: any,
	args: {
		id: number;
		data: Partial<Member>;
	}
) => {
	const token = localStorage.getItem("authToken") ?? "";
	const { id, data } = args;
	try {
		dispatch({ type: "UPDATE_MEMBER_REQUEST" });
		const response = await fetch(`${API_ENDPOINT}/users/${id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(data),
		});
		if (!response.ok) {
			throw new Error("Member updating failed");
		}
		const updated = await response.json();
		dispatch({ type: "UPDATE_MEMBER_SUCCESS" });
		fetchMembers(dispatch);
		return { ok: true, user: updated as Member };
	} catch (error) {
		dispatch({ type: "UPDATE_MEMBER_FAILURE", payload: error });
		return { ok: false, error };
	}
};