import React from 'react';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import CopyrightIcon from '@material-ui/icons/Copyright';

import './Footer-style.css'

export const Footer = () => {

    return (
        <div className="fixed-footer">
            <div className="footer-logos">
                <GitHubIcon />
                <LinkedInIcon />
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