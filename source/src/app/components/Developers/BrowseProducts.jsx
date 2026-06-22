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
import {
    ZapIcon, GlobeIcon, ShieldIcon, GridIcon, TerminalIcon, LayersIcon, CodeIcon,
    CheckCircleIcon, BagIcon, TrendingIcon, WalletIcon,
} from './Icons';
import { ORANGE, DARK_1, DARK_2 } from './tokens';

const PREFIX = 'DevBrowse';

const classes = {
    container: `${PREFIX}-container`,
    sectionTitle: `${PREFIX}-sectionTitle`,
    sectionSub: `${PREFIX}-sectionSub`,
    tabs: `${PREFIX}-tabs`,
    tab: `${PREFIX}-tab`,
    tabActive: `${PREFIX}-tabActive`,
    cardGrid: `${PREFIX}-cardGrid`,
    card: `${PREFIX}-card`,
    cardIcon: `${PREFIX}-cardIcon`,
    cardTitle: `${PREFIX}-cardTitle`,
    cardDesc: `${PREFIX}-cardDesc`,
};

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
        margin: '0 auto 40px',
    },
    [`& .${classes.tabs}`]: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 12,
        marginBottom: 48,
    },
    [`& .${classes.tab}`]: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        cursor: 'pointer',
        backgroundColor: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        color: '#9CA3AF',
        fontFamily: 'inherit',
        fontWeight: 500,
        fontSize: 14,
        lineHeight: '20px',
        borderRadius: 10,
        padding: '10px 18px',
        whiteSpace: 'nowrap',
        transition: 'all 0.2s ease',
        '&:hover': { color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.2)' },
    },
    [`& .${classes.tabActive}`]: {
        backgroundColor: ORANGE,
        borderColor: ORANGE,
        color: '#FFFFFF',
        '&:hover': { color: '#FFFFFF', borderColor: ORANGE },
    },
    [`& .${classes.cardGrid}`]: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 24,
        [theme.breakpoints.down('md')]: {
            gridTemplateColumns: 'repeat(2, 1fr)',
        },
        [theme.breakpoints.down('sm')]: {
            gridTemplateColumns: '1fr',
        },
    },
    [`& .${classes.card}`]: {
        backgroundColor: DARK_1,
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 14,
        padding: 24,
        boxSizing: 'border-box',
        transition: 'border-color 0.2s ease, transform 0.2s ease',
        '&:hover': { borderColor: 'rgba(255,95,0,0.4)', transform: 'translateY(-2px)' },
    },
    [`& .${classes.cardIcon}`]: {
        width: 44,
        height: 44,
        borderRadius: 10,
        backgroundColor: 'rgba(255,95,0,0.1)',
        border: '1px solid rgba(255,95,0,0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    [`& .${classes.cardTitle}`]: {
        color: '#FFFFFF',
        fontWeight: 600,
        fontSize: 16,
        lineHeight: '22px',
        margin: '0 0 8px',
    },
    [`& .${classes.cardDesc}`]: {
        color: '#6B7280',
        fontWeight: 400,
        fontSize: 14,
        lineHeight: '21px',
        margin: 0,
    },
}));

const ICONS = {
    zap: ZapIcon,
    globe: GlobeIcon,
    shield: ShieldIcon,
    grid: GridIcon,
    terminal: TerminalIcon,
    layers: LayersIcon,
    code: CodeIcon,
    check: CheckCircleIcon,
    bag: BagIcon,
    trending: TrendingIcon,
    wallet: WalletIcon,
};

const TABS = [
    { id: 'payments', label: 'Payments', icon: 'zap' },
    { id: 'ecommerce', label: 'E-Commerce', icon: 'bag' },
    { id: 'credit', label: 'Credit & Investment', icon: 'trending' },
    { id: 'wallets', label: 'Wallets', icon: 'wallet' },
];

