// src/context/projects/actions.ts
import { API_ENDPOINT } from "../../config/constants";
export const fetchProjects = async (dispatch: any) => {
	const token = localStorage.getItem("authToken") ?? "";

	try {
		dispatch({ type: "FETCH_PROJECTS_REQUEST" });
		const response = await fetch(`${API_ENDPOINT}/projects`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		const data = await response.json();
		dispatch({ type: "FETCH_PROJECTS_SUCCESS", payload: data });
	} catch (error) {
		console.log("Error fetching projects:", error);
		dispatch({
			type: "FETCH_PROJECTS_FAILURE",
			payload: "Unable to load projects",
		});
	}
};

export const addProject = async (
	dispatch: React.Dispatch<any>,
	args: { name: string }
): Promise<{ ok: boolean; error?: string }> => {
	try {
		const token = localStorage.getItem("authToken") ?? "";
		const response = await fetch(`${API_ENDPOINT}/projects`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(args),
		});

		const data = await response.json();

		if (!response.ok) {
			const message = data.errors?.[0]?.message || "Failed to create project";
			return { ok: false, error: message };
		}

		dispatch({ type: "ADD_PROJECT_SUCCESS", payload: data.project || data });

		return { ok: true };
	} catch (error: any) {
		console.error("Add project failed:", error);
		return { ok: false, error: error?.message || "Unexpected error" };
	}
};
