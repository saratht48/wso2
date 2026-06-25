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
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import CircularProgress from '@mui/material/CircularProgress';
import Application from 'AppData/Application';
import API from 'AppData/api';
import Subscription from 'AppData/Subscription';
import Alert from 'AppComponents/Shared/Alert';

const C = {
    pageBg: '#080808',          // token
    cardBg: '#141A21',          // token
    cardBorder: '#1F2937',      // token
    name: '#FFFFFF',            // token
    muted: '#6B7280',           // token
    viewKeys: '#9CA3AF',        // token
    red: '#EF4444',             // token
    orange: '#FF5F00',          // default
    sandboxBg: 'rgba(167,139,250,0.14)', sandboxText: '#A78BFA',   // default
    prodBg: 'rgba(52,211,153,0.12)', prodText: '#34D399',          // default
    fieldBg: '#0F141A',         // default
    inputBg: '#0F141A',         // default
    modalBg: '#141A21',         // default
};
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
                    <Icon sx={{ fontSize: 16 }}>content_copy</Icon>
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
        <Box sx={{ bgcolor: '#0B0F14', border: `1px solid ${C.cardBorder}`, borderRadius: '16px', p: 1.75, mb: 1.5 }}>
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
                        sx={{ color: C.orange, border: `1px solid ${C.orange}`, borderRadius: '8px', textTransform: 'none', fontFamily: POP, fontWeight: 600, fontSize: 12, px: 1.5 }}
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
                            startIcon={<Icon sx={{ fontSize: 16 }}>block</Icon>}
                            sx={{ color: C.red, border: `1px solid ${C.red}`, borderRadius: '8px', textTransform: 'none', fontFamily: POP, fontWeight: 600, fontSize: 13, px: 2 }}
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
        <Box sx={{ bgcolor: C.cardBg, border: `1px solid ${C.cardBorder}`, borderRadius: '14px', p: 2.25, display: 'flex', flexDirection: 'column' }}>
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
                    PaperProps={{ sx: { bgcolor: '#141A21', border: '1px solid #FFFFFF1A', width: 180, borderRadius: '10px', backgroundImage: 'none', boxShadow: '0 12px 30px rgba(0,0,0,0.5)' } }}
                    MenuListProps={{ sx: { py: 0 } }}
                >
                    <MenuItem
                        onClick={() => { setAnchor(null); onEdit(app); }}
                        sx={{ fontFamily: INTER, fontWeight: 500, fontSize: 14, py: 1.25, color: '#FFFFFF', borderBottom: '1px solid #FFFFFF1A' }}
                    >
                        <Icon sx={{ fontSize: 18, mr: 1, color: '#FFFFFF' }}>edit</Icon>
                        Edit
                    </MenuItem>
                    <MenuItem
                        onClick={() => { setAnchor(null); onDelete(app); }}
                        sx={{ fontFamily: INTER, fontWeight: 500, fontSize: 14, py: 1.25, color: C.red }}
                    >
                        <Icon sx={{ fontSize: 18, mr: 1, color: C.red }}>delete</Icon>
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

            {/* footer toggle */}
            <Box sx={{ mt: 'auto', pt: 1.5, display: 'flex', justifyContent: 'flex-end' }}>
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
                                bgcolor: '#0B0F14', border: `1px solid ${on ? C.orange : C.cardBorder}`, borderRadius: '10px',
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

const labelSx = { fontFamily: MONO, fontWeight: 500, fontSize: 12, lineHeight: '15px', textTransform: 'uppercase', color: C.muted };
const inputSx = {
    mt: 0.75, mb: 2.5,
    '& .MuiOutlinedInput-root': { bgcolor: C.inputBg, borderRadius: '10px', color: C.name, fontFamily: POP },
    '& .MuiOutlinedInput-notchedOutline': { borderColor: C.cardBorder },
    '& .MuiInputBase-input::placeholder': {
        fontFamily: POP, fontWeight: 400, fontSize: 14, lineHeight: '100%', color: '#444444', opacity: 1,
    },
};

