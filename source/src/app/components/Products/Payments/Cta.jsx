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
import { ArrowIcon } from './Icons';
import { DARK_1 } from './tokens';

const PREFIX = 'PaymentsCta';

const classes = {
    container: `${PREFIX}-container`,
    ctaTitle: `${PREFIX}-ctaTitle`,
    ctaDesc: `${PREFIX}-ctaDesc`,
    actions: `${PREFIX}-actions`,
    btnLight: `${PREFIX}-btnLight`,
    btnOutline: `${PREFIX}-btnOutline`,
};

const Root = styled('section')(({ theme }) => ({
    width: '100%',
    boxSizing: 'border-box',
    backgroundColor: 'var(--loop-bg-deep)',
    textAlign: 'center',
    padding: '96px 40px',
    [theme.breakpoints.down('md')]: {
        padding: '64px 24px',
    },
    [theme.breakpoints.down('sm')]: {
        padding: '48px 20px',
    },
    [`& .${classes.container}`]: {
        maxWidth: 1280,
        margin: '0 auto',
        width: '100%',
    },
    [`& .${classes.ctaTitle}`]: {
        color: 'var(--loop-text-strong)',
        fontWeight: 700,
        fontSize: 38,
        lineHeight: '45.6px',
        margin: '0 0 16px',
        [theme.breakpoints.down('sm')]: {
            fontSize: 26,
            lineHeight: '34px',
        },
    },
    [`& .${classes.ctaDesc}`]: {
        color: 'var(--loop-cta-desc)',
        fontWeight: 400,
        fontSize: 18,
        lineHeight: '30px',
        maxWidth: 620,
        margin: '0 auto 40px',
    },
    [`& .${classes.actions}`]: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 16,
        justifyContent: 'center',
    },
    [`& .${classes.btnLight}`]: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        border: '1px solid var(--loop-cta-outline)',
        cursor: 'pointer',
        backgroundColor: '#FFFFFF',
        color: DARK_1,
        fontFamily: 'inherit',
        fontWeight: 700,
        fontSize: 16,
        lineHeight: '24px',
        borderRadius: 14,
        padding: '16px 32px',
        transition: 'background 0.2s ease',
        '&:hover': { backgroundColor: '#F3F3F3' },
    },
    [`& .${classes.btnOutline}`]: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        cursor: 'pointer',
        backgroundColor: 'transparent',
        color: 'var(--loop-text-strong)',
        fontFamily: 'inherit',
        fontWeight: 700,
        fontSize: 16,
        lineHeight: '24px',
        borderRadius: 14,
        padding: '16px 32px',
        border: '2px solid var(--loop-text-strong)',
        transition: 'background 0.2s ease',
        '&:hover': { backgroundColor: 'rgba(255,255,255,0.08)' },
    },
}));

/**
 * Call-to-action section of the payments landing page.
 * @returns {JSX.Element} the CTA section
 */
function Cta() {
    return (
        <Root>
            <div className={classes.container}>
                <h2 className={classes.ctaTitle}>Ready to Transform Your Payment Processing?</h2>
                <p className={classes.ctaDesc}>
                    Join thousands of businesses already using our payment platform to scale globally.
                    {/* sub-copy inferred */}
                </p>
                <div className={classes.actions}>
                    <button type='button' className={classes.btnLight}>
                        Try it Out
                        <ArrowIcon color={DARK_1} />
                    </button>
                    <button type='button' className={classes.btnOutline}>
                        Schedule a demo
                    </button>
                </div>
            </div>
        </Root>
    );
}

export default Cta;
