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

import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import CodeWindow from './CodeWindow';
import { ORANGE, DARK_1 } from './tokens';

const PREFIX = 'DevGetStarted';

const classes = {
    container: `${PREFIX}-container`,
    label: `${PREFIX}-label`,
    sectionTitle: `${PREFIX}-sectionTitle`,
    sectionSub: `${PREFIX}-sectionSub`,
    grid: `${PREFIX}-grid`,
    steps: `${PREFIX}-steps`,
    step: `${PREFIX}-step`,
    stepNum: `${PREFIX}-stepNum`,
    stepNumActive: `${PREFIX}-stepNumActive`,
    stepBody: `${PREFIX}-stepBody`,
    stepTitle: `${PREFIX}-stepTitle`,
    stepTitleActive: `${PREFIX}-stepTitleActive`,
    stepDesc: `${PREFIX}-stepDesc`,
};

const QUICKSTART_CODE = [
    '// Create your LOOP developer account',
    "const res = await fetch('https://api.loop.dev/v1/auth', {",
    "  method: 'POST',",
    "  body: JSON.stringify({ email: 'you@company.com' })",
    '});',
    '',
    'const { apiKey } = await res.json();',
    '// apiKey: "loop_sk_sandbox_4f8a2c9d..."',
    '// Sandbox ready in under 60 seconds',
];

const STEPS = [
    {
        id: 'register',
        title: 'Register & Get Credentials',
        desc: 'Create your account and receive instant API keys for sandbox testing in under 60 seconds.',
    },
    {
        id: 'sandbox',
        title: 'Explore in Sandbox',
        desc: 'Test every endpoint against realistic mock data before you write a line of production code.',
    },
    {
        id: 'golive',
        title: 'Go Live',
        desc: 'Flip to production keys, complete verification, and start processing real transactions.',
    },
];

const Root = styled('section')(({ theme }) => ({
    width: '100%',
    boxSizing: 'border-box',
    backgroundColor: DARK_1,
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
    [`& .${classes.label}`]: {
        fontFamily: "'JetBrains Mono', 'Courier New', monospace",
        color: ORANGE,
        fontWeight: 500,
        fontSize: 14,
        letterSpacing: 1,
        textAlign: 'center',
        display: 'block',
        marginBottom: 12,
    },
    [`& .${classes.sectionTitle}`]: {
        fontFamily: "'JetBrains Mono', 'Courier New', monospace",
        color: '#FFFFFF',
        fontWeight: 700,
        fontSize: 40,
        lineHeight: '52px',
        textAlign: 'center',
        margin: '0 0 12px',
        [theme.breakpoints.down('sm')]: {
            fontSize: 28,
            lineHeight: '38px',
        },
    },
    [`& .${classes.sectionSub}`]: {
        color: '#6B7280',
        fontWeight: 400,
        fontSize: 18,
        lineHeight: '28px',
        textAlign: 'center',
        margin: '0 auto 64px',
    },
    [`& .${classes.grid}`]: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 56,
        alignItems: 'center',
        [theme.breakpoints.down('md')]: {
            gridTemplateColumns: '1fr',
            gap: 40,
        },
    },
    [`& .${classes.steps}`]: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
    },
    [`& .${classes.step}`]: {
        display: 'flex',
        gap: 20,
        alignItems: 'flex-start',
        cursor: 'pointer',
        padding: '12px 0',
        background: 'none',
        border: 'none',
        textAlign: 'left',
        width: '100%',
        fontFamily: 'inherit',
    },
    [`& .${classes.stepNum}`]: {
        flexShrink: 0,
        width: 44,
        height: 44,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'JetBrains Mono', 'Courier New', monospace",
        fontWeight: 700,
        fontSize: 15,
        backgroundColor: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.12)',
        color: '#6B7280',
        transition: 'all 0.2s ease',
    },
    [`& .${classes.stepNumActive}`]: {
        backgroundColor: ORANGE,
        borderColor: ORANGE,
        color: '#FFFFFF',
        boxShadow: '0 8px 20px rgba(255,95,0,0.35)',
    },
    [`& .${classes.stepBody}`]: {
        display: 'block',
        paddingTop: 4,
    },
    [`& .${classes.stepTitle}`]: {
        display: 'block',
        color: '#9CA3AF',
        fontWeight: 600,
        fontSize: 19,
        lineHeight: '26px',
        margin: 0,
        transition: 'color 0.2s ease',
    },
    [`& .${classes.stepTitleActive}`]: {
        color: '#FFFFFF',
    },
    [`& .${classes.stepDesc}`]: {
        display: 'block',
        color: '#6B7280',
        fontWeight: 400,
        fontSize: 15,
        lineHeight: '24px',
        margin: '10px 0 0',
        maxWidth: 420,
    },
}));

/**
 * "Get Started in 3 Steps" section with an interactive step list and code window.
 * @returns {JSX.Element} the section
 */
function GetStarted() {
    const [active, setActive] = useState(0);

    return (
        <Root>
            <div className={classes.container}>
                <span className={classes.label}>// QUICK_START</span>
                <h2 className={classes.sectionTitle}>Get Started in 3 Steps</h2>
                <p className={classes.sectionSub}>From signup to production in minutes</p>

                <div className={classes.grid}>
                    <div className={classes.steps}>
                        {STEPS.map((step, i) => {
                            const isActive = active === i;
                            return (
                                <button
                                    key={step.id}
                                    type='button'
                                    className={classes.step}
                                    onClick={() => setActive(i)}
                                >
                                    <span
                                        className={`${classes.stepNum} ${isActive ? classes.stepNumActive : ''}`}
                                    >
                                        {`0${i + 1}`}
                                    </span>
                                    <span className={classes.stepBody}>
                                        <span
                                            className={`${classes.stepTitle} ${isActive ? classes.stepTitleActive : ''}`}
                                        >
                                            {step.title}
                                        </span>
                                        {isActive && <span className={classes.stepDesc}>{step.desc}</span>}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    <CodeWindow fileName='quickstart.js' lines={QUICKSTART_CODE} />
                </div>
            </div>
        </Root>
    );
}

export default GetStarted;