const CARDS = {
    payments: [
        { id: 'send', icon: 'zap', title: 'Send Money API', desc: 'Process online payments & transfers with lightning speed' },
        { id: 'gateway', icon: 'globe', title: 'Payment Gateway', desc: 'Accept payments from multiple channels securely' },
        { id: 'fraud', icon: 'shield', title: 'Fraud Detection', desc: 'Advanced fraud and risk management systems' },
        { id: 'accounts', icon: 'grid', title: 'Financial Accounts', desc: "Connect users' financial accounts seamlessly" },
        { id: 'inperson', icon: 'terminal', title: 'In-Person Payments', desc: 'Omnichannel payment solutions for retail' },
        { id: 'crypto', icon: 'layers', title: 'Crypto Payments', desc: 'Accept, on-ramp, or pay out in cryptocurrency' },
        { id: 'platform', icon: 'code', title: 'Platform Payments', desc: 'Payment infrastructure for platforms and marketplaces' },
        { id: 'identity', icon: 'check', title: 'Identity Verification', desc: 'Online KYC and identity verification APIs' },
    ],
    ecommerce: [
        { id: 'checkout', icon: 'bag', title: 'Hosted Checkout', desc: 'Drop-in checkout that converts across every device' },
        { id: 'catalog', icon: 'grid', title: 'Catalog & Inventory', desc: 'Manage products, variants, and stock in real time' },
        { id: 'subs', icon: 'layers', title: 'Subscriptions', desc: 'Recurring billing with flexible plans and trials' },
        { id: 'orders', icon: 'globe', title: 'Order Management', desc: 'Track orders and fulfilment across channels' },
    ],
    credit: [
        { id: 'lending', icon: 'trending', title: 'Lending API', desc: 'Originate and service loans programmatically' },
        { id: 'scoring', icon: 'shield', title: 'Credit Scoring', desc: 'Real-time risk and affordability assessments' },
        { id: 'invest', icon: 'layers', title: 'Investments', desc: 'Offer savings and investment products in-app' },
        { id: 'statements', icon: 'code', title: 'Statements API', desc: 'Generate statements and repayment schedules' },
    ],
    wallets: [
        { id: 'wallet', icon: 'wallet', title: 'Digital Wallets', desc: 'Issue and manage multi-currency wallets' },
        { id: 'topup', icon: 'zap', title: 'Top-up & Transfers', desc: 'Instant wallet funding and peer transfers' },
        { id: 'cards', icon: 'grid', title: 'Card Issuing', desc: 'Spin up virtual and physical cards on demand' },
        { id: 'fx', icon: 'globe', title: 'FX & Conversion', desc: 'Convert between currencies at live rates' },
    ],
};

/**
 * "Browse by Products" section with product tabs and an API-card grid.
 * @returns {JSX.Element} the section
 */
function BrowseProducts() {
    const [active, setActive] = useState('payments');
    const cards = CARDS[active];

    return (
        <Root>
            <div className={classes.container}>
                <h2 className={classes.sectionTitle}>Browse by Products</h2>
                <p className={classes.sectionSub}>Explore our comprehensive API suite</p>

                <div className={classes.tabs}>
                    {TABS.map((tab) => {
                        const TabIcon = ICONS[tab.icon];
                        const isActive = active === tab.id;
                        return (
                            <button
                                key={tab.id}
                                type='button'
                                className={`${classes.tab} ${isActive ? classes.tabActive : ''}`}
                                onClick={() => setActive(tab.id)}
                            >
                                <TabIcon color={isActive ? '#FFFFFF' : '#9CA3AF'} size={16} />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                <div className={classes.cardGrid}>
                    {cards.map((card) => {
                        const CardIcon = ICONS[card.icon];
                        return (
                            <div key={card.id} className={classes.card}>
                                <div className={classes.cardIcon}>
                                    <CardIcon color={ORANGE} size={22} />
                                </div>
                                <h3 className={classes.cardTitle}>{card.title}</h3>
                                <p className={classes.cardDesc}>{card.desc}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Root>
    );
}

export default BrowseProducts;
