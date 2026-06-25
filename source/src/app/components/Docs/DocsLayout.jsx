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

import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import LeftNav from './LeftNav';
import RightRail from './RightRail';

/*
 * Shared 3-column docs layout. The left navigation rail is FIXED (does not
 * scroll with the page); the content + "on this page" rail scroll normally.
 * Pass the active left-nav item and the right-rail table of contents.
 * Dark mode only. Global header/footer come from Base/index.jsx.
 */

const PREFIX = 'DocsLayout';

const SIDEBAR = 264;
const SIDEBAR_LG = 248;

const classes = {
    leftFixed: `${PREFIX}-leftFixed`,
    grid: `${PREFIX}-grid`,
    contentCol: `${PREFIX}-contentCol`,
    rightCol: `${PREFIX}-rightCol`,
};

const Root = styled('div')(({ theme }) => ({
    width: '100%',
    boxSizing: 'border-box',
    backgroundColor: 'var(--loop-section-bg)',
    fontFamily: "'Poppins', 'Helvetica Neue', Arial, sans-serif",
    padding: '0 24px 32px 0',
    display: 'flex',
    alignItems: 'flex-start',
    gap: 24,
    [theme.breakpoints.down('md')]: {
        display: 'block',
        padding: '24px 20px 32px',
    },
    [theme.breakpoints.down('sm')]: {
        padding: '12px 16px 28px',
    },
    [`& .${classes.leftFixed}`]: {
        width: SIDEBAR,
        flexShrink: 0,
        boxSizing: 'border-box',
        alignSelf: 'flex-start',
        backgroundColor: 'var(--loop-surface)',
        borderRight: '1px solid var(--loop-border)',
        padding: '18px 18px 18px 16px',
        [theme.breakpoints.down('lg')]: {
            width: SIDEBAR_LG,
        },
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    },
    [`& .${classes.grid}`]: {
        flex: 1,
        minWidth: 0,
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) 200px',
        gap: 0,
        alignItems: 'start',
        // 50px top spacing for the middle + right columns only (left nav excluded)
        paddingTop: 50,
        [theme.breakpoints.down('lg')]: {
            gridTemplateColumns: 'minmax(0, 1fr)',
        },
        [theme.breakpoints.down('md')]: {
            gridTemplateColumns: 'minmax(0, 1fr)',
            paddingTop: 24,
        },
    },
    [`& .${classes.contentCol}`]: {
        minWidth: 0,
        boxSizing: 'border-box',
        // middle section spacing: 40px left, 28px right (right rail starts right after)
        paddingLeft: 40,
        paddingRight: 28,
        [theme.breakpoints.down('md')]: {
            paddingLeft: 0,
            paddingRight: 0,
        },
    },
    [`& .${classes.rightCol}`]: {
        // The grid track stays 200px wide; the inner rail is fixed-on-scroll via JS
        // (CSS sticky can't be used here — the page's scroll container has
        // overflow:auto but does not itself scroll, so sticky never engages).
        alignSelf: 'start',
        [theme.breakpoints.down('lg')]: {
            display: 'none',
        },
    },
}));

// Header height (100px fixed) + 50px gap = where the right rail pins on scroll.
const RAIL_TOP = 150;

/**
 * Three-column documentation layout shell (fixed left rail).
 * @param {object} props component props
 * @returns {JSX.Element} the layout
 */
function DocsLayout({ activeNav, tocSections, children }) {
    const cellRef = useRef(null);
    const innerRef = useRef(null);

    useEffect(() => {
        const id = 'loop-docs-fonts';
        if (!document.getElementById(id)) {
            const link = document.createElement('link');
            link.id = id;
            link.rel = 'stylesheet';
            link.href = 'https://fonts.googleapis.com/css2'
                + '?family=JetBrains+Mono:wght@500;600;700'
                + '&family=Outfit:wght@400;500;600'
                + '&family=Poppins:wght@400;500;600;700'
                + '&display=swap';
            document.head.appendChild(link);
        }
    }, []);

    // Pin the right rail on scroll. CSS `position: sticky` is unusable here
    // because the page's scroll container (.contentWrapper) has overflow:auto
    // but never scrolls itself (the window does), so sticky never engages.
    // We emulate it: when the rail's grid cell scrolls above RAIL_TOP, the
    // inner block is fixed at RAIL_TOP and clamped above the content's bottom.
    useEffect(() => {
        const cell = cellRef.current;
        const inner = innerRef.current;
        if (!cell || !inner) return undefined;

        const reset = () => {
            inner.style.position = '';
            inner.style.top = '';
            inner.style.left = '';
            inner.style.width = '';
        };

        const update = () => {
            // Disabled below the lg breakpoint (the cell is display:none there).
            if (window.getComputedStyle(cell).display === 'none') {
                reset();
                return;
            }
            const rect = cell.getBoundingClientRect();
            if (rect.top > RAIL_TOP) {
                reset();
                return;
            }
            const grid = cell.parentNode;
            const gridBottom = grid.getBoundingClientRect().bottom;
            const innerH = inner.offsetHeight;
            // Release near the end so the rail doesn't run into the footer.
            const top = Math.min(RAIL_TOP, gridBottom - innerH);
            inner.style.position = 'fixed';
            inner.style.top = `${top}px`;
            inner.style.left = `${rect.left}px`;
            inner.style.width = `${rect.width}px`;
        };

        update();
        // capture:true catches scroll from any ancestor scroll container too.
        window.addEventListener('scroll', update, true);
        window.addEventListener('resize', update);
        return () => {
            window.removeEventListener('scroll', update, true);
            window.removeEventListener('resize', update);
        };
    }, []);

    return (
        <Root>
            <aside className={classes.leftFixed}>
                <LeftNav active={activeNav} />
            </aside>
            <div className={classes.grid}>
                <div className={classes.contentCol}>{children}</div>
                <div className={classes.rightCol} ref={cellRef}>
                    <div ref={innerRef}>
                        <RightRail sections={tocSections} />
                    </div>
                </div>
            </div>
        </Root>
    );
}

DocsLayout.propTypes = {
    activeNav: PropTypes.string,
    tocSections: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        label: PropTypes.string,
    })),
    children: PropTypes.node.isRequired,
};

DocsLayout.defaultProps = {
    activeNav: 'overview',
    tocSections: undefined,
};

export default DocsLayout;
