import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

const Logout: React.FC = () => {
	useEffect(() => {
		localStorage.removeItem("authToken");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return <Navigate to="/signin" />;
};
export default Logout;
