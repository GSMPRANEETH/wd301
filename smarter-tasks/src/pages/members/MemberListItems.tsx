import { deleteUser } from "../../context/members/actions";
import {
	useMembersDispatch,
	useMembersState,
} from "../../context/members/context";

export default function MemberListItems() {
	const dispatchMembers = useMembersDispatch();
	let state: any = useMembersState();
	const { users, isLoading, isError, errorMessage } = state;
	console.log(users);
	if (users.length === 0 && isLoading) {
		return <span>Loading...</span>;
	}
	if (isError) {
		return <span>{errorMessage}</span>;
	}

	const handleDelete = async (data: { id: any }) => {
		const { id } = data;
		const response = await deleteUser(dispatchMembers, {
			id,
		});
		if (response.ok) {
			console.log(`response ok id is ${id}`);
		} else {
		}
	};

	return (
		<>
			{users.map((user: any) => (
				<div
					key={user.id}
					className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
				>
					<h5 className="mb-2 text-xl font-medium tracking-tight text-gray-900 dark:text-white">
						{user.name}
					</h5>
					<h5 className="mb-2 text-m font-medium tracking-tight text-gray-600 dark:text-white">
						{user.email}
					</h5>
					<button
						type="button"
						onClick={() => handleDelete({ id: user.id })}
						value={user.id}
					>
						X
					</button>
				</div>
			))}
		</>
	);
}
