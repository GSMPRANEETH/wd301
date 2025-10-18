import React, { createContext, useContext, useReducer } from "react";
import {
	initialState,
	type MembersState,
	type MemberActions,
	reducer,
} from "./reducer";

const MembersStateContext = createContext<MembersState | undefined>(undefined);
type MembersDispatch = React.Dispatch<MemberActions>;
const MemberDispatchContext = createContext<MembersDispatch | undefined>(
	undefined
);
export const useMembersState = () => useContext(MembersStateContext);
export const useMembersDispatch = () => useContext(MemberDispatchContext);
export const MembersProvider: React.FC<React.PropsWithChildren> = ({
	children,
}) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	return (
		<MembersStateContext.Provider value={state}>
			<MemberDispatchContext.Provider value={dispatch}>
				{children}
			</MemberDispatchContext.Provider>
		</MembersStateContext.Provider>
	);
};
