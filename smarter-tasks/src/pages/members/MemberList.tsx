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
		<div className="bg-surface border border-base rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-[10px] font-black uppercase tracking-widest text-muted bg-[var(--bg)]/50 border-b border-base">
                        <tr>
                            <th className="px-8 py-5">Full Name</th>
                            <th className="px-8 py-5">Email Address</th>
                            <th className="px-8 py-5">Role</th>
                            <th className="px-8 py-5 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-base">
                        <MemberListItems />
                    </tbody>
                </table>
            </div>
		</div>
	);
};
export default MemberList;
