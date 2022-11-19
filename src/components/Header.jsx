import React from 'react';
import './Header.css';
// import { CiStickyNote } from 'react-icons/ci';

const Header = () => {
	return (
		<h2 className="header">
			<img src={`${process.env.PUBLIC_URL}/favicon-32x32.png`} alt="" />
			NotesApp
		</h2>
	);
};

export default Header;
