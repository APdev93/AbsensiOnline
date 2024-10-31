import React from "react";
import Button from "react-bootstrap/Button";

const StudentTable = ({ students, onDetailClick, onDeleteClick }) => (
	<div className="table-container">
		<table>
			<thead>
				<tr>
					<th>NSIN</th>
					<th>NAMA LENGKAP</th>
					<th>KELAS</th>
					<th>NOMER WALI</th>
					<th>ACTIONS</th>
				</tr>
			</thead>
			<tbody>
				{students.map(student => (
					<tr key={student.nsin}>
						<td>{student.nsin}</td>
						<td>{student.full_name}</td>
						<td>{student.class}</td>
						<td>{student.parent_number}</td>
						<td className="d-flex gap-1">
							<Button variant="danger"onClick={() => onDeleteClick(student)}>Delete</Button>
							<Button variant="success" >
								Edit
							</Button>
							<Button variant="primary" onClick={() => onDetailClick(student)}>
								Detail
							</Button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	</div>
);

export default StudentTable;
