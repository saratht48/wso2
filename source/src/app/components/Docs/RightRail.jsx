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
import { ORANGE } from './tokens';

const PREFIX = 'DocsRightRail';

const classes = {
    eyebrow: `${PREFIX}-eyebrow`,
    link: `${PREFIX}-link`,
    linkActive: `${PREFIX}-linkActive`,
    dot: `${PREFIX}-dot`,
    sub: `${PREFIX}-sub`,
};

const Root = styled('aside')(() => ({
    display: 'flex',
    flexDirection: 'column',
    [`& .${classes.eyebrow}`]: {
        fontFamily: "'JetBrains Mono', 'Courier New', monospace",
        color: 'var(--loop-eyebrow)',
        fontSize: 11,
        fontWeight: 500,
        letterSpacing: 1.2,
        textTransform: 'uppercase',
        margin: '0 0 14px',
    },
    [`& .${classes.link}`]: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        color: 'var(--loop-text-primary)',
        fontSize: 13.5,
        textDecoration: 'none',
        padding: '5px 0',
        transition: 'color 0.15s ease',
        '&:hover': { color: 'var(--loop-text-primary)' },
    },
    [`& .${classes.linkActive}`]: {
        color: ORANGE,
        fontWeight: 600,
        '&:hover': { color: ORANGE },
    },
    [`& .${classes.dot}`]: {
        width: 6,
        height: 6,
        borderRadius: '50%',
        backgroundColor: ORANGE,
        flexShrink: 0,
    },
    [`& .${classes.sub}`]: {
        display: 'block',
        color: '#6B7280',
        fontSize: 13,
        textDecoration: 'none',
        padding: '5px 0 5px 16px',
        transition: 'color 0.15s ease',
        '&:hover': { color: 'var(--loop-text-primary)' },
    },
}));

const SECTIONS = [
    { id: 'introduction', label: 'Introduction', active: true },
    {
        id: 'supported-products',
        label: 'Supported Products',
        subs: [
            { id: 'sp-ecommerce', label: 'E-Commerce' },
            { id: 'sp-payments', label: 'Payments' },
            { id: 'sp-credit', label: 'Credit' },
            { id: 'sp-vouchers', label: 'Vouchers' },
        ],
    },
    { id: 'environments', label: 'Environments' },
    {
        id: 'authentication',
        label: 'Authentication',
        subs: [
            { id: 'auth-model', label: 'Authentication' },
            { id: 'auth-token', label: 'Access Token' },
            { id: 'auth-bearer', label: 'Bearer Header' },
        ],
    },
    { id: 'next-steps', label: 'Next Steps' },
];

/**
 * Right "on this page" navigation rail.
 * @param {object} props component props
 * @returns {JSX.Element} the right rail
 */
function RightRail({ sections }) {
    const data = sections && sections.length ? sections : SECTIONS;
    return (
        <Root>
            <p className={classes.eyebrow}>On this page</p>
            {data.map((section) => (
                <React.Fragment key={section.id}>
                    <a
                        href={`#${section.id}`}
                        className={`${classes.link} ${section.active ? classes.linkActive : ''}`}
                    >
                        {section.active && <span className={classes.dot} />}
                        {section.label}
                    </a>
                    {section.subs && section.subs.map((sub) => (
                        <a key={sub.id} href={`#${sub.id}`} className={classes.sub}>{sub.label}</a>
                    ))}
                </React.Fragment>
            ))}
        </Root>
    );
}

RightRail.propTypes = {
    sections: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        label: PropTypes.string,
    })),
};

RightRail.defaultProps = {
    sections: undefined,
};

export default RightRail;
