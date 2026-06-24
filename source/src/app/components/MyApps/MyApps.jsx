/* eslint-disable */
/*
 * Custom "My Apps" page (LOOP Matrix design).
 * Additive screen — does NOT replace the stock Applications page.
 * Reuses the existing data layer: AppData/Application, AppData/api, AppComponents/Shared/Alert.
 *
 * Phase 2: inline Production/Sandbox keys per card (fetch + generate + revoke + copy).
 * Performance note: each card lazily fetches its own keys (Application.get + getKeys = 2 calls
 * per card). Keys load progressively, independent per card.
 */
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from 'react-router-dom';
import Application from 'AppData/Application';
import API from 'AppData/api';
import Alert from 'AppComponents/Shared/Alert';

const DEFAULT_APP_TIER = 'Unlimited';
const DEFAULT_SUB_TIER = 'Unlimited';
const RESIDENT_KM = 'Resident Key Manager';
const GRANT_TYPES = ['client_credentials', 'password', 'refresh_token'];

const mask = (v) => (v ? `${String(v).slice(0, 4)}••••••••••••••••` : '');

const copyText = (v) => {
    if (!v) return;
    try {
        navigator.clipboard.writeText(v);
        Alert.info('Copied to clipboard');
    } catch (e) {
        Alert.warning('Could not copy');
    }
};

/* A single Key/Secret row with copy */
function KeyValueRow({ label, value }) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.75 }}>
            <Typography variant="caption" sx={{ width: 56, color: 'text.secondary' }}>
                {label}
            </Typography>
            <Box sx={{
                flex: 1,
                fontFamily: 'monospace',
                fontSize: 13,
                px: 1,
                py: 0.5,
                bgcolor: 'action.hover',
                borderRadius: 1,
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
            }}
            >
                {mask(value)}
            </Box>
            <Button size="small" onClick={() => copyText(value)}>Copy</Button>
        </Box>
    );
}

