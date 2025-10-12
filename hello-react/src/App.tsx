import TaskCard from "./TaskCard.js";
import "./TaskCard.css";
import React from "react";
function App() {
	return (
		<div className="flex items-center justify-center min-h-screen">
			<div className="space-y-4 w-full max-w-6xl px-4 ">
				<div className="space-y-2">
					<p className="text-3xl font-bold ">Smarter Tasks</p>
					<p>
						<b>Project:</b> Graduation Final Year Project (Revamp College
						Website)
					</p>
				</div>
				<div className="grid grid-cols-2 gap-8 w-full aspect-[5/3]">
					<div className="TaskType space-y-3">
						<p className="text-2xl font-semibold text-center">Pending</p>
						<div className="space-y-3">
							<TaskCard
								title="Complete internship"
								dueDate={new Date("2025-12-23")}
								assigneeName="Praneeth"
							/>
						</div>
					</div>
					<div className="TaskType space-y-3">
						<h1 className="text-2xl font-semibold text-center">Done</h1>
						<div className="space-y-3">
							<TaskCard
								title="Join internship"
								completedAtDate={new Date("2025-06-23")}
								assigneeName="Praneeth"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
