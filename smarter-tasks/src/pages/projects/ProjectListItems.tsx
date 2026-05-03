import { useProjectsState } from "../../context/projects/context";
import { Link } from "react-router-dom";

export default function ProjectListItems() {
	let state: any = useProjectsState();
	const { projects, isError, errorMessage } = state;
	if (isError) {
		return <span className="text-red-500">{errorMessage}</span>;
	}

	return (
		<>
			{projects.map((project: any) => (
				<Link
					key={project.id}
					to={`${project.id}`}
					className="task-card p-6 rounded-2xl cursor-pointer group relative overflow-hidden block flex items-center justify-center min-h-[100px]"
				>
					<h3 className="text-xl font-bold group-hover:text-accent transition-colors leading-tight break-words text-center">
						{project.name}
					</h3>
				</Link>
			))}
		</>
	);
}
