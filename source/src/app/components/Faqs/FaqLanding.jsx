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

import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Hero from './Hero';
import FaqContent from './FaqContent';
import { DARK_2 } from './tokens';

/*
 * LOOP Matrix - FAQ / Help Center (/faqs). Built from the Figma Help Center
 * frame. Thin orchestrator: the Hero owns the badge/title/search and the
 * FaqContent owns the 3-column body (categories rail, accordion groups, page
 * nav). Search query is lifted here so typing in the hero filters the body.
 * The global header (GlobalNavBar) and footer (LoopFooter) come from
 * Base/index.jsx, so this renders content only.
 */

const Root = styled('div')(() => ({
    width: '100%',
    overflowX: 'hidden',
    fontFamily: "'Poppins', 'Helvetica Neue', Arial, sans-serif",
    backgroundColor: DARK_2,
}));

/**
 * FAQ / Help Center page (/faqs).
 * @returns {JSX.Element} the rendered page
 */
function FaqLanding() {
    const [query, setQuery] = useState('');

    useEffect(() => {
        // Ensure Poppins + JetBrains Mono are available without editing cached CSS.
        const id = 'loop-faqs-fonts';
        if (!document.getElementById(id)) {
            const link = document.createElement('link');
            link.id = id;
            link.rel = 'stylesheet';
            link.href = 'https://fonts.googleapis.com/css2'
                + '?family=JetBrains+Mono:wght@500;700'
                + '&family=Poppins:wght@400;500;600;700'
                + '&display=swap';
            document.head.appendChild(link);
        }
    }, []);

    return (
        <Root>
            <Hero query={query} onQueryChange={setQuery} />
            <FaqContent query={query} />
        </Root>
    );
}

export default FaqLanding;
