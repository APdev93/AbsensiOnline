import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Container, Col, Nav } from "react-bootstrap";
import "../css/dashboard.css";

import Home from "../components/Menu/Home";
import Siswa from "../components/Menu/Siswa";
import Absen from "../components/Menu/Absen";

const Dashboard = () => {
	const [activeMenu, setActiveMenu] = useState("home");

	const renderContent = () => {
		switch (activeMenu) {
			case "home":
				return <Home />;
				break;
			case "siswa":
				return <Siswa />;
				break;
			case "absen":
				return <Absen />;
				break;

			default:
				return <Home />;
		}
	};

	const { logout } = useContext(AuthContext);
	return (
		<Container className="p-0 m-0" fluid>
			<Col md={3} lg={2} className="bg-light shadow-sm h-10 w-100">
				<Nav className="navbar flex-row fixed-top border-bottom p-3 justify-content-evenly color-dark">
					<button className="btn nav-btn" onClick={() => setActiveMenu("home")}>
						Utama
					</button>
					<button className="btn nav-btn" onClick={() => setActiveMenu("siswa")}>
						Siswa
					</button>
					<button className="btn nav-btn" onClick={() => setActiveMenu("absen")}>
						Absen
					</button>
					<button className="btn color-dark btn-danger" onClick={() => logout()}>
						Logout
					</button>
				</Nav>
			</Col>

			<Col
				md={9}
				lg={10}
				style={{ minHeight: "100vh" }}
				className="w-100 dashboard-content p-2 mt-5">
				{renderContent()}
			</Col>
		</Container>
	);
};

export default Dashboard;
