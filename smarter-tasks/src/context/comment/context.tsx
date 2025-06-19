import React, { createContext, useContext, useReducer } from "react";
import { reducer, initialState } from "./reducer";
import type { CommentState, CommentAction } from "./types";

const StateContext = createContext<CommentState>(initialState);
const DispatchContext = createContext<React.Dispatch<CommentAction>>(
	() => null
);

export const CommentProvider: React.FC<React.PropsWithChildren> = ({
	children,
}) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	return (
		<StateContext.Provider value={state}>
			<DispatchContext.Provider value={dispatch}>
				{children}
			</DispatchContext.Provider>
		</StateContext.Provider>
	);
};

export const useCommentState = () => useContext(StateContext);
export const useCommentDispatch = () => useContext(DispatchContext);
