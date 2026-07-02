/* eslint-disable */
/*
 * Custom "My Applications" page (LOOP Matrix design).
 * Additive screen — does NOT replace the stock Applications page.
 *
 * Loading model (updated):
 *   - Page load fires ONLY GET /applications (Application.all). Cards render with
 *     a "View Keys" button — no per-app key/subscription calls on load.
 *   - "View Keys" lazily calls GET /applications/{id}/oauth-keys (Application.get + getKeys,
 *     one call covering BOTH environments). Per env: no key -> Generate, key -> reveal + Revoke.
 *   - The product catalog (getAllAPIs) and an app's current subscriptions load only when a
 *     Create/Edit modal opens.
 *
 * Colors tagged "token" below come from the client; the rest are LOOP defaults
 * (orange #FF5F00) pending exact values.
 */
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { app } from 'Settings';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import CircularProgress from '@mui/material/CircularProgress';
import Application from 'AppData/Application';
import API from 'AppData/api';
import Subscription from 'AppData/Subscription';
import Alert from 'AppComponents/Shared/Alert';
import { getLoopThemeMode } from 'AppComponents/Shared/LoopTheme';
import { styled } from '@mui/material/styles';
import { after } from 'lodash';

const editDark = `${app.context}/site/public/images/edit_icon_dark.png`;
const editLight = `${app.context}/site/public/images/edit_icon_light.png`;
const deleteLight = `${app.context}/site/public/images/delete_icon_light.png`;
const warningIcon =`${app.context}/site/public/images/warning_icon.png`;
const CopyIcon=`${app.context}/site/public/images/copy_light.png`;
const revokeIcon=`${app.context}/site/public/images/revoke_icon.png`; 
const ThemeIcon = styled('span')(() => ({
    display: 'inline-flex',
    alignItems: 'center',

    '& .loop-icon-dark': {
        display: 'inline-block',
    },

    '& .loop-icon-light': {
        display: 'none',
    },

    '[data-loop-theme="light"] & .loop-icon-dark': {
        display: 'none',
    },

    '[data-loop-theme="light"] & .loop-icon-light': {
        display: 'inline-block',
    },

}));

// Dark = footer theme (dark mode). Light = footer theme (light mode).
// Both aligned with LoopFooter color scheme.
const DARK = {
    pageBg: '#141A21', cardBg: '#141A21', cardBorder: '#1F2937', name: '#FFFFFF', muted: '#6B7280',
    viewKeys: '#9CA3AF', red: '#EF4444', orange: '#FF5F00',
    sandboxBg: 'rgba(167,139,250,0.14)', sandboxText: '#A78BFA',
    prodBg: 'rgba(52,211,153,0.12)', prodText: '#34D399',
    fieldBg: '#0F141A', inputBg: '#0F141A', modalBg: '#141A21',
    envBg: '#0B0F14', menuBorder: '#FFFFFF1A', hoverBg: '#1b232d', placeholder: '#444444',
};
const LIGHT = {
    pageBg: '#F2F5F7', cardBg: '#FFFFFF', cardBorder: '#E5E7EB', name: '#111827', muted: '#4B5563',
    viewKeys: '#4B5563', red: '#EF4444', orange: '#FF5F00',
    sandboxBg: 'rgba(124,58,237,0.10)', sandboxText: '#7C3AED',
    prodBg: 'rgba(5,150,105,0.10)', prodText: '#059669',
    fieldBg: '#F3F4F6', inputBg: '#FFFFFF', modalBg: '#FFFFFF',
    envBg: '#F7F8FA', menuBorder: '#E5E7EB', hoverBg: '#F3F4F6', placeholder: '#6B7280',
};
// Resolve every C.<key> against the CURRENT LOOP theme at access time, so all the
// existing C.xxx usages switch between light/dark with no other changes.
const PALETTES = { dark: DARK, light: LIGHT };
const C = new Proxy({}, {
    get: (_t, k) => PALETTES[getLoopThemeMode() === 'light' ? 'light' : 'dark'][k],
});
// All typography on this screen uses Poppins (per design). MONO/INTER kept as
// aliases so existing usages don't need touching.
const POP = "'Poppins', sans-serif";
const MONO = POP;
const INTER = POP;

const DEFAULT_TIER = 'Unlimited';
const RESIDENT_KM = 'Resident Key Manager';
const GRANT_TYPES = ['client_credentials', 'password', 'refresh_token'];
const PAGE_SIZE = 6;

