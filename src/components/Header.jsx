import React from 'react';
import './Header.css';
import { CiStickyNote } from 'react-icons/ci';

const Header = () => {
	return (
		<h2 className="header">
			<CiStickyNote color="#242423" />NotesApp
		</h2>
	);
};

export default Header;
