
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import { styled } from '@mui/material/styles';
import { Link, withRouter } from 'react-router-dom';
import { injectIntl, FormattedMessage } from 'react-intl';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Hidden from '@mui/material/Hidden';
import { useTheme, Avatar, Badge } from '@mui/material';
import Icon from '@mui/material/Icon';
import PropTypes from 'prop-types';
import Popper from '@mui/material/Popper';
import Grow from '@mui/material/Grow';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Drawer from '@mui/material/Drawer';
import Settings from 'AppComponents/Shared/SettingsContext';
import { app } from 'Settings';
import Box from '@mui/material/Box';
import API from 'AppData/api';
import LoopThemeStyles, { initLoopThemeMode, toggleLoopThemeMode } from 'AppComponents/Shared/LoopTheme';
import AuthManager from '../../data/AuthManager';
import GlobalNavBar from './Header/GlobalNavbar';
import UserMenuDropdown from './Header/UserMenuDropdown';
import LoopFooter from './Footer/LoopFooter';
import SearchModal from '../../../SearchModal'


const PREFIX = 'index';

const classes = {
    appBar: `${PREFIX}-appBar`,
    icon: `${PREFIX}-icon`,
    menuIcon: `${PREFIX}-menuIcon`,
    userLink: `${PREFIX}-userLink`,
    publicStore: `${PREFIX}-publicStore`,
    linkWrapper: `${PREFIX}-linkWrapper`,
    drawer: `${PREFIX}-drawer`,
    wrapper: `${PREFIX}-wrapper`,
    contentWrapper: `${PREFIX}-contentWrapper`,
    push: `${PREFIX}-push`,
    footer: `${PREFIX}-footer`,
    toolbar: `${PREFIX}-toolbar`,
    list: `${PREFIX}-list`,
    drawerStyles: `${PREFIX}-drawerStyles`,
    listInline: `${PREFIX}-listInline`,
    reactRoot: `${PREFIX}-reactRoot`,
    icons: `${PREFIX}-icons`,
    banner: `${PREFIX}-banner`,
    listRoot: `${PREFIX}-listRoot`,
    listRootInline: `${PREFIX}-listRootInline`,
    listItemTextRoot: `${PREFIX}-listItemTextRoot`,
    listText: `${PREFIX}-listText`,
    listTextSmall: `${PREFIX}-listTextSmall`,
    smallIcon: `${PREFIX}-smallIcon`,
    links: `${PREFIX}-links`,
    selected: `${PREFIX}-selected`,
    selectedText: `${PREFIX}-selectedText`,
    triangleDown: `${PREFIX}-triangleDown`,
    listIconRoot: `${PREFIX}-listIconRoot`,
    listItemRoot: `${PREFIX}-listItemRoot`,
    logoutLink: `${PREFIX}-logoutLink`,
};

