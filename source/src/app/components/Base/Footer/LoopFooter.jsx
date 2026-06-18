import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ORANGE = '#FF5F00';
const BG = '#141A21';
const HEADING = '#FFFFFF';
const LINK = '#9CA3AF';
const FONT = "'Poppins', 'Open Sans', 'Helvetica', 'Arial', sans-serif";

const COLUMNS = [
    {
        title: 'Products',
        links: ['API Gateway', 'Payments API', 'Credit API', 'e-Commerce', 'Sandbox'],
    },
    {
        title: 'Developers',
        links: ['Documentation', 'API Reference', 'SDKs & Libraries', 'Changelog', 'Status'],
    },
    {
        title: 'Company',
        links: ['Blog', 'Careers', 'Partners', 'Press'],
    },
    {
        title: 'Legal',
        links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
    },
];

const SOCIALS = ['social-1', 'social-2', 'social-3'];

const styles = {
    footer: {
        background: BG,
        color: LINK,
        fontFamily: FONT,
        padding: '48px 80px 26px',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: '1.6fr 1fr 1fr 1fr 1fr',
        gap: 32,
    },
    logo: {
        height: 36,
        width: 'auto',
        display: 'block',
    },
    tagline: {
        color: LINK,
        fontSize: 14,
        lineHeight: '20px',
        margin: '16px 0 0',
        maxWidth: 220,
    },
    socials: {
        display: 'flex',
        gap: 10,
        marginTop: 20,
    },
    social: {
        width: 34,
        height: 34,
        borderRadius: 8,
        border: '1px solid rgba(255,255,255,0.14)',
        background: 'transparent',
        cursor: 'pointer',
        padding: 0,
    },
    colTitle: {
        color: HEADING,
        fontSize: 14,
        fontWeight: 600,
        margin: '0 0 18px',
    },
    colLink: {
        display: 'block',
        color: LINK,
        fontSize: 14,
        lineHeight: '20px',
        textDecoration: 'none',
        marginBottom: 12,
    },
    bottom: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        marginTop: 40,
        paddingTop: 22,
    },
    copyright: {
        color: LINK,
        fontSize: 13,
    },
    newsletter: {
        display: 'flex',
        gap: 10,
        alignItems: 'center',
    },
    input: {
        background: '#1B232B',
        border: '1px solid rgba(255,255,255,0.10)',
        borderRadius: 8,
        padding: '10px 14px',
        color: HEADING,
        fontSize: 13,
        fontFamily: FONT,
        width: 200,
        outline: 'none',
    },
    button: {
        background: ORANGE,
        color: HEADING,
        border: 'none',
        borderRadius: 8,
        padding: '11px 18px',
        fontSize: 13,
        fontWeight: 500,
        fontFamily: FONT,
        cursor: 'pointer',
        whiteSpace: 'nowrap',
    },
};

function LoopFooter(props) {
    const { logoSrc } = props;

    return (
        <footer id='footer' style={styles.footer}>
            <div style={styles.grid}>
                <div>
                    {logoSrc && (<img src={logoSrc} alt='LOOP Matrix' style={styles.logo} />)}
                    <p style={styles.tagline}>Enterprise-grade fintech APIs for modern products.</p>
                    <div style={styles.socials}>
                        {SOCIALS.map((s) => (
                            <button key={s} type='button' aria-label={s} style={styles.social} />
                        ))}
                    </div>
                </div>

                {COLUMNS.map((col) => (
                    <div key={col.title}>
                        <h4 style={styles.colTitle}>{col.title}</h4>
                        {col.links.map((label) => (
                            <Link key={label} to='#' style={styles.colLink}>{label}</Link>
                        ))}
                    </div>
                ))}
            </div>

            <div style={styles.bottom}>
                <span style={styles.copyright}>© 2026 LOOP, Inc. All rights reserved.</span>
                <div style={styles.newsletter}>
                    <input
                        type='email'
                        aria-label='Email address'
                        placeholder='your@email.com'
                        style={styles.input}
                    />
                    <button type='button' style={styles.button}>Join Newsletter</button>
                </div>
            </div>
        </footer>
    );
}

LoopFooter.propTypes = {
    logoSrc: PropTypes.string,
};

LoopFooter.defaultProps = {
    logoSrc: '',
};

export default React.memo(LoopFooter);
