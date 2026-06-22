import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const ORANGE = '#FF5F00';
const BG = '#141A21';
const HEADING = '#FFFFFF';
const LINK = '#9CA3AF';
const FONT = "'Poppins', 'Open Sans', 'Helvetica', 'Arial', sans-serif";

const PREFIX = 'LoopFooter';

const classes = {
    grid: `${PREFIX}-grid`,
    brand: `${PREFIX}-brand`,
    logo: `${PREFIX}-logo`,
    tagline: `${PREFIX}-tagline`,
    colTitle: `${PREFIX}-colTitle`,
    colLink: `${PREFIX}-colLink`,
    bottom: `${PREFIX}-bottom`,
    copyright: `${PREFIX}-copyright`,
    socials: `${PREFIX}-socials`,
    social: `${PREFIX}-social`,
};

/* eslint-disable max-len -- inline SVG path data */
/**
 * Brand social glyph (X / LinkedIn / GitHub) for the footer buttons.
 * @param {object} props component props
 * @returns {JSX.Element} the icon
 */
function SocialIcon({ variant }) {
    if (variant === 'linkedin') {
        return (
            <svg width='15' height='15' viewBox='0 0 24 24' fill={LINK} aria-hidden='true'>
                <path d='M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3V9zm6 0h3.83v1.64h.05c.53-1 1.84-2.06 3.79-2.06 4.05 0 4.8 2.67 4.8 6.14V21h-4v-5.46c0-1.3-.02-2.98-1.82-2.98-1.82 0-2.1 1.42-2.1 2.88V21H9V9z' />
            </svg>
        );
    }
    if (variant === 'github') {
        return (
            <svg width='15' height='15' viewBox='0 0 24 24' fill={LINK} aria-hidden='true'>
                <path d='M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49v-1.7c-2.78.62-3.37-1.22-3.37-1.22-.46-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.57 2.34 1.12 2.91.86.09-.66.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.94.68 1.9v2.82c0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.25C22 6.58 17.52 2 12 2z' />
            </svg>
        );
    }
    return (
        <svg width='15' height='15' viewBox='0 0 24 24' fill={LINK} aria-hidden='true'>
            <path d='M18.9 2H22l-7.5 8.57L23 22h-6.9l-5.4-7.06L4.5 22H1.4l8.03-9.18L1 2h7.06l4.88 6.45L18.9 2zm-1.21 18h1.9L7.4 4H5.36l12.33 16z' />
        </svg>
    );
}
/* eslint-enable max-len */

SocialIcon.propTypes = {
    variant: PropTypes.string.isRequired,
};

const SOCIALS = [
    { id: 'x', label: 'X (Twitter)' },
    { id: 'linkedin', label: 'LinkedIn' },
    { id: 'github', label: 'GitHub' },
];

const COLUMNS = [
    {
        title: 'Products',
        links: ['E-Commerce', 'Payments', 'Credit API', 'Vouchers', 'Sandbox'],
    },
    {
        title: 'Developers',
        links: ['Documentation', 'API Reference', 'SDKs & Libraries', 'Guides & Quickstarts', 'Changelog'],
    },
    {
        title: 'Company',
        links: ['Blog', 'Careers', 'Partners', 'About'],
    },
    {
        title: 'Legal',
        links: ['Privacy Policy', 'Terms of Use', 'Cookie Policy'],
    },
];

const Root = styled('footer')(({ theme }) => ({
    background: BG,
    color: LINK,
    fontFamily: FONT,
    padding: '48px 80px 40px',
    [theme.breakpoints.down('md')]: {
        padding: '44px 40px 32px',
    },
    [theme.breakpoints.down('sm')]: {
        padding: '40px 20px 32px',
    },
    [`& .${classes.grid}`]: {
        display: 'grid',
        // desktop: brand + four link columns in one row
        gridTemplateColumns: '1.6fr 1fr 1fr 1fr 1fr',
        gap: 32,
        // tablet / mobile: brand spans a full row, link columns sit 3-up
        // (Products / Developers / Company), with Legal wrapping to its own row
        [theme.breakpoints.down('md')]: {
            gridTemplateColumns: 'repeat(3, 1fr)',
            columnGap: 20,
            rowGap: 36,
        },
    },
    [`& .${classes.brand}`]: {
        [theme.breakpoints.down('md')]: {
            gridColumn: '1 / -1',
        },
    },
    [`& .${classes.logo}`]: {
        height: 44,
        width: 'auto',
        display: 'block',
    },
    [`& .${classes.tagline}`]: {
        color: LINK,
        fontSize: 14,
        lineHeight: '22px',
        margin: '18px 0 0',
        maxWidth: 320,
    },
    [`& .${classes.colTitle}`]: {
        color: HEADING,
        fontSize: 14,
        fontWeight: 600,
        margin: '0 0 18px',
    },
    [`& .${classes.colLink}`]: {
        display: 'block',
        color: LINK,
        fontSize: 14,
        lineHeight: '20px',
        textDecoration: 'none',
        marginBottom: 14,
        '&:hover': { color: HEADING },
    },
    [`& .${classes.bottom}`]: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 20,
        borderTop: '1px solid rgba(255,255,255,0.08)',
        marginTop: 40,
        paddingTop: 24,
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: 20,
        },
    },
    [`& .${classes.copyright}`]: {
        color: LINK,
        fontSize: 13,
    },
    [`& .${classes.socials}`]: {
        display: 'flex',
        gap: 12,
    },
    [`& .${classes.social}`]: {
        width: 38,
        height: 38,
        borderRadius: 8,
        border: '1px solid rgba(255,255,255,0.14)',
        background: 'transparent',
        cursor: 'pointer',
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'border-color 0.2s ease',
        '&:hover': { borderColor: ORANGE },
    },
}));

/**
 * LOOP Matrix global footer (rendered once by Base/index.jsx for every route).
 * @param {object} props component props
 * @returns {JSX.Element} the footer
 */
function LoopFooter(props) {
    const { logoSrc } = props;

    return (
        <Root id='footer'>
            <div className={classes.grid}>
                <div className={classes.brand}>
                    {logoSrc && (<img src={logoSrc} alt='LOOP Matrix' className={classes.logo} />)}
                    <p className={classes.tagline}>
                        Enterprise-grade Fintech API infrastructure built for modern financial products.
                    </p>
                </div>

                {COLUMNS.map((col) => (
                    <div key={col.title}>
                        <h4 className={classes.colTitle}>{col.title}</h4>
                        {col.links.map((label) => (
                            <Link key={label} to='#' className={classes.colLink}>{label}</Link>
                        ))}
                    </div>
                ))}
            </div>

            <div className={classes.bottom}>
                <span className={classes.copyright}>© 2025 LOOP Matrix. All rights reserved.</span>
                <div className={classes.socials}>
                    {SOCIALS.map((s) => (
                        <button key={s.id} type='button' aria-label={s.label} className={classes.social}>
                            <SocialIcon variant={s.id} />
                        </button>
                    ))}
                </div>
            </div>
        </Root>
    );
}

LoopFooter.propTypes = {
    logoSrc: PropTypes.string,
};

LoopFooter.defaultProps = {
    logoSrc: '',
};

export default React.memo(LoopFooter);
