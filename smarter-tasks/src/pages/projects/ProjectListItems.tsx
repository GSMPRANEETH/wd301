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
					className="task-card p-6 rounded-2xl cursor-pointer group relative overflow-hidden block"
				>
                    <div className="flex justify-between items-start mb-6">
                        <div className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border bg-green-500/10 text-green-500 border-green-500/20">
                            Active
                        </div>
                        <button className="p-1 text-muted group-hover:text-fg transition-colors">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" /></svg>
                        </button>
                    </div>
					<h3 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors leading-tight break-words">
						{project.name}
					</h3>
                    <div className="flex items-center gap-5 text-sm text-muted font-medium">
                        <div className="flex items-center gap-1.5">
                            <svg className="w-4 h-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                            Tasks
                        </div>
                        <div className="flex items-center gap-1.5">
                            <svg className="w-4 h-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                            Members
                        </div>
                    </div>
				</Link>
			))}
		</>
	);
}
