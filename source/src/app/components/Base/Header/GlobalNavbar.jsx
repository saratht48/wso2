/*
 * Copyright (c) 2019, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import Icon from '@mui/material/Icon';
import { List } from '@mui/material';
import ProductsMegaMenu from './ProductsMegaMenu';

// --- LOOP Matrix: imports no longer used after the nav was re-skinned ---
// import classNames from 'classnames';
// import { ListItemIcon, ListItem, ListItemText, useTheme } from '@mui/material';
// import AuthManager from 'AppData/AuthManager';
// import { useAreApisAccessible, useAreMcpServersAccessible } from 'AppUtils/PortalModeUtils';
// import CustomIcon from '../../Shared/CustomIcon';

// LOOP Matrix brand colors (active tab orange / inactive follows light-dark theme)
const ACTIVE_COLOR = '#FF5F00';
const INACTIVE_COLOR = 'var(--loop-nav-text, #FFFFFF)';

/**
 * GlobalNavBar
 * @param {*} props Properties
 * @returns {React.Component} Renders global navbar
 */
function GlobalNavBar(props) {
    const {
        classes, drawerView, location,
    } = props;
    const [productsOpen, setProductsOpen] = React.useState(false);
    const pathname = (location && location.pathname) || '';
    const isActive = (to) => pathname === to || pathname.startsWith(`${to}/`);

    // Close the Products mega-menu whenever the route changes (navigation).
    React.useEffect(() => {
        setProductsOpen(false);
    }, [pathname]);

    // Top-level nav items (routes will be added later as the screens are built)
    const navItems = [
        { key: 'developers', label: 'Developers & Resources', to: '/developers' },
        { key: 'app', label: 'App', to: '/my-apps' },
        // FAQs hidden for the demo — uncomment to restore.
        // { key: 'faqs', label: 'FAQs', to: '/faqs' },
    ];

    // LOOP Matrix: header menu typography spec (Poppins 400 / 14px / 18px line-height)
    const linkStyle = (active) => ({
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        fontFamily: "'Poppins', 'Open Sans', 'Helvetica', 'Arial', sans-serif",
        color: active ? ACTIVE_COLOR : INACTIVE_COLOR,
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: '18px',
        letterSpacing: '0px',
        cursor: 'pointer',
        padding: drawerView ? '12px 16px' : '0 16px',
        height: drawerView ? 'auto' : '100%', // LOOP Matrix: fill header height (no fixed px)
        whiteSpace: 'nowrap',
    });

    const productsActive = pathname.startsWith('/products');

    return (
        <List
            className={classes.listRootInline}
            component='nav'
            aria-label='primary navigation'
            role='navigation'
            style={{ display: 'flex', flexDirection: drawerView ? 'column' : 'row', alignItems: 'center' }}
        >
            {/* Products dropdown (full-width mega-menu) */}
            <div
                role='button'
                tabIndex={0}
                aria-label='Products menu'
                style={linkStyle(productsActive || productsOpen)}
                onClick={() => setProductsOpen((openState) => !openState)}
                onKeyDown={(e) => { if (e.key === 'Enter') setProductsOpen((openState) => !openState); }}
            >
                Products
                <Icon
                    style={{
                        fontSize: 18,
                        marginLeft: 4,
                        transition: 'transform 0.2s',
                        transform: productsOpen ? 'rotate(180deg)' : 'none',
                    }}
                >
                    keyboard_arrow_down
                </Icon>
            </div>
            {!drawerView && (
                <ProductsMegaMenu
                    open={productsOpen}
                    onClose={() => setProductsOpen(false)}
                    top={100}
                />
            )}

            {/* Remaining top-level links — also close the Products menu on click */}
            {navItems.map((item) => (
                <Link
                    key={item.key}
                    to={item.to}
                    style={linkStyle(isActive(item.to))}
                    onClick={() => setProductsOpen(false)}
                >
                    {item.label}
                </Link>
            ))}
        </List>
    );

    /* ======================================================================
     * LOOP Matrix: original WSO2 navigation (Home / APIs / MCP Servers /
     * Applications) kept here for reference. Commented out — not removed.
     * ======================================================================
    const {
        classes, intl, drawerView, selected, iconWidth, strokeColorSelected, strokeColor,
    } = props;
    const theme = useTheme();
    const { custom: { landingPage: { active: landingPageActive, activeForAnonymous } } } = theme;
    const isUserFound = AuthManager.getUser();
    const apisAccessible = useAreApisAccessible();
    const mcpServersAccessible = useAreMcpServersAccessible();

    return (
        <List className={classes.listRootInline} component='nav' aria-label='primary navigation' role='navigation'>
            {landingPageActive && ((isUserFound && !activeForAnonymous) || activeForAnonymous)
                && (
                    <Link
                        to='/home'
                        className={classNames({
                            [classes.selected]: selected === 'home',
                            'selected': selected === 'home',
                            [classes.links]: true,
                        }, 'header-link')}
                    >
                        <ListItem component='div' classes={{ root: classes.listItemRoot }}>
                            <ListItemIcon classes={{
                                root: classNames({ [classes.smallIcon]: !drawerView },
                                    'heder-menu-icon-home', 'header-menu-icon'),
                            }}
                            >
                                <Icon
                                    style={{
                                        fontSize: iconWidth,
                                        color: selected === 'home'
                                            ? strokeColorSelected : strokeColor,
                                    }}
                                    className={classes.listText}
                                >
                                    home
                                </Icon>
                            </ListItemIcon>
                            <ListItemText
                                classes={{
                                    root: classes.listItemTextRoot,
                                    primary: classNames({
                                        [classes.selectedText]: selected === 'home',
                                        [classes.listText]: selected !== 'home',
                                    }),
                                }}
                                primary={intl.formatMessage({
                                    id: 'Base.Header.GlobalNavbar.menu.home',
                                    defaultMessage: 'Home',
                                })}
                            />
                        </ListItem>
                        {(selected === 'home' && !drawerView) && (<div className={classes.triangleDown} />)}
                    </Link>
                ) }
            {apisAccessible && (
                <Link
                    data-testid='itest-link-to-apis'
                    to={(theme.custom.tagWise.active && theme.custom.tagWise.style === 'page') ? '/api-groups' : '/apis'}
                    className={classNames({
                        [classes.selected]: selected === 'apis',
                        'selected': selected === 'apis',
                        [classes.links]: true,
                    }, 'header-link')}
                >
                    <ListItem component='div' classes={{ root: classes.listItemRoot }}>
                        <ListItemIcon classes={{
                            root: classNames({ [classes.smallIcon]: !drawerView },
                                'heder-menu-icon-apis', 'header-menu-icon'),
                        }}
                        >
                            <CustomIcon
                                width={iconWidth}
                                height={iconWidth}
                                icon='api'
                                className={classes.listText}
                                strokeColor={selected === 'apis' ? strokeColorSelected : strokeColor}
                            />
                        </ListItemIcon>
                        <ListItemText
                            classes={{
                                root: classes.listItemTextRoot,
                                primary: classNames({
                                    [classes.selectedText]: selected === 'apis',
                                    [classes.listText]: selected !== 'apis',
                                }),
                            }}
                            primary={intl.formatMessage({
                                id: 'Base.Header.GlobalNavbar.menu.apis',
                                defaultMessage: 'APIs',
                            })}
                        />
                    </ListItem>
                    {(selected === 'apis' && !drawerView) && (<div className={classes.triangleDown} />)}
                </Link>
            )}
            {mcpServersAccessible && (
                <Link
                    data-testid='itest-link-to-mcp-servers'
                    to={(theme.custom.tagWise.active && theme.custom.tagWise.style === 'page') ? '/api-groups' : '/mcp-servers'}
                    className={classNames({
                        [classes.selected]: selected === 'mcp-servers',
                        'selected': selected === 'mcp-servers',
                        [classes.links]: true,
                    }, 'header-link')}
                >
                    <ListItem component='div' classes={{ root: classes.listItemRoot }}>
                        <ListItemIcon classes={{
                            root: classNames({ [classes.smallIcon]: !drawerView },
                                'heder-menu-icon-mcp-servers', 'header-menu-icon'),
                        }}
                        >
                            <CustomIcon
                                width={iconWidth}
                                height={iconWidth}
                                icon='mcp-server'
                                className={classes.listText}
                                strokeColor={selected === 'mcp-servers' ? strokeColorSelected : strokeColor}
                            />
                        </ListItemIcon>
                        <ListItemText
                            classes={{
                                root: classes.listItemTextRoot,
                                primary: classNames({
                                    [classes.selectedText]: selected === 'mcp-servers',
                                    [classes.listText]: selected !== 'mcp-servers',
                                }),
                            }}
                            primary={intl.formatMessage({
                                id: 'Base.Header.GlobalNavbar.menu.mcpServers',
                                defaultMessage: 'MCP Servers',
                            })}
                        />
                    </ListItem>
                    {(selected === 'mcp-servers' && !drawerView) && (<div className={classes.triangleDown} />)}
                </Link>
            )}
            <Link
                id='itest-link-to-applications'
                to='/my-apps'
                className={classNames({
                    [classes.selected]: selected === 'applications',
                    'selected': selected === 'applications',
                    [classes.links]: true,
                }, 'header-link')}
            >
                <ListItem component='div' classes={{ root: classes.listItemRoot }}>
                    <ListItemIcon classes={{
                        root: classNames({ [classes.smallIcon]: !drawerView },
                            'heder-menu-icon-applications', 'header-menu-icon'),
                    }}
                    >
                        <CustomIcon
                            width={iconWidth}
                            height={iconWidth}
                            icon='applications'
                            className={classes.listText}
                            strokeColor={selected === 'applications' ? strokeColorSelected : strokeColor}
                        />
                    </ListItemIcon>
                    <ListItemText
                        classes={{
                            root: classes.listItemTextRoot,
                            primary: classNames({
                                [classes.selectedText]: selected === 'applications',
                                [classes.listText]: selected !== 'applications',
                            }),
                        }}
                        primary={intl.formatMessage({
                            id: 'Base.Header.GlobalNavbar.menu.applications',
                            defaultMessage: 'Applications',
                        })}
                    />
                </ListItem>
                {(selected === 'applications' && !drawerView) && (<div className={classes.triangleDown} />)}
            </Link>
        </List>
    );
    ====================================================================== */
}

GlobalNavBar.propTypes = {
    classes: PropTypes.shape({}).isRequired,
    drawerView: PropTypes.bool,
    location: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
};

GlobalNavBar.defaultProps = {
    drawerView: false,
};

export default withRouter((injectIntl(GlobalNavBar)));
