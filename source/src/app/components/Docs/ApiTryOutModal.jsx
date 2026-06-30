/* eslint-disable */
/*
 * Two-tab Try-out modal for the docs API page (LOOP design shell), with the
 * EXACT stock functionality — nothing skipped:
 *
 *   Tab 1 "Generate Token" -> stock <TryOutController/>  (security type, key type,
 *                              consumer-secret dialog, Get Test Key, key manager…)
 *   Tab 2 "Try API"        -> stock <SwaggerUI/>         (all params + execute + responses)
 *
 * This component is just the state container (a faithful port of ApiConsole's
 * state/handlers) that feeds both stock engines. No logic is re-implemented, so
 * behavior matches the standard API console exactly.
 */
import React, { useEffect, useState, useRef, useCallback } from 'react';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import Api from 'AppData/api';
import Application from 'AppData/Application';
import TryOutController from 'AppComponents/Shared/ApiTryOut/TryOutController';
import SwaggerUI from 'AppComponents/Apis/Details/ApiConsole/SwaggerUI';

const ORANGE = '#FF5F00';
// Exact Figma tokens (Developer Portal node 5144-11524 "Simulator").
const C = {
    modalBg: '#141A21', headerBg: '#0A0D14', panelBg: '#080808', border: '#1F2937',
    text: '#E5E7EB', muted: '#9CA3AF', heading: '#F9FAFB',
    inputBg: '#141A21', ctrlBg: '#0B1220',
    green: '#4C8E43', greenBar: '#113516', greenBorder: '#4C8E43', postBadge: '#25A86C', red: '#E53935',
    mono: "'JetBrains Mono', monospace", pop: "'Poppins', sans-serif", inter: "'Inter', sans-serif",
    // kept for back-compat with code below
    bg: '#141A21',
};

