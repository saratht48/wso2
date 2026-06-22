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
import { styled } from '@mui/material/styles';
import { DARK_1, ORANGE } from './tokens';

const PREFIX = 'DevCta';

const classes = {
    container: `${PREFIX}-container`,
    ctaTitle: `${PREFIX}-ctaTitle`,
    ctaDesc: `${PREFIX}-ctaDesc`,
    actions: `${PREFIX}-actions`,
    btnPrimary: `${PREFIX}-btnPrimary`,
    btnDark: `${PREFIX}-btnDark`,
};

const Root = styled('section')(({ theme }) => ({
    width: '100%',
    boxSizing: 'border-box',
    backgroundColor: DARK_1,
    textAlign: 'center',
    padding: '96px 40px',
    [theme.breakpoints.down('md')]: {
        padding: '72px 24px',
    },
    [theme.breakpoints.down('sm')]: {
        padding: '56px 20px',
    },
    [`& .${classes.container}`]: {
        maxWidth: 760,
        margin: '0 auto',
        width: '100%',
    },
    [`& .${classes.ctaTitle}`]: {
        fontFamily: "'JetBrains Mono', 'Courier New', monospace",
        color: '#FFFFFF',
        fontWeight: 700,
        fontSize: 40,
        lineHeight: '52px',
        margin: '0 0 20px',
        [theme.breakpoints.down('sm')]: {
            fontSize: 28,
            lineHeight: '38px',
        },
    },
    [`& .${classes.ctaDesc}`]: {
        color: '#94A3B8',
        fontWeight: 400,
        fontSize: 18,
        lineHeight: '30px',
        maxWidth: 600,
        margin: '0 auto 36px',
    },
    [`& .${classes.actions}`]: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 16,
        justifyContent: 'center',
    },
    [`& .${classes.btnPrimary}`]: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'none',
        cursor: 'pointer',
        backgroundColor: ORANGE,
        color: '#FFFFFF',
        fontFamily: 'inherit',
        fontWeight: 600,
        fontSize: 16,
        lineHeight: '24px',
        borderRadius: 12,
        padding: '16px 32px',
        transition: 'opacity 0.2s ease',
        '&:hover': { opacity: 0.9 },
    },
    [`& .${classes.btnDark}`]: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        backgroundColor: 'rgba(255,255,255,0.04)',
        color: '#FFFFFF',
        fontFamily: 'inherit',
        fontWeight: 600,
        fontSize: 16,
        lineHeight: '24px',
        borderRadius: 12,
        padding: '16px 32px',
        border: '1px solid rgba(255,255,255,0.15)',
        transition: 'background 0.2s ease',
        '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' },
    },
}));

/**
 * Closing call-to-action of the developer-resources landing page.
 * @returns {JSX.Element} the CTA section
 */
function Cta() {
    return (
        <Root>
            <div className={classes.container}>
                <h2 className={classes.ctaTitle}>Ready to Start Building?</h2>
                <p className={classes.ctaDesc}>
                    Join thousands of developers building the future of payments with LOOP
                </p>
                <div className={classes.actions}>
                    <button type='button' className={classes.btnPrimary}>Get API Keys</button>
                    <button type='button' className={classes.btnDark}>Talk to Developer Support</button>
                </div>
            </div>
        </Root>
    );
}

export default Cta;
