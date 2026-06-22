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
import Testimonials from './Testimonials';
import Cta from './Cta';
import { DARK_1 } from './tokens';

/*
 * LOOP Matrix - E-commerce product landing (/products/ecommerce).
 * Built from Figma node 3162-6775. This is a thin orchestrator: each page
 * section lives in its own component (Hero, Features, Testimonials, Cta) and
 * owns its own styles. Shared colours live in ./tokens and shared icons in
 * ./Icons. The global header (GlobalNavBar) and footer (LoopFooter) are
 * provided by Base/index.jsx, so this page renders content only — same as the
 * Payments landing.
 */

const Root = styled('div')(() => ({
    width: '100%',
    overflowX: 'hidden',
    fontFamily: "'Poppins', 'Helvetica Neue', Arial, sans-serif",
    backgroundColor: DARK_1,
}));

/**
 * E-commerce product landing page (/products/ecommerce).
 * @returns {JSX.Element} the rendered page
 */
function EcommerceLanding() {
    useEffect(() => {
        // Ensure Poppins + JetBrains Mono are available without editing cached CSS.
        const id = 'loop-ecommerce-fonts';
        if (!document.getElementById(id)) {
            const link = document.createElement('link');
            link.id = id;
            link.rel = 'stylesheet';
            link.href = 'https://fonts.googleapis.com/css2'
                + '?family=JetBrains+Mono:wght@500;700;800'
                + '&family=Poppins:ital,wght@0,400;0,500;0,600;0,700;1,400'
                + '&display=swap';
            document.head.appendChild(link);
        }
    }, []);

    return (
        <Root>
            <Hero />
            <Features />
            <Testimonials />
            <Cta />
        </Root>
    );
}

export default EcommerceLanding;
