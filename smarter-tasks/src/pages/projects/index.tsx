import React, { Suspense } from "react";
const ProjectList = React.lazy(() => import("./ProjectList"));
import NewProject from "./NewProject";
import ErrorBoundary from "../../components/ErrorBoundary";

const Projects: React.FC = () => {
	return (
		<div className="space-y-8 p-6 max-w-7xl mx-auto w-full view-enter">
			<div className="flex items-center justify-between">
				<div>
                    <h2 className="text-3xl font-bold text-display tracking-tight">Projects</h2>
                    <p className="text-muted text-sm">Organize and monitor your team's workflow</p>
                </div>
				<NewProject />
			</div>
			<ErrorBoundary>
				<Suspense fallback={<div className="suspense-loading text-muted">Loading...</div>}>
					<ProjectList />
				</Suspense>
			</ErrorBoundary>
		</div>
	);
};

export default Projects;
