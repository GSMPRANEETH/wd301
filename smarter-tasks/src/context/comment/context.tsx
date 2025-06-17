import React, { createContext, useReducer, useContext } from "react";
import { reducer as commentReducer, initialState } from "./reducer";
import type { CommentState, CommentActions } from "./reducer"; // <- not ./types

const StateContext = createContext<CommentState>(initialState);
const DispatchContext = createContext<React.Dispatch<CommentActions>>(() => {});

export const CommentProvider: React.FC<React.PropsWithChildren> = ({
	children,
}) => {
	const [state, dispatch] = useReducer(commentReducer, initialState);
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
