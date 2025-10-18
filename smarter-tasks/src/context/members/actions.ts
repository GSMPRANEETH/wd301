import { API_ENDPOINT } from "../../config/constants";

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
