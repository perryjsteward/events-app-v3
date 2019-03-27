import React from 'react';
import './Header.scss';

const Header = () => {
    return (
        <React.Fragment>
            <div className="header__bumper"></div>
            <header>
                <div className='title'>EventsApp</div>
            </header>
        </React.Fragment>
    );
};

export default Header;