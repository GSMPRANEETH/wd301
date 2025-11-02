import { API_ENDPOINT } from "../../config/constants";
import type { Project } from "./reducer";
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
		dispatch({
			type: "FETCH_PROJECTS_FAILURE",
			payload: "Unable to load projects",
		});
	}
};

export const addProject = async (dispatch: any, args: any) => {
	try {
		const token = localStorage.getItem("authToken") ?? "";
		const response = await fetch(`${API_ENDPOINT}/projects`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},

			// Next, I'll pass the `args` here
			body: JSON.stringify(args),
		});
		if (!response.ok) {
			throw new Error("Failed to create project");
		}
		const data = await response.json();
		if (data.errors && data.errors.length > 0) {
			return { ok: false, error: data.errors[0].message };
		}

		// And if everything goes well with the API call, we will dispatch an action,
		// with `type` set to `ADD_PROJECT_SUCCESS` and in `payload` we will send the
		// new project `data`.
		dispatch({ type: "ADD_PROJECT_SUCCESS", payload: data });

		// Next, I'll return a status called "ok", with value `true`
		// as everything went well.
		return { ok: true };
	} catch (error) {
		console.error("Operation failed:", error);
		// Dialogue 5: And for error I'll return status called "ok", with value `false`.
		return { ok: false, error };
	}
};

export const getProjectDetails = async (dispatch: any, args: any) => {
	try {
		const token = localStorage.getItem("authToken");
		const { projectID } = args;
		dispatch({ type: "FETCH_PROJECT_REQUEST" });
		const response = await fetch(`${API_ENDPOINT}/projects/${projectID}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		if (!response.ok) {
			throw new Error("Failed to get project details");
		}
		const data = await response.json();
		dispatch({ type: "FETCH_PROJECT_SUCCESS" });
		return { ok: true, data };
	} catch (error) {
		dispatch({ type: "FETCH_PROJECT_FAILURE", payload: error });
	}
};

export const updateProject = async (
	dispatch: any,
	args: {
		id: number;
		data: Partial<Project>;
	}
) => {
	const token = localStorage.getItem("authToken");
	const { id, data } = args;
	try {
		dispatch({ type: "UPDATE_PROJECT_REQUEST" });
		const response = await fetch(`${API_ENDPOINT}/projects/${id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(data),
		});
		if (!response.ok) {
			throw new Error("Failed to patch project");
		}
		dispatch({ type: "UPDATE_PROJECT_SUCCESS" });
		fetchProjects(dispatch);
	} catch (error) {
		dispatch({ type: "UPDATE_PROJECT_FAILURE", payload: error });
	}
};