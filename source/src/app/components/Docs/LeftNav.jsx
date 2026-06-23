/*
 * Copyright (c) 2026, WSO2 LLC. (http://www.wso2.com).
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {
    HomeIcon, RocketIcon, CodeIcon, SearchIcon, ChevronRightIcon, ChevronDownIcon, ArrowRightIcon,
} from './Icons';
import { ORANGE, GREEN } from './tokens';

const PREFIX = 'DocsLeftNav';

const classes = {
    guide: `${PREFIX}-guide`,
    guideHead: `${PREFIX}-guideHead`,
    guideIcon: `${PREFIX}-guideIcon`,
    guideTitle: `${PREFIX}-guideTitle`,
    guideSub: `${PREFIX}-guideSub`,
    guideTag: `${PREFIX}-guideTag`,
    dot: `${PREFIX}-dot`,
    search: `${PREFIX}-search`,
    searchInput: `${PREFIX}-searchInput`,
    kbd: `${PREFIX}-kbd`,
    nav: `${PREFIX}-nav`,
    item: `${PREFIX}-item`,
    itemLabel: `${PREFIX}-itemLabel`,
    subWrap: `${PREFIX}-subWrap`,
    subList: `${PREFIX}-subList`,
    subItem: `${PREFIX}-subItem`,
    subItemActive: `${PREFIX}-subItemActive`,
    eyebrow: `${PREFIX}-eyebrow`,
    envRow: `${PREFIX}-envRow`,
    envBadge: `${PREFIX}-envBadge`,
    urlBox: `${PREFIX}-urlBox`,
    urlLabel: `${PREFIX}-urlLabel`,
    urlValue: `${PREFIX}-urlValue`,
};

const Root = styled('aside')(() => ({
    display: 'flex',
    flexDirection: 'column',
    gap: 18,
    [`& .${classes.guide}`]: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        backgroundColor: 'var(--loop-surface-2)',
        border: '1px solid var(--loop-border)',
        borderRadius: 12,
        padding: 16,
    },
    [`& .${classes.guideHead}`]: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
    },
    [`& .${classes.guideIcon}`]: {
        width: 34,
        height: 34,
        borderRadius: 9,
        backgroundColor: ORANGE,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },
    [`& .${classes.guideTitle}`]: {
        fontFamily: "'JetBrains Mono', 'Courier New', monospace",
        color: ORANGE,
        fontSize: 16,
        fontWeight: 700,
        margin: 0,
    },
    [`& .${classes.guideSub}`]: {
        color: 'var(--loop-text-muted)',
        fontSize: 13.5,
        margin: 0,
    },
    [`& .${classes.guideTag}`]: {
        fontFamily: "'JetBrains Mono', 'Courier New', monospace",
        display: 'flex',
        alignItems: 'center',
        gap: 7,
        color: GREEN,
        fontSize: 12.5,
    },
    [`& .${classes.dot}`]: {
        width: 7,
        height: 7,
        borderRadius: '50%',
        backgroundColor: GREEN,
    },
    [`& .${classes.search}`]: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        backgroundColor: 'var(--loop-search-bg)',
        border: '1px solid var(--loop-border)',
        borderRadius: 10,
        padding: '10px 12px',
    },
    [`& .${classes.searchInput}`]: {
        flex: 1,
        minWidth: 0,
        background: 'none',
        border: 'none',
        outline: 'none',
        color: 'var(--loop-text-primary)',
        fontFamily: 'inherit',
        fontSize: 13,
        '&::placeholder': { color: '#6B7280' },
    },
    [`& .${classes.kbd}`]: {
        fontFamily: "'JetBrains Mono', 'Courier New', monospace",
        fontSize: 11,
        color: '#6B7280',
        border: '1px solid var(--loop-border)',
        borderRadius: 5,
        padding: '2px 6px',
    },
    [`& .${classes.nav}`]: {
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
    },
    [`& .${classes.item}`]: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        width: '100%',
        boxSizing: 'border-box',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        borderRadius: 8,
        padding: '11px 12px',
        color: 'var(--loop-docs-nav)',
        fontFamily: "'JetBrains Mono', 'Courier New', monospace",
        fontSize: 14,
        fontWeight: 500,
        lineHeight: '20px',
        textAlign: 'center',
        textDecoration: 'none',
        transition: 'background 0.15s ease, color 0.15s ease',
        '&:hover': { backgroundColor: 'var(--loop-toggle-bg)', color: 'var(--loop-text-primary)' },
    },
    [`& .${classes.itemLabel}`]: {
        flex: 1,
    },
    [`& .${classes.subWrap}`]: {
        display: 'flex',
        marginTop: 2,
    },
    [`& .${classes.subList}`]: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        marginLeft: 23,
        paddingLeft: 14,
        borderLeft: `1px solid ${ORANGE}`,
    },
    [`& .${classes.subItem}`]: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        width: '100%',
        boxSizing: 'border-box',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        borderRadius: 8,
        padding: '9px 12px',
        color: 'var(--loop-docs-nav)',
        fontFamily: "'Outfit', 'Poppins', sans-serif",
        fontSize: 14,
        fontWeight: 400,
        lineHeight: '19.8px',
        textAlign: 'left',
        textDecoration: 'none',
        transition: 'background 0.15s ease, color 0.15s ease',
        '&:hover': { color: 'var(--loop-text-primary)' },
    },
    [`& .${classes.subItemActive}`]: {
        backgroundColor: 'var(--loop-active-bg)',
        color: ORANGE,
        fontWeight: 600,
        '&:hover': { color: ORANGE },
    },
    [`& .${classes.eyebrow}`]: {
        fontFamily: "'JetBrains Mono', 'Courier New', monospace",
        color: 'var(--loop-eyebrow)',
        fontSize: 11,
        fontWeight: 500,
        letterSpacing: 1.4,
        textTransform: 'uppercase',
        margin: '6px 0 8px',
    },
    [`& .${classes.envRow}`]: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'var(--loop-surface-2)',
        border: '1px solid var(--loop-border)',
        borderRadius: 10,
        padding: '11px 14px',
        color: 'var(--loop-text-primary)',
        fontSize: 13.5,
    },
    [`& .${classes.envBadge}`]: {
        display: 'inline-flex',
        alignItems: 'center',
        color: GREEN,
        fontSize: 12,
        fontWeight: 600,
        backgroundColor: 'rgba(52,211,153,0.12)',
        borderRadius: 6,
        padding: '3px 10px',
    },
    [`& .${classes.urlBox}`]: {
        backgroundColor: 'var(--loop-surface-2)',
        border: '1px solid var(--loop-border)',
        borderRadius: 10,
        padding: '11px 14px',
    },
    [`& .${classes.urlLabel}`]: {
        color: '#6B7280',
        fontSize: 11,
        margin: '0 0 5px',
    },
    [`& .${classes.urlValue}`]: {
        fontFamily: "'JetBrains Mono', 'Courier New', monospace",
        color: ORANGE,
        fontSize: 12.5,
        margin: 0,
        wordBreak: 'break-all',
    },
}));

const NAV = [
    { id: 'introduction', label: 'Introduction', icon: 'home' },
    {
        id: 'get-started', label: 'Get Started', icon: 'rocket', chevron: true,
    },
];

const API_SUB = [
    { id: 'overview', label: 'Overview', to: '/docs/loop-api/overview' },
    { id: 'authorization', label: 'Authorization', to: '/docs/loop-api/authorization' },
    { id: 'send-money', label: 'Send Money', expandable: true },
    { id: 'pay', label: 'Pay', expandable: true },
    { id: 'ecommerce', label: 'E-Commerce', expandable: true },
];

const NAV_ICONS = { home: HomeIcon, rocket: RocketIcon };

/**
 * Left documentation navigation rail.
 * @param {object} props component props
 * @returns {JSX.Element} the left nav
 */
