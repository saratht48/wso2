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
import { app } from 'Settings';
import {
    ZapIcon, GlobeIcon, ShieldIcon, GridIcon, TerminalIcon, LayersIcon, CodeIcon,
    CheckCircleIcon, BagIcon, TrendingIcon, WalletIcon,
} from './Icons';
import { ORANGE, DARK_1, DARK_2 } from './tokens';
import { Box } from '@mui/material';

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
        // transition: 'all 0.2s ease',
        // '&:hover': { color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.2)' },
    },
    [`& .${classes.tabActive}`]: {
        backgroundColor: ORANGE,
        borderColor: ORANGE,
        color: '#FFFFFF',

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
        // '&:hover': { borderColor: 'rgba(255,95,0,0.4)', transform: 'translateY(-2px)' },
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
const TabPayment = `${app.context}/site/public/images/developerResource/sendmoney.png`;
const Tabcommerce = `${app.context}/site/public/images/developerResource/tab-ecommerce.png`;
const Tabcredit = `${app.context}/site/public/images/developerResource/tab-credit.png`;
const Tabwallet = `${app.context}/site/public/images/developerResource/tab-wallet.png`;


const TABS = [
    { id: 'payments', label: 'Payments', icon: TabPayment },
    { id: 'ecommerce', label: 'E-Commerce', icon: Tabcommerce},
    { id: 'credit', label: 'Credit & Investment', icon: Tabcredit },
    { id: 'wallets', label: 'Wallets', icon: Tabwallet },
];

const PaymentGateway = `${app.context}/site/public/images/developerResource/payment.png`;
const FraudDetection = `${app.context}/site/public/images/developerResource/fraud.png`;
const Financial = `${app.context}/site/public/images/developerResource/finance.png`;
const InPerson = `${app.context}/site/public/images/developerResource/Inperson.png`;
const Crypto = `${app.context}/site/public/images/developerResource/crypto.png`;
const PlatformPayments = `${app.context}/site/public/images/developerResource/paltform_pay.png`;
const Identity = `${app.context}/site/public/images/developerResource/identify.png`;

const CARDS = {
    payments: [
        { id: 'send', icon: TabPayment, title: 'Send Money API', desc: 'Process online payments & transfers with lightning speed' },
        { id: 'gateway', icon: PaymentGateway, title: 'Payment Gateway', desc: 'Accept payments from multiple channels securely' },
        { id: 'fraud', icon: FraudDetection, title: 'Fraud Detection', desc: 'Advanced fraud and risk management systems' },
        { id: 'accounts', icon: Financial, title: 'Financial Accounts', desc: "Connect users' financial accounts seamlessly" },
        { id: 'inperson', icon: InPerson, title: 'In-Person Payments', desc: 'Omnichannel payment solutions for retail' },
        { id: 'crypto', icon: Crypto, title: 'Crypto Payments', desc: 'Accept, on-ramp, or pay out in cryptocurrency' },
        { id: 'platform', icon: PlatformPayments, title: 'Platform Payments', desc: 'Payment infrastructure for platforms and marketplaces' },
        { id: 'identity', icon: Identity, title: 'Identity Verification', desc: 'Online KYC and identity verification APIs' },
    ],
    ecommerce: [
        { id: 'send', icon: TabPayment, title: 'Send Money API', desc: 'Process online payments & transfers with lightning speed' },
        { id: 'gateway', icon: PaymentGateway, title: 'Payment Gateway', desc: 'Accept payments from multiple channels securely' },
        { id: 'fraud', icon: FraudDetection, title: 'Fraud Detection', desc: 'Advanced fraud and risk management systems' },
        { id: 'accounts', icon: Financial, title: 'Financial Accounts', desc: "Connect users' financial accounts seamlessly" },
        { id: 'inperson', icon: InPerson, title: 'In-Person Payments', desc: 'Omnichannel payment solutions for retail' },
        { id: 'crypto', icon: Crypto, title: 'Crypto Payments', desc: 'Accept, on-ramp, or pay out in cryptocurrency' },
        { id: 'platform', icon: PlatformPayments, title: 'Platform Payments', desc: 'Payment infrastructure for platforms and marketplaces' },
        { id: 'identity', icon: Identity, title: 'Identity Verification', desc: 'Online KYC and identity verification APIs' },
    ],
    credit: [
        { id: 'send', icon: TabPayment, title: 'Send Money API', desc: 'Process online payments & transfers with lightning speed' },
        { id: 'gateway', icon: PaymentGateway, title: 'Payment Gateway', desc: 'Accept payments from multiple channels securely' },
        { id: 'fraud', icon: FraudDetection, title: 'Fraud Detection', desc: 'Advanced fraud and risk management systems' },
        { id: 'accounts', icon: Financial, title: 'Financial Accounts', desc: "Connect users' financial accounts seamlessly" },
        { id: 'inperson', icon: InPerson, title: 'In-Person Payments', desc: 'Omnichannel payment solutions for retail' },
        { id: 'crypto', icon: Crypto, title: 'Crypto Payments', desc: 'Accept, on-ramp, or pay out in cryptocurrency' },
        { id: 'platform', icon: PlatformPayments, title: 'Platform Payments', desc: 'Payment infrastructure for platforms and marketplaces' },
        { id: 'identity', icon: Identity, title: 'Identity Verification', desc: 'Online KYC and identity verification APIs' },
    ],
    wallets: [
        { id: 'send', icon: TabPayment, title: 'Send Money API', desc: 'Process online payments & transfers with lightning speed' },
        { id: 'gateway', icon: PaymentGateway, title: 'Payment Gateway', desc: 'Accept payments from multiple channels securely' },
        { id: 'fraud', icon: FraudDetection, title: 'Fraud Detection', desc: 'Advanced fraud and risk management systems' },
        { id: 'accounts', icon: Financial, title: 'Financial Accounts', desc: "Connect users' financial accounts seamlessly" },
        { id: 'inperson', icon: InPerson, title: 'In-Person Payments', desc: 'Omnichannel payment solutions for retail' },
        { id: 'crypto', icon: Crypto, title: 'Crypto Payments', desc: 'Accept, on-ramp, or pay out in cryptocurrency' },
        { id: 'platform', icon: PlatformPayments, title: 'Platform Payments', desc: 'Payment infrastructure for platforms and marketplaces' },
        { id: 'identity', icon: Identity, title: 'Identity Verification', desc: 'Online KYC and identity verification APIs' },
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
                                {/* <TabIcon color={isActive ? '#FFFFFF' : '#9CA3AF'} size={16} /> */}
                                
                                    {/* <img src={tab.icon} alt={tab.label} style={{width:'16px', height:'16px'}}/> */}
                               <img
    src={tab.icon}
    alt={tab.label}
    style={{
        width: '16px',
        height: '16px',
        transition: '0.3s',
        filter: isActive
            ? 'brightness(0) invert(1)' // white
            : 'brightness(0) saturate(100%) invert(24%) sepia(11%) saturate(646%) hue-rotate(178deg) brightness(93%) contrast(89%)', // #364153
    }}
/>
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
                                    {/* <CardIcon color={ORANGE} size={22} /> */}
                                    <img src={card.icon} alt={card.title} style={{width:'24px', height:'24px'}} />
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
