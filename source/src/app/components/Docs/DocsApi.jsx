/* eslint-disable */
/*
 * Generic LOOP API documentation page (route: /docs/loop-api/:apiHandle).
 *
 * Layout = interleaved static slots + dynamic blocks, in a FIXED order:
 *   [ intro ]  ->  <ApiEndpoints>  ->  [ middle ]  ->  <ApiSdks>  ->  [ end ]
 *
 * - Static slots come from apiDocRegistry (mapped by API name). Any slot is optional.
 * - <ApiEndpoints> and <ApiSdks> are dynamic, driven by the real published API.
 * - APIs with no registry entry show a "Documentation coming soon" header, but the
 *   dynamic Endpoints + SDKs (and Try-out) still work.
 */
import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import API from 'AppData/api';
import DocsLayout from './DocsLayout';
import { getApiDoc, slugify } from './apiDocRegistry';
import ApiEndpoints from './ApiEndpoints';
import ApiSdks from './ApiSdks';

const ORANGE = '#FF5F00';

const COMING_SOON_TOC = [
    { id: 'endpoint', label: 'Endpoint', active: true },
    { id: 'sdk', label: 'SDK' },
];

const ComingSoonRoot = styled('div')(() => ({
    maxWidth: 820,
    marginBottom: 32,
    fontFamily: "'Poppins', sans-serif",
    '& .marker': { color: ORANGE, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 600, letterSpacing: 1, display: 'block', marginBottom: 10 },
    '& .h1': { fontFamily: "'JetBrains Mono', monospace", fontSize: 24, fontWeight: 700, color: '#E8EDF2', margin: '0 0 14px' },
    '[data-loop-theme="light"] & .h1': { color: '#111827' },
    '& .soon': { display: 'inline-block', color: ORANGE, background: 'rgba(255,95,0,0.12)', border: '1px solid rgba(255,95,0,0.4)', borderRadius: 20, fontSize: 12, fontWeight: 600, padding: '4px 12px', marginBottom: 16 },
    '& .lead': { color: '#9CA3AF', fontSize: 16, lineHeight: '27px', margin: 0, maxWidth: 680 },
    '[data-loop-theme="light"] & .lead': { color: '#6B7280' },
}));

function ComingSoon({ name, notFound }) {
    return (
        <ComingSoonRoot>
            <span className='marker'>{'// API'}</span>
            <h1 className='h1'>{name}</h1>
            <span className='soon'>Documentation coming soon</span>
            <p className='lead'>
                {notFound
                    ? 'This API is not published yet, or no documentation has been added for it.'
                    : 'Detailed documentation is on the way. In the meantime you can explore the endpoint, try it out, and grab an SDK below.'}
            </p>
        </ComingSoonRoot>
    );
}

function DocsApi(props) {
    const { match } = props;
    const handle = (match && match.params && match.params.apiHandle) || '';
    const doc = getApiDoc(handle);
    const [api, setApi] = useState(undefined); // undefined = loading, null = not found

    useEffect(() => {
        let mounted = true;
        const restApi = new API();
        restApi.getAllAPIs({ limit: 200 })
            .then((res) => {
                const body = (res && (res.body || res.obj)) || {};
                const list = body.list || [];
                const found = list.find((a) => slugify(a.name) === slugify(handle));
                if (!found) { if (mounted) setApi(null); return null; }
                // Fetch full details (endpointURLs etc.) for the dynamic blocks.
                return restApi.getAPIById(found.id).then((r) => {
                    const full = (r && (r.obj || r.body)) || found;
                    if (mounted) setApi(full);
                });
            })
            .catch(() => { if (mounted) setApi(null); });
        return () => { mounted = false; };
    }, [handle]);

    const IntroSlot = doc && doc.intro;
    const MiddleSlot = doc && doc.middle;
    const EndSlot = doc && doc.end;
    const ready = Boolean(api && api.id);

    return (
        <DocsLayout activeNav={slugify(handle)} tocSections={doc ? doc.toc : COMING_SOON_TOC}>
            {IntroSlot ? <IntroSlot /> : <ComingSoon name={(api && api.name) || handle} notFound={api === null} />}
            {ready && <ApiEndpoints api={api} />}
            {MiddleSlot && <MiddleSlot />}
            {ready && <ApiSdks api={api} />}
            {EndSlot && <EndSlot />}
        </DocsLayout>
    );
}

export default DocsApi;
