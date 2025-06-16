import React from "react";
import { Member } from "../../context/members/reducer";
import { useMembersDispatch } from "../../context/members/context";
import { removeMember } from "../../context/members/actions";

const MemberListItems: React.FC<{ member: Member }> = ({ member }) => {
	const dispatch = useMembersDispatch();

	const handleDelete = () => {
		if (confirm(`Are you sure you want to remove ${member.name}?`)) {
			removeMember(dispatch, member.id);
		}
	};

	return (
		<div className="member bg-white shadow p-4 rounded-lg flex justify-between items-center">
			<div>
				<h3 className="font-semibold text-lg text-gray-800">{member.name}</h3>
				<p className="text-gray-600 text-sm">{member.email}</p>
			</div>
			<button
				onClick={handleDelete}
				className="text-red-500 hover:text-red-700 text-xl font-bold"
				title="Remove Member"
			>
				&times;
			</button>
		</div>
	);
};

export default MemberListItems;
