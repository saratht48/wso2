
import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Hero from './Hero';
import BrowseProducts from './BrowseProducts';
import GetStarted from './GetStarted';
import StartBuilding from './StartBuilding';
import Cta from './Cta';
import { DARK_1 } from './tokens';



const Root = styled('div')(() => ({
    width: '100%',
    overflowX: 'hidden',
    fontFamily: "'Poppins', 'Helvetica Neue', Arial, sans-serif",
    backgroundColor: DARK_1,
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
