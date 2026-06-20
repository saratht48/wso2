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

import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Hero from './Hero';
import Features from './Features';
import Stats from './Stats';
import Cta from './Cta';
import { DARK_2 } from './tokens';

/*
 * LOOP Matrix - Payments product landing (/products/payments).
 * Built from Figma node 3127-4675. This is a thin orchestrator: each page
 * section lives in its own component (Hero, Features, Stats, Cta) and owns its
 * own styles. Shared colours live in ./tokens and shared icons in ./Icons.
 */

const Root = styled('div')(() => ({
    width: '100%',
    overflowX: 'hidden',
    fontFamily: "'Poppins', 'Helvetica Neue', Arial, sans-serif",
    backgroundColor: DARK_2,
}));

/**
 * Payments product landing page (/products/payments).
 * @returns {JSX.Element} the rendered page
 */
function PaymentsLanding() {
    useEffect(() => {
        // Ensure Poppins + JetBrains Mono are available without editing cached CSS.
        const id = 'loop-payments-fonts';
        if (!document.getElementById(id)) {
            const link = document.createElement('link');
            link.id = id;
            link.rel = 'stylesheet';
            link.href = 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@700'
                + '&family=Poppins:wght@400;500;600;700&display=swap';
            document.head.appendChild(link);
        }
    }, []);

    return (
        <Root>
            <Hero />
            <Features />
            <Stats />
            <Cta />
        </Root>
    );
}

export default PaymentsLanding;
