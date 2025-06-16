import React from "react";
import { useMembersState } from "../../context/members/context";
import MemberListItems from "./MemberListItems";

const MemberList: React.FC = () => {
	const { members, isLoading, isError, errorMessage } = useMembersState();

	if (isLoading) return <div>Loading members...</div>;

	if (isError) return <div className="text-red-600">{errorMessage}</div>;

	if (members.length === 0)
		return <div className="text-gray-500">No members found.</div>;

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
			{members.map((member) => (
				<MemberListItems key={member.id} member={member} />
			))}
		</div>
	);
};

export default MemberList;
