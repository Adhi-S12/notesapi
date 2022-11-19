import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const Login = () => {
	const navigate = useNavigate();
	const { setToken } = useContext(AuthContext);

	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ error, setError ] = useState(null);

	useEffect(
		() => {
			// setFormInput({ ...formInput, error: null });
			setError(null);
		},
		[ email, password ]
	);

	const onLoginFormSubmit = async (e) => {
		e.preventDefault();

		if (email === '' || password === '') {
			setError('Please enter both email and password');
			return;
		}

		try {
			const response = await axios.post(`${process.env.REACT_APP_API_DOMAIN}/auth/login`, {
				email: email,
				password: password,
			});
			if (response.data.accessToken) {
				setToken(response.data.accessToken);
				localStorage.setItem('token', JSON.stringify(response.data.accessToken));
				navigate('/', { replace: true });
			}
		} catch (error) {
			setError('Invalid Credentials. Please enter valid username/password');
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
						value={email}
						onChange={(e) => setEmail(e.target.value)}
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
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>

				{error && <p className="login__form-error">{error}</p>}
				<button className="login__form-submitbtn" type="Submit">
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