const Root = styled('div')(({ theme }) => {
    const pageMaxWidth = theme.custom.page.style === 'fluid' ? 'none' : theme.custom.page.width;
    const footerHeight = theme.custom.footer.active ? theme.custom.footer.height : 0;
    return {
        [`& .${classes.appBar}`]: {
            position: 'fixed',
            backgroundColor: 'var(--loop-header-bg, #141A21)',
            borderBottom: '1px solid var(--loop-header-border, transparent)',
            boxSizing: 'border-box',
            height: '100px',
            paddingInline: '80px',
            [theme.breakpoints.down('md')]: { paddingInline: '40px' },
            [theme.breakpoints.down('sm')]: { paddingInline: '20px' },
        },
        [`& .${classes.icon}`]: { marginRight: theme.spacing(2) },
        [`& .${classes.menuIcon}`]: {
            color: theme.palette.getContrastText(theme.custom.appBar.background),
            fontSize: 35,
        },
        [`& .${classes.userLink}`]: {
            color: theme.palette.getContrastText(theme.custom.appBar.background),
        },
        [`& .${classes.publicStore}`]: {
            color: theme.palette.getContrastText(theme.custom.appBar.background),
            minWidth: 'auto',
        },
        [`& .${classes.linkWrapper}`]: { display: 'flex', marginLeft: 'auto' },
        [`& .${classes.drawer}`]: { top: 100 },
        [`& .${classes.wrapper}`]: {
            minHeight: '100%',
            marginBottom: 0,
            background: theme.palette.background.default + ' url(' + app.context + theme.custom.backgroundImage + ') repeat left top',
        },
        [`& .${classes.contentWrapper}`]: {
            display: 'flex',
            flexDirection: 'row',
            overflowY: 'auto',
            overflowX: 'hidden',
            position: 'relative',
            minHeight: theme.custom.banner.active
                ? `calc(100vh - ${100 + footerHeight}px)`
                : `calc(100vh - ${footerHeight}px)`,
            marginLeft: -4,
            marginTop: theme.custom.banner.active ? 0 : '100px',
        },
        [`& .${classes.push}`]: { height: 50 },
        [`& .${classes.footer}`]: {
            background: theme.custom.footer.background,
            color: theme.custom.footer.color,
            paddingLeft: theme.spacing(3),
            height: theme.custom.footer.height || 50,
            alignItems: 'center',
            display: 'flex',
        },
        [`& .${classes.toolbar}`]: {
            minHeight: 0,
            height: '100%',
            padding: '0px',
            [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: { minHeight: 0 },
            [theme.breakpoints.up('sm')]: { minHeight: 0 },
        },
        [`& .${classes.list}`]: { width: theme.custom.appBar.drawerWidth },
        [`& .${classes.drawerStyles}`]: {
            top: theme.mixins.toolbar['@media (min-width:600px)'].minHeight,
        },
        [`& .${classes.listInline}`]: { '& ul': { display: 'flex', flexDirection: 'row' } },
        [`& .${classes.reactRoot}`]: {
            maxWidth: pageMaxWidth,
            margin: 'auto',
            borderLeft: theme.custom.page.border,
            borderRight: theme.custom.page.border,
        },
        [`& .${classes.icons}`]: {
            marginRight: theme.spacing(),
            '&.material-icons': { fontSize: theme.spacing(2) },
        },
        [`& .${classes.banner}`]: {
            color: theme.custom.banner.color,
            background: theme.custom.banner.background,
            padding: theme.custom.banner.padding,
            margin: theme.custom.banner.margin,
            fontSize: theme.custom.banner.fontSize,
            display: 'flex',
            justifyContent: theme.custom.banner.textAlign,
            top: 0,
            position: 'fixed',
            width: '100%',
            boxSizing: 'border-box',
            zIndex: 1000,
        },
        [`& .${classes.listRoot}`]: { padding: 0 },
        [`& .${classes.listRootInline}`]: {
            padding: 0,
            display: 'flex',
            [theme.breakpoints.down('md')]: { flexDirection: 'column' },
        },
        [`& .${classes.listItemTextRoot}`]: { padding: 0 },
        [`& .${classes.listText}`]: {
            color: theme.palette.getContrastText(theme.custom.appBar.background),
        },
        [`& .${classes.listTextSmall}`]: {
            color: theme.palette.getContrastText(theme.custom.appBar.background),
        },
        [`& .${classes.smallIcon}`]: { marginRight: 5, minWidth: 'auto' },
        [`& .${classes.links}`]: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
        [`& .${classes.selected}`]: {
            background: theme.custom.appBar.activeBackground,
            alignItems: 'center',
            textDecoration: 'none',
            color: theme.palette.getContrastText(theme.custom.appBar.activeBackground),
        },
        [`& .${classes.selectedText}`]: {
            color: theme.palette.getContrastText(theme.custom.appBar.activeBackground),
        },
        [`& .${classes.triangleDown}`]: {
            width: 0, height: 0,
            borderLeft: '6px solid transparent',
            borderRight: '6px solid transparent',
            borderTop: `6px solid ${theme.custom.appBar.activeBackground}`,
            fontSize: 0, lineHeight: 0,
            position: 'absolute', bottom: -5,
        },
        [`& .${classes.listIconRoot}`]: { minWidth: 'auto' },
        [`& .${classes.listItemRoot}`]: {
            padding: `0 ${theme.spacing(1)} 0 ${theme.spacing(1)}`,
            height: 30,
        },
        [`& .${classes.logoutLink}`]: {
            color: theme.palette.getContrastText(theme.palette.background.paper),
        },
    };
});

class LayoutLegacy extends React.Component {
    constructor(props) {
        super(props);
        initLoopThemeMode();
        this.state = {
            openNavBar: false,
            openUserMenu: false,
            selected: 'home',
            anchorEl: null,
            bannerHeight: 0,
            searchOpen: false,      // ✅ controls HeaderSearch (search icon)
            modalOpen: false,       // ✅ controls SearchModal (bell icon)
        };
        this.toggleGlobalNavBar = this.toggleGlobalNavBar.bind(this);
        const { history } = props;
        history.listen((location) => { this.detectCurrentMenu(location); });
    }

    componentDidMount() {
        const { history: { location }, theme } = this.props;
        document.body.style.backgroundColor = theme.custom.page.emptyAreadBackground || '#ffffff';
        this.detectCurrentMenu(location);
        if (theme.custom.banner.active) {
            if (theme.custom.banner.style === 'image') {
                setTimeout(() => {
                    const bannerElement = document.getElementById('bannerElement');
                    this.setState({ bannerHeight: bannerElement.clientHeight });
                }, 1000);
            } else {
                const bannerElement = document.getElementById('bannerElement');
                this.setState({ bannerHeight: bannerElement.clientHeight });
            }
        }
        const user = AuthManager.getUser();
        if (user) {
            if (!sessionStorage.getItem('userOrganization')) {
                new API()
                    .getUserOrganizationInfo()
                    .then((res) => {
                        if (res.body.name) sessionStorage.setItem('userOrganization', res.body.name);
                    })
                    .catch((error) => { throw error; });
            }
        } else {
            sessionStorage.removeItem('userOrganization');
        }
    }

    detectCurrentMenu = (location) => {
        const { pathname } = location;
        if (/\/search$/g.test(pathname) || /\/search\//g.test(pathname)) {
            this.setState({ selected: null });
        } else if (/\/apis$/g.test(pathname) || /\/apis\//g.test(pathname)) {
            this.setState({ selected: 'apis' });
        } else if (/\/mcp-servers$/g.test(pathname) || /\/mcp-servers\//g.test(pathname)) {
            this.setState({ selected: 'mcp-servers' });
        } else if (/\/home$/g.test(pathname) || /\/home\//g.test(pathname)) {
            this.setState({ selected: 'home' });
        } else if (/\/applications$/g.test(pathname) || /\/applications\//g.test(pathname)) {
            this.setState({ selected: 'applications' });
        } else if (/\/settings$/g.test(pathname) || /\/settings\//g.test(pathname)) {
            this.setState({ selected: 'settings' });
        }
    };

    handleRequestCloseUserMenu = () => { this.setState({ openUserMenu: false }); };

    doOIDCLogout = (e) => {
        e.preventDefault();
        window.location = app.context + '/services/logout';
    };

    handleClickButton = (key) => { this.setState({ [key]: true }); };
    handleRequestClose = (key) => { this.setState({ [key]: false }); };

    handleToggleUserMenu = (event) => {
        this.setState((state) => ({ openUserMenu: !state.openUserMenu }));
        this.setState({ anchorEl: event.currentTarget });
    };

    handleCloseUserMenu = (event) => {
        if (this.state.anchorEl?.contains(event.target)) return;
        this.setState({ openUserMenu: false });
    };

    getLogoPath = () => {
        const settingsContext = this.context;
        const { tenantDomain } = settingsContext;
        const { theme } = this.props;
        const { custom: { appBar: { logo } } } = theme;
        let logoWithTenant = logo;
        if (logo && logoWithTenant) {
            logoWithTenant = logo.replace('<tenant-domain>', tenantDomain);
        }
        if (logoWithTenant && /^(ftp|http|https):\/\/[^ "]+$/.test(logoWithTenant)) {
            return logoWithTenant;
        }
        return app.context + logoWithTenant;
    };

    toggleGlobalNavBar() {
        this.setState((prevState) => ({ openNavBar: !prevState.openNavBar }));
    }

    // ✅ Toggles HeaderSearch (search icon button)
    toggleSearch = () => {
        this.setState((prevState) => ({ searchOpen: !prevState.searchOpen }));
    };

    // ✅ Opens SearchModal (bell/reminder icon button)
    openModal = () => { this.setState({ modalOpen: true }); };
    closeModal = () => { this.setState({ modalOpen: false }); };

    render() {
        const { theme, children } = this.props;
        const {
            custom: {
                banner: { active },
                appBar: { showSearch },
                publicTenantStore,
            },
        } = theme;
        const { openNavBar, selected } = this.state;
        const { tenantDomain, setTenantDomain } = this.context;
        const { customUrl: { tenantDomain: customUrlEnabledDomain } } = app;

        const user = AuthManager.getUser();
        let username = null;
        if (user) {
            username = user.name;
            const count = (username.match(/@/g) || []).length;
            if (user.name.endsWith('@carbon.super') && count <= 1) {
                username = user.name.replace('@carbon.super', '');
            }
        }

        let userInitials = '';
        if (username) {
            userInitials = username
                .trim()
                .split(/\s+/)
                .map((part) => part[0])
                .slice(0, 2)
                .join('')
                .toUpperCase();
        }

        const commonStyle = { style: { top: 100 } };
        const paperStyles = {
            style: { top: 100, backgroundColor: theme.custom.appBar.background },
        };

        const strokeColor = theme.palette.getContrastText(theme.custom.appBar.background);
        const strokeColorSelected = theme.palette.getContrastText(theme.custom.appBar.activeBackground);

        let publicTenantStoreVisible = true;
        if (publicTenantStore) {
            const { active: publicTenantStoreActive } = publicTenantStore;
            publicTenantStoreVisible = publicTenantStoreActive;
        }

        return (
            <Root>
                <LoopThemeStyles />
                <div className={classes.reactRoot} id='pageRoot'>
                    <div
                        className={classes.wrapper}
                        style={{ marginTop: active ? (this.state.bannerHeight + 100) + 'px' : 0 }}
                    >
                        <AppBar
                            position='fixed'
                            className={classes.appBar}
                            id='appBar'
                            style={{ top: active ? this.state.bannerHeight + 'px' : 0 }}
                        >
                            <Toolbar className={classes.toolbar} id='toolBar'>
                                {/* Hamburger */}
                                <Hidden mdUp>
                                    <IconButton
                                        onClick={this.toggleGlobalNavBar}
                                        aria-label='open navigation menu'
                                        size='large'
                                        sx={{
                                            mr: 1.5, width: 44, height: 44,
                                            borderRadius: '10px',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            color: '#FFFFFF',
                                        }}
                                    >
                                        <Icon>menu</Icon>
                                    </IconButton>
                                </Hidden>

                                {/* Logo + nav */}
                                <div style={{ display: 'flex', alignItems: 'center', height: '100%', gap: '120px' }}>
                                    <Link to='/' id='logoLink' aria-label='Go to home page'>
                                        <img
                                            className='loop-logo-dark'
                                            alt={<FormattedMessage id='Base.index.logo.alt' defaultMessage='Dev Portal' />}
                                            src={this.getLogoPath()}
                                            style={{ height: theme.custom.appBar.logoHeight, width: theme.custom.appBar.logoWidth }}
                                        />
                                        <img
                                            className='loop-logo-light'
                                            alt='LOOP Matrix'
                                            src={`${app.context}/site/public/images/lighlogo.svg`}
                                            style={{ height: theme.custom.appBar.logoHeight, width: theme.custom.appBar.logoWidth }}
                                        />
                                    </Link>
                                    <Hidden smDown>
                                        <div className={classes.listInline}>
                                            <GlobalNavBar
                                                selected={selected}
                                                drawerView={false}
                                                iconWidth={16}
                                                strokeColor={strokeColor}
                                                strokeColorSelected={strokeColorSelected}
                                                classes={classes}
                                            />
                                        </div>
                                    </Hidden>
                                </div>

                                {/* Mobile drawer */}
                                <Hidden mdUp>
                                    <Drawer
                                        className={classes.drawerStyles}
                                        PaperProps={paperStyles}
                                        SlideProps={commonStyle}
                                        ModalProps={commonStyle}
                                        BackdropProps={commonStyle}
                                        open={openNavBar}
                                        onClose={this.toggleGlobalNavBar}
                                    >
                                        <div tabIndex={0} role='button' onClick={this.toggleGlobalNavBar} onKeyDown={this.toggleGlobalNavBar}>
                                            <div className={classes.list}>
                                                <GlobalNavBar
                                                    selected={selected}
                                                    drawerView
                                                    iconWidth={24}
                                                    strokeColor={strokeColor}
                                                    strokeColorSelected={strokeColorSelected}
                                                    classes={classes}
                                                />
                                            </div>
                                        </div>
                                    </Drawer>
                                </Hidden>

                                <Box sx={{ flexGrow: 1 }} />

                                {/* Switch Dev Portals */}
                                {tenantDomain && customUrlEnabledDomain === 'null' && tenantDomain !== 'INVALID' && publicTenantStoreVisible && (
                                    <Link style={{ textDecoration: 'none', color: '#ffffff' }} to='/' onClick={() => setTenantDomain('INVALID')} id='gotoPubulicDevPortal'>
                                        <Button className={classes.publicStore}>
                                            <Icon className={classes.icons}>public</Icon>
                                            <Hidden lgDown>
                                                <FormattedMessage id='Base.index.go.to.public.store' defaultMessage='Switch Dev Portals' />
                                            </Hidden>
                                        </Button>
                                    </Link>
                                )}

                                {/* ✅ Search icon — opens the SearchModal popup (latest design + real search) */}
                                {showSearch && (
                                    <IconButton
                                        color='inherit'
                                        className={classes.userLink}
                                        aria-label='search'
                                        size='large'
                                        onClick={this.openModal}
                                    >
                                        <img
                                            src={`${app.context}/site/public/images/searchButton.svg`}
                                            alt='Search'
                                            style={{ height: 36, width: 36 }}
                                        />
                                    </IconButton>
                                )}

                                {/* Theme toggle */}
                                <IconButton
                                    color='inherit'
                                    className={classes.userLink}
                                    aria-label='toggle theme'
                                    size='large'
                                    onClick={() => toggleLoopThemeMode()}
                                >
                                    <img className='loop-themeicon-dark' src={`${app.context}/site/public/images/toggleTheme.svg`} alt='Switch to light mode' style={{ height: 36, width: 36 }} />
                                    <img className='loop-themeicon-light' src={`${app.context}/site/public/images/darkmode.svg`} alt='Switch to dark mode' style={{ height: 36, width: 36 }} />
                                </IconButton>

                                <Hidden smDown>
                                    {/* ✅ Bell icon — opens SearchModal popup */}
                                    <Box
                                        // color='inherit'
                                        // className={classes.userLink}
                                        aria-label='notifications'
                                        size='large'
                                        onClick={this.openModal}
                                        style={{
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            marginLeft: 16,
                                            border:  '1px solid #FFFFFF14',
                                            padding: '8px',
                                            marginRight: '20px',
                                            borderRadius: '10px',
                                            color:"rgba(0, 0, 0, 0.87)",
                                            background:'rgba(0, 0, 0, 0.87)' ,
                                        }}
                                    >
                                            <img
                                                src={`${app.context}/site/public/images/remainder_icon.png`}
                                                alt='Reminders'
                                                style={{ height: "16px", width: "16px" }}
                                            />
                                        
                                    </Box>

                                    {/* User menu or Sign In */}
                                    {user ? (
                                        <div className={classes.linkWrapper}>
                                            <Button
                                                aria-owns={this.openUserMenu ? 'menu-list-grow' : null}
                                                aria-haspopup='true'
                                                onClick={this.handleToggleUserMenu}
                                                className={classes.userLink}
                                                id='userToggleButton'
                                                aria-label='user menu'
                                                sx={{ backgroundColor: '#FFBF9921', borderRadius: '10px' }}
                                            >
                                                <Avatar variant='rounded' sx={{ bgcolor: '#FF5F00', width: 36, height: 36, borderRadius: '10px', fontSize: 14, fontWeight: 700, mr: 1 }}>
                                                    {userInitials}
                                                </Avatar>
                                                <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1.15, textTransform: 'none', maxWidth: '200px' }}>
                                                    <span style={{ fontSize: 13, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '160px', color: '#FFFFFF' }}>
                                                        {username}
                                                    </span>
                                                    <span style={{ fontSize: 11, color: '#FF5F00', fontWeight: 500 }}>{user && user.isAdmin() ? 'Admin' : 'Dev'}</span>
                                                </span>
                                                <Icon className={classes.icons} style={{ marginLeft: 6 }}>keyboard_arrow_down</Icon>
                                            </Button>
                                            <Popper id='userPopup' open={this.state.openUserMenu} anchorEl={this.state.anchorEl} transition disablePortal placement='bottom-start'>
                                                {({ TransitionProps, placement }) => (
                                                    <Grow {...TransitionProps} id='menu-list-grow' style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}>
                                                        <div>
                                                            <ClickAwayListener onClickAway={this.handleCloseUserMenu}>
                                                                <div>
                                                                    <UserMenuDropdown
                                                                        initials={userInitials}
                                                                        name={username}
                                                                        email={user && user.email ? user.email : ''}
                                                                        plan='Growth'
                                                                        onProfile={this.handleCloseUserMenu}
                                                                        onSettings={this.handleCloseUserMenu}
                                                                        onSignOut={this.doOIDCLogout}
                                                                    />
                                                                </div>
                                                            </ClickAwayListener>
                                                        </div>
                                                    </Grow>
                                                )}
                                            </Popper>
                                        </div>
                                    ) : (
                                        <div className={classes.linkWrapper}>
                                            <Button
                                                id='itest-devportal-sign-in'
                                                component='a'
                                                href={app.context + '/services/configs'}
                                                disableElevation
                                                style={{
                                                    height: '40px', width: '90px', minWidth: '90px',
                                                    backgroundColor: '#FF5F00', borderRadius: '10px',
                                                    color: '#FFFFFF',
                                                    fontFamily: "'Poppins', 'Open Sans', 'Helvetica', 'Arial', sans-serif",
                                                    fontWeight: 500, fontSize: '14px',
                                                    lineHeight: '20px', textTransform: 'none',
                                                }}
                                            >
                                                <FormattedMessage id='Base.index.sign.in' defaultMessage='Sign In' />
                                            </Button>
                                        </div>
                                    )}
                                </Hidden>
                            </Toolbar>
                        </AppBar>
                        <main>
                            <div className={classes.contentWrapper}>{children}</div>
                        </main>
                    </div>
                    <LoopFooter logoSrc={this.getLogoPath()} />
                </div>

                {/* ✅ SearchModal — outside AppBar so z-index works correctly */}
                {this.state.modalOpen && (
                    <SearchModal onClose={this.closeModal} />
                )}
            </Root>
        );
    }
}

LayoutLegacy.contextType = Settings;
LayoutLegacy.propTypes = {
    classes: PropTypes.shape({}).isRequired,
    theme: PropTypes.shape({}).isRequired,
};

function Layout(props) {
    const theme = useTheme();
    return <LayoutLegacy {...props} theme={theme} />;
}

export default injectIntl(withRouter(Layout));