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
import { app } from 'Settings';
import CodeWindow from './CodeWindow';
import { CheckCircleIcon, CodeIcon, ZapIcon } from './Icons';
import { DARK_1, DARK_2 } from './tokens';


const PREFIX = 'DevStartBuilding';

const classes = {
    container: `${PREFIX}-container`,
    badge: `${PREFIX}-badge`,
    sectionTitle: `${PREFIX}-sectionTitle`,
    sectionSub: `${PREFIX}-sectionSub`,
    grid: `${PREFIX}-grid`,
    cards: `${PREFIX}-cards`,
    cardRow: `${PREFIX}-cardRow`,
    card: `${PREFIX}-card`,
    cardIcon: `${PREFIX}-cardIcon`,
    cardTitle: `${PREFIX}-cardTitle`,
    cardDesc: `${PREFIX}-cardDesc`,
};

const MINIAPP_CODE = [
    '// 1. Install LOOP SDK',
    'npm install @loop/miniapp-sdk',
    '',
    '// 2. Import and initialize',
    "import { LoopMiniApp } from '@loop/miniapp-sdk';",
    'const miniapp = new LoopMiniApp({',
    "  appId: 'your_app_id',",
    "  apiKey: 'your_api_key'",
    '});',
    '',
    '// 3. Use built-in features',
    'const user = await miniapp.getUser();',
    'const payment = await miniapp.requestPayment({',
    '  amount: 99.99,',
    "  currency: 'USD'",
    '});',
    '',
    '// 4. Deploy to LOOP',
];


const FullApi = `${app.context}/site/public/images/developerResource/fullapiaccess.png`;
const InstantDeploye = `${app.context}/site/public/images/developerResource/deploye.png`;
const setup = `${app.context}/site/public/images/developerResource/setup.png`;
const Root = styled('section')(({ theme }) => ({
    width: '100%',
    boxSizing: 'border-box',
    backgroundColor: DARK_2,
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
    [`& .${classes.badge}`]: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '7px 16px',
        borderRadius: 999,
        backgroundColor: 'rgba(255,95,0,0.1)',
        border: '1px solid rgba(255,95,0,0.3)',
        color: '#FF5F00',
        fontSize: 13,
        fontWeight: 600,
        lineHeight: '18px',
    },
    [`& .${classes.sectionTitle}`]: {
        fontFamily: "'JetBrains Mono', 'Courier New', monospace",
        color: '#FFFFFF',
        fontWeight: 700,
        fontSize: 40,
        lineHeight: '52px',
        margin: '16px 0 12px',
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
        margin: '0 0 56px',
    },
    // header block is centered; grid content is left-aligned
    '& > div > .header': {
        textAlign: 'center',
    },
    [`& .${classes.grid}`]: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 32,
        alignItems: 'stretch',
        [theme.breakpoints.down('md')]: {
            gridTemplateColumns: '1fr',
            gap: 24,
        },
    },
    [`& .${classes.cards}`]: {
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
    },
    [`& .${classes.cardRow}`]: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 24,
        [theme.breakpoints.down('sm')]: {
            gridTemplateColumns: '1fr',
        },
    },
    [`& .${classes.card}`]: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 28,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        boxShadow: '0 10px 25px rgba(0,0,0,0.25)',
        boxSizing: 'border-box',
    },
    [`& .${classes.cardIcon}`]: {
        width: 48,
        height: 48,
        borderRadius: '50%',
        backgroundColor: '#F3F4F6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    [`& .${classes.cardTitle}`]: {
        color: DARK_1,
        fontWeight: 700,
        fontSize: 17,
        lineHeight: '24px',
        margin: '0 0 6px',
    },
    [`& .${classes.cardDesc}`]: {
        color: '#6B7280',
        fontWeight: 400,
        fontSize: 14,
        lineHeight: '21px',
        margin: 0,
    },
}));

/**
 * "Start Building in Minutes" section: an SDK code window beside feature cards.
 * @returns {JSX.Element} the section
 */
function StartBuilding() {
    return (
        <Root>
            <div className={classes.container}>
                <div className='header'>
                    <span className={classes.badge}>Developer Friendly</span>
                    <h2 className={classes.sectionTitle}>Start Building in Minutes</h2>
                    <p className={classes.sectionSub}>
                        Simple, powerful APIs that work the way you expect
                    </p>
                </div>

                <div className={classes.grid}>
                    <CodeWindow fileName='miniapp-example.js' lines={MINIAPP_CODE} />

                    <div className={classes.cards}>
                        <div className={classes.cardRow}>
                            <div className={classes.card}>
                                <span className={classes.cardIcon}>
                                    {/* <CheckCircleIcon color={DARK_1} size={22} />
                                     */}
                                     <img src={setup} alt="setup" style={{width:'24px', height:'24px'}}/>
                                </span>
                                <h3 className={classes.cardTitle}>5-Minute Setup</h3>
                                <p className={classes.cardDesc}>Get started quickly with our SDK</p>
                            </div>
                            <div className={classes.card}>
                                <span className={classes.cardIcon}>
                                    <img src={FullApi} alt="FullApi" style={{width:'24px', height:'24px'}}/>
                                </span>
                                <h3 className={classes.cardTitle}>Full API Access</h3>
                                <p className={classes.cardDesc}>Access all LOOP platform features</p>
                            </div>
                        </div>
                        <div className={classes.card}>
                            <span className={classes.cardIcon}>
                                {/* <ZapIcon color={DARK_1} size={22} /> */}
                                <img src={InstantDeploye} alt="InstantDeploye" style={{width:'24px', height:'24px'}}/>
                            </span>
                            <h3 className={classes.cardTitle}>Instant Deploy</h3>
                            <p className={classes.cardDesc}>Push updates without app reviews</p>
                        </div>
                    </div>
                </div>
            </div>
        </Root>
    );
}

export default StartBuilding;
