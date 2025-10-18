import React, { createContext, useContext, useReducer } from "react";
import {
	initialState,
	type ProjectsActions,
	type ProjectsState,
	reducer,
} from "./reducer";

const ProjectsStateContext = createContext<ProjectsState | undefined>(
	undefined
);
type ProjectsDispatch = React.Dispatch<ProjectsActions>;

const ProjectDispactContext = createContext<ProjectsDispatch | undefined>(
	undefined
);
export const useProjectsState = () => useContext(ProjectsStateContext);

export const useProjectsDispatch = () => useContext(ProjectDispactContext);
export const ProjectsProvider: React.FC<React.PropsWithChildren> = ({
	children,
}) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	return (
		<ProjectsStateContext.Provider value={state}>
			<ProjectDispactContext.Provider value={dispatch}>
				{children}
			</ProjectDispactContext.Provider>
		</ProjectsStateContext.Provider>
	);
};
