import React, { Suspense } from "react";
import MemberList from "./MemberList";
import NewMember from "./NewMember";
import ErrorBoundary from "../../components/ErrorBoundary";
import { Outlet } from "react-router-dom";

const Members: React.FC = () => {
	return (
		<div className="space-y-8 p-6 max-w-7xl mx-auto w-full view-enter">
			<div className="flex items-center justify-between">
                <div>
				    <h2 className="text-3xl font-bold text-display tracking-tight">Team Members</h2>
                    <p className="text-muted text-sm">Manage access and roles for your workspace</p>
                </div>
				<NewMember />
			</div>
			<ErrorBoundary>
				<Suspense
					fallback={<div className="suspense-loading text-muted">Fetching Members...</div>}
				>
					<MemberList />
					<Outlet />
				</Suspense>
			</ErrorBoundary>
		</div>
	);
};

export default Members;
