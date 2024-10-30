const Home = () => {
	return (
		<div className="mt-3 gap-3 home-ctr flex-column d-flex">
			<div className="border bg-white gap-3 w-100 p-2 rounded d-flex">
				<div className="border p-3 fs-1 rounded count">53</div>
				<div className="data-info">
					<h3>Jumlah Guru</h3>
				</div>
			</div>
			<div className="border bg-white gap-3 w-100 p-2 rounded d-flex">
				<div className="border p-3 fs-1 rounded count">100</div>
				<div className="data-info">
					<h3>Jumlah Siswa</h3>
				</div>
			</div>
			<div className="border bg-white gap-3 w-100 p-2 rounded d-flex">
				<div className="border p-3 fs-1 rounded count">15</div>
				<div className="data-info">
					<h3>Siswa Kelas X</h3>
				</div>
			</div>
			<div className="border bg-white gap-3 w-100 p-2 rounded d-flex">
				<div className="border p-3 fs-1 rounded count">15</div>
				<div className="data-info">
					<h3>Siswa Kelas XI</h3>
				</div>
			</div>
			<div className="border bg-white gap-3 w-100 p-2 rounded d-flex">
				<div className="border p-3 fs-1 rounded count">15</div>
				<div className="data-info">
					<h3>Siswa Kelas XII</h3>
				</div>
			</div>
		</div>
	);
};

export default Home;
