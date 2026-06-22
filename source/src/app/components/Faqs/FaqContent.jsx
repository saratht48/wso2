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
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import {
    QuestionIcon, CardIcon, BagIcon, GridIcon, TagIcon, ShieldIcon, DollarIcon, WalletIcon,
    PlusIcon, CloseIcon, ArrowRightIcon,
} from './Icons';
import FAQ_CATEGORIES from './faqData';
import { ORANGE } from './tokens';

const PREFIX = 'FaqContent';

const classes = {
    container: `${PREFIX}-container`,
    grid: `${PREFIX}-grid`,
    leftCol: `${PREFIX}-leftCol`,
    rightCol: `${PREFIX}-rightCol`,
    center: `${PREFIX}-center`,
    eyebrow: `${PREFIX}-eyebrow`,
    catList: `${PREFIX}-catList`,
    catBtn: `${PREFIX}-catBtn`,
    catBtnActive: `${PREFIX}-catBtnActive`,
    catLabel: `${PREFIX}-catLabel`,
    card: `${PREFIX}-card`,
    overviewRow: `${PREFIX}-overviewRow`,
    overviewLabel: `${PREFIX}-overviewLabel`,
    overviewNum: `${PREFIX}-overviewNum`,
    helpCard: `${PREFIX}-helpCard`,
    helpTitle: `${PREFIX}-helpTitle`,
    helpText: `${PREFIX}-helpText`,
    helpLink: `${PREFIX}-helpLink`,
    group: `${PREFIX}-group`,
    groupHeader: `${PREFIX}-groupHeader`,
    groupIcon: `${PREFIX}-groupIcon`,
    groupTitle: `${PREFIX}-groupTitle`,
    groupCount: `${PREFIX}-groupCount`,
    qList: `${PREFIX}-qList`,
    qCard: `${PREFIX}-qCard`,
    qCardOpen: `${PREFIX}-qCardOpen`,
    qHeader: `${PREFIX}-qHeader`,
    qText: `${PREFIX}-qText`,
    qTextOpen: `${PREFIX}-qTextOpen`,
    qToggle: `${PREFIX}-qToggle`,
    qToggleOpen: `${PREFIX}-qToggleOpen`,
    qAnswer: `${PREFIX}-qAnswer`,
    anchorLink: `${PREFIX}-anchorLink`,
    anchorLinkActive: `${PREFIX}-anchorLinkActive`,
    anchorDot: `${PREFIX}-anchorDot`,
    quickLink: `${PREFIX}-quickLink`,
    empty: `${PREFIX}-empty`,
};

const ICONS = {
    question: QuestionIcon,
    card: CardIcon,
    bag: BagIcon,
    grid: GridIcon,
    tag: TagIcon,
    shield: ShieldIcon,
    dollar: DollarIcon,
    wallet: WalletIcon,
};

const TOTAL_QUESTIONS = FAQ_CATEGORIES.reduce((sum, c) => sum + c.questions.length, 0);
const PRODUCTS_COVERED = FAQ_CATEGORIES.filter((c) => c.id !== 'general').length;