function MyApps() {
    const [apps, setApps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);

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

    const loadApps = () => Application.all(100).then((res) => {
        setApps(res && res.list ? res.list : []);
    });

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
        loadApps()
            .catch(() => Alert.error('Error while loading applications'))
            .finally(() => setLoading(false));
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
            .then(() => { Alert.success('Application created'); closeModals(); return loadApps(); })
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
            .then(() => { Alert.success('Application updated'); closeModals(); return loadApps(); })
            .catch((e) => Alert.error(e && e.message ? e.message : 'Failed to update application'))
            .finally(() => setSaving(false));
    };

    const handleDelete = () => {
        if (!deleteApp) return;
        setSaving(true);
        Application.deleteApp(deleteApp.applicationId)
            .then(() => { Alert.success('Application deleted'); closeModals(); return loadApps(); })
            .catch((e) => Alert.error(e && e.message ? e.message : 'Failed to delete application'))
            .finally(() => setSaving(false));
    };

    const filtered = apps.filter((a) => (a.name || '').toLowerCase().includes(search.toLowerCase()));
    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const safePage = Math.min(page, totalPages);
    const pageItems = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 8, bgcolor: C.pageBg, minHeight: '60vh' }}>
                <CircularProgress sx={{ color: C.orange }} />
            </Box>
        );
    }

    const modalOpen = createOpen || Boolean(editApp);

    return (
        <Box sx={{ bgcolor: C.pageBg, minHeight: '100vh', p: '36px 48px 56px', width: '100%', flex: '1 1 auto', minWidth: 0 }}>
            {/* header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2, mb: 4 }}>
                <Box>
                    <Typography sx={{ fontFamily: POP, fontWeight: 700, fontSize: 28, color: C.name }}>
                        {`My Applications (${filtered.length})`}
                    </Typography>
                    <Typography sx={{ fontFamily: POP, fontSize: 14, color: C.muted, mt: 0.5 }}>
                        Manage your applications, credentials and product subscriptions
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <TextField
                        size="small"
                        placeholder="Search apps..."
                        value={search}
                        onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                        InputProps={{ startAdornment: (<InputAdornment position="start"><Icon sx={{ color: C.muted, fontSize: 18 }}>search</Icon></InputAdornment>) }}
                        sx={{
                            width: 300,
                            '& .MuiOutlinedInput-root': { bgcolor: C.cardBg, borderRadius: '10px', color: C.name, fontFamily: POP },
                            '& .MuiOutlinedInput-notchedOutline': { borderColor: C.cardBorder },
                            '& input::placeholder': { color: C.muted, opacity: 1 },
                        }}
                    />
                    <Button
                        onClick={openCreate}
                        startIcon={<Icon>add</Icon>}
                        sx={{ bgcolor: C.orange, color: '#fff', textTransform: 'none', fontFamily: POP, fontWeight: 500, fontSize: 14, borderRadius: '10px', px: 2.5, py: 1, boxShadow: '0 8px 22px rgba(255,95,0,0.30)', '&:hover': { bgcolor: '#ff7a2e' } }}
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
                {filtered.length === 0 && (
                    <Typography sx={{ color: C.muted }}>No applications found.</Typography>
                )}
            </Box>

            {/* pagination */}
            {totalPages > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 4 }}>
                    <PageBtn disabled={safePage === 1} onClick={() => setPage(safePage - 1)}><Icon sx={{ fontSize: 18 }}>chevron_left</Icon></PageBtn>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                        <PageBtn key={n} active={n === safePage} onClick={() => setPage(n)}>{n}</PageBtn>
                    ))}
                    <PageBtn disabled={safePage === totalPages} onClick={() => setPage(safePage + 1)}><Icon sx={{ fontSize: 18 }}>chevron_right</Icon></PageBtn>
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

                    <Typography sx={labelSx}>App Name</Typography>
                    <TextField fullWidth size="small" placeholder="My Payments App" value={name} onChange={(e) => setName(e.target.value)} sx={inputSx} />

                    <Typography sx={labelSx}>Description</Typography>
                    <TextField fullWidth size="small" placeholder="What does this app do?" value={description} onChange={(e) => setDescription(e.target.value)} sx={inputSx} />

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
                PaperProps={{ sx: { bgcolor: '#141A21', border: '1px solid #1E262F', borderRadius: '16px', backgroundImage: 'none', width: 516, height: 516, maxWidth: 'none' } }}
            >
                <Box sx={{ height: '100%', p: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                    <Box sx={{ width: 64, height: 64, borderRadius: '50%', bgcolor: 'rgba(255,69,58,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
                        <Icon sx={{ color: '#FF453A', fontSize: 32 }}>warning_amber</Icon>
                    </Box>
                    <Typography sx={{ fontFamily: POP, fontWeight: 700, fontSize: 20, lineHeight: '100%', color: '#FFFFFF', mb: 2 }}>
                        Delete Application?
                    </Typography>
                    <Typography sx={{ fontFamily: POP, fontWeight: 400, fontSize: 14, lineHeight: '150%', color: '#6B7280', maxWidth: 380, mb: 1.5 }}>
                        {`This will permanently remove ${deleteApp ? deleteApp.name : ''}, revoke all credentials, and cancel all product subscriptions.`}
                    </Typography>
                    <Typography sx={{ fontFamily: POP, fontWeight: 700, fontSize: 14, lineHeight: '100%', color: '#FF453A', mb: 4 }}>
                        This cannot be undone.
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                        <Button
                            onClick={closeModals}
                            disabled={saving}
                            sx={{ width: 220, height: 44, color: '#FFFFFF', border: `1px solid ${C.cardBorder}`, borderRadius: '12px', textTransform: 'none', fontFamily: INTER, fontWeight: 600, fontSize: 14, lineHeight: '100%' }}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleDelete}
                            disabled={saving}
                            sx={{ width: 220, height: 44, bgcolor: '#FF453A', color: '#FFFFFF', borderRadius: '12px', textTransform: 'none', fontFamily: INTER, fontWeight: 600, fontSize: 14, lineHeight: '100%', '&:hover': { bgcolor: '#e23b31' } }}
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
                '&:hover': { bgcolor: active ? '#ff7a2e' : '#1b232d' },
            }}
        >
            {children}
        </Button>
    );
}

export default MyApps;
