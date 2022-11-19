import React, { useState, useEffect, createContext, useContext } from 'react';
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

	useEffect(() => {
		if (localStorage.getItem('token')) {
			setToken(JSON.parse(localStorage.getItem('token')));
			console.log(token);
			fetchData();
		}
	}, []);

	const fetchData = async () => {
		try {
			const response = await axios.get('http://localhost:3000/notes/', {
				headers: { Authorization: `Bearer ${token}` },
			});

			setNotes(response.data.notes);
		} catch (error) {
			console.log(error);
			localStorage.removeItem('token');
			navigate('/login', { exact: true });
		}
	};

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
