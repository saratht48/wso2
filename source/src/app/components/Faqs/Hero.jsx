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
import { styled } from '@mui/material/styles';
import { SearchIcon } from './Icons';
import { ORANGE } from './tokens';

const PREFIX = 'FaqHero';

const classes = {
    inner: `${PREFIX}-inner`,
    badge: `${PREFIX}-badge`,
    badgeDot: `${PREFIX}-badgeDot`,
    title: `${PREFIX}-title`,
    accent: `${PREFIX}-accent`,
    subtitle: `${PREFIX}-subtitle`,
    subLink: `${PREFIX}-subLink`,
    search: `${PREFIX}-search`,
    searchInput: `${PREFIX}-searchInput`,
    kbd: `${PREFIX}-kbd`,
};

const Root = styled('section')(({ theme }) => ({
    width: '100%',
    boxSizing: 'border-box',
    background: 'linear-gradient(180deg, var(--loop-hero-top) 0%, var(--loop-page-bg) 100%)',
    padding: '96px 40px 80px',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
        padding: '64px 20px 56px',
    },
    [`& .${classes.inner}`]: {
        maxWidth: 800,
        margin: '0 auto',
        width: '100%',
    },
    [`& .${classes.badge}`]: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '6px 16px',
        borderRadius: 999,
        backgroundColor: 'rgba(255,95,0,0.08)',
        border: '1px solid rgba(255,95,0,0.3)',
        color: ORANGE,
        fontFamily: "'JetBrains Mono', 'Courier New', monospace",
        fontSize: 12,
        fontWeight: 500,
        letterSpacing: 1.5,
        textTransform: 'uppercase',
        marginBottom: 28,
    },
    [`& .${classes.badgeDot}`]: {
        width: 6,
        height: 6,
        borderRadius: '50%',
        backgroundColor: ORANGE,
    },
    [`& .${classes.title}`]: {
        color: 'var(--loop-text-primary)',
        fontWeight: 700,
        fontSize: 56,
        lineHeight: '64px',
        letterSpacing: '-0.5px',
        margin: '0 0 24px',
        [theme.breakpoints.down('md')]: {
            fontSize: 44,
            lineHeight: '52px',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: 32,
            lineHeight: '40px',
        },
    },
    [`& .${classes.accent}`]: {
        color: ORANGE,
    },
    [`& .${classes.subtitle}`]: {
        color: 'var(--loop-text-subtitle)',
        fontWeight: 400,
        fontSize: 19,
        lineHeight: '30px',
        maxWidth: 640,
        margin: '0 auto 40px',
        [theme.breakpoints.down('sm')]: {
            fontSize: 16,
            lineHeight: '26px',
        },
    },
    [`& .${classes.subLink}`]: {
        color: ORANGE,
        cursor: 'pointer',
        textDecoration: 'none',
        '&:hover': { textDecoration: 'underline' },
    },
    [`& .${classes.search}`]: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        maxWidth: 800,
        margin: '0 auto',
        backgroundColor: 'var(--loop-search-bg)',
        border: '1px solid var(--loop-search-border)',
        borderRadius: 16,
        padding: '18px 20px',
        transition: 'border-color 0.2s ease',
        '&:focus-within': { borderColor: 'rgba(255,95,0,0.5)' },
    },
    [`& .${classes.searchInput}`]: {
        flex: 1,
        minWidth: 0,
        background: 'none',
        border: 'none',
        outline: 'none',
        color: 'var(--loop-text-primary)',
        fontFamily: 'inherit',
        fontSize: 16,
        lineHeight: '24px',
        '&::placeholder': { color: 'var(--loop-text-muted)' },
    },
    [`& .${classes.kbd}`]: {
        flexShrink: 0,
        fontFamily: "'JetBrains Mono', 'Courier New', monospace",
        fontSize: 12,
        color: 'var(--loop-text-muted)',
        border: '1px solid var(--loop-border-strong)',
        borderRadius: 6,
        padding: '3px 8px',
        [theme.breakpoints.down('sm')]: { display: 'none' },
    },
}));

/**
 * Hero band of the FAQ / Help Center page: badge, title, subtitle and search.
 * @param {object} props component props
 * @returns {JSX.Element} the hero section
 */
function Hero({ query, onQueryChange }) {
    return (
        <Root>
            <div className={classes.inner}>
                <span className={classes.badge}>
                    <span className={classes.badgeDot} />
                    Help Center
                </span>
                <h1 className={classes.title}>
                    Frequently Asked
                    {' '}
                    <span className={classes.accent}>Questions</span>
                </h1>
                <p className={classes.subtitle}>
                    Everything you need to know about the LOOPDFS API platform. Can&apos;t find your
                    answer?
                    {' '}
                    <a className={classes.subLink} href='#contact'>Contact support</a>
                </p>
                <div className={classes.search}>
                    <SearchIcon color='#6B7280' size={20} />
                    <input
                        type='text'
                        className={classes.searchInput}
                        placeholder='Search across all questions...'
                        value={query}
                        onChange={(e) => onQueryChange(e.target.value)}
                        aria-label='Search across all questions'
                    />
                    <span className={classes.kbd}>⌘K</span>
                </div>
            </div>
        </Root>
    );
}

Hero.propTypes = {
    query: PropTypes.string.isRequired,
    onQueryChange: PropTypes.func.isRequired,
};

export default Hero;
