import React, { Suspense } from "react";
const ProjectDetails = React.lazy(() => import("./ProjectDetails"));
import ErrorBoundary from "../../components/ErrorBoundary";
import { Outlet } from "react-router-dom";
import { TasksProvider } from "../../context/task/context";

const ProjectDetailsIndex: React.FC = () => {
	return (
		<TasksProvider>
			<ErrorBoundary>
				<div className="suspense-loading">
					<Suspense fallback={<div>Loading...</div>}>
						<ProjectDetails />
					</Suspense>
				</div>
			</ErrorBoundary>
			<Outlet />
		</TasksProvider>
	);
};

export default ProjectDetailsIndex;