const mask = (v) => (v ? `${String(v).slice(0, 4)}${'•'.repeat(16)}` : '');

const fmtDate = (t) => {
    if (!t) return '';
    const d = new Date(Number.isNaN(Number(t)) ? t : Number(t));
    if (Number.isNaN(d.getTime())) return '';
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const copyText = (v) => {
    if (!v) return;
    try { navigator.clipboard.writeText(v); Alert.info('Copied to clipboard'); } catch (e) { Alert.warning('Could not copy'); }
};

/* ---- one masked key field with a copy icon ---- */
function KeyField({ label, value }) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
            <Typography sx={{ width: 72, color: C.viewKeys, fontFamily: POP, fontSize: 13 }}>{label}</Typography>
            <Box sx={{
                flex: 1, display: 'flex', alignItems: 'center', gap: 1,
                bgcolor: C.fieldBg, border: `1px solid ${C.cardBorder}`, borderRadius: '8px',
                px: 1.25, py: 0.75,
            }}
            >
                <Box sx={{ flex: 1, fontFamily: MONO, fontSize: 13, color: C.viewKeys, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                    {mask(value)}
                </Box>
                <IconButton size="small" onClick={() => copyText(value)} sx={{ color: C.muted }}>
                    {/* <Icon sx={{ fontSize: 16 }}>content_copy</Icon> */}
                    <img src={CopyIcon} alt="copy" width={18} height={18} />
                </IconButton>
            </Box>
        </Box>
    );
}

/* ---- one environment block (Sandbox / Production) ---- */
function KeyEnv({
    env, chipBg, chipText, keyObj, busy, onGenerate, onRevoke,
}) {
    const has = keyObj && keyObj.consumerKey;
    const [revealed, setRevealed] = useState(true);
    const chip = (
        <Box sx={{ bgcolor: chipBg, color: chipText, fontFamily: POP, fontSize: 11, fontWeight: 600, px: 1, py: 0.4, borderRadius: '6px', display: 'inline-flex', alignItems: 'center' }}>
            {env}
        </Box>
    );

    return (
        <Box sx={{ bgcolor: C.envBg, border: `1px solid ${C.cardBorder}`, borderRadius: '16px', p: 1.75, mb: 1.5 }}>
            {/* top row: chip + (Hide / Generate) */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {chip}
                {has ? (
                    <Button
                        onClick={() => setRevealed((v) => !v)}
                        startIcon={<Icon sx={{ fontSize: 16 }}>{revealed ? 'visibility_off' : 'visibility'}</Icon>}
                        sx={{ color: C.viewKeys, border: `1px solid ${C.cardBorder}`, borderRadius: '8px', textTransform: 'none', fontFamily: POP, fontWeight: 500, fontSize: 12, px: 1.25, minWidth: 0 }}
                    >
                        {revealed ? 'Hide' : 'View'}
                    </Button>
                ) : (
                    <Button
                        onClick={onGenerate}
                        disabled={busy}
                        startIcon={<Icon sx={{ fontSize: 16 }}>add</Icon>}
                        sx={{ color: C.orange, border: `1px solid ${C.orange}`, borderRadius: '8px', textTransform: 'none', fontFamily: POP, fontWeight: 600, fontSize: 12, px: 1.5, transition: 'none', '&.Mui-disabled': { color: C.orange, borderColor: C.orange, opacity: 0.6 } }}
                    >
                        Generate Keys
                    </Button>
                )}
            </Box>

            {/* fields + revoke (only when a key exists and not hidden) */}
            {has && revealed && (
                <Box sx={{ mt: 1.75 }}>
                    <KeyField label="Public key" value={keyObj.consumerKey} />
                    <KeyField label="Secret key" value={keyObj.consumerSecret} />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                        <Button
                            onClick={onRevoke}
                            disabled={busy}
                            startIcon={<img src={revokeIcon} alt="revokeIcon" width={14} height={14}/>}
                            sx={{ color: C.red, border: `1px solid ${C.red}`, borderRadius: '8px', textTransform: 'none', fontFamily: POP, fontWeight: 600, fontSize: 13, px: 2, '&.Mui-disabled': { color: C.red, borderColor: C.red, opacity: 0.6 } }}
                        >
                            Revoke Keys
                        </Button>
                    </Box>
                </Box>
            )}
        </Box>
    );
}

/* ---- a single application card ---- */
function AppCard({ app, onEdit, onDelete }) {
    const [expanded, setExpanded] = useState(false);
    const [loadingKeys, setLoadingKeys] = useState(false);
    const [instance, setInstance] = useState(null);
    const [prodKey, setProdKey] = useState(null);
    const [sandKey, setSandKey] = useState(null);
    const [busy, setBusy] = useState('');
    const [anchor, setAnchor] = useState(null);

    const readKeys = (inst) => {
        setProdKey(inst.productionKeys.get(RESIDENT_KM) || null);
        setSandKey(inst.sandboxKeys.get(RESIDENT_KM) || null);
    };

    const viewKeys = () => {
        if (instance) { setExpanded(true); return; }
        setLoadingKeys(true);
        Application.get(app.applicationId)
            .then((inst) => inst.getKeys('PRODUCTION').then(() => inst)) // one oauth-keys call, both envs
            .then((inst) => { setInstance(inst); readKeys(inst); setExpanded(true); })
            .catch(() => { setExpanded(true); }) // no keys yet -> show Generate
            .finally(() => setLoadingKeys(false));
    };

    const generate = (keyType) => {
        if (!instance) return;
        setBusy(keyType);
        instance.generateKeys(keyType, GRANT_TYPES, '', {}, RESIDENT_KM)
            .then((res) => {
                if (keyType === 'PRODUCTION') setProdKey(res || null); else setSandKey(res || null);
                Alert.success(`${keyType === 'PRODUCTION' ? 'Production' : 'Sandbox'} keys generated`);
            })
            .catch((e) => Alert.error(e && e.message ? e.message : 'Failed to generate keys'))
            .finally(() => setBusy(''));
    };

    const revoke = (keyType) => {
        const k = keyType === 'PRODUCTION' ? prodKey : sandKey;
        if (!instance || !k) return;
        setBusy(keyType);
        instance.removeKeys(keyType, RESIDENT_KM, k.keyMappingId)
            .then(() => {
                if (keyType === 'PRODUCTION') setProdKey(null); else setSandKey(null);
                Alert.success('Keys revoked');
            })
            .catch((e) => Alert.error(e && e.message ? e.message : 'Failed to revoke keys'))
            .finally(() => setBusy(''));
    };

    const initial = (app.name || '?').trim().charAt(0).toUpperCase();
    const date = fmtDate(app.createdTime);

    return (
        <Box className='myapps-container' sx={{ bgcolor: C.cardBg, border: `1px solid ${C.cardBorder}`, borderRadius: '14px',  display: 'flex', flexDirection: 'column' }}> 
        <Box className='myapps-container' sx={{p: 2.25, }} >
            {/* header */}
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                <Box sx={{ width: 40, height: 40, borderRadius: '10px', flexShrink: 0, bgcolor: 'rgba(255,95,0,0.14)', color: C.orange, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: MONO, fontWeight: 700, fontSize: 16 }}>
                    {initial}
                </Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography sx={{ fontFamily: MONO, fontWeight: 700, fontSize: 14, lineHeight: '20px', color: C.name, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                        {app.name}
                    </Typography>
                    {date && (
                        <Typography sx={{ fontFamily: POP, fontWeight: 400, fontSize: 11, lineHeight: '120%', color: C.muted, mt: 0.25 }}>
                            {date}
                        </Typography>
                    )}
                </Box>
                <IconButton size="small" onClick={(e) => setAnchor(e.currentTarget)} sx={{ color: C.muted }}>
                    <Icon sx={{ fontSize: 20 }}>more_vert</Icon>
                </IconButton>
                <Menu
                    anchorEl={anchor}
                    open={Boolean(anchor)}
                    onClose={() => setAnchor(null)}
                    PaperProps={{ sx: { bgcolor: C.modalBg, border: `1px solid ${C.menuBorder}`, width: 180, borderRadius: '10px', backgroundImage: 'none', boxShadow: '0 12px 30px rgba(0,0,0,0.5)' } }}
                    MenuListProps={{ sx: { py: 0 } }}
                >
                    {/* <MenuItem
                        onClick={() => { setAnchor(null); onEdit(app); }}
                        sx={{ fontFamily: INTER, fontWeight: 500, fontSize: 14, py: 1.25, color: C.name, marginLeft:'20px' }}
                    >
                        
                        <img src={editDark} alt='edit dark' width='18px' height='18px'/>
                        <img src={editLight} alt='edit dark' width='18px' height='18px'/>
                        Edit
                    </MenuItem> */}
                    <MenuItem
                        onClick={() => {
                            setAnchor(null);
                            onEdit(app);
                        }}
                        sx={{
                            fontFamily: INTER,
                            fontWeight: 500,
                            fontSize: 14,
                            py: 1.25,
                            color: C.name,
                        }}
                    >
                        <ThemeIcon style={{ marginRight: 8 }}>
                            <img
                                className="loop-icon-dark"
                                src={editDark}
                                alt="Edit"
                                width={18}
                                height={18}
                            />

                            <img
                                className="loop-icon-light"
                                src={editLight}
                                alt="Edit"
                                width={18}
                                height={18}
                            />
                        </ThemeIcon>

                        Edit
                    </MenuItem>
                    <Divider sx={{ borderColor: C.menuBorder, mx: 2, my: 0 }} />
                    <MenuItem
                        onClick={() => { setAnchor(null); onDelete(app); }}
                        sx={{ fontFamily: INTER, fontWeight: 500, fontSize: 14, py: 1.25, color: C.red, }}
                    >
                        <ThemeIcon style={{ marginRight: 8 }}>


                            <img
                                src={deleteLight}
                                alt="Delete"
                                width={18}
                                height={18}
                            // style={{marginLeft:'20px'}}
                            />
                        </ThemeIcon>
                        Delete
                    </MenuItem>
                </Menu>
            </Box>

            {/* products count */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mt: 2, mb: 1.5, ml: '52px' }}>
                <Icon sx={{ fontSize: 16, lineHeight: 1, color: C.muted, display: 'flex', alignItems: 'center' }}>grid_view</Icon>
                <Typography sx={{ fontFamily: POP, fontSize: 12, lineHeight: 1, color: C.muted }}>
                    {`Products ${app.subscriptionCount || 0}`}
                </Typography>
            </Box>

            {/* keys area */}
            {expanded && (
                <Box sx={{ mt: 0.5 }}>
                    <KeyEnv
                        env="Sandbox" chipBg={C.sandboxBg} chipText={C.sandboxText}
                        keyObj={sandKey} busy={busy === 'SANDBOX'}
                        onGenerate={() => generate('SANDBOX')} onRevoke={() => revoke('SANDBOX')}
                    />
                    <KeyEnv
                        env="Production" chipBg={C.prodBg} chipText={C.prodText}
                        keyObj={prodKey} busy={busy === 'PRODUCTION'}
                        onGenerate={() => generate('PRODUCTION')} onRevoke={() => revoke('PRODUCTION')}
                    />
                </Box>
            )}
              </Box>
            <Box sx={{
        width: '100%',
        height: '2px',
        backgroundColor: '#E5E7EB',
        opacity: 0.5,
        transform: 'scaleY(0.5)',
        transformOrigin: 'top',
    }} />

            {/* footer toggle */}
            <Box sx={{ mt:0,padding:'18px', display: 'flex', justifyContent: 'flex-end' }}>
                {loadingKeys ? (
                    <CircularProgress size={18} sx={{ color: C.viewKeys }} />
                ) : (
                    <Button
                        onClick={() => (expanded ? setExpanded(false) : viewKeys())}
                        startIcon={<Icon sx={{ fontSize: 16 }}>visibility</Icon>}
                        sx={{
                            color: expanded ? C.orange : C.viewKeys,
                            border: `1px solid ${expanded ? C.orange : C.cardBorder}`,
                            borderRadius: '8px', textTransform: 'none', fontFamily: POP, fontWeight: 500, fontSize: 12, px: 1.5,
                        }}
                    >
                        {expanded ? 'Hide Keys' : 'View Keys'}
                    </Button>
                )}

            </Box>


      
        </Box>
    );
}

/* ---- product checkbox grid, shared by Create + Edit ---- */
function ProductPicker({ apis, selected, toggle, toggleAll }) {
    const allChecked = apis.length > 0 && selected.length === apis.length;
    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography sx={{ fontFamily: POP, fontWeight: 600, fontSize: 16, color: C.name }}>Map Products</Typography>
                    <Box sx={{ bgcolor: 'rgba(148,163,184,0.18)', color: '#94A3B8', fontFamily: POP, fontSize: 12, px: 1, py: 0.25, borderRadius: '20px' }}>
                        {`${selected.length} selected`}
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }} role="button" onClick={toggleAll} style={{ cursor: 'pointer' }}>
                    <Typography sx={{ fontFamily: POP, fontSize: 14, color: allChecked ? C.orange : C.name }}>Select all</Typography>
                    <Checkbox checked={allChecked} sx={{ color: C.muted, '&.Mui-checked': { color: C.orange } }} />
                </Box>
            </Box>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 1.5, maxHeight: 360, overflowY: 'auto', pr: 0.5 }}>
                {apis.map((api) => {
                    const on = selected.includes(api.id);
                    return (
                        <Box
                            key={api.id}
                            onClick={() => toggle(api.id)}
                            sx={{
                                display: 'flex', alignItems: 'center', gap: 1.25, p: 1.25, cursor: 'pointer',
                                bgcolor: C.envBg, border: `1px solid ${on ? C.orange : C.cardBorder}`, borderRadius: '10px',
                            }}
                        >
                            <Checkbox checked={on} sx={{ p: 0.25, color: C.muted, '&.Mui-checked': { color: C.orange } }} />
                            <Typography sx={{ fontFamily: POP, fontWeight: 600, fontSize: 14, color: C.name }}>{api.name}</Typography>
                        </Box>
                    );
                })}
                {apis.length === 0 && (
                    <Typography sx={{ color: C.muted }}>No products available to map.</Typography>
                )}
            </Box>
        </Box>
    );
}

