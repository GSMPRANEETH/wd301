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
                <tr key={user.id} className="hover:bg-bg/40 transition-colors group">
                    <td className="px-8 py-5 font-bold">
                        <Link to={`${user.id}`} className="hover:text-accent transition-colors block">
                            {user.name}
                        </Link>
                    </td>
                    <td className="px-8 py-5 text-muted font-medium">{user.email}</td>
                    <td className="px-8 py-5">
                        <span className="px-2.5 py-1 rounded-full bg-border text-[9px] font-black uppercase tracking-wider border border-base">Member</span>
                    </td>
                    <td className="px-8 py-5 text-right">
                        <button
                            className="deleteMemberButton text-muted hover:text-red-500 transition-colors"
                            type="button"
                            onClick={(event) => {
                                event.preventDefault();
                                handleDelete({ id: user.id });
                            }}
                            aria-label={`Delete member ${user.name || user.id}`}
                            title={`Delete member ${user.name || user.id}`}
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
                    </td>
                </tr>
			))}
		</>
	);
}