const Root = styled('section')(({ theme }) => ({
    width: '100%',
    boxSizing: 'border-box',
    backgroundColor: 'var(--loop-section-bg)',
    padding: '64px 40px 96px',
    [theme.breakpoints.down('md')]: {
        padding: '48px 24px 72px',
    },
    [theme.breakpoints.down('sm')]: {
        padding: '40px 20px 64px',
    },
    [`& .${classes.container}`]: {
        maxWidth: 1320,
        margin: '0 auto',
        width: '100%',
    },
    [`& .${classes.grid}`]: {
        display: 'grid',
        gridTemplateColumns: '260px minmax(0, 1fr) 220px',
        gap: 40,
        alignItems: 'start',
        [theme.breakpoints.down('lg')]: {
            gridTemplateColumns: '240px minmax(0, 1fr)',
        },
        [theme.breakpoints.down('md')]: {
            gridTemplateColumns: '1fr',
            gap: 32,
        },
    },
    [`& .${classes.leftCol}`]: {
        position: 'sticky',
        top: 24,
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        [theme.breakpoints.down('md')]: {
            position: 'static',
            display: 'none',
        },
    },
    [`& .${classes.rightCol}`]: {
        position: 'sticky',
        top: 24,
        display: 'flex',
        flexDirection: 'column',
        gap: 28,
        [theme.breakpoints.down('lg')]: {
            display: 'none',
        },
    },
    [`& .${classes.center}`]: {
        minWidth: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 56,
    },
    [`& .${classes.eyebrow}`]: {
        fontFamily: "'JetBrains Mono', 'Courier New', monospace",
        color: 'var(--loop-eyebrow)',
        fontSize: 12,
        fontWeight: 500,
        letterSpacing: 1.5,
        textTransform: 'uppercase',
        margin: '0 0 16px',
    },
    [`& .${classes.catList}`]: {
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
    },
    [`& .${classes.catBtn}`]: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        width: '100%',
        cursor: 'pointer',
        background: 'none',
        border: '1px solid transparent',
        borderRadius: 10,
        padding: '11px 14px',
        color: 'var(--loop-text-leftrail)',
        fontFamily: 'inherit',
        fontSize: 15,
        fontWeight: 500,
        textAlign: 'left',
        transition: 'all 0.15s ease',
        '&:hover': { backgroundColor: 'var(--loop-toggle-bg)', color: 'var(--loop-text-primary)' },
    },
    [`& .${classes.catBtnActive}`]: {
        backgroundColor: 'var(--loop-active-bg)',
        border: '1px solid rgba(255,95,0,0.35)',
        color: ORANGE,
        '&:hover': { backgroundColor: 'var(--loop-active-bg)', color: ORANGE },
    },
    [`& .${classes.catLabel}`]: {
        flex: 1,
        minWidth: 0,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    [`& .${classes.card}`]: {
        backgroundColor: 'var(--loop-surface-2)',
        border: '1px solid var(--loop-border)',
        borderRadius: 14,
        padding: 20,
    },
    [`& .${classes.overviewRow}`]: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '6px 0',
    },
    [`& .${classes.overviewLabel}`]: {
        color: 'var(--loop-text-secondary)',
        fontSize: 14,
    },
    [`& .${classes.overviewNum}`]: {
        fontFamily: "'JetBrains Mono', 'Courier New', monospace",
        color: ORANGE,
        fontSize: 15,
        fontWeight: 700,
    },
    [`& .${classes.helpCard}`]: {
        backgroundColor: 'var(--loop-help-bg)',
        border: '1px solid var(--loop-help-border)',
        borderRadius: 14,
        padding: 20,
    },
    [`& .${classes.helpTitle}`]: {
        color: 'var(--loop-text-primary)',
        fontSize: 16,
        fontWeight: 700,
        margin: '0 0 8px',
    },
    [`& .${classes.helpText}`]: {
        color: 'var(--loop-text-secondary)',
        fontSize: 14,
        lineHeight: '21px',
        margin: '0 0 14px',
    },
    [`& .${classes.helpLink}`]: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        color: ORANGE,
        fontSize: 14,
        fontWeight: 600,
        textDecoration: 'none',
        cursor: 'pointer',
        '&:hover': { textDecoration: 'underline' },
    },
    [`& .${classes.group}`]: {
        scrollMarginTop: 24,
    },
    [`& .${classes.groupHeader}`]: {
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        marginBottom: 20,
    },
    [`& .${classes.groupIcon}`]: {
        width: 40,
        height: 40,
        borderRadius: 10,
        backgroundColor: 'rgba(255,95,0,0.1)',
        border: '1px solid rgba(255,95,0,0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },
    [`& .${classes.groupTitle}`]: {
        flex: 1,
        minWidth: 0,
        color: 'var(--loop-text-primary)',
        fontSize: 24,
        fontWeight: 700,
        margin: 0,
        [theme.breakpoints.down('sm')]: { fontSize: 20 },
    },
    [`& .${classes.groupCount}`]: {
        flexShrink: 0,
        color: 'var(--loop-text-muted)',
        fontSize: 12,
        border: '1px solid var(--loop-border)',
        borderRadius: 999,
        padding: '4px 12px',
        whiteSpace: 'nowrap',
    },
    [`& .${classes.qList}`]: {
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
    },
    [`& .${classes.qCard}`]: {
        backgroundColor: 'var(--loop-surface)',
        border: '1px solid var(--loop-border)',
        borderRadius: 14,
        overflow: 'hidden',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    },
    [`& .${classes.qCardOpen}`]: {
        borderColor: ORANGE,
        boxShadow: '0 0 0 1px rgba(255,95,0,0.6), 0 16px 40px rgba(255,95,0,0.22)',
    },
    [`& .${classes.qHeader}`]: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        width: '100%',
        cursor: 'pointer',
        background: 'none',
        border: 'none',
        textAlign: 'left',
        padding: '20px 24px',
        fontFamily: 'inherit',
    },
    [`& .${classes.qText}`]: {
        color: 'var(--loop-text-question)',
        fontSize: 16,
        fontWeight: 500,
        lineHeight: '24px',
    },
    [`& .${classes.qTextOpen}`]: {
        color: ORANGE,
        fontWeight: 700,
    },
    [`& .${classes.qToggle}`]: {
        flexShrink: 0,
        width: 30,
        height: 30,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--loop-toggle-bg)',
        color: 'var(--loop-text-secondary)',
        transition: 'all 0.2s ease',
    },
    [`& .${classes.qToggleOpen}`]: {
        backgroundColor: ORANGE,
        color: '#FFFFFF',
    },
    [`& .${classes.qAnswer}`]: {
        color: 'var(--loop-text-secondary)',
        fontSize: 15,
        lineHeight: '25px',
        padding: '0 24px 24px',
        margin: 0,
        borderTop: '1px solid var(--loop-border)',
        paddingTop: 18,
    },
    [`& .${classes.anchorLink}`]: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        width: '100%',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '6px 0',
        color: 'var(--loop-text-rightrail)',
        fontFamily: 'inherit',
        fontSize: 14,
        textAlign: 'left',
        transition: 'color 0.15s ease',
        '&:hover': { color: 'var(--loop-text-primary)' },
    },
    [`& .${classes.anchorLinkActive}`]: {
        color: ORANGE,
        '&:hover': { color: ORANGE },
    },
    [`& .${classes.anchorDot}`]: {
        width: 6,
        height: 6,
        borderRadius: '50%',
        backgroundColor: ORANGE,
        flexShrink: 0,
    },
    [`& .${classes.quickLink}`]: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        color: 'var(--loop-text-secondary)',
        fontSize: 14,
        textDecoration: 'none',
        cursor: 'pointer',
        padding: '6px 0',
        '&:hover': { color: ORANGE },
    },
    [`& .${classes.empty}`]: {
        color: 'var(--loop-text-muted)',
        fontSize: 16,
        textAlign: 'center',
        padding: '40px 0',
    },
}));

