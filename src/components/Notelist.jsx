import React, { useContext } from 'react';
import './Notelist.css';
import Note from './Note';
import NotesContext from '../context/NotesContext';

const Notelist = () => {
	const { notes } = useContext(NotesContext);

	return (
		<React.Fragment>
			<h2 className="title">Your Notes</h2>
			<div className="notelist">
				{notes.map((note) => {
					return <Note note={note} key={note._id} />;
				})}
			</div>
		</React.Fragment>
	);
};

export default Notelist;
