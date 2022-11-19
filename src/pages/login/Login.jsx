import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const Login = () => {
	const [ formInput, setFormInput ] = useState({
		email: '',
		password: '',
		error: null,
		submitDisabled: false,
	});
	const navigate = useNavigate();
	const { setToken } = useContext(AuthContext);

	useEffect(
		() => {
			setFormInput({ ...formInput, error: null });
		},
		[ formInput.email, formInput.password ]
	);

	const onLoginFormSubmit = async (e) => {
		e.preventDefault();

		if (formInput.email === '' || formInput.password === '') {
			setFormInput({ ...formInput, error: 'Please enter both email and password' });
			return;
		}

		try {
			const response = await axios.post(`${process.env.REACT_APP_API_DOMAIN}/auth/login`, {
				email: formInput.email,
				password: formInput.password,
			});
			if (response.data.accessToken) {
				setToken(response.data.accessToken);
				localStorage.setItem('token', JSON.stringify(response.data.accessToken));
				navigate('/', { replace: true });
			}
		} catch (error) {
			setFormInput({
				...formInput,
				error: 'Invalid Credentials. Please enter valid username/password',
			});
		}
	};

	return (
		<div className="container-login">
			<form className="login" onSubmit={onLoginFormSubmit}>
				<h2 className="login__title">Login</h2>
				<div className="login__form-control">
					<p className="login__form-control-label">Email: </p>
					<input
						type="email"
						name="email"
						id="email"
						className="login__form-control-input error"
						value={formInput.email}
						onChange={(e) => setFormInput({ ...formInput, [e.target.name]: e.target.value })}
					/>
					{/* {  <p className="login__form-error">Please enter a valid email</p>} */}
				</div>
				<div className="login__form-control">
					<p className="login__form-control-label">Password: </p>
					<input
						type="password"
						name="password"
						id="password"
						className="login__form-control-input"
						value={formInput.password}
						onChange={(e) => setFormInput({ ...formInput, [e.target.name]: e.target.value })}
					/>
				</div>

				{formInput.error && <p className="login__form-error">{formInput.error}</p>}
				<button className="login__form-submitbtn" type="Submit" disabled={formInput.submitDisabled}>
					Sign In
				</button>

				<p className="login__form-login-link">
					Don't have an account?
					<Link to="/register" className="login-link">
						Click Here to register.
					</Link>
				</p>
			</form>
		</div>
	);
};

export default Login;