/**
 * A single expandable question/answer accordion card.
 * @param {object} props component props
 * @returns {JSX.Element} the card
 */
function QuestionCard({
    question, answer, isOpen, onToggle,
}) {
    return (
        <div className={`${classes.qCard} ${isOpen ? classes.qCardOpen : ''}`}>
            <button type='button' className={classes.qHeader} onClick={onToggle} aria-expanded={isOpen}>
                <span className={`${classes.qText} ${isOpen ? classes.qTextOpen : ''}`}>{question}</span>
                <span className={`${classes.qToggle} ${isOpen ? classes.qToggleOpen : ''}`}>
                    {isOpen ? <CloseIcon color='#FFFFFF' size={16} /> : <PlusIcon color='#9CA3AF' size={16} />}
                </span>
            </button>
            {isOpen && <p className={classes.qAnswer}>{answer}</p>}
        </div>
    );
}

QuestionCard.propTypes = {
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired,
};

/**
 * Filter the FAQ categories by a free-text query across questions and answers.
 * @param {string} query the search text
 * @returns {Array} categories with matching questions only
 */
function filterCategories(query) {
    const q = query.trim().toLowerCase();
    if (!q) {
        return FAQ_CATEGORIES;
    }
    return FAQ_CATEGORIES
        .map((cat) => ({
            ...cat,
            questions: cat.questions.filter(
                (item) => item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q),
            ),
        }))
        .filter((cat) => cat.questions.length > 0);
}

/**
 * The three-column FAQ body: categories rail, accordion groups, and page nav.
 * @param {object} props component props
 * @returns {JSX.Element} the section
 */