// Functions (not consts) so the C Proxy resolves at render time, not module load.
const labelSx = () => ({ fontFamily: MONO, fontWeight: 500, fontSize: 12, lineHeight: '15px', textTransform: 'uppercase', color: C.muted });
const inputSx = () => ({
    mt: 0.75, mb: 2.5,
    '& .MuiOutlinedInput-root': { bgcolor: C.inputBg, borderRadius: '10px', color: C.name, fontFamily: POP },
    '& .MuiOutlinedInput-notchedOutline': { borderColor: C.cardBorder },
    '& .MuiInputBase-input::placeholder': {
        fontFamily: POP, fontWeight: 400, fontSize: 14, lineHeight: '100%', color: C.placeholder, opacity: 1,
    },
});

function MyApps() {
    // Re-render when the LOOP theme is toggled while this page is open, so the
    // C Proxy colors repaint live (light/dark).
    const [, setThemeTick] = useState(0);
    useEffect(() => {
        const el = document.documentElement;
        const obs = new MutationObserver(() => setThemeTick((t) => t + 1));
        obs.observe(el, { attributes: true, attributeFilter: ['data-loop-theme'] });
        return () => obs.disconnect();
    }, []);

    const [apps, setApps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    const [apis, setApis] = useState([]);
    const [apisLoaded, setApisLoaded] = useState(false);

    const [createOpen, setCreateOpen] = useState(false);
    const [editApp, setEditApp] = useState(null);
    const [deleteApp, setDeleteApp] = useState(null);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [selected, setSelected] = useState([]);
    const [currentSubs, setCurrentSubs] = useState([]); // [{subscriptionId, apiId}]
    const [saving, setSaving] = useState(false);

    // Server-side pagination (matches the stock Applications screen): one page per call,
    // limit = PAGE_SIZE, offset = (page-1)*PAGE_SIZE, total from pagination.total.
    const loadApps = (p = page, q = search) => Application.all(PAGE_SIZE, (p - 1) * PAGE_SIZE, 'asc', 'name', q)
        .then((res) => {
            setApps(res && res.list ? res.list : []);
            setTotal((res && res.pagination && res.pagination.total) || 0);
        });

    const searchTimer = React.useRef(null);
    const onSearch = (val) => {
        setSearch(val);
        setPage(1);
        if (searchTimer.current) clearTimeout(searchTimer.current);
        searchTimer.current = setTimeout(() => {
            loadApps(1, val).catch(() => Alert.error('Error while loading applications'));
        }, 300);
    };
    const goToPage = (n) => {
        setPage(n);
        loadApps(n, search).catch(() => Alert.error('Error while loading applications'));
    };

    const ensureApis = () => {
        if (apisLoaded) return Promise.resolve();
        const restApi = new API();
        return restApi.getAllAPIs({ limit: 100 }).then((res) => {
            const body = (res && (res.body || res.obj)) || {};
            setApis(body.list || []);
            setApisLoaded(true);
        });
    };

    useEffect(() => {
        loadApps(1, '')
            .catch(() => Alert.error('Error while loading applications'))
            .finally(() => setLoading(false));
    }, []);

    // Page-scoped: the global content wrapper forces min-height ~100vh (sticky footer),
    // which leaves a big gap above the footer on short pages. Relax it only while this
    // page is mounted so the footer hugs the content (per design); restore on unmount.
    useEffect(() => {
        const cw = document.querySelector('[class*="contentWrapper"]');
        if (!cw) return undefined;
        const prev = cw.style.minHeight;
        cw.style.minHeight = 'auto';
        return () => { cw.style.minHeight = prev; };
    }, []);

    const toggle = (id) => setSelected((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
    const toggleAll = () => setSelected((p) => (p.length === apis.length ? [] : apis.map((a) => a.id)));

    const resetForm = () => { setName(''); setDescription(''); setSelected([]); setCurrentSubs([]); };

    const openCreate = () => { resetForm(); setCreateOpen(true); ensureApis().catch(() => Alert.error('Failed to load products')); };

    const openEdit = (app) => {
        setEditApp(app);
        setName(app.name || '');
        setDescription(app.description || '');
        setSelected([]);
        setCurrentSubs([]);
        ensureApis().catch(() => Alert.error('Failed to load products'));
        new Subscription().getSubscriptions(null, app.applicationId)
            .then((r) => {
                const list = (r && r.obj && r.obj.list) || [];
                setCurrentSubs(list.map((s) => ({ subscriptionId: s.subscriptionId, apiId: s.apiId })));
                setSelected(list.map((s) => s.apiId));
            })
            .catch(() => { /* no subs */ });
    };

    const closeModals = () => { setCreateOpen(false); setEditApp(null); setDeleteApp(null); resetForm(); };

    const subPolicy = (apiId) => {
        const a = apis.find((x) => x.id === apiId);
        return (a && a.throttlingPolicies && a.throttlingPolicies[0]) || DEFAULT_TIER;
    };

    const handleCreate = () => {
        if (!name.trim()) { Alert.warning('Application name is required'); return; }
        setSaving(true);
        const restApi = new API();
        restApi.createApplication({ name: name.trim(), throttlingPolicy: DEFAULT_TIER, description: description.trim(), tokenType: 'JWT' })
            .then((res) => {
                const created = (res && (res.body || res.obj)) || {};
                const appId = created.applicationId;
                if (!appId) throw new Error('Application id not returned');
                return Promise.all(selected.map((id) => restApi.subscribe(id, appId, subPolicy(id)).catch(() => null)));
            })
            .then(() => { Alert.success('Application created'); closeModals(); setPage(1); return loadApps(1, search); })
            .catch((e) => Alert.error(e && e.message ? e.message : 'Failed to create application'))
            .finally(() => setSaving(false));
    };

    const handleSave = () => {
        if (!editApp) return;
        if (!name.trim()) { Alert.warning('Application name is required'); return; }
        setSaving(true);
        const restApi = new API();
        const appId = editApp.applicationId;
        const updated = { ...editApp, name: name.trim(), description: description.trim() };
        const currentIds = currentSubs.map((s) => s.apiId);
        const toAdd = selected.filter((id) => !currentIds.includes(id));
        const toRemove = currentSubs.filter((s) => !selected.includes(s.apiId));
        const subClient = new Subscription();
        Promise.resolve(restApi.updateApplication(updated))
            .then(() => Promise.all([
                ...toAdd.map((id) => restApi.subscribe(id, appId, subPolicy(id)).catch(() => null)),
                ...toRemove.map((s) => subClient.deleteSubscription(s.subscriptionId).catch(() => null)),
            ]))
            .then(() => { Alert.success('Application updated'); closeModals(); return loadApps(page, search); })
            .catch((e) => Alert.error(e && e.message ? e.message : 'Failed to update application'))
            .finally(() => setSaving(false));
    };

    const handleDelete = () => {
        if (!deleteApp) return;
        setSaving(true);
        Application.deleteApp(deleteApp.applicationId)
            .then(() => { Alert.success('Application deleted'); closeModals(); const target = (apps.length === 1 && page > 1) ? page - 1 : page; setPage(target); return loadApps(target, search); })
            .catch((e) => Alert.error(e && e.message ? e.message : 'Failed to delete application'))
            .finally(() => setSaving(false));
    };

    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
    const safePage = Math.min(page, totalPages);
    const pageItems = apps; // server already returns just this page

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 8, bgcolor: C.pageBg, width: '100%', flex: '1 1 auto', minHeight: '100vh' }}>
                <CircularProgress sx={{ color: C.orange }} />
            </Box>
        );
    }

    const modalOpen = createOpen || Boolean(editApp);

    return (
        <Box sx={{ bgcolor: C.pageBg, p: { xs: '20px 16px 40px', sm: '28px 24px 48px', md: '36px 48px 56px' }, width: '100%', flex: '1 1 auto', minWidth: 0 }}>
            {/* header */}
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'stretch', md: 'flex-start' }, gap: 2, mb: 4 }}>
                <Box>
                    <Typography sx={{ fontFamily: POP, fontWeight: 700, fontSize: { xs: 24, sm: 28 }, color: C.name }}>
                        {`My Applications (${total})`}
                    </Typography>
                    <Typography sx={{ fontFamily: POP, fontSize: 14, color: C.muted, mt: 0.5 }}>
                        Manage your applications, credentials and product subscriptions
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'stretch', sm: 'center' }, gap: 1.5, width: { xs: '100%', md: 'auto' } }}>
                    <TextField
                        size="small"
                        placeholder="Search apps..."
                        value={search}
                        onChange={(e) => onSearch(e.target.value)}
                        InputProps={{ startAdornment: (<InputAdornment position="start"><Icon sx={{ color: C.muted, fontSize: 18 }}>search</Icon></InputAdornment>) }}
                        sx={{
                            width: { xs: '100%', sm: 300 },
                            '& .MuiOutlinedInput-root': { bgcolor: C.cardBg, borderRadius: '10px', color: C.name, fontFamily: POP },
                            '& .MuiOutlinedInput-notchedOutline': { borderColor: C.cardBorder },
                            '& input::placeholder': { color: C.muted, opacity: 1 },
                        }}
                    />
                    <Button
                        onClick={openCreate}
                        startIcon={<Icon>add</Icon>}
                        sx={{ bgcolor: C.orange, color: '#fff', textTransform: 'none', fontFamily: POP, fontWeight: 500, fontSize: 14, borderRadius: '10px', px: 2.5, py: 1, whiteSpace: 'nowrap', width: { xs: '100%', sm: 'auto' }, boxShadow: '0 8px 22px rgba(255,95,0,0.30)', '&:hover': { bgcolor: '#ff7a2e' } }}
                    >
                        New Application
                    </Button>
                </Box>
            </Box>

            {/* grid */}
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: '1fr 1fr 1fr' }, gap: 3, alignItems: 'start' }}>
                {pageItems.map((app) => (
                    <AppCard key={app.applicationId} app={app} onEdit={openEdit} onDelete={setDeleteApp} />
                ))}
                {pageItems.length === 0 && (
                    <Typography sx={{ color: C.muted }}>No applications found.</Typography>
                )}
            </Box>

            {/* pagination */}
            {totalPages > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 4 }}>
                    <PageBtn disabled={safePage === 1} onClick={() => goToPage(safePage - 1)}><Icon sx={{ fontSize: 18 }}>chevron_left</Icon></PageBtn>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                        <PageBtn key={n} active={n === safePage} onClick={() => goToPage(n)}>{n}</PageBtn>
                    ))}
                    <PageBtn disabled={safePage === totalPages} onClick={() => goToPage(safePage + 1)}><Icon sx={{ fontSize: 18 }}>chevron_right</Icon></PageBtn>
                </Box>
            )}

            {/* create / edit modal */}
            <Dialog open={modalOpen} onClose={closeModals} maxWidth="md" fullWidth PaperProps={{ sx: { bgcolor: C.modalBg, borderRadius: '16px', backgroundImage: 'none', maxWidth: 720 } }}>
                <Box sx={{ p: 3.5 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Typography sx={{ fontFamily: POP, fontWeight: 600, fontSize: 18, lineHeight: '24px', color: C.name }}>
                            {editApp ? 'Edit Application' : 'Create New Application'}
                        </Typography>
                        <IconButton onClick={closeModals} sx={{ color: C.muted }}><Icon>close</Icon></IconButton>
                    </Box>

                    <Typography sx={labelSx()}>App Name</Typography>
                    <TextField fullWidth size="small" placeholder="My Payments App" value={name} onChange={(e) => setName(e.target.value)} sx={inputSx()} />

                    <Typography sx={labelSx()}>Description</Typography>
                    <TextField fullWidth size="small" placeholder="What does this app do?" value={description} onChange={(e) => setDescription(e.target.value)} sx={inputSx()} />

                    <ProductPicker apis={apis} selected={selected} toggle={toggle} toggleAll={toggleAll} />

                    <Box sx={{ display: 'flex', gap: 2, mt: 3.5 }}>
                        <Button
                            onClick={closeModals}
                            disabled={saving}
                            sx={{ flex: 1, color: C.viewKeys, border: `1px solid ${C.cardBorder}`, borderRadius: '12px', py: 1.5, textTransform: 'none', fontFamily: POP, fontWeight: 500 }}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={editApp ? handleSave : handleCreate}
                            disabled={saving}
                            sx={{ flex: 1, bgcolor: C.orange, color: '#FFFFFF', borderRadius: '12px', py: 1.5, textTransform: 'none', fontFamily: POP, fontWeight: 700, fontSize: 16, lineHeight: '20px', textAlign: 'center', '&:hover': { bgcolor: '#ff7a2e' } }}
                        >
                            {saving ? 'Saving...' : (editApp ? 'Save' : 'Create App')}
                        </Button>
                    </Box>
                </Box>
            </Dialog>

            {/* delete confirm modal */}
            <Dialog
                open={Boolean(deleteApp)}
                onClose={closeModals}
                maxWidth={false}
                PaperProps={{ sx: { bgcolor: C.modalBg, border: `1px solid ${C.cardBorder}`, borderRadius: '20px', backgroundImage: 'none', width: { xs: 'calc(100% - 32px)', sm: 516 }, height: { xs: 'auto',  }, maxWidth: 'none', m: { xs: 2, sm: 4 } } }}
            >
                <Box sx={{ height: '100%', p: { xs: 3, sm: 3 }, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                    <Box sx={{ width: 64, height: 64, borderRadius: '50%', bgcolor: 'rgba(255,69,58,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
                        {/* <Icon sx={{ color: '#FF453A', fontSize: 32 }}>warning_amber</Icon> */}
                        <img src={warningIcon} alt="warning icon"  style={{width:'24px' ,height:'24px'}}  />
                    </Box>
                    
                    <Typography sx={{ fontFamily: POP, fontWeight: 700, fontSize: 20, lineHeight: '100%', color: C.name, mb: 2 }}>
                        Delete Application?
                    </Typography>
                    <Typography sx={{ fontFamily: POP, fontWeight: 400, fontSize: 14, lineHeight: '150%', color: C.muted, mb: 1.5 }}>
                        {`This will permanently remove ${deleteApp ? deleteApp.name : ''}, revoke all credentials, and cancel all product subscriptions.`}
                    </Typography>
                    <Typography sx={{ fontFamily: POP, fontWeight: 700, fontSize: 14, lineHeight: '100%', color: '#FF453A', mb: 4 }}>
                        This cannot be undone.
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, justifyContent: 'center', width: '100%' }}>
                        <Button
                            onClick={closeModals}
                            disabled={saving}
                            sx={{ width: { xs: '100%', sm: 220 }, height: 44, color: C.name, border: `1px solid ${C.cardBorder}`, borderRadius: '12px', textTransform: 'none', fontFamily: INTER, fontWeight: 600, fontSize: 14, lineHeight: '100%' }}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleDelete}
                            disabled={saving}
                            sx={{ width: { xs: '100%', sm: 220 }, height: 44, bgcolor: '#FF453A', color: '#FFFFFF', borderRadius: '12px', textTransform: 'none', fontFamily: INTER, fontWeight: 600, fontSize: 14, lineHeight: '100%', '&:hover': { bgcolor: '#e23b31' } }}
                        >
                            {saving ? 'Deleting...' : 'Delete App'}
                        </Button>
                    </Box>
                </Box>
            </Dialog>
        </Box>
    );
}

function PageBtn({ active, disabled, onClick, children }) {
    return (
        <Button
            onClick={onClick}
            disabled={disabled}
            sx={{
                minWidth: 38, height: 38, p: 0, borderRadius: '8px', fontFamily: POP, fontWeight: 600,
                bgcolor: active ? C.orange : C.cardBg, color: active ? '#fff' : C.viewKeys,
                border: `1px solid ${active ? C.orange : C.cardBorder}`,
                '&:hover': { bgcolor: active ? '#ff7a2e' : C.hoverBg },
            }}
        >
            {children}
        </Button>
    );
}

export default MyApps;
