import React, { useEffect } from "react";
import { useMembersDispatch } from "../../context/members/context";
import { fetchMembers } from "../../context/members/actions";
import NewMember from "./NewMember";
import MemberList from "./MemberList";

const MembersPage = () => {
	const dispatch = useMembersDispatch();

	useEffect(() => {
		fetchMembers(dispatch);
	}, [dispatch]);

	return (
		<div className="p-4">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold text-slate-800">Members</h1>
				<NewMember />
			</div>
			<MemberList />
		</div>
	);
};

export default MembersPage;
