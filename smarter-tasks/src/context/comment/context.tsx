// src/context/comment/context.tsx
import React, { createContext, useReducer, useContext } from "react";
import { initialState, reducer } from "./reducer"; // ✅ fixed
import type { CommentState, CommentAction } from "./types";

const StateContext = createContext<CommentState>(initialState);
const DispatchContext = createContext<React.Dispatch<CommentAction>>(() => {});

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
