import React from 'react';
import logo from '../../assets/img/scribe-logo-only-bg-removed.png'

import './header.css'
import AppBar from '@material-ui/core/AppBar';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import Hidden from '@material-ui/core/Hidden';
import Toolbar from '@material-ui/core/Toolbar';
import Icon from '@material-ui/core/Icon/Icon';
import { Link } from 'react-router-dom';
import INavLink from '../../types/types';

type Props = { navLinks: INavLink[] };


const Header = ({navLinks}: Props) => {

    console.log(navLinks)

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