/* Keys block for one environment (Production / Sandbox) of one app instance */
function KeyEnv({
    label, color, keyObj, busy, onGenerate, onRevoke,
}) {
    return (
        <Box sx={{ mt: 1.5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                <Chip size="small" label={label} sx={{ bgcolor: color, color: '#fff' }} />
                {keyObj && keyObj.consumerKey ? (
                    <Button size="small" color="error" onClick={onRevoke} disabled={busy}>
                        Revoke Keys
                    </Button>
                ) : (
                    <Button size="small" color="primary" onClick={onGenerate} disabled={busy}>
                        + Generate Keys
                    </Button>
                )}
            </Box>
            {keyObj && keyObj.consumerKey && (
                <Box>
                    <KeyValueRow label="Key" value={keyObj.consumerKey} />
                    <KeyValueRow label="Secret" value={keyObj.consumerSecret} />
                </Box>
            )}
        </Box>
    );
}

/* One application card */
function AppCard({ app }) {
    const [instance, setInstance] = useState(null);
    const [prodKey, setProdKey] = useState(null);
    const [sandKey, setSandKey] = useState(null);
    const [loadingKeys, setLoadingKeys] = useState(true);
    const [busy, setBusy] = useState('');

    const readKeysFrom = (inst) => {
        setProdKey(inst.productionKeys.get(RESIDENT_KM) || null);
        setSandKey(inst.sandboxKeys.get(RESIDENT_KM) || null);
    };

    useEffect(() => {
        let active = true;
        Application.get(app.applicationId)
            .then((inst) => inst.getKeys('PRODUCTION').then(() => inst))
            .then((inst) => {
                if (!active) return;
                setInstance(inst);
                readKeysFrom(inst);
            })
            .catch(() => { /* keys not available yet — show generate buttons */ })
            .finally(() => { if (active) setLoadingKeys(false); });
        return () => { active = false; };
    }, [app.applicationId]);

    const generate = (keyType) => {
        if (!instance) { Alert.warning('Application not ready yet'); return; }
        setBusy(keyType);
        instance.generateKeys(keyType, GRANT_TYPES, '', {}, RESIDENT_KM)
            .then((res) => {
                if (keyType === 'PRODUCTION') setProdKey(res || null);
                else setSandKey(res || null);
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
                if (keyType === 'PRODUCTION') setProdKey(null);
                else setSandKey(null);
                Alert.success('Keys revoked');
            })
            .catch((e) => Alert.error(e && e.message ? e.message : 'Failed to revoke keys'))
            .finally(() => setBusy(''));
    };

    return (
        <Box sx={{
            border: '1px solid', borderColor: 'divider', borderRadius: 2, p: 2.5,
        }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>{app.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                        {app.description || 'No description'}
                    </Typography>
                </Box>
                <Chip size="small" label={`${app.subscriptionCount || 0} products`} />
            </Box>

            {loadingKeys ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
                    <CircularProgress size={20} />
                </Box>
            ) : (
                <Box>
                    <KeyEnv
                        label="Sandbox"
                        color="#6d4bd8"
                        keyObj={sandKey}
                        busy={busy === 'SANDBOX'}
                        onGenerate={() => generate('SANDBOX')}
                        onRevoke={() => revoke('SANDBOX')}
                    />
                    <KeyEnv
                        label="Production"
                        color="#2e7d32"
                        keyObj={prodKey}
                        busy={busy === 'PRODUCTION'}
                        onGenerate={() => generate('PRODUCTION')}
                        onRevoke={() => revoke('PRODUCTION')}
                    />
                </Box>
            )}

            <Box sx={{ mt: 1.5 }}>
                <Button
                    component={Link}
                    to={`/applications/${app.applicationId}/overview`}
                    size="small"
                >
                    Open full app details
                </Button>
            </Box>
        </Box>
    );
}

function MyApps() {
    const [apps, setApps] = useState([]);
    const [apis, setApis] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [selected, setSelected] = useState([]);
    const [creating, setCreating] = useState(false);

    const loadApps = () => Application.all(50).then((res) => {
        setApps(res && res.list ? res.list : []);
    });

    const loadApis = () => {
        const restApi = new API();
        return restApi.getAllAPIs({ limit: 50 }).then((res) => {
            const body = (res && (res.body || res.obj)) || {};
            setApis(body.list || []);
        });
    };

    useEffect(() => {
        Promise.all([loadApps(), loadApis()])
            .catch(() => Alert.error('Error while loading applications/products'))
            .finally(() => setLoading(false));
    }, []);

    const toggle = (id) => {
        setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
    };

    const toggleAll = () => {
        setSelected((prev) => (prev.length === apis.length ? [] : apis.map((a) => a.id)));
    };

    const closeModal = () => {
        setOpen(false);
        setName('');
        setDescription('');
        setSelected([]);
    };

    const handleCreate = () => {
        if (!name.trim()) {
            Alert.warning('Application name is required');
            return;
        }
        setCreating(true);
        const restApi = new API();
        const payload = {
            name: name.trim(),
            throttlingPolicy: DEFAULT_APP_TIER,
            description: description.trim(),
            tokenType: 'JWT',
        };
        restApi.createApplication(payload)
            .then((res) => {
                const created = (res && (res.body || res.obj)) || {};
                const appId = created.applicationId;
                if (!appId) throw new Error('Application id not returned');
                const subs = selected.map((apiId) => {
                    const apiObj = apis.find((a) => a.id === apiId);
                    const policy = (apiObj && apiObj.throttlingPolicies && apiObj.throttlingPolicies[0])
                        || DEFAULT_SUB_TIER;
                    return restApi.subscribe(apiId, appId, policy).catch(() => null);
                });
                return Promise.all(subs);
            })
            .then(() => {
                Alert.success('Application created');
                closeModal();
                return loadApps();
            })
            .catch((e) => Alert.error(e && e.message ? e.message : 'Failed to create application'))
            .finally(() => setCreating(false));
    };

    const filtered = apps.filter((a) => (a.name || '').toLowerCase().includes(search.toLowerCase()));

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 8 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ p: '28px 24px 40px', maxWidth: 1200, mx: 'auto' }}>
            <Box sx={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3,
            }}
            >
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>My Apps</Typography>
                    <Typography variant="body2" color="text.secondary">
                        Manage your applications, credentials and product subscriptions
                    </Typography>
                </Box>
                <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
                    + New App
                </Button>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <TextField
                    size="small"
                    placeholder="Search apps..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    sx={{ width: 360 }}
                />
                <Typography variant="body2" color="text.secondary">
                    {filtered.length}
                    {' apps'}
                </Typography>
            </Box>

            <Box sx={{
                display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3,
            }}
            >
                {filtered.map((app) => (
                    <AppCard key={app.applicationId} app={app} />
                ))}
                {filtered.length === 0 && (
                    <Typography color="text.secondary">No applications found.</Typography>
                )}
            </Box>

            <Dialog open={open} onClose={closeModal} maxWidth="md" fullWidth>
                <Box sx={{ p: 3 }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                        Create New Application
                    </Typography>

                    <Typography variant="caption" color="text.secondary">APP NAME</Typography>
                    <TextField
                        fullWidth
                        size="small"
                        placeholder="My Payments App"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        sx={{ mb: 2, mt: 0.5 }}
                    />

                    <Typography variant="caption" color="text.secondary">DESCRIPTION</Typography>
                    <TextField
                        fullWidth
                        size="small"
                        placeholder="What does this app do?"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        sx={{ mb: 2, mt: 0.5 }}
                    />

                    <Box sx={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1,
                    }}
                    >
                        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                            Map Products
                            {' ('}
                            {selected.length}
                            {' selected)'}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant="body2">Select all</Typography>
                            <Checkbox
                                checked={apis.length > 0 && selected.length === apis.length}
                                onChange={toggleAll}
                            />
                        </Box>
                    </Box>

                    <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                        gap: 1.5,
                        maxHeight: 340,
                        overflowY: 'auto',
                        mb: 2,
                    }}
                    >
                        {apis.map((api) => (
                            <Box
                                key={api.id}
                                sx={{
                                    display: 'flex',
                                    gap: 1,
                                    p: 1,
                                    border: '1px solid',
                                    borderColor: selected.includes(api.id) ? 'primary.main' : 'divider',
                                    borderRadius: 1.5,
                                }}
                            >
                                <Checkbox
                                    checked={selected.includes(api.id)}
                                    onChange={() => toggle(api.id)}
                                    sx={{ p: 0.5 }}
                                />
                                <Box>
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                        {api.name}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {api.description || api.context || ''}
                                    </Typography>
                                </Box>
                            </Box>
                        ))}
                        {apis.length === 0 && (
                            <Typography color="text.secondary">
                                No products available to map.
                            </Typography>
                        )}
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                        <Button onClick={closeModal} disabled={creating}>Cancel</Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleCreate}
                            disabled={creating}
                        >
                            {creating ? 'Creating...' : 'Create App'}
                        </Button>
                    </Box>
                </Box>
            </Dialog>
        </Box>
    );
}

export default MyApps;
