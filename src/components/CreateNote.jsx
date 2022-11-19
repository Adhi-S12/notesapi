import axios from 'axios';
import React, { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import NotesContext from '../context/NotesContext';
import './CreateNote.css';

const CreateNote = () => {
	const { notes, setNotes } = useContext(NotesContext);
	const { token } = useContext(AuthContext);

	const [ title, setTitle ] = useState('');
	const [ content, setContent ] = useState('');

	const onFormSubmit = async (e) => {
		e.preventDefault();

		if (title === '' || content === '') {
			return;
		}

		if (token) {
			axios
				.post(
					`${process.env.REACT_APP_API_DOMAIN}/notes/`,
					{ title, content },
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				)
				.then((response) => {
					const { data } = response.data;
					setNotes([ ...notes, data ]);
					setTitle('');
					setContent('');
				})
				.catch((error) => {
					console.error(error);
				});
		}

		// if (token) {
		// 	try {
		// 		const response = await axios.post(
		// 			`${process.env.REACT_APP_API_DOMAIN}/notes/`,
		// 			{ title, content },
		// 			{
		// 				headers: { Authorization: `Bearer ${token}` },
		// 			}
		// 		);
		// 		if (response.statusText === 'OK') {
		// 			const { data } = response.data;
		// 			setNotes([ ...notes, data ]);
		// 			setTitle('');
		// 			setContent('');
		// 		}
		// 	} catch (error) {
		// 		console.error(error);
		// 	}
		// }
	};
	return (
		<div className="createnote">
			<h2 className="createnote__title">Create note</h2>
			<form className="createnote__form" onSubmit={onFormSubmit}>
				<div className="createnote__form-control">
					<label htmlFor="title" className="createnote__form-control__label">
						Title:
					</label>
					<input
						type="text"
						name="title"
						id="title"
						placeholder="Enter note title"
						className="createnote__form-control__content"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>
				<div className="createnote__form-control">
					<label htmlFor="content" className="createnote__form-control__label">
						Content:
					</label>
					<textarea
						type="text"
						name="content"
						rows={5}
						placeholder="Enter note content"
						className="createnote__form-control__content"
						value={content}
						onChange={(e) => setContent(e.target.value)}
					/>
				</div>
				<button className="createnote__form-submitbtn" type="submit">
					Create Note
				</button>
			</form>
		</div>
	);
};

export default CreateNote;
