// src/context/members/reducer.ts

export interface Member {
	id: number;
	name: string;
	email: string;
}

export interface MembersState {
	members: Member[];
	isLoading: boolean;
	isError: boolean;
	errorMessage: string | null;
}

export type MembersAction =
	| { type: "FETCH_START" }
	| { type: "FETCH_SUCCESS"; payload: Member[] }
	| { type: "FETCH_ERROR"; payload: string }
	| { type: "ADD_MEMBER"; payload: Member }
	| { type: "REMOVE_MEMBER"; payload: number };

export const initialState: MembersState = {
	members: [],
	isLoading: false,
	isError: false,
	errorMessage: null,
};

export const reducer = (
	state: MembersState,
	action: MembersAction
): MembersState => {
	switch (action.type) {
		case "FETCH_START":
			return { ...state, isLoading: true, isError: false, errorMessage: null };
		case "FETCH_SUCCESS":
			return { ...state, isLoading: false, members: action.payload };
		case "FETCH_ERROR":
			return {
				...state,
				isLoading: false,
				isError: true,
				errorMessage: action.payload,
			};
		case "ADD_MEMBER":
			return { ...state, members: [...state.members, action.payload] };
		case "REMOVE_MEMBER":
			return {
				...state,
				members: state.members.filter((m) => m.id !== action.payload),
			};
		default:
			return state;
	}
};
