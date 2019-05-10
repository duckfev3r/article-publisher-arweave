import React from 'react';

import './header.css'

import { Link } from 'react-router-dom';
import INavLink from '../../types/types';

const logo = require('../../assets/img/scribe-logo-only-bg-removed.png')

type Props = { navLinks: INavLink[] };

const Header = ({ navLinks }: Props) => {
    return (
        <div className='header-container'>
            <div>
                <img className='header-image' src={String(logo)} />
            </div>
            {
                navLinks.map((link) => {
                    return (
                        <span
                            key={link.link}
                            className='link'>
                            <Link to={link.link}>
                                {link.title}
                            </Link>
                        </span>
                    )
                })
            }
        </div>
    );
}

export default Header;