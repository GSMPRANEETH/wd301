import React from "react";
import ProjectListItems from "./ProjectListItems";

const ProjectList: React.FC = () => {
	return (
		<div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5">
			<ProjectListItems />
		</div>
	);
};

export default ProjectList;
