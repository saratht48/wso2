/*
 * LOOP Matrix — logged-in user dropdown panel.
 * Rendered inside the header user-menu Popper.
 */
import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import Icon from '@mui/material/Icon';

const FONT = "'Poppins', 'Open Sans', 'Helvetica', 'Arial', sans-serif";
const PANEL_BG = '#161D24';
const ORANGE = '#FF5F00';
const WHITE = '#FFFFFF';
const SUBTLE = '#9CA3AF';

const styles = {
    panel: {
        width: 280,
        background: PANEL_BG,
        borderRadius: 16,
        padding: 16,
        fontFamily: FONT,
        border: '1px solid rgba(255,255,255,0.06)',
        boxShadow: '0 18px 40px rgba(0,0,0,0.5)',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        marginBottom: 14,
    },
    name: {
        color: WHITE,
        fontWeight: 600,
        fontSize: 15,
        lineHeight: '20px',
    },
    email: {
        color: SUBTLE,
        fontWeight: 400,
        fontSize: 12,
        lineHeight: '16px',
        marginTop: 2,
    },
    planBox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(255,255,255,0.04)',
        borderRadius: 10,
        padding: '10px 14px',
        marginBottom: 8,
    },
    planLabel: {
        color: SUBTLE,
        fontSize: 12,
        fontFamily: FONT,
    },
    planBadge: {
        color: ORANGE,
        border: `1px solid ${ORANGE}`,
        borderRadius: 999,
        padding: '2px 12px',
        fontSize: 12,
        fontWeight: 600,
    },
    divider: {
        height: 1,
        background: 'rgba(255,255,255,0.08)',
        margin: '10px 0',
    },
    item: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '10px 6px',
        color: WHITE,
        fontSize: 14,
        cursor: 'pointer',
        borderRadius: 8,
    },
    itemIcon: {
        color: SUBTLE,
        fontSize: 20,
    },
    signout: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '10px 6px',
        color: ORANGE,
        fontSize: 14,
        fontWeight: 600,
        cursor: 'pointer',
    },
    signoutIcon: {
        color: ORANGE,
        fontSize: 20,
    },
};

/**
 * UserMenuDropdown
 * @param {object} props initials / name / email / plan / onProfile / onSettings / onSignOut
 * @returns {React.ReactElement} the dropdown panel
 */
function UserMenuDropdown(props) {
    const {
        initials, name, email, plan, onProfile, onSettings, onSignOut,
    } = props;

    const onKey = (handler) => (e) => { if (e.key === 'Enter') handler(); };

    return (
        <div style={styles.panel}>
            <div style={styles.header}>
                <Avatar
                    variant='rounded'
                    sx={{
                        bgcolor: ORANGE,
                        width: 44,
                        height: 44,
                        borderRadius: '12px',
                        fontSize: 16,
                        fontWeight: 700,
                    }}
                >
                    {initials}
                </Avatar>
                <div>
                    <div style={styles.name}>{name}</div>
                    {email && (<div style={styles.email}>{email}</div>)}
                </div>
            </div>

            <div style={styles.planBox}>
                <span style={styles.planLabel}>Current plan</span>
                <span style={styles.planBadge}>{plan}</span>
            </div>

            <div style={styles.divider} />

            <div style={styles.item} role='button' tabIndex={0} onClick={onProfile} onKeyDown={onKey(onProfile)}>
                <Icon style={styles.itemIcon}>person_outline</Icon>
                My Profile
            </div>
            <div style={{ ...styles.item, marginBottom: 120 }} role='button' tabIndex={0} onClick={onSettings} onKeyDown={onKey(onSettings)}>
                <Icon style={styles.itemIcon}>settings</Icon>
                Settings
            </div>

            <div style={styles.divider} />

            <div style={styles.signout} role='button' tabIndex={0} onClick={onSignOut} onKeyDown={onKey(onSignOut)}>
                <Icon style={styles.signoutIcon}>logout</Icon>
                Sign Out
            </div>
        </div>
    );
}

UserMenuDropdown.propTypes = {
    initials: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    plan: PropTypes.string,
    onProfile: PropTypes.func,
    onSettings: PropTypes.func,
    onSignOut: PropTypes.func.isRequired,
};

UserMenuDropdown.defaultProps = {
    initials: '',
    name: '',
    email: '',
    plan: 'Growth',
    onProfile: () => {},
    onSettings: () => {},
};

export default UserMenuDropdown;
