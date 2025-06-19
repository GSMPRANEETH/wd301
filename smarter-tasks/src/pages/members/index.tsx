import React, { useEffect, Suspense } from "react";
import { useMembersDispatch } from "../../context/members/context";
import { fetchMembers } from "../../context/members/actions";
import NewMember from "./NewMember";
const MemberList = React.lazy(() => import("./MemberList"));
import ErrorBoundary from "../../components/ErrorBoundary";
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
			<ErrorBoundary>
				<Suspense fallback={<div className="suspense-loading">Loading...</div>}>
					<MemberList />
				</Suspense>
			</ErrorBoundary>
		</div>
	);
};

export default MembersPage;
