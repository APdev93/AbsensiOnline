import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function LoginForm() {
	const { login } = useContext(AuthContext);
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState({ username: "", password: "" });

	const validateForm = () => {
		let valid = true;
		let errors = { username: "", password: "" };

		if (username.trim() === "") {
			errors.username = "Username tidak boleh kosong";
			valid = false;
		} else if (username.length < 5) {
			errors.username = "Username minimal 5 karakter";
			valid = false;
		}

		if (password.trim() === "") {
			errors.password = "Password tidak boleh kosong";
			valid = false;
		} else if (password.length < 6) {
			errors.password = "Password minimal 6 karakter";
			valid = false;
		}

		setErrors(errors);
		return valid;
	};

	const handleSubmit = async e => {
		e.preventDefault();
		if (validateForm()) {
			try {
				console.log({ username: username, password: password });
				let response = await axios.post("http://localhost:8081/auth/login", {
					username: username,
					password: password,
				});
				let data = response.data;
				console.log(data);
				if (data.status_code === 200) {
					login(data.data.token);
					navigate("/dashboard");
				} else {
					alert(data.message);
				}
			} catch (e) {
			    alert(e)
			}
		}
	};

	return (
		<div
			className="container d-flex align-items-center justify-content-center bg-success bg-gradient"
			style={{ minHeight: "100vh" }}>
			<div
				className="card p-4 shadow-sm"
				style={{ width: "100%", maxWidth: "430px", minHeight: "500px" }}>
				<h1 className="text-left mb-5 mt-4 fs-1">Login</h1>
				<form onSubmit={handleSubmit}>
					<div className="form-group mb-4 input-group-lg">
						<label className="fs-5" htmlFor="username">
							Username
						</label>
						<input
							type="text"
							className="form-control fs-5"
							id="username"
							placeholder="Masukan username"
							value={username}
							onChange={e => {
								setUsername(e.target.value);
								if (username.length >= 0) {
									validateForm();
								}
							}}
						/>
						{errors.username && (
							<small className="text-danger">{errors.username}</small>
						)}
					</div>
					<div className="form-group mb-5 input-group-lg">
						<label className="fs-5" htmlFor="password">
							Password
						</label>
						<input
							type="password"
							className="form-control fs-5"
							id="password"
							placeholder="Masukan password"
							value={password}
							onChange={e => {
								setPassword(e.target.value);
								if (password.length >= 0) {
									validateForm();
								}
							}}
						/>
						{errors.password && (
							<small className="text-danger">{errors.password}</small>
						)}
					</div>
					<button type="submit" className="btn btn-success btn-block btn-lg w-100">
						Login
					</button>
				</form>
				<p className="text-center mt-4">Tidak memiliki akun? Minta ke admin</p>
			</div>
		</div>
	);
}

export default LoginForm;