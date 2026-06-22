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
import { ORANGE, ORANGE_LIGHT } from './tokens';

const PREFIX = 'PaymentsStats';

const classes = {
    container: `${PREFIX}-container`,
    statsRow: `${PREFIX}-statsRow`,
    stat: `${PREFIX}-stat`,
    statNum: `${PREFIX}-statNum`,
    statBar: `${PREFIX}-statBar`,
    statLabel: `${PREFIX}-statLabel`,
};

const Root = styled('section')(({ theme }) => ({
    width: '100%',
    boxSizing: 'border-box',
    backgroundColor: 'var(--loop-header-bg)',
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
    [`& .${classes.statsRow}`]: {
        display: 'flex',
        justifyContent: 'space-between',
        gap: 32,
        textAlign: 'center',
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
            alignItems: 'center',
            gap: 48,
        },
    },
    [`& .${classes.stat}`]: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    [`& .${classes.statNum}`]: {
        fontFamily: "'JetBrains Mono', 'Courier New', monospace",
        fontWeight: 700,
        fontSize: 60,
        lineHeight: '60px',
        color: 'var(--loop-text-strong)',
        margin: 0,
        [theme.breakpoints.down('sm')]: {
            fontSize: 40,
            lineHeight: '44px',
        },
    },
    [`& .${classes.statBar}`]: {
        width: 64,
        height: 4,
        borderRadius: 2,
        margin: '16px 0',
        background: `linear-gradient(90deg, ${ORANGE}, ${ORANGE_LIGHT})`,
    },
    [`& .${classes.statLabel}`]: {
        color: '#4A5565',
        fontWeight: 500,
        fontSize: 18,
        lineHeight: '28px',
        margin: 0,
    },
}));

// 2nd and 3rd entries are inferred; confirm against Figma.
const STATS = [
    { id: 'uptime', num: '99.9%', label: 'Uptime SLA' },
    { id: 'countries', num: '150+', label: 'Countries Supported' },
    { id: 'latency', num: '<200ms', label: 'Average Response Time' },
];

/**
 * Stats band of the payments landing page.
 * @returns {JSX.Element} the stats section
 */
function Stats() {
    return (
        <Root>
            <div className={`${classes.container} ${classes.statsRow}`}>
                {STATS.map((stat) => (
                    <div key={stat.id} className={classes.stat}>
                        <p className={classes.statNum}>{stat.num}</p>
                        <span className={classes.statBar} />
                        <p className={classes.statLabel}>{stat.label}</p>
                    </div>
                ))}
            </div>
        </Root>
    );
}

export default Stats;
