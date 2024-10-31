import CounterCard from "../CounterCard";

const Home = () => {
	return (
		<div className="mt-3 gap-3 home-ctr flex-column d-flex">
			<CounterCard total="00" label="Total Guru" />
			<CounterCard total="00" label="Total Siswa" />
			<CounterCard total="00" label="Siswa Kelas X" />
			<CounterCard total="00" label="Siswa Kelas XI" />
			<CounterCard total="00" label="Siswa Kelas XII" />
		</div>
	);
};

export default Home;