function FaqContent({ query }) {
    const [activeCat, setActiveCat] = useState('general');
    const [openKey, setOpenKey] = useState('general::What is LOOPDFS Developer Portal?');

    const categories = filterCategories(query);

    const goToCategory = (id) => {
        setActiveCat(id);
        const el = document.getElementById(`faq-group-${id}`);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <Root>
            <div className={classes.container}>
                <div className={classes.grid}>
                    {/* Left: categories + overview + contact */}
                    <aside className={classes.leftCol}>
                        <div>
                            <p className={classes.eyebrow}>Categories</p>
                            <div className={classes.catList}>
                                {FAQ_CATEGORIES.map((cat) => {
                                    const CatIcon = ICONS[cat.icon];
                                    const isActive = activeCat === cat.id;
                                    return (
                                        <button
                                            key={cat.id}
                                            type='button'
                                            className={`${classes.catBtn} ${isActive ? classes.catBtnActive : ''}`}
                                            onClick={() => goToCategory(cat.id)}
                                        >
                                            <CatIcon color={isActive ? ORANGE : '#9CA3AF'} size={18} />
                                            <span className={classes.catLabel}>{cat.label}</span>
                                            {isActive && <ArrowRightIcon color={ORANGE} size={16} />}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className={classes.card}>
                            <p className={classes.eyebrow}>Overview</p>
                            <div className={classes.overviewRow}>
                                <span className={classes.overviewLabel}>Total questions</span>
                                <span className={classes.overviewNum}>{TOTAL_QUESTIONS}</span>
                            </div>
                            <div className={classes.overviewRow}>
                                <span className={classes.overviewLabel}>Products covered</span>
                                <span className={classes.overviewNum}>{PRODUCTS_COVERED}</span>
                            </div>
                        </div>

                        <div className={classes.helpCard}>
                            <p className={classes.helpTitle}>Still have questions?</p>
                            <p className={classes.helpText}>Our team responds within 2 business hours.</p>
                            <a className={classes.helpLink} href='#contact'>
                                Contact support
                                <ArrowRightIcon color={ORANGE} size={14} />
                            </a>
                        </div>
                    </aside>

                    {/* Center: accordion groups */}
                    <div className={classes.center}>
                        {categories.length === 0 && (
                            <p className={classes.empty}>{`No questions match “${query}”.`}</p>
                        )}
                        {categories.map((cat) => {
                            const GroupIcon = ICONS[cat.icon];
                            return (
                                <div key={cat.id} id={`faq-group-${cat.id}`} className={classes.group}>
                                    <div className={classes.groupHeader}>
                                        <span className={classes.groupIcon}>
                                            <GroupIcon color={ORANGE} size={20} />
                                        </span>
                                        <h2 className={classes.groupTitle}>{cat.label}</h2>
                                        <span className={classes.groupCount}>
                                            {`${cat.questions.length} questions`}
                                        </span>
                                    </div>
                                    <div className={classes.qList}>
                                        {cat.questions.map((item) => {
                                            const key = `${cat.id}::${item.q}`;
                                            return (
                                                <QuestionCard
                                                    key={key}
                                                    question={item.q}
                                                    answer={item.a}
                                                    isOpen={openKey === key}
                                                    onToggle={() => setOpenKey(openKey === key ? '' : key)}
                                                />
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Right: on-this-page nav + quick actions */}
                    <aside className={classes.rightCol}>
                        <div>
                            <p className={classes.eyebrow}>On this page</p>
                            {FAQ_CATEGORIES.map((cat) => {
                                const isActive = activeCat === cat.id;
                                return (
                                    <button
                                        key={cat.id}
                                        type='button'
                                        className={`${classes.anchorLink} ${isActive ? classes.anchorLinkActive : ''}`}
                                        onClick={() => goToCategory(cat.id)}
                                    >
                                        {isActive && <span className={classes.anchorDot} />}
                                        {cat.label}
                                    </button>
                                );
                            })}
                        </div>
                        <div>
                            <p className={classes.eyebrow}>Quick Actions</p>
                            <a className={classes.quickLink} href='#docs'>
                                <ArrowRightIcon color='#9CA3AF' size={14} />
                                View Docs
                            </a>
                            <a className={classes.quickLink} href='#api-reference'>
                                <ArrowRightIcon color='#9CA3AF' size={14} />
                                API Reference
                            </a>
                        </div>
                    </aside>
                </div>
            </div>
        </Root>
    );
}

FaqContent.propTypes = {
    query: PropTypes.string.isRequired,
};

export default FaqContent;
