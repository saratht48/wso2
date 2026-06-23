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
    rightCol: `${PREFIX}-rightCol`,
};

const Root = styled('div')(({ theme }) => ({
    width: '100%',
    boxSizing: 'border-box',
    backgroundColor: '#080808',
    fontFamily: "'Poppins', 'Helvetica Neue', Arial, sans-serif",
    padding: '28px 24px 32px 0',
    [theme.breakpoints.down('md')]: {
        padding: '24px 20px 32px',
    },
    [theme.breakpoints.down('sm')]: {
        padding: '12px 16px 28px',
    },
    [`& .${classes.leftFixed}`]: {
        position: 'fixed',
        top: 100,
        left: 0,
        width: SIDEBAR,
        height: 'calc(100vh - 100px)',
        overflowY: 'auto',
        boxSizing: 'border-box',
        zIndex: 5,
        backgroundColor: '#0E1520',
        borderRight: '1px solid rgba(255,255,255,0.06)',
        padding: '18px 18px 18px 16px',
        [theme.breakpoints.down('lg')]: {
            width: SIDEBAR_LG,
        },
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    },
    [`& .${classes.grid}`]: {
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) 220px',
        gap: 40,
        alignItems: 'start',
        marginLeft: SIDEBAR + 40,
        [theme.breakpoints.down('lg')]: {
            gridTemplateColumns: 'minmax(0, 1fr)',
            marginLeft: SIDEBAR_LG + 32,
        },
        [theme.breakpoints.down('md')]: {
            gridTemplateColumns: 'minmax(0, 1fr)',
            marginLeft: 0,
        },
    },
    [`& .${classes.rightCol}`]: {
        position: 'sticky',
        top: 112,
        alignSelf: 'start',
        [theme.breakpoints.down('lg')]: {
            display: 'none',
        },
    },
}));

/**
 * Three-column documentation layout shell (fixed left rail).
 * @param {object} props component props
 * @returns {JSX.Element} the layout
 */
function DocsLayout({ activeNav, tocSections, children }) {
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

    return (
        <Root>
            <aside className={classes.leftFixed}>
                <LeftNav active={activeNav} />
            </aside>
            <div className={classes.grid}>
                {children}
                <div className={classes.rightCol}>
                    <RightRail sections={tocSections} />
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
