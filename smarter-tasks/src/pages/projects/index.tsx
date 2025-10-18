import React from "react";
import NewProject from "./NewProject";
import ProjectList from "./ProjectList";

const Projects: React.FC = () => {
	return (
		<>
			<div className="flex justify-between">
				<h2 className="text-2xl font-medium tracking-tight">Projects</h2>
				<NewProject />
			</div>
			<ProjectList />
		</>
	);
};

export default Projects;
