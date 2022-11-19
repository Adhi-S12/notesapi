import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './register.css';
import AuthContext from '../../context/AuthContext';

const Register = () => {
	const { token, setToken } = useContext(AuthContext);

	const [ formInput, setFormInput ] = useState({
		email: '',
		password: '',
		confirmpassword: '',
		error: null,
		submitDisabled: false,
	});

	// useEffect(() => {}, [ formInput ]);

	const onFormSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post('http://localhost:3000/auth/register', {
				email: formInput.email,
				password: formInput.password,
			});
			const { accessToken, doc } = response.data;
		} catch (error) {
			setFormInput({ ...formInput, error: error.message });
			console.log(formInput.error);
		}
	};

	return (
		<div className="container-register">
			<form className="register" onSubmit={onFormSubmit}>
				<h2 className="register__title">Register</h2>
				<div className="register__form-control">
					<p className="register__form-control-label">Email: </p>
					<input
						type="email"
						name="email"
						id="email"
						className="register__form-control-input error"
						value={formInput.email}
						onChange={(e) => setFormInput({ ...formInput, [e.target.name]: e.target.value })}
					/>
					{/* <p className="register__form-error">Please enter a valid email</p> */}
				</div>
				<div className="register__form-control">
					<p className="register__form-control-label">Password: </p>
					<input
						type="password"
						name="password"
						id="password"
						className="register__form-control-input"
						value={formInput.password}
						onChange={(e) => setFormInput({ ...formInput, [e.target.name]: e.target.value })}
					/>
				</div>
				<div className="register__form-control">
					<p className="register__form-control-label">Confirm Password: </p>
					<input
						type="password"
						name="confirmpassword"
						id="confirmpassword"
						className="register__form-control-input"
						value={formInput.confirmpassword}
						onChange={(e) => setFormInput({ ...formInput, [e.target.name]: e.target.value })}
					/>
				</div>
				{/* {formInput.error && <p className="register__form-error">{formInput.error}</p>} */}
				<button
					className="register__form-submitbtn"
					type="Submit"
					disabled={formInput.submitDisabled}
				>
					Submit
				</button>
				<p className="register__form-login-link">
					Already have an account?
					<Link to="/login" className="login-link">
						Login Here.
					</Link>
				</p>
			</form>
		</div>
	);
};

export default Register;
