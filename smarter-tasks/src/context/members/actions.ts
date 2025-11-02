import { API_ENDPOINT } from "../../config/constants";
import type { Member } from "./reducer";

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
		console.log("Error fetching members:", error);
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
		const { name, email } = data.user;
		console.log(`member created ok ${name} ${email}`);
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

		console.log(`member deleted: ${id}`);
		dispatch({ type: "DELETE_MEMBER_SUCCESS", payload: Number(id) });

		return { ok: true };
	} catch (error) {
		console.error("Operation failed:", error);
		return { ok: false, error };
	}
};

export const getUserDetails = async (args: any) => {
	const token = localStorage.getItem("authToken") ?? "";
	const { id } = args;
	console.log(`Got id in actions.ts: ${id}`);
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
		const data = await response.json();
		console.log("Reveived data: ", data);
	} catch (error) {
		console.log(`Error in fetching member detials of id: ${id}: `, error);
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
		console.log("updated data:", updated);
		dispatch({ type: "UPDATE_MEMBER_SUCCESS" });
		fetchMembers(dispatch);
		return { ok: true, user: updated as Member };
	} catch (error) {
		dispatch({ type: "UPDATE_MEMBER_FAILURE", payload: error });
		console.log("Updating user details failed", error);
		return { ok: false, error };
	}
};