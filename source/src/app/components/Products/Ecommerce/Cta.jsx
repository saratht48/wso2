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
import { DARK_1, DARK_2, ORANGE } from './tokens';

const PREFIX = 'EcommerceCta';

const classes = {
    container: `${PREFIX}-container`,
    ctaTitle: `${PREFIX}-ctaTitle`,
    ctaDesc: `${PREFIX}-ctaDesc`,
    actions: `${PREFIX}-actions`,
    btnPrimary: `${PREFIX}-btnPrimary`,
    btnLight: `${PREFIX}-btnLight`,
};

const Root = styled('section')(({ theme }) => ({
    width: '100%',
    boxSizing: 'border-box',
    backgroundColor: DARK_2,
    textAlign: 'center',
    padding: '96px 40px',
    [theme.breakpoints.down('md')]: {
        padding: '72px 24px',
    },
    [theme.breakpoints.down('sm')]: {
        padding: '56px 20px',
    },
    [`& .${classes.container}`]: {
        maxWidth: 896,
        margin: '0 auto',
        width: '100%',
    },
    [`& .${classes.ctaTitle}`]: {
        fontFamily: "'JetBrains Mono', 'Courier New', monospace",
        color: '#FFFFFF',
        fontWeight: 700,
        fontSize: 40,
        lineHeight: '60px',
        margin: '0 0 24px',
        [theme.breakpoints.down('sm')]: {
            fontSize: 28,
            lineHeight: '40px',
        },
    },
    [`& .${classes.ctaDesc}`]: {
        color: '#D1D5DC',
        fontWeight: 400,
        fontSize: 18,
        lineHeight: '30px',
        maxWidth: 620,
        margin: '0 auto 32px',
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
        borderRadius: 10,
        padding: '18px 40px',
        transition: 'opacity 0.2s ease',
        '&:hover': { opacity: 0.9 },
    },
    [`& .${classes.btnLight}`]: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        backgroundColor: '#FFFFFF',
        color: DARK_1,
        fontFamily: 'inherit',
        fontWeight: 600,
        fontSize: 16,
        lineHeight: '24px',
        borderRadius: 10,
        padding: '16px 34px',
        border: '2px solid rgba(255,255,255,0.2)',
        transition: 'background 0.2s ease',
        '&:hover': { backgroundColor: '#F3F3F3' },
    },
}));

/**
 * Call-to-action section of the e-commerce landing page.
 * @returns {JSX.Element} the CTA section
 */
function Cta() {
    return (
        <Root>
            <div className={classes.container}>
                <h2 className={classes.ctaTitle}>Ready to Start Your E-Commerce Journey?</h2>
                <p className={classes.ctaDesc}>
                    Join thousands of merchants building successful online stores with LOOP
                </p>
                <div className={classes.actions}>
                    <button type='button' className={classes.btnPrimary}>Get Started Free</button>
                    <button type='button' className={classes.btnLight}>Contact Sales</button>
                </div>
            </div>
        </Root>
    );
}

export default Cta;
