import React, { useState, useEffect, useContext } from 'react';
import './Home.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AiOutlineLogout } from 'react-icons/ai';
import CreateNote from '../../components/CreateNote';
import Header from '../../components/Header';
import Notelist from '../../components/Notelist';

import NotesContext from '../../context/NotesContext';
import AuthContext from '../../context/AuthContext';

const Home = () => {
	const navigate = useNavigate();

	const { token, setToken } = useContext(AuthContext);
	const [ notes, setNotes ] = useState(null);

	// const fetchData = async () => {
	// 	try {
	// 		const response = await axios.get(`${process.env.REACT_APP_API_DOMAIN}/notes/`, {
	// 			headers: { Authorization: `Bearer ${token}` },
	// 		});

	// 		setNotes(response.data.notes);
	// 	} catch (error) {
	// 		localStorage.removeItem('token');
	// 		navigate('/login', { exact: true });
	// 	}
	// };

	useEffect(
		() => {
			const fetchData = async () => {
				try {
					const response = await axios.get(`${process.env.REACT_APP_API_DOMAIN}/notes/`, {
						headers: { Authorization: `Bearer ${token}` },
					});

					setNotes(response.data.notes);
				} catch (error) {
					localStorage.removeItem('token');
					navigate('/login', { exact: true });
				}
			};

			if (localStorage.getItem('token')) {
				let lsToken = localStorage.getItem('token');
				lsToken = lsToken.split('').slice(1, lsToken.length - 1).join('');
				setToken(lsToken);
				fetchData();
			} else if (token) {
				fetchData();
				return;
			} else {
				navigate('/', { replace: true });
			}
			// }, []);
		},
		[ navigate, token, setToken ]
	);

	const handleLogout = () => {
		setToken('');
		navigate('/login', { replace: true });
		localStorage.removeItem('token');
	};

	return (
		<NotesContext.Provider value={{ notes, setNotes }}>
			<div className="home">
				<button onClick={handleLogout} className="logoutBtn">
					<AiOutlineLogout />
				</button>
				<Header />
				<CreateNote token={token} notes={notes} setNotes={setNotes} />
				{notes && <Notelist notes={notes.notes} />}
				{!notes && <h1>No notes available</h1>}
			</div>
		</NotesContext.Provider>
	);
};

export default Home;
