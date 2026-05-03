import { useEffect } from "react";
import { fetchMembers } from "../../context/members/actions";
import { useMembersDispatch } from "../../context/members/context";
import MemberListItems from "./MemberListItems";

const MemberList: React.FC = () => {
	const dispatchMembers = useMembersDispatch();

	useEffect(() => {
		fetchMembers(dispatchMembers);
	}, []);
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			<MemberListItems />
		</div>
	);
};
export default MemberList;
