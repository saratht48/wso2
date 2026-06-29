/* eslint-disable */
/*
 * Dynamic "SDK" block for the docs API page.
 * Lists the real SDK languages supported by the server (getSdkLanguages) and
 * downloads the generated SDK zip per language (getSdk) — the same data layer
 * the stock SDK screen uses. No navigation.
 */
import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import JSFileDownload from 'js-file-download';
import API from 'AppData/api';
import AuthManager from 'AppData/AuthManager';
import { app } from 'Settings';
import Alert from 'AppComponents/Shared/Alert';

const ORANGE = '#FF5F00';

const Root = styled('div')(() => ({
    maxWidth: 820,
    marginBottom: 44,
    fontFamily: "'Poppins', sans-serif",
    '& .marker': { color: ORANGE, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 600, letterSpacing: 1, display: 'block', marginBottom: 10 },
    '& .h2': { fontFamily: "'JetBrains Mono', monospace", fontSize: 24, fontWeight: 700, lineHeight: '100%', color: '#E8EDF2', margin: '0 0 8px' },
    '& .para': { color: '#9CA3AF', fontSize: 15, lineHeight: '24px', margin: '0 0 16px' },
    '& .sdk': { display: 'flex', alignItems: 'center', gap: 14, background: '#11161f', border: '1px solid #1F2937', borderRadius: 10, padding: '12px 14px', marginBottom: 12 },
    '& .sdkTag': { flex: '0 0 44px', width: 44, height: 44, borderRadius: 8, background: 'rgba(255,95,0,0.12)', color: ORANGE, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, textTransform: 'uppercase' },
    '& .sdkName': { color: '#E5E7EB', fontSize: 14, fontWeight: 600, fontFamily: "'JetBrains Mono', monospace", textTransform: 'capitalize' },
    '& .sdkBtn': { marginLeft: 'auto', cursor: 'pointer', background: ORANGE, color: '#fff', border: 'none', borderRadius: 8, padding: '8px 18px', fontSize: 13, fontFamily: 'inherit' },
    '& .muted': { color: '#9CA3AF', fontSize: 14 },
    '& .signin': { color: '#9CA3AF', fontSize: 15, lineHeight: '24px', margin: 0 },
    '& .signinLink': { color: ORANGE, fontWeight: 700, textDecoration: 'underline', cursor: 'pointer' },
}));

function ApiSdks({ api }) {
    const [langs, setLangs] = useState(null); // null = loading
    const [busy, setBusy] = useState('');
    const isLoggedIn = !!AuthManager.getUser();
    const signInUrl = `${app.context}/services/configs`;

    useEffect(() => {
        if (!isLoggedIn) return undefined; // SDKs need login; show Sign In instead
        let mounted = true;
        new API().getSdkLanguages()
            .then((res) => {
                const body = (res && (res.body || res.obj)) || {};
                const list = Array.isArray(body) ? body : (body.languages || body.list || []);
                if (mounted) setLangs(list);
            })
            .catch(() => { if (mounted) setLangs([]); });
        return () => { mounted = false; };
    }, []);

    const download = (lang) => {
        setBusy(lang);
        new API().getSdk(api.id, lang)
            .then((res) => {
                const fileName = `${(api.name || 'api')}_${api.version || ''}_${lang}.zip`;
                JSFileDownload(res.data, fileName, 'application/zip');
            })
            .catch(() => Alert.error(`Failed to generate the ${lang} SDK`))
            .finally(() => setBusy(''));
    };

    return (
        <Root>
            <section id='sdk'>
                <span className='marker'>{'// SDK'}</span>
                <h2 className='h2'>SDK</h2>
                {!isLoggedIn ? (
                    <p className='signin'>
                        <a className='signinLink' href={signInUrl}>Sign In</a> to download SDKs.
                    </p>
                ) : (
                    <>
                        <p className='para'>Download an integration SDK for your platform.</p>
                        {langs === null && <p className='muted'>Loading SDKs…</p>}
                        {langs && langs.length === 0 && <p className='muted'>SDK generation is not available for this API.</p>}
                        {langs && langs.map((lang) => (
                            <div className='sdk' key={lang}>
                                <span className='sdkTag'>{String(lang).slice(0, 3)}</span>
                                <div className='sdkName'>{lang}</div>
                                <button type='button' className='sdkBtn' disabled={busy === lang} onClick={() => download(lang)}>
                                    {busy === lang ? 'Generating…' : 'Download'}
                                </button>
                            </div>
                        ))}
                    </>
                )}
            </section>
        </Root>
    );
}

export default ApiSdks;