function LeftNav({ active }) {
    return (
        <Root>
            <div className={classes.guide}>
                <div className={classes.guideHead}>
                    <span className={classes.guideIcon}>
                        <ArrowRightIcon color='#FFFFFF' size={16} />
                    </span>
                    <p className={classes.guideTitle}>LOOP API</p>
                </div>
                <p className={classes.guideSub}>Acquiring Solution Guide</p>
                <span className={classes.guideTag}>
                    <span className={classes.dot} />
                    v2.1 · Stable
                </span>
            </div>

            <div className={classes.search}>
                <SearchIcon color='#6B7280' size={16} />
                <input className={classes.searchInput} type='text' placeholder='Search docs...' aria-label='Search docs' />
                <span className={classes.kbd}>⌘K</span>
            </div>

            <nav className={classes.nav}>
                {NAV.map((item) => {
                    const NavIcon = NAV_ICONS[item.icon];
                    return (
                        <a key={item.id} href={`#${item.id}`} className={classes.item}>
                            <NavIcon color='#9CA3AF' size={18} />
                            <span className={classes.itemLabel}>{item.label}</span>
                            {item.chevron && <ChevronRightIcon color='#6B7280' size={16} />}
                        </a>
                    );
                })}

                <a href='#loop-api' className={classes.item}>
                    <CodeIcon color='#9CA3AF' size={18} />
                    <span className={classes.itemLabel}>LOOP API</span>
                    <span style={{ transform: 'rotate(180deg)', display: 'flex' }}>
                        <ChevronDownIcon color='#9CA3AF' size={16} />
                    </span>
                </a>
                <div className={classes.subWrap}>
                    <div className={classes.subList}>
                        {API_SUB.map((sub) => {
                            const cls = `${classes.subItem} ${sub.id === active ? classes.subItemActive : ''}`;
                            const inner = (
                                <>
                                    <span className={classes.itemLabel}>{sub.label}</span>
                                    {sub.expandable && <ChevronRightIcon color='#6B7280' size={14} />}
                                </>
                            );
                            return sub.to ? (
                                <Link key={sub.id} to={sub.to} className={cls}>{inner}</Link>
                            ) : (
                                <a key={sub.id} href={`#${sub.id}`} className={cls}>{inner}</a>
                            );
                        })}
                    </div>
                </div>
            </nav>

            <div>
                <p className={classes.eyebrow}>Environment</p>
                <div className={classes.envRow}>
                    <span>Sandbox</span>
                    <span className={classes.envBadge}>Active</span>
                </div>
            </div>

            <div className={classes.urlBox}>
                <p className={classes.urlLabel}>Base URL</p>
                <p className={classes.urlValue}>api-sandbox.loopdfs.co.ke</p>
            </div>
        </Root>
    );
}

LeftNav.propTypes = {
    active: PropTypes.string,
};

LeftNav.defaultProps = {
    active: 'overview',
};

export default LeftNav;
