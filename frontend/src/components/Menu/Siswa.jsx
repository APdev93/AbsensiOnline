import { useEffect, useState } from "react";
import axios from "axios";
import StudentDetail from "../SiswaComponent/StudentDetail";
import StudentTable from "../SiswaComponent/StudentTable";
import Button from "react-bootstrap/Button";

const Siswa = () => {
	const [students, setStudents] = useState([]);
	const [filter, setFilter] = useState("All");
	const [selectedStudent, setSelectedStudent] = useState(null);
	const [modalShow, setModalShow] = useState(false);

	const fetchStudents = async () => {
		try {
			const token = sessionStorage.getItem("token");
			const response = await axios.get("http://localhost:8081/api/siswa", {
				headers: { Authorization: `Bearer ${token}` },
			});
			setStudents(response.data.data);
		} catch (error) {
			console.error("Error fetching students data:", error);
		}
	};

	useEffect(() => {
		fetchStudents();
	}, []);

	const filteredStudents = students.filter(student => {
		if (filter === "All") return true;
		return student.class === filter;
	});

	const handleDetailClick = student => {
		setSelectedStudent(student);
		setModalShow(true);
	};

	const closeModal = () => {
		setSelectedStudent(null);
		setModalShow(false);
	};

	return (
		<div className="mt-3 d-flex flex-column gap-3 p-2">
			<div className="card shadow-sm p-1">
				<div className="d-flex mb-1 flex-column gap-1">
					<Button variant="success" onClick={() => setFilter("All")}>Tambah Siswa</Button>
					<div className="d-flex flex-row gap-1">Filter</div>
					<div className="d-flex flex-row flex-wrap gap-1">
						<Button onClick={() => setFilter("X IPS")}>Kelas X IPS</Button>
						<Button onClick={() => setFilter("X IPA")}>Kelas X IPA</Button>
						<Button onClick={() => setFilter("XI IPA 1")}>Kelas XI IPA 1</Button>
						<Button onClick={() => setFilter("XI IPA 2")}>Kelas XI IPA 2</Button>
						<Button onClick={() => setFilter("XII")}>Kelas XII</Button>
						<Button onClick={() => setFilter("All")}>Semua</Button>
					</div>
				</div>

				<StudentTable
					students={filteredStudents}
					onDetailClick={handleDetailClick}
				/>
			</div>

			{modalShow && (
				<StudentDetail student={selectedStudent} onHide={closeModal} />
			)}
		</div>
	);
};

export default Siswa;
