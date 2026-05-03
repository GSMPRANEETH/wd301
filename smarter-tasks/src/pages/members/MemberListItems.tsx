import { Link } from "react-router-dom";
import { deleteUser } from "../../context/members/actions";
import {
	useMembersDispatch,
	useMembersState,
} from "../../context/members/context";

export default function MemberListItems() {
	const dispatchMembers = useMembersDispatch();
	let state: any = useMembersState();
	const { users, isLoading, isError, errorMessage } = state;
	if (users.length === 0 && isLoading) {
		return <tr><td colSpan={4} className="px-8 py-5 text-muted">Loading...</td></tr>;
	}
	if (isError) {
		return <tr><td colSpan={4} className="px-8 py-5 text-red-500">{errorMessage}</td></tr>;
	}

	const handleDelete = async (data: { id: any }) => {
		const { id } = data;
		await deleteUser(dispatchMembers, {
			id,
		});
	};

	return (
		<>
			{users.map((user: any) => (
                <Link
                    key={user.id}
                    to={`${user.id}`}
                    className="task-card p-6 rounded-2xl cursor-pointer group relative overflow-hidden block flex items-center justify-center min-h-[100px]"
                >
                    <div className="absolute top-4 right-4 z-10">
                        <button
                            className="deleteMemberButton text-muted hover:text-red-500 transition-colors"
                            type="button"
                            onClick={(event) => {
                                event.preventDefault();
                                handleDelete({ id: user.id });
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                className="w-5 h-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="text-center w-full">
                        <h3 className="text-xl font-bold group-hover:text-accent transition-colors leading-tight break-words">
                            {user.name}
                        </h3>
                        <p className="text-sm text-muted font-medium mt-2">{user.email}</p>
                    </div>
                </Link>
			))}
		</>
	);
}
