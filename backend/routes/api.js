const root = process.cwd();
require(`${root}/config`);
const express = require("express");
const jwt = require("jsonwebtoken");

const { db } = require("../src/database");
const response = require("../utils/response");
const { generateStudentCode } = require("../utils/string");

const api = express.Router();

api.get("/siswa", async (req, res, next) => {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];
	console.log(token);
	if (!token) {
		return response(
			"Unauthorized: Tidak ada token yang diberikan",
			null,
			403,
			res,
		);
	}
	jwt.verify(token, global.SECRET_KEY, err => {
		if (err) {
			return response("Forbidden: Token salah", null, 403, res);
		}
		const sql = "SELECT * FROM students";
		db.query(sql, (err, data) => {
			if (err) {
				console.error("[ API ] : ERROR => ", err);
				return response("Internal Server Error!", null, 500, res);
			} else {
				response("Berhasil mendapatkan semua data siswa!", data, 200, res);
			}
		});
	});
});
api.post("/siswa/add", async (req, res, next) => {
	const { full_name, class_name, parent_number } = req.body;
	const query = `INSERT INTO students (student_code, full_name, class, parent_number, created_at) VALUES (?, ?, ?, ?, current_timestamp())`;
	let studentCode = generateStudentCode();
	db.query(
		query,
		[studentCode, full_name, class_name, parent_number],
		(error, data) => {
			if (error) {
				console.error("[ API ] : ERROR => ", error);
				return response("Internal Server Error!", null, 500, res);
			} else {
				response("Berhasil menambah siswa", { id: data.insertId }, 201, res);
			}
		},
	);
});

api.post("/siswa/update", async (req, res, next) => {
	const { sid, full_name, class_name, parent_number } = req.body;
	const query = `UPDATE students SET full_name = ?, class = ?, parent_number = ? WHERE id = ?`;

	db.query(query, [full_name, class_name, parent_number, sid], (error, data) => {
		if (error) {
			console.error("[ API ] : ERROR => ", error);
			return response("Internal Server Error!", null, 500, res);
		} else if (data.affectedRows === 0) {
			return response("Siswa tidak ditemukan!", null, 404, res);
		} else {
			response("Berhasil mengedit siswa", { edited_id: sid }, 200, res);
		}
	});
});

api.post("/siswa/delete", async (req, res, next) => {
	const { sid } = req.body;
	const query = `DELETE FROM students WHERE id = ?`;

	db.query(query, [sid], (error, data) => {
		if (error) {
			console.error("[ API ] : ERROR => ", error);
			return response("Internal Server Error!", null, 500, res);
		} else {
			response("Berhasil menghapus siswa!", { deleted_id: sid }, 200, res);
		}
	});
});

module.exports = api;