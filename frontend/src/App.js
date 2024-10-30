import React, { useContext } from "react";
import LoginForm from "./components/loginForm";
import Dashboard from "./components/Dashboard";
import Scanner from "./components/Scanner";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";

function App() {
	return (
		<AuthProvider>
			<Router>
				<AppRoutes />
			</Router>
		</AuthProvider>
	);
}

function AppRoutes() {
	const { isAuthenticated } = useContext(AuthContext);

	return (
		<Routes>
			<Route path="/login" element={<LoginForm />} />
			<Route path="/dashboard/absen" element={<Scanner />} />
			<Route
				path="/dashboard"
				element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
			/>
			<Route path="/" element={<Navigate to="/login" />} />
		</Routes>
	);
}

export default App;
