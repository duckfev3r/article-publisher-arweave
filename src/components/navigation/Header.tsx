import React from 'react';

import './header.css'

import { Link } from 'react-router-dom';
import INavLink from '../../types/types';
import SendIcon from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button/Button';


const logo = require('../../assets/img/scribe-logo-only-bg-removed.png')

type Props = { navLinks: INavLink[] };

const Header = ({ navLinks }: Props) => {
    return (
        <div className='header-container'>
            <div className='header-image'>
                <Link to='/'>
                    <img src={String(logo)} />
                </Link>
            </div>
            <div className="header-button-container">
                <Link to='/create'>
                    <Button
                        size="medium"
                        className="button"
                        variant="text"
                        disableRipple
                        // color="green"
                    >
                        Post
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default Header;