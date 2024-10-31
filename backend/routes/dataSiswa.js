const root = process.cwd();
require(`${root}/config`);
const express = require("express");

const { db } = require("../src/database");

const moment = require("moment-timezone");
const xlsx = require("xlsx");

const data = express.Router();

data.get("/absensi", (req, res) => {
	const today = moment().tz("Asia/Makassar").format("YYYY_MM_DD");
	const tableName = `absensi_${today}`;

	const sql = `SELECT siswa_id, nama, kelas, waktu_absen, waktu_pulang FROM ${tableName}`;
	db.query(sql, (err, results) => {
		if (err) return res.status(500).json({ error: err.message });
		res.status(200).json(results);
	});
});

// Endpoint untuk perekapan absensi selama satu bulan
data.get("/rekap-absensi", (req, res) => {
	const { bulan, tahun } = req.query; // bulan dan tahun dari query params
	const startDate = moment(`${tahun}-${bulan}-01`).startOf("month");
	const endDate = moment(startDate).endOf("month");
	const rekapData = {};

	for (let day = startDate.date(); day <= endDate.date(); day++) {
		const dateFormatted = moment(`${tahun}-${bulan}-${day}`).format("YYYY_MM_DD");
		const tableName = `absensi_${dateFormatted}`;

		const sql = `SELECT siswa_id, nama, kelas, status_pulang FROM ${tableName}`;
		db.query(sql, (err, results) => {
			if (err) return res.status(500).json({ error: err.message });

			results.forEach(row => {
				const { siswa_id, nama, kelas } = row;
				if (!rekapData[siswa_id]) {
					rekapData[siswa_id] = {
						nama,
						kelas,
						absensi: {},
					};
				}

				const status = row.status_pulang ? row.status_pulang : "A"; // Anggap Alpa jika tidak ada status
				rekapData[siswa_id].absensi[day] = status;
			});

			// Jika sudah semua data diambil, buat Excel
			if (day === endDate.date()) {
				const dataForExcel = [];

				Object.keys(rekapData).forEach(siswa_id => {
					const { nama, kelas, absensi } = rekapData[siswa_id];
					const row = { NAMA: nama, KELAS: kelas };

					for (let d = 1; d <= endDate.date(); d++) {
						row[d] = absensi[d] || "A"; // Default Alpa jika tidak ada status
					}

					dataForExcel.push(row);
				});

				const worksheet = xlsx.utils.json_to_sheet(dataForExcel);
				const workbook = xlsx.utils.book_new();
				xlsx.utils.book_append_sheet(workbook, worksheet, "Rekap Absensi");

				const fileName = `Rekap_Absensi_${bulan}_${tahun}.xlsx`;
				xlsx.writeFile(workbook, fileName);

				res.download(fileName, err => {
					if (err) {
						console.error("Error downloading file:", err);
					}
				});
			}
		});
	}
});

module.exports = data;
