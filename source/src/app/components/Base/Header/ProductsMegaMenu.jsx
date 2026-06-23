/*
 * LOOP Matrix — Products mega-menu dropdown.
 * Full-width panel shown when the "Products" nav item is clicked.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Icon from '@mui/material/Icon';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';

// --- palette (kept in-component per project preference, not in userTheme.js) ---
const SECTION_BG = '#171E26';
const FOOTER_BG = '#0F141A';
const ORANGE = '#FF5F00';
const ICON_BG = '#F8E9D6';
const BADGE_COLOR = '#34D399';
const FONT = "'Poppins', 'Open Sans', 'Helvetica', 'Arial', sans-serif";

// Product list shown in the dropdown (routes are placeholders until the pages exist)
const PRODUCTS = [
    {
        title: 'Payments',
        icon: 'credit_card',
        to: '/products/payments',
        desc: 'Accept, process and reconcile payments across multiple channels.',
    },
    {
        title: 'E-Commerce',
        icon: 'shopping_bag',
        to: '/products/ecommerce',
        desc: 'Build powerful online stores with our full e-commerce API suite.',
    },
];

const styles = {
    panel: {
        position: 'fixed',
        // LOOP Matrix: inset from both edges so the dropdown is NOT full-width
        left: 64,
        right: 64,
        zIndex: 1201,
        background: SECTION_BG,
        borderRadius: '0 0 16px 16px',
        overflow: 'hidden',
        boxShadow: '0 18px 40px rgba(0,0,0,0.55)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderTop: 'none',
    },
    section: {
        padding: '26px 48px 130px',
    },
    headerRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontFamily: FONT,
        fontWeight: 400,
        fontSize: '10px',
        lineHeight: '15px',
        letterSpacing: '2.5px',
        textTransform: 'uppercase',
        color: '#9CA3AF',
        paddingBottom: 16,
        marginBottom: 24,
        borderBottom: '1px solid rgba(255,255,255,0.06)',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        columnGap: 40,
        rowGap: 30,
    },
    item: {
        display: 'flex',
        gap: 14,
        alignItems: 'flex-start',
        textDecoration: 'none',
    },
    iconBox: {
        flex: '0 0 auto',
        width: 44,
        height: 44,
        borderRadius: 12,
        background: ICON_BG,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleRow: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
    },
    title: {
        fontFamily: FONT,
        fontSize: '16px',
        fontWeight: 700,
        lineHeight: '20.25px',
        letterSpacing: '0px',
        color: ORANGE,
    },
    badge: {
        fontFamily: FONT,
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: '0.06em',
        color: BADGE_COLOR,
        background: 'rgba(52,211,153,0.12)',
        padding: '2px 6px',
        borderRadius: 4,
    },
    desc: {
        fontFamily: FONT,
        color: '#F2F5F7',
        fontSize: '14px',
        fontWeight: 400,
        lineHeight: '22px',
        letterSpacing: '0px',
        marginTop: 6,
        maxWidth: 250,
    },
    footer: {
        background: FOOTER_BG,
        padding: '18px 48px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontFamily: FONT,
        fontSize: 13,
    },
    footerLeft: {
        color: '#9CA3AF',
        fontWeight: 400,
        fontSize: '12px',
        lineHeight: '18px',
        letterSpacing: '0px',
    },
    footerLink: {
        color: ORANGE,
        textDecoration: 'none',
        fontWeight: 400,
        fontSize: '11px',
        lineHeight: '16.5px',
        letterSpacing: '0px',
    },
};

/**
 * ProductsMegaMenu
 * @param {object} props open / onClose / top (header height in px)
 * @returns {React.ReactElement|null} the full-width products dropdown
 */
function ProductsMegaMenu(props) {
    const { open, onClose, top } = props;
    // Measure the real header height so the dropdown opens flush BELOW it
    // (the AppBar has vertical padding, so its height is not a fixed 100px).
    const [topPx, setTopPx] = React.useState(top);

    React.useEffect(() => {
        if (!open) return;
        const bar = document.getElementById('appBar');
        if (bar) {
            setTopPx(Math.round(bar.getBoundingClientRect().bottom));
        }
    }, [open, top]);

    return (
        <>
            <Backdrop
                open={open}
                onClick={onClose}
                sx={{
                    // dim everything below the header (header stays bright, matching Figma)
                    top: `${topPx}px`,
                    backgroundColor: 'rgba(0, 0, 0, 0.55)',
                    zIndex: 1200,
                }}
            />
            <Fade in={open} unmountOnExit>
                <div style={{ ...styles.panel, top: topPx }}>
                    <div style={styles.section}>
                        <div style={styles.headerRow}>
                            <span>Our Products</span>
                            <span>
                                {PRODUCTS.length}
                                {' products'}
                            </span>
                        </div>
                        <div style={styles.grid}>
                            {PRODUCTS.map((p) => (
                                <Link key={p.title} to={p.to} style={styles.item} onClick={onClose}>
                                    <span style={styles.iconBox}>
                                        <Icon style={{ color: ORANGE, fontSize: 22 }}>{p.icon}</Icon>
                                    </span>
                                    <span>
                                        <span style={styles.titleRow}>
                                            <span style={styles.title}>{p.title}</span>
                                            {p.badge && (<span style={styles.badge}>{p.badge}</span>)}
                                        </span>
                                        <span style={{ ...styles.desc, display: 'block' }}>{p.desc}</span>
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div style={styles.footer}>
                        <span style={styles.footerLeft}>Not sure where to start?</span>
                        <Link to='/docs/get-started' style={styles.footerLink} onClick={onClose}>
                            Explore the docs →
                        </Link>
                    </div>
                </div>
            </Fade>
        </>
    );
}

ProductsMegaMenu.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    top: PropTypes.number,
};

ProductsMegaMenu.defaultProps = {
    top: 100,
};

export default ProductsMegaMenu;
