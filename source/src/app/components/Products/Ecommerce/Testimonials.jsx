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
import { StarIcon } from './Icons';
import { DARK_1, DARK_2 } from './tokens';

const PREFIX = 'EcommerceTestimonials';

const imagePath = `${app.context}/site/public/images/ecommerce`;

const classes = {
    container: `${PREFIX}-container`,
    sectionTitle: `${PREFIX}-sectionTitle`,
    sectionSub: `${PREFIX}-sectionSub`,
    grid: `${PREFIX}-grid`,
    card: `${PREFIX}-card`,
    stars: `${PREFIX}-stars`,
    quote: `${PREFIX}-quote`,
    person: `${PREFIX}-person`,
    avatar: `${PREFIX}-avatar`,
    name: `${PREFIX}-name`,
    role: `${PREFIX}-role`,
};

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
    [`& .${classes.sectionTitle}`]: {
        fontFamily: "'JetBrains Mono', 'Courier New', monospace",
        color: '#FFFFFF',
        fontWeight: 700,
        fontSize: 40,
        lineHeight: '60px',
        textAlign: 'center',
        margin: '0 0 16px',
        [theme.breakpoints.down('sm')]: {
            fontSize: 28,
            lineHeight: '40px',
        },
    },
    [`& .${classes.sectionSub}`]: {
        color: '#4A5565',
        fontWeight: 400,
        fontSize: 20,
        lineHeight: '28px',
        textAlign: 'center',
        margin: '0 auto 64px',
        [theme.breakpoints.down('sm')]: {
            fontSize: 16,
            lineHeight: '24px',
            margin: '0 auto 48px',
        },
    },
    [`& .${classes.grid}`]: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 32,
        [theme.breakpoints.down('md')]: {
            gridTemplateColumns: '1fr',
            maxWidth: 480,
            margin: '0 auto',
        },
    },
    [`& .${classes.card}`]: {
        backgroundColor: DARK_2,
        borderRadius: 16,
        padding: 33,
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        boxShadow: '0px 10px 7.5px rgba(0,0,0,0.1), 0px 4px 3px rgba(0,0,0,0.1)',
        boxSizing: 'border-box',
    },
    [`& .${classes.stars}`]: {
        display: 'flex',
        gap: 4,
    },
    [`& .${classes.quote}`]: {
        color: '#ADB3BE',
        fontStyle: 'italic',
        fontWeight: 400,
        fontSize: 16,
        lineHeight: '26px',
        margin: 0,
    },
    [`& .${classes.person}`]: {
        display: 'flex',
        alignItems: 'center',
        gap: 16,
    },
    [`& .${classes.avatar}`]: {
        width: 48,
        height: 48,
        borderRadius: '50%',
        objectFit: 'cover',
        flexShrink: 0,
    },
    [`& .${classes.name}`]: {
        color: '#FFFFFF',
        fontWeight: 600,
        fontSize: 16,
        lineHeight: '24px',
        margin: 0,
    },
    [`& .${classes.role}`]: {
        color: '#4A5565',
        fontWeight: 400,
        fontSize: 14,
        lineHeight: '20px',
        margin: 0,
    },
}));

const TESTIMONIALS = [
    {
        id: 'sarah',
        quote: '"This platform transformed our business. We\'ve gone from $50K to $500K in annual revenue in just 18 months!"',
        name: 'Sarah Johnson',
        role: 'Founder, Lorem Ispum.',
        avatar: `${imagePath}/avatar-sarah.jpg`,
    },
    {
        id: 'michael',
        quote: '"The inventory management & multi-channel features saved us countless hours. Best investment we\'ve made!"',
        name: 'Michael Chen',
        role: 'CEO, Lorem Ispum.',
        avatar: `${imagePath}/avatar-michael.jpg`,
    },
    {
        id: 'emma',
        quote: '"Customer support is incredible, and the analytics help us make data-driven decisions every day."',
        name: 'Emma Williams',
        role: 'Owner, Lorem Ispum.',
        avatar: `${imagePath}/avatar-emma.jpg`,
    },
];

/**
 * Testimonials section of the e-commerce landing page.
 * @returns {JSX.Element} the testimonials section
 */
function Testimonials() {
    return (
        <Root>
            <div className={classes.container}>
                <h2 className={classes.sectionTitle}>Trusted by Merchants Worldwide</h2>
                <p className={classes.sectionSub}>
                    See what our customers have to say about their success
                </p>
                <div className={classes.grid}>
                    {TESTIMONIALS.map((item) => (
                        <div key={item.id} className={classes.card}>
                            <div className={classes.stars}>
                                {[0, 1, 2, 3, 4].map((star) => (
                                    <StarIcon key={star} size={20} />
                                ))}
                            </div>
                            <p className={classes.quote}>{item.quote}</p>
                            <div className={classes.person}>
                                <img className={classes.avatar} src={item.avatar} alt={item.name} />
                                <div>
                                    <p className={classes.name}>{item.name}</p>
                                    <p className={classes.role}>{item.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Root>
    );
}

export default Testimonials;
