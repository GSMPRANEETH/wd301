import React from "react";
import ProjectListItems from "./ProjectListItems";

const ProjectList: React.FC = () => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			<ProjectListItems />
		</div>
	);
};

export default ProjectList;
