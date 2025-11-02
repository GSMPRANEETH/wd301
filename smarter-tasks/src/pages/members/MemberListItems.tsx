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
						className="deleteMemberButton cursor-pointer h-4 w-4 rounded-full my-5 mr-5"
						type="button"
						onClick={() => handleDelete({ id: user.id })}
						value={user.id}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							className="w-4 h-4 fill-red-200 hover:fill-red-400 dark:fill-red-800 dark:hover:fill-red-600"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
							/>
						</svg>
					</button>
				</div>
			))}
		</>
	);
}
