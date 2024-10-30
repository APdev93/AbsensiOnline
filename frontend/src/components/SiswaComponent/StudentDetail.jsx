import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { QRCodeCanvas } from "qrcode.react";
import { toPng } from "html-to-image";

const StudentDetail = ({ student, onHide }) => {
	if (!student) return null;

	const downloadQRCode = () => {
		const qrCodeElement = document.getElementById("qr-code");
		toPng(qrCodeElement)
			.then(dataUrl => {
				const link = document.createElement("a");
				link.href = dataUrl;
				link.download = `QR_${student.nsin}.png`;
				link.click();
			})
			.catch(error => {
				console.error("Error downloading QR code:", error);
			});
	};

	return (
		<Modal
			show={true}
			onHide={onHide}
			size="sm"
			centered
			className="student-modal">
			<Modal.Header closeButton>
				<Modal.Title>Detail Siswa</Modal.Title>
			</Modal.Header>
			<Modal.Body className="d-flex flex-column align-items-center student-card">
				<div id="qr-code" className="qr-code-container">
					<QRCodeCanvas value={student.nsin} size={128} />
				</div>
				<div className="student-info">
					<p>
						<strong>NSIN:</strong> {student.nsin}
					</p>
					<p>
						<strong>Nama Lengkap:</strong> {student.full_name}
					</p>
					<p>
						<strong>Kelas:</strong> {student.class}
					</p>
					<p>
						<strong>Nomer Wali:</strong> {student.parent_number}
					</p>
				</div>
				<div style={{ textAlign: "center", marginTop: "10px" }}>
					<Button variant="success" onClick={downloadQRCode}>
						Download QR Code
					</Button>
				</div>
			</Modal.Body>
		</Modal>
	);
};

export default StudentDetail;
