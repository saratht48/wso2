/* eslint-disable */
/*
 * Dynamic "Endpoint" block for the docs API page.
 * Reads the API's real gateway URLs (api.endpointURLs) and offers the working
 * actions: Try out (opens the embedded console modal), Swagger + Postman
 * (download the API definition). Reuses the existing data layer; no navigation.
 */
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import JSFileDownload from 'js-file-download';
import openapiToPostman from 'openapi-to-postmanv2';
import API from 'AppData/api';
import AuthManager from 'AppData/AuthManager';
import { app } from 'Settings';
import Alert from 'AppComponents/Shared/Alert';
import ApiTryOutModal from './ApiTryOutModal';

const ORANGE = '#FF5F00';

const Root = styled('div')(() => ({
    maxWidth: 820,
    marginBottom: 54,
    fontFamily: "'Poppins', sans-serif",
    '& .marker': { color: ORANGE, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 600, letterSpacing: 1, display: 'block', marginBottom: 10 },
    '& .h2': { fontFamily: "'JetBrains Mono', monospace", fontSize: 24, fontWeight: 700, lineHeight: '100%', color: '#E8EDF2', margin: '0 0 16px' },
    '& .epRow': { display: 'flex', alignItems: 'center', gap: 8, background: '#113516', border: '1px solid #FFFFFF1A', borderRadius: 10, padding: '12px 14px', marginBottom: 12 },
    '& .epBadge': { fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, letterSpacing: 0.5, minWidth: 84, flexShrink: 0 },
    '& .epMethod': { fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 700, lineHeight: '16px', color: '#28C840', background: '#28C8401F', border: '0.61px solid #28C84040', padding: '4px 8px', borderRadius: 6 },
    '& .epUrl': { flex: 1, fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: '#A78BFA', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
    '& .epCopy': { cursor: 'pointer', color: '#6B7280', fontSize: 13, background: '#FFFFFF12', border: '1px solid #FFFFFF24', borderRadius: 6, padding: '4px 12px' },
    '& .muted': { color: '#9CA3AF', fontSize: 14, margin: '0 0 12px' },
    '& .epBtns': { display: 'flex', gap: 14, marginTop: 14, flexWrap: 'wrap' },
    '& .epBtn': { cursor: 'pointer', background: 'none', border: `1px solid ${ORANGE}`, color: ORANGE, borderRadius: 10, padding: '13px 22px', fontSize: 15, fontFamily: 'inherit' },
    '& .epBtnGhost': { cursor: 'pointer', background: 'none', border: '1px solid #FFFFFF33', color: '#E5E7EB', borderRadius: 10, padding: '13px 22px', fontSize: 15, fontFamily: 'inherit' },
    '& .epBtnPostman': { cursor: 'pointer', background: '#0A0A0A', border: '1px solid #FFFFFF4D', color: '#E5E7EB', borderRadius: 10, padding: '13px 22px', fontSize: 15, fontFamily: 'inherit' },
    '& .signin': { color: '#9CA3AF', fontSize: 15, lineHeight: '24px', margin: '14px 0 0' },
    '& .signinLink': { color: ORANGE, fontWeight: 700, textDecoration: 'underline', cursor: 'pointer' },
}));

const ENV_COLOR = { SANDBOX: '#4ADE80', PRODUCTION: '#FB923C', DEFAULT: '#A78BFA' };

const buildUrl = (host, api) => {
    if (!host) return '';
    const ctx = api.context || '';
    const ver = api.version || '';
    const tail = ver && !ctx.includes(ver) ? `/${ver}` : '';
    return `${host}${ctx}${tail}`.replace(/([^:])\/\/+/g, '$1/');
};

// Turn api.endpointURLs into [{ env, url }] rows (Production / Sandbox).
const toRows = (api) => {
    const out = [];
    (api.endpointURLs || []).forEach((e) => {
        const host = (e.URLs && (e.URLs.https || e.URLs.http)) || '';
        const url = buildUrl(host, api);
        const type = (e.environmentType || e.environmentName || '').toLowerCase();
        if (e.URLs && e.URLs.https && type.indexOf('sandbox') === -1) out.push({ env: 'PRODUCTION', url });
        // hybrid/default gateways expose both; show a sandbox row when applicable
        if (type.indexOf('sandbox') > -1) out.push({ env: 'SANDBOX', url });
    });
    if (out.length === 0 && (api.endpointURLs || []).length) {
        const e = api.endpointURLs[0];
        const host = (e.URLs && (e.URLs.https || e.URLs.http)) || '';
        out.push({ env: 'PRODUCTION', url: buildUrl(host, api) });
    }
    return out;
};

const copy = (v) => { try { navigator.clipboard.writeText(v); Alert.info('Copied'); } catch (e) { /* ignore */ } };

function ApiEndpoints({ api }) {
    const [open, setOpen] = useState(false);
    const rows = toRows(api);
    const isLoggedIn = !!AuthManager.getUser();
    const signInUrl = `${app.context}/services/configs`;

    const fileBase = (api.name || 'api').replace(/\s+/g, '-').toLowerCase();

    const downloadSwagger = () => {
        new API().getSwaggerByAPIId(api.id)
            .then((res) => {
                const data = (res && (res.obj || res.body || res.data)) || {};
                JSFileDownload(JSON.stringify(data, null, 2), `${fileBase}-swagger.json`);
            })
            .catch(() => Alert.error('Could not download the swagger'));
    };

    // Real Postman conversion (same library the stock console uses).
    const downloadPostman = () => {
        new API().getSwaggerByAPIId(api.id)
            .then((res) => {
                const data = (res && (res.obj || res.body || res.data)) || {};
                const str = typeof data === 'string' ? data : JSON.stringify(data);
                openapiToPostman.convert({ type: 'string', data: str }, {}, (err, result) => {
                    if (result && result.result) {
                        JSFileDownload(JSON.stringify(result.output[0].data), `${fileBase}-postman.json`);
                    } else {
                        Alert.error('Could not convert to a Postman collection');
                    }
                });
            })
            .catch(() => Alert.error('Could not download the Postman collection'));
    };

    return (
        <Root>
            <section id='endpoint'>
                <span className='marker'>{'// ENDPOINT'}</span>
                <h2 className='h2'>Endpoint</h2>
                {rows.length === 0 && (
                    <p className='muted'>No gateway endpoints are available for this API yet.</p>
                )}
                {rows.map((r) => (
                    <div className='epRow' key={r.env + r.url}>
                        <span className='epBadge' style={{ color: ENV_COLOR[r.env] || ENV_COLOR.DEFAULT }}>{r.env}</span>
                        <span className='epMethod'>API</span>
                        <span className='epUrl'>{r.url}</span>
                        <button type='button' className='epCopy' onClick={() => copy(r.url)}>Copy</button>
                    </div>
                ))}
                {isLoggedIn ? (
                    <div className='epBtns'>
                        <button type='button' className='epBtnPostman' onClick={downloadPostman}>Postman Collection</button>
                        <button type='button' className='epBtn' onClick={downloadSwagger}>Swagger (/swagger.json)</button>
                        <button type='button' className='epBtnGhost' onClick={() => setOpen(true)}>Try out API</button>
                    </div>
                ) : (
                    <p className='signin'>
                        <a className='signinLink' href={signInUrl}>Sign In</a> to download and try the API.
                    </p>
                )}
            </section>
            {isLoggedIn && <ApiTryOutModal api={api} open={open} onClose={() => setOpen(false)} />}
        </Root>
    );
}

export default ApiEndpoints;
