
import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Hero from './Hero';
import BrowseProducts from './BrowseProducts';
import GetStarted from './GetStarted';
import StartBuilding from './StartBuilding';
import Cta from './Cta';
import { DARK_1 } from './tokens';



const LIGHT = '[data-loop-theme="light"] &';

const HEADINGS = [
    `${LIGHT} .DevHero-title`,
    `${LIGHT} .DevBrowse-sectionTitle`,
    `${LIGHT} .DevBrowse-cardTitle`,
    `${LIGHT} .DevGetStarted-sectionTitle`,
    `${LIGHT} .DevGetStarted-stepTitle`,
    `${LIGHT} .DevGetStarted-stepTitleActive`,
    `${LIGHT} .DevStartBuilding-sectionTitle`,
    `${LIGHT} .DevStartBuilding-cardTitle`,
    `${LIGHT} .DevCta-ctaTitle`,
].join(', ');

const BODY = [
    `${LIGHT} .DevHero-desc`,
    `${LIGHT} .DevBrowse-sectionSub`,
    `${LIGHT} .DevBrowse-cardDesc`,
    `${LIGHT} .DevGetStarted-sectionSub`,
    `${LIGHT} .DevGetStarted-stepDesc`,
    `${LIGHT} .DevGetStarted-label`,
    `${LIGHT} .DevStartBuilding-sectionSub`,
    `${LIGHT} .DevStartBuilding-cardDesc`,
    `${LIGHT} .DevCta-ctaDesc`,
].join(', ');

const CARDS = [
    `${LIGHT} .DevBrowse-card`,
    `${LIGHT} .DevStartBuilding-card`,
].join(', ');

const Root = styled('div')(() => ({
    width: '100%',
    overflowX: 'hidden',
    fontFamily: "'Poppins', 'Helvetica Neue', Arial, sans-serif",
    backgroundColor: DARK_1,

    /* ---- LIGHT MODE (html[data-loop-theme="light"]) ---- */
    [LIGHT]: { backgroundColor: '#FFFFFF' },
    [`${LIGHT} section`]: { backgroundColor: '#FFFFFF' },
    [HEADINGS]: { color: '#292929' },
    [BODY]: { color: '#4A5565' },
    [CARDS]: { backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB' },
    [`${LIGHT} .DevHero-btnLight`]: { backgroundColor: '#141A21', color: '#FFFFFF' },
    [`${LIGHT} .DevCta-btnDark`]: {
        backgroundColor: '#F3F4F6', color: '#141A21', border: '1px solid #E5E7EB',
    },
    // [`${LIGHT} .DevBrowse-tab`]: { color: '#4A5565' },
}));

/**
 * Developers & Resources landing page (/developers).
 * @returns {JSX.Element} the rendered page
 */
function DevelopersLanding() {
    useEffect(() => {
        // Ensure Poppins + JetBrains Mono are available without editing cached CSS.
        const id = 'loop-developers-fonts';
        if (!document.getElementById(id)) {
            const link = document.createElement('link');
            link.id = id;
            link.rel = 'stylesheet';
            link.href = 'https://fonts.googleapis.com/css2'
                + '?family=JetBrains+Mono:wght@500;700;800'
                + '&family=Poppins:wght@400;500;600;700'
                + '&display=swap';
            document.head.appendChild(link);
        }
    }, []);

    return (
        <Root>
            <Hero />
            <BrowseProducts />
            <GetStarted />
            <StartBuilding />
            <Cta />
        </Root>
    );
}

export default DevelopersLanding;