function ApiTryOutModal({ api, open, onClose }) {
    const [tab, setTab] = useState('token');

    // --- state container (ported from ApiConsole) ---
    const [securitySchemeType, setSecuritySchemeType] = useState('OAUTH');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [scopes, setScopes] = useState([]);
    const [selectedKeyType, setSelectedKeyTypeState] = useState('PRODUCTION');
    const [keys, setKeys] = useState(new Map());
    const [productionApiKey, setProductionApiKey] = useState('');
    const [sandboxApiKey, setSandboxApiKey] = useState('');
    const [selectedKeyManager, setSelectedKeyManagerState] = useState('Resident Key Manager');
    const [productionAccessToken, setProductionAccessToken] = useState('');
    const [sandboxAccessToken, setSandboxAccessToken] = useState('');
    const [advAuthHeader, setAdvAuthHeader] = useState('Authorization');
    const [advAuthHeaderValue, setAdvAuthHeaderValue] = useState('');
    const [selectedEndpoint, setSelectedEndpoint] = useState('PRODUCTION');
    const [swagger, setSwagger] = useState(null);
    const [environments, setEnvironments] = useState([]);
    const [selectedEnvironment, setSelectedEnvironment] = useState('');

    const apiClient = new Api();

    useEffect(() => {
        if (!open || !api || !api.id) return;
        // environments + scopes + default security scheme (mirrors ApiConsole.componentDidMount)
        const envs = (api.endpointURLs || []).map((e) => ({ name: e.environmentName, displayName: e.environmentDisplayName || e.environmentName }));
        setEnvironments(envs);
        const firstEnv = envs.length ? envs[0].name : '';
        setSelectedEnvironment(firstEnv);
        setScopes((api.scopes || []).map((s) => (s && s.key ? s.key : s)));
        let def = 'OAUTH';
        const ss = api.securityScheme || [];
        if (ss.indexOf('oauth2') === -1) def = ss.indexOf('api_key') > -1 ? 'API-KEY' : 'BASIC';
        setSecuritySchemeType(def);
        // load swagger for the first environment
        const p = firstEnv ? apiClient.getSwaggerByAPIIdAndEnvironment(api.id, firstEnv) : apiClient.getSwaggerByAPIId(api.id);
        p.then((r) => setSwagger((r && r.obj) || null)).catch(() => setSwagger(null));
    }, [open, api && api.id]);

    const updateSwagger = (environment) => {
        const p = (environment && environments.find((e) => e.name === environment))
            ? apiClient.getSwaggerByAPIIdAndEnvironment(api.id, environment)
            : apiClient.getSwaggerByAPIId(api.id);
        p.then((r) => setSwagger((r && r.obj) || null)).catch(() => {});
    };

    // load existing token for a given key type/manager (ported updateAccessToken)
    const updateAccessToken = (selectedApplication, keyType, keyManager) => {
        if (!selectedApplication) return;
        const kt = keyType || selectedKeyType;
        const km = keyManager || selectedKeyManager;
        if (keys.get(km) && keys.get(km).keyType === kt) {
            const { accessToken } = keys.get(km).token || {};
            if (kt === 'PRODUCTION') setProductionAccessToken(accessToken); else setSandboxAccessToken(accessToken);
            return;
        }
        Application.get(selectedApplication)
            .then((application) => application.getKeys(kt))
            .then((appKeys) => {
                let accessToken;
                if (appKeys.get(km) && appKeys.get(km).keyType === kt) ({ accessToken } = appKeys.get(km).token || {});
                if (appKeys.get(km) && appKeys.get(km).keyType === 'PRODUCTION') setProductionAccessToken(accessToken);
                else setSandboxAccessToken(accessToken);
                setKeys(appKeys);
            })
            .catch(() => {});
    };

    const setSelectedKeyType = (kt, isUpdateToken, selectedApplication) => {
        setSelectedKeyTypeState(kt);
        if (isUpdateToken) updateAccessToken(selectedApplication, kt, selectedKeyManager);
    };
    const setSelectedKeyManager = (kmName, isUpdateToken, selectedApplication) => {
        setSelectedKeyManagerState(kmName);
        if (isUpdateToken) updateAccessToken(selectedApplication, selectedKeyType, kmName);
    };

    // Keep the latest values in a ref so the (stable) accessTokenProvider always
    // reads the current token — SwaggerUI freezes its request interceptor at mount,
    // so a fresh closure each render would otherwise send a stale (empty) token.
    const liveRef = useRef({});
    liveRef.current = {
        securitySchemeType, selectedKeyType, productionAccessToken, sandboxAccessToken,
        productionApiKey, sandboxApiKey, username, password, advAuthHeaderValue,
        advertised: !!(api && api.advertiseInfo && api.advertiseInfo.advertised),
        thirdParty: !!(api && api.gatewayVendor && api.gatewayVendor !== 'wso2'),
    };
    const accessTokenProvider = useCallback(() => {
        const s = liveRef.current;
        if (s.advertised || s.thirdParty) return s.advAuthHeaderValue;
        if (s.securitySchemeType === 'BASIC') return btoa(`${s.username}:${s.password}`);
        if (s.securitySchemeType === 'API-KEY') return s.selectedKeyType === 'PRODUCTION' ? s.productionApiKey : s.sandboxApiKey;
        return s.selectedKeyType === 'PRODUCTION' ? s.productionAccessToken : s.sandboxAccessToken;
    }, []);

    if (!api || !api.id) return null;

    // authorization header for SwaggerUI (mirrors ApiConsole render)
    let authorizationHeader = api.authorizationHeader || 'Authorization';
    if ((api.securityScheme || []).indexOf('api_key') > -1 && securitySchemeType === 'API-KEY') {
        authorizationHeader = api.apiKeyHeader || 'ApiKey';
    }
    if (api.advertiseInfo && api.advertiseInfo.advertised) authorizationHeader = advAuthHeader;

    // Tabs — Poppins 14; active 700 #FF5F00 w/ orange underline, inactive 500 #9CA3AF.
    const tabSx = (active) => ({
        cursor: 'pointer', fontFamily: C.pop, fontSize: 14, lineHeight: '21px',
        fontWeight: active ? 700 : 500, padding: '0 0 14px',
        color: active ? ORANGE : C.muted, borderBottom: `1px solid ${active ? ORANGE : 'transparent'}`,
    });

    return (
        <Dialog open={open} onClose={onClose} maxWidth='md' fullWidth
            PaperProps={{ sx: { bgcolor: C.modalBg, backgroundImage: 'none', borderRadius: '12px', border: `1px solid ${C.border}`, overflow: 'hidden' } }}
        >
            {/* Header — bg #0A0D14 */}
            <Box sx={{
                bgcolor: C.headerBg, p: '0 26px', minHeight: 86, display: 'flex',
                justifyContent: 'space-between', alignItems: 'center',
            }}
            >
                <Box>
                    <Typography sx={{ fontFamily: C.mono, color: '#FFFFFF', fontWeight: 700, fontSize: 18, lineHeight: '24px' }}>
                        {`${api.name || 'API'} API Console`}
                    </Typography>
                    <Typography sx={{ fontFamily: C.pop, color: C.muted, fontSize: 12, lineHeight: '18px', mt: 0.5 }}>
                        {`API Console  >  ${api.name || 'API'}  >  ${tab === 'token' ? 'Generate Token' : 'Try Out'}`}
                    </Typography>
                </Box>
                <IconButton onClick={onClose} sx={{ color: C.muted, border: `2px solid ${C.muted}`, width: 30, height: 30, p: 0 }}>
                    <Icon sx={{ fontSize: 17 }}>close</Icon>
                </IconButton>
            </Box>
            {/* Tabs row — divider rgba(255,255,255,.08) */}
            <Box sx={{ display: 'flex', gap: 4, px: '26px', pt: '16px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <Box sx={tabSx(tab === 'token')} onClick={() => setTab('token')}>Generate Token</Box>
                <Box sx={tabSx(tab === 'try')} onClick={() => setTab('try')}>Try API</Box>
            </Box>

            {/* Real stock engines, themed to EXACT Figma colors (functionality unchanged) */}
            <Box sx={{
                m: '18px 24px', background: C.modalBg, p: 0, maxHeight: '64vh', overflowY: 'auto', overflowX: 'hidden',
                color: C.text, fontFamily: C.pop,
                // ---- TryOutController (MUI) — Generate Token tab (exact Figma 5144-10284) ----
                '& .MuiPaper-root': { background: 'transparent', backgroundImage: 'none', boxShadow: 'none', color: C.text },
                '& .MuiTypography-root': { color: C.text, fontFamily: C.pop },
                // section headings "Security" / "Gateway" — JetBrains Mono 700 14 #FFF.
                // The stock style hard-codes marginLeft:-40px which shifts the heading off the
                // left edge (clipped) in this narrow modal — force it back with !important.
                '& [class*="-categoryHeading"]': { marginLeft: '0 !important', paddingLeft: '0 !important', fontFamily: C.mono, fontWeight: 700, fontSize: 14, color: '#FFFFFF', marginBottom: '12px', display: 'block' },
                // field labels "Security Type"/"Key Type"/"Access Token"/"Environment" — Poppins 500 13 #9CA3AF
                '& [class*="-tryoutHeading"], & .MuiInputLabel-root, & .MuiFormLabel-root': { color: C.muted, fontFamily: C.pop, fontSize: 13, fontWeight: 500 },
                // Figma shows the input labels as STATIC labels above the field (not MUI's floating
                // label in the border notch). Make them flow above + remove the notch gap.
                '& .MuiInputLabel-root, & .MuiInputLabel-root.MuiInputLabel-shrink': { position: 'static', transform: 'none', marginBottom: '6px', maxWidth: '100%', pointerEvents: 'auto' },
                '& .MuiOutlinedInput-notchedOutline legend': { width: 0, maxWidth: 0, padding: 0 },
                // Security Type grid is md=6 in stock — make it full width inside the card
                '& [class*="-centerItems"]': { maxWidth: '100%', flexBasis: '100%' },
                // hide the stock "Security" heading — we render it OUTSIDE the card (below)
                '& [class*="-centerItems"] [class*="-categoryHeading"]': { display: 'none' },
                // hide the "?" help tooltip icon beside GET TEST KEY
                '& [aria-label="Use existing access token or generate a new test key"]': { display: 'none !important' },
                // radios — unchecked #4B5563, selected (active) clearly #FF5F00 ring + dot
                '& .MuiRadio-root, & .MuiCheckbox-root': { color: '#4B5563' },
                '& .MuiRadio-root.Mui-checked, & .Mui-checked': { color: `${ORANGE} !important` },
                // radio labels — Poppins 14 #9CA3AF; selected label turns #FFFFFF
                '& .MuiFormControlLabel-label': { color: C.muted, fontFamily: C.pop, fontSize: 14 },
                '& .MuiFormControlLabel-root:has(.Mui-checked) .MuiFormControlLabel-label': { color: '#FFFFFF' },
                // disabled options (e.g. API Key / Basic when not supported) — keep them
                // a visible grey instead of MUI's near-black disabled colour on the dark row
                '& .MuiFormControlLabel-label.Mui-disabled': { color: `${C.muted} !important` },
                '& .MuiRadio-root.Mui-disabled': { color: '#4B5563' },
                // radio rows sit on dark #080808 r7 (security-type / key-type rows)
                '& .MuiRadioGroup-root': { background: C.panelBg, borderRadius: '7px', padding: '12px 16px', margin: '6px 0 16px' },
                // inputs / dropdowns — bg #080808 / subtle white border / r8 / 48px tall
                '& .MuiOutlinedInput-root': { background: C.panelBg, color: C.text, borderRadius: '8px', minHeight: 48 },
                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.12)' },
                // only the dropdown caret + adornment icons are muted — NOT the radio icons
                // (a broad .MuiSvgIcon-root rule was greying out the selected radio's orange ring)
                '& .MuiSelect-icon': { color: C.muted },
                '& .MuiInputAdornment-root .MuiSvgIcon-root, & .MuiIconButton-root .MuiSvgIcon-root': { color: C.muted },
                '& .MuiButton-contained': { backgroundColor: ORANGE, color: '#fff', boxShadow: 'none' },
                '& .MuiButton-outlined, & .MuiButton-text': { color: ORANGE, borderColor: ORANGE },
                // Get Test Key — ghost orange: bg #0A0D14 / border + text #FF5F00 (Poppins 500)
                '& #gen-test-key': {
                    background: `${C.headerBg} !important`, color: `${ORANGE} !important`,
                    border: `1px solid ${ORANGE} !important`, boxShadow: 'none',
                    fontFamily: C.pop, fontWeight: 500, fontSize: 14, textTransform: 'none', borderRadius: '8px',
                    // match the Access Token input height + sit beside it (clears the static label)
                    height: 48, minHeight: 48, marginTop: '25px',
                },
                '& #gen-test-key:disabled': { background: `${C.headerBg} !important`, color: '#6B7280 !important', borderColor: '#374151 !important' },
                // Fix the stock "Gateway" env selector: heading marginLeft:-40px + centered half-width
                // leaves "Gateway" stranded left in the narrow modal. Re-align left + keep the
                // dropdown a narrow fixed width (Figma ~240px), not full width.
                '& [class*="-gatewayEnvironment"]': { justifyContent: 'flex-start', marginTop: '8px' },
                '& [class*="-gatewayEnvironment"] > .MuiGrid-root': { maxWidth: 280, flexBasis: 280, flexGrow: 0, flexShrink: 0 },
                // ---- SwaggerUI — Try API tab ----
                '& .swagger-ui': { color: C.text, fontFamily: C.pop },
                '& .swagger-ui .info, & .swagger-ui .opblock-tag, & .swagger-ui label, & .swagger-ui .parameter__name, & .swagger-ui .parameter__type, & .swagger-ui table thead tr th, & .swagger-ui table thead tr td, & .swagger-ui .response-col_status, & .swagger-ui .col_header, & .swagger-ui .tab li, & .swagger-ui .opblock-description-wrapper p, & .swagger-ui .opblock-summary-path, & .swagger-ui .opblock-summary-description, & .swagger-ui .renderedMarkdown p': { color: C.text },
                '& .swagger-ui .opblock .opblock-section-header h4, & .swagger-ui .tab li, & .swagger-ui .opblock-title_normal h4': { color: C.heading, fontFamily: C.pop },
                // server selector
                '& .swagger-ui .scheme-container, & .swagger-ui section.models': { background: 'transparent', boxShadow: 'none', border: 'none', padding: 0, margin: '0 0 16px' },
                '& .swagger-ui .servers > label select, & .swagger-ui .scheme-container .schemes > label select': { background: C.ctrlBg, color: C.text, border: `1px solid ${C.border}`, borderRadius: '4px' },
                // panel (opblock) — bg #080808 / border #1F2937 / r8
                '& .swagger-ui .opblock': { background: C.panelBg, border: `1px solid ${C.border}`, borderRadius: '8px', boxShadow: 'none', margin: 0 },
                '& .swagger-ui .opblock .opblock-section-header': { background: 'transparent', boxShadow: 'none', borderColor: C.border },
                // POST summary bar — bg #113516 / border #4C8E43 ; badge #25A86C
                '& .swagger-ui .opblock.opblock-post': { background: C.panelBg, borderColor: C.border },
                '& .swagger-ui .opblock.opblock-post .opblock-summary': { background: C.greenBar, borderColor: C.greenBorder },
                '& .swagger-ui .opblock.opblock-post .opblock-summary-method': { background: C.postBadge },
                // inputs — bg #141A21 / border #1F2937 / r4
                '& .swagger-ui input, & .swagger-ui textarea, & .swagger-ui select': { background: C.inputBg, color: C.text, border: `1px solid ${C.border}`, borderRadius: '4px' },
                // generic buttons
                '& .swagger-ui .btn': { color: C.text, borderColor: C.border, background: 'transparent', boxShadow: 'none' },
                // Execute — GREEN #4C8E43 (not orange)
                '& .swagger-ui .btn.execute': { background: C.green, borderColor: C.green, color: '#fff', borderRadius: '4px', fontFamily: C.pop, fontWeight: 700 },
                // code / curl block — bg #141A21 / border #1F2937
                '& .swagger-ui .microlight, & .swagger-ui .highlight-code, & .swagger-ui .opblock-body pre.microlight': { background: `${C.inputBg} !important`, border: `1px solid ${C.border}`, borderRadius: '4px' },
                '& .swagger-ui .model-box, & .swagger-ui .response-col_description__inner div.renderedMarkdown': { background: C.inputBg },
                // response status colors — 2xx green / 4xx red
                '& .swagger-ui .responses-table .response[data-code^="2"] .response-col_status': { color: C.green },
                '& .swagger-ui .responses-table .response[data-code^="4"] .response-col_status': { color: C.red },
                '& .swagger-ui .responses-inner > div, & .swagger-ui table.responses-table td': { borderColor: C.border },

                // ---- operation tag rows (section headers like "menu", "order") ----
                '& .swagger-ui .opblock-tag': { border: 'none !important', borderBottom: `1px solid ${C.border} !important`, padding: '10px 0 !important', marginBottom: '8px !important', background: 'transparent !important' },
                '& .swagger-ui .opblock-tag a, & .swagger-ui .opblock-tag span:not(small)': { color: `${C.heading} !important`, fontFamily: `${C.pop} !important`, fontWeight: '700 !important', fontSize: '15px !important' },
                '& .swagger-ui .opblock-tag small': { color: `${C.muted} !important`, fontFamily: `${C.pop} !important`, fontSize: '12px !important', fontWeight: '400 !important' },
                '& .swagger-ui .opblock-tag svg, & .swagger-ui .expand-operation svg': { fill: `${C.muted} !important` },

                // ---- GET opblock (blue) ----
                '& .swagger-ui .opblock.opblock-get': { borderColor: '#2563EB !important' },
                '& .swagger-ui .opblock.opblock-get .opblock-summary': { background: '#0F1E3D !important', borderColor: '#2563EB !important' },
                '& .swagger-ui .opblock.opblock-get .opblock-summary-method': { background: '#2563EB !important' },

                // ---- PUT opblock (amber) ----
                '& .swagger-ui .opblock.opblock-put': { borderColor: '#B45309 !important' },
                '& .swagger-ui .opblock.opblock-put .opblock-summary': { background: '#2D1500 !important', borderColor: '#B45309 !important' },
                '& .swagger-ui .opblock.opblock-put .opblock-summary-method': { background: '#B45309 !important' },

                // ---- DELETE opblock (red) ----
                '& .swagger-ui .opblock.opblock-delete': { borderColor: '#DC2626 !important' },
                '& .swagger-ui .opblock.opblock-delete .opblock-summary': { background: '#300A0A !important', borderColor: '#DC2626 !important' },
                '& .swagger-ui .opblock.opblock-delete .opblock-summary-method': { background: '#DC2626 !important' },

                // ---- PATCH opblock (teal) ----
                '& .swagger-ui .opblock.opblock-patch': { borderColor: '#059669 !important' },
                '& .swagger-ui .opblock.opblock-patch .opblock-summary': { background: '#022C22 !important', borderColor: '#059669 !important' },
                '& .swagger-ui .opblock.opblock-patch .opblock-summary-method': { background: '#059669 !important' },

                // summary path + description + lock icon
                '& .swagger-ui .opblock-summary-path, & .swagger-ui .opblock-summary-path a': { color: `${C.text} !important`, fontFamily: `${C.mono} !important`, fontSize: '13px !important' },
                '& .swagger-ui .opblock-summary-description': { color: `${C.muted} !important`, fontFamily: `${C.pop} !important`, fontSize: '12px !important' },
                '& .swagger-ui .authorization__btn svg, & .swagger-ui .opblock-summary-control svg': { fill: `${C.muted} !important` },
                '& .swagger-ui .arrow': { fill: `${C.muted} !important` },

                // ---- expanded opblock body + section headers ----
                '& .swagger-ui .opblock-body': { background: `${C.panelBg} !important` },
                '& .swagger-ui .opblock .opblock-section-header': { background: '#0F141A !important', boxShadow: 'none !important', borderTop: `1px solid ${C.border} !important` },
                '& .swagger-ui .opblock .opblock-section-header h4': { color: `${C.heading} !important`, fontFamily: `${C.pop} !important`, fontWeight: '600 !important', fontSize: '13px !important' },
                '& .swagger-ui .opblock .opblock-section-header label': { color: `${C.muted} !important`, fontFamily: `${C.pop} !important` },

                // ---- "Try it out" button ----
                '& .swagger-ui .try-out__btn': { color: `${ORANGE} !important`, border: `1px solid ${ORANGE} !important`, background: 'transparent !important', borderRadius: '6px !important', fontFamily: `${C.pop} !important`, fontWeight: '600 !important', fontSize: '12px !important', padding: '4px 10px !important' },
                '& .swagger-ui .try-out__btn.cancel': { color: `${C.muted} !important`, border: `1px solid ${C.muted} !important` },

                // ---- Parameter labels + required asterisk ----
                '& .swagger-ui .parameter__name': { color: `${C.text} !important`, fontFamily: `${C.mono} !important`, fontSize: '13px !important', fontWeight: '700 !important' },
                '& .swagger-ui .parameter__name.required span': { color: `${ORANGE} !important` },
                '& .swagger-ui .parameter__type': { color: `${C.muted} !important`, fontFamily: `${C.mono} !important`, fontSize: '11px !important' },
                '& .swagger-ui .parameter__deprecated': { color: `${C.red} !important` },
                '& .swagger-ui table.parameters': { background: 'transparent' },
                '& .swagger-ui table.parameters td, & .swagger-ui table.parameters th': { borderColor: `${C.border} !important`, color: `${C.muted} !important`, fontFamily: `${C.pop} !important`, fontSize: '12px !important' },

                // ---- Tabs (Example Value / Schema, Parameters / Responses) ----
                '& .swagger-ui .tab': { padding: '0 !important' },
                '& .swagger-ui .tab li, & .swagger-ui .tab li button': { color: `${C.muted} !important`, fontFamily: `${C.pop} !important`, fontSize: '12px !important' },
                '& .swagger-ui .tab li.active, & .swagger-ui .tab li.active button': { color: `${ORANGE} !important` },
                '& .swagger-ui .tab li:first-of-type:after': { background: `${ORANGE} !important` },

                // ---- Execute button (already set but boost specificity) ----
                '& .swagger-ui .btn.execute': { background: `${C.green} !important`, borderColor: `${C.green} !important`, color: '#fff !important', borderRadius: '6px !important', fontFamily: `${C.pop} !important`, fontWeight: '700 !important', padding: '8px 20px !important', fontSize: '14px !important' },

                // ---- Clear button ----
                '& .swagger-ui .btn.btn-clear': { color: `${C.muted} !important`, borderColor: `${C.border} !important`, background: 'transparent !important' },

                // ---- Authorize button at top ----
                '& .swagger-ui .btn.authorize': { color: `${ORANGE} !important`, borderColor: `${ORANGE} !important`, background: 'transparent !important' },
                '& .swagger-ui .btn.authorize svg': { fill: `${ORANGE} !important` },

                // ---- Servers section ----
                '& .swagger-ui .servers > label': { color: `${C.muted} !important`, fontFamily: `${C.pop} !important`, fontSize: '12px !important', display: 'flex !important', flexDirection: 'column !important', gap: '4px !important' },
                '& .swagger-ui .servers > label select': { background: `${C.ctrlBg} !important`, color: `${C.text} !important`, border: `1px solid ${C.border} !important`, borderRadius: '6px !important', padding: '6px 10px !important', fontFamily: `${C.mono} !important`, fontSize: '13px !important' },

                // ---- Response area ----
                '& .swagger-ui .live-responses-wrap, & .swagger-ui .responses-wrapper': { background: 'transparent !important' },
                '& .swagger-ui .response-col_description': { color: `${C.text} !important` },
                '& .swagger-ui .response-col_links': { color: `${C.muted} !important` },
                '& .swagger-ui .col_header': { color: `${C.muted} !important`, fontFamily: `${C.pop} !important`, fontSize: '12px !important', fontWeight: '700 !important' },
                '& .swagger-ui .response .response-col_status': { fontFamily: `${C.mono} !important`, fontWeight: '700 !important', fontSize: '14px !important' },

                // ---- Wrapper transparency ----
                '& .swagger-ui .wrapper': { background: 'transparent !important', padding: '0 !important' },
                '& .swagger-ui section.models': { display: 'none' },

                // ---- content type dropdown ----
                '& .swagger-ui .content-type': { background: `${C.inputBg} !important`, color: `${C.text} !important`, border: `1px solid ${C.border} !important`, borderRadius: '4px !important', fontFamily: `${C.pop} !important` },

                // ---- copy to clipboard ----
                '& .swagger-ui .copy-to-clipboard': { background: `${C.border} !important` },
                '& .swagger-ui .copy-to-clipboard button': { background: 'transparent !important', border: 'none !important' },
            }}
            >
                <Box sx={{ display: tab === 'token' ? 'block' : 'none' }}>
                    {/* Info note (Figma) — Inter 14 #9CA3AF on #1F2933 */}
                    <Box sx={{
                        bgcolor: '#1F2933', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px',
                        p: '14px 16px', mb: '18px', fontFamily: C.inter, fontSize: 14, lineHeight: '20px', color: C.muted,
                    }}
                    >
                        You need an access token to try the API. Select your Security Type and Key Type, then click
                        {' '}
                        <Box component='span' sx={{ color: '#FFFFFF', fontWeight: 700 }}>Get Test Key</Box>
                        {' '}
                        to generate a token. If you already have an access token, paste it below.
                    </Box>
                    {/* "Security" heading — OUTSIDE the card (Figma), JetBrains Mono 700 14 #FFF */}
                    <Typography sx={{ fontFamily: C.mono, fontWeight: 700, fontSize: 14, color: '#FFFFFF', mb: '12px' }}>
                        Security
                    </Typography>
                    {/* Card wrapper (Figma) — #1F2933 r8 holding the credential + gateway sections */}
                    <Box sx={{ bgcolor: '#1F2933', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', p: '18px 20px' }}>
                    <TryOutController
                        setSecurityScheme={setSecuritySchemeType}
                        securitySchemeType={securitySchemeType}
                        setSelectedEnvironment={setSelectedEnvironment}
                        selectedEnvironment={selectedEnvironment}
                        productionAccessToken={productionAccessToken}
                        setProductionAccessToken={setProductionAccessToken}
                        sandboxAccessToken={sandboxAccessToken}
                        setSandboxAccessToken={setSandboxAccessToken}
                        swagger={swagger}
                        environments={environments}
                        scopes={scopes}
                        setUsername={setUsername}
                        setPassword={setPassword}
                        username={username}
                        password={password}
                        setSelectedKeyType={setSelectedKeyType}
                        selectedKeyType={selectedKeyType}
                        setSelectedKeyManager={setSelectedKeyManager}
                        selectedKeyManager={selectedKeyManager}
                        updateSwagger={updateSwagger}
                        setKeys={setKeys}
                        setProductionApiKey={setProductionApiKey}
                        setSandboxApiKey={setSandboxApiKey}
                        productionApiKey={productionApiKey}
                        sandboxApiKey={sandboxApiKey}
                        setAdvAuthHeader={setAdvAuthHeader}
                        setAdvAuthHeaderValue={setAdvAuthHeaderValue}
                        advAuthHeader={advAuthHeader}
                        advAuthHeaderValue={advAuthHeaderValue}
                        setSelectedEndpoint={setSelectedEndpoint}
                        selectedEndpoint={selectedEndpoint}
                        api={api}
                        URLs={null}
                    />
                    </Box>
                </Box>
                <Box sx={{ display: tab === 'try' ? 'block' : 'none' }}>
                    {swagger ? (
                        <SwaggerUI
                            api={api}
                            spec={swagger}
                            accessTokenProvider={accessTokenProvider}
                            authorizationHeader={authorizationHeader}
                            securitySchemeType={securitySchemeType}
                        />
                    ) : (
                        <Typography sx={{ color: '#555', fontFamily: C.pop, p: 2 }}>Loading API definition…</Typography>
                    )}
                </Box>
            </Box>

            {/* Footer — tab-specific (Figma). Token: Cancel + Try API(orange). Try: Back + Close. */}
            <Box sx={{
                display: 'flex', alignItems: 'center',
                justifyContent: tab === 'try' ? 'space-between' : 'flex-end', gap: 2,
                bgcolor: C.modalBg, borderTop: `1px solid ${C.border}`, p: '16px 26px',
            }}
            >
                {tab === 'try' ? (
                    <>
                        <Box component='button' type='button' onClick={() => setTab('token')}
                            sx={{
                                cursor: 'pointer', background: C.ctrlBg, border: `1px solid ${C.border}`, color: C.text,
                                borderRadius: '6px', fontFamily: C.pop, fontWeight: 600, fontSize: 14, lineHeight: '21px',
                                px: 2, py: '8px', display: 'flex', alignItems: 'center', gap: 1,
                            }}
                        >
                            <Icon sx={{ fontSize: 16 }}>arrow_back</Icon> Back
                        </Box>
                        <Box component='button' type='button' onClick={onClose}
                            sx={{
                                cursor: 'pointer', background: C.ctrlBg, border: `1px solid ${C.border}`, color: C.text,
                                borderRadius: '6px', fontFamily: C.pop, fontWeight: 600, fontSize: 14, lineHeight: '21px',
                                px: 2, py: '8px',
                            }}
                        >
                            Close
                        </Box>
                    </>
                ) : (
                    <>
                        <Box component='button' type='button' onClick={onClose}
                            sx={{
                                cursor: 'pointer', background: 'none', border: `1px solid ${C.border}`, color: C.muted,
                                borderRadius: '6px', fontFamily: C.pop, fontWeight: 600, fontSize: 14, lineHeight: '21px',
                                px: 2, py: '8px',
                            }}
                        >
                            Cancel
                        </Box>
                        <Box component='button' type='button' onClick={() => setTab('try')}
                            sx={{
                                cursor: 'pointer', background: ORANGE, color: '#fff', border: 'none',
                                borderRadius: '6px', fontFamily: C.pop, fontWeight: 700, fontSize: 14, lineHeight: '21px',
                                px: 2, py: '8px', display: 'flex', alignItems: 'center', gap: 1,
                            }}
                        >
                            Try API <Icon sx={{ fontSize: 18 }}>arrow_forward</Icon>
                        </Box>
                    </>
                )}
            </Box>
        </Dialog>
    );
}

export default ApiTryOutModal;
