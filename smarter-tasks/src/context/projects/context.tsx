// src/context/projects/context.tsx

// First, I'll import the createContext, useContext and useReducer from React
import React, { createContext, useContext, useReducer } from "react";
import {
	reducer,
	initialState,
	ProjectsState,
	ProjectsActions,
} from "./reducer";
const ProjectsStateContext = createContext<ProjectsState | undefined>(
	undefined
);

type ProjectsDispatch = React.Dispatch<ProjectsActions>;
export const useProjectsState = () => useContext(ProjectsStateContext);
// Using createContext function, we will create a context
// called `ProjectsDispatchContext`. Let's say the shape of this new
// context object is ProjectsDispatch (which I'll define now, wait for it).
// I've set the default value to undefined.
export const useProjectsDispatch = () => useContext(ProjectsDispatchContext);

const ProjectsDispatchContext = createContext<ProjectsDispatch | undefined>(
	undefined
);
export const ProjectsProvider: React.FC<React.PropsWithChildren> = ({
	children,
}) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	// Next, I'll pass the `dispatch` object as value of this ProjectsDispatchContext.

	return (
		<ProjectsStateContext.Provider value={state}>
			<ProjectsDispatchContext.Provider value={dispatch}>
				{children}
			</ProjectsDispatchContext.Provider>
		</ProjectsStateContext.Provider>
	);
};
