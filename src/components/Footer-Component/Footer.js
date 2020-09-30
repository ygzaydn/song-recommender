import React from 'react';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import CopyrightIcon from '@material-ui/icons/Copyright';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';

import './Footer-style.css'

const useStyles = makeStyles((theme) => ({
  extendedIcon: {
    color: 'white',
  },
}));

export const Footer = () => {
    const classes = useStyles();
    return (
        <div className="fixed-footer">
            <div className="footer-logos">
            <IconButton className={classes.extendedIcon} href="https://github.com/ygzaydn">
                <GitHubIcon />
            </IconButton>
            <IconButton className={classes.extendedIcon} href="https://www.linkedin.com/in/erol-ya%C4%9F%C4%B1z-ayd%C4%B1n-208517a9/">
                <LinkedInIcon />
            </IconButton>

            </div>
            <div className="footer-copyright">
                <CopyrightIcon />
            </div>
            <div className="footer-date">
                2020
            </div>

        </div>
    )
}