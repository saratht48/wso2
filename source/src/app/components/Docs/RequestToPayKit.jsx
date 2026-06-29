/* eslint-disable */
/*
 * Shared "Request to Pay" docs kit.
 *
 * One source of truth for the styles/CSS + rendering of every Request-to-Pay
 * operation page (M-PESA STK Push, LOOP Prompt, ...). Each operation supplies a
 * plain DATA object; buildDoc(data) returns the { toc, intro, middle, end }
 * slots the apiDocRegistry expects.
 *
 * Every color / font-family / font-size / line-height below is taken verbatim
 * from the Figma node (Developer Portal — Request to Pay screens). The only
 * deliberate deviations from the raw file (which was internally inconsistent):
 *   - body paragraphs authored as #000000 (invisible on dark) -> #9CA3AF
 *   - inline code tokens authored in Poppins/Inter -> JetBrains Mono #FB923C
 *   - code blocks get a lightweight syntax highlight in the Figma palette
 */
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';

const ORANGE = '#FF5F00';
const BORDER = 'var(--loop-border, #232a36)';
const SURFACE = 'var(--loop-surface, #11161f)';
const CODEBG = 'var(--loop-code-bg, #0b0e14)';

const copy = (v) => {
    try { navigator.clipboard.writeText(v); } catch (e) { /* ignore */ }
};

// Shared "On this page" table of contents — identical across operations.
export const RTP_TOC = [
    { id: 'endpoint', label: 'Endpoint', active: true },
    { id: 'description', label: 'Description' },
    { id: 'request-parameters', label: 'Request Parameters' },
    { id: 'request-examples', label: 'Request Examples' },
    { id: 'success-response', label: 'Success Response' },
    { id: 'error-response', label: 'Error Response' },
    { id: 'sdk', label: 'SDK' },
    { id: 'faqs', label: 'FAQs' },
];

/* ------------------------------------------------------------ helpers --- */

// Render text with `backtick` tokens highlighted as inline code.
function renderDesc(text) {
    return text.split('`').map((seg, i) => (
        // eslint-disable-next-line react/no-array-index-key
        i % 2 === 1 ? <span className='tok' key={i}>{seg}</span> : <React.Fragment key={i}>{seg}</React.Fragment>
    ));
}

// Lightweight syntax highlight matching the Figma palette:
//   keys #60A5FA · strings #4ADE80 · URL strings #A78BFA · everything else #E2E2E2
function highlight(line) {
    const parts = [];
    const re = /(["'])(?:\\.|(?!\1).)*\1/g;
    let last = 0;
    let m;
    while ((m = re.exec(line)) !== null) {
        if (m.index > last) parts.push({ t: line.slice(last, m.index), c: '#E2E2E2' });
        const rest = line.slice(m.index + m[0].length).replace(/^\s+/, '');
        const isKey = rest.startsWith(':');
        const isUrl = /https?:\/\//.test(m[0]);
        parts.push({ t: m[0], c: isKey ? '#60A5FA' : (isUrl ? '#A78BFA' : '#4ADE80') });
        last = m.index + m[0].length;
    }
    if (last < line.length) parts.push({ t: line.slice(last), c: '#E2E2E2' });
    // eslint-disable-next-line react/no-array-index-key
    return parts.map((p, i) => <span style={{ color: p.c }} key={i}>{p.t}</span>);
}

/* -------------------------------------------------------------- styles --- */

const Root = styled('div')(() => ({
    fontFamily: "'Poppins', 'Helvetica Neue', Arial, sans-serif",
    width: '100%',
    '& .sec': { marginBottom: 44 },
    '& .marker': {
        color: ORANGE, fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
        fontWeight: 500, letterSpacing: 1, display: 'block', marginBottom: 10,
    },
    /* page title — JetBrains Mono 700 / 26 / 31 / #F9FAFB */
    '& .h1': { fontFamily: "'JetBrains Mono', monospace", fontSize: 26, fontWeight: 700, lineHeight: '31px', margin: '0 0 14px', color: '#F9FAFB' },
    /* section headings — JetBrains Mono 700 / 24 / 29 / #F9FAFB (alt #E8EDF2) */
    '& .h2': { fontFamily: "'JetBrains Mono', monospace", fontSize: 24, fontWeight: 700, lineHeight: '29px', margin: '0 0 14px', color: '#F9FAFB' },
    '& .h2alt': { color: '#E8EDF2', lineHeight: '32px' },
    /* lead / paragraph — Poppins 400 / 16 / 24 / #9CA3AF */
    '& .lead': { color: '#9CA3AF', fontWeight: 400, fontSize: 16, lineHeight: '24px', margin: 0, maxWidth: 720 },
    '& .para': { color: '#9CA3AF', fontWeight: 400, fontSize: 16, lineHeight: '24px', margin: '0 0 14px', maxWidth: 720 },
    /* Key Characteristics label — Poppins 700 / 16 / 19 / #6B7280 */
    '& .kchar': { color: '#6B7280', fontWeight: 700, fontSize: 16, lineHeight: '19px', margin: '20px 0 12px' },
    /* bullets — Poppins 400 / 13 / 21 / #9CA3AF */
    '& .points': { listStyle: 'none', padding: 0, margin: 0, maxWidth: 720 },
    '& .points li': { color: '#9CA3AF', fontSize: 13, lineHeight: '21px', paddingLeft: 18, position: 'relative', marginBottom: 4 },
    '& .points li::before': { content: '"•"', color: '#9CA3AF', position: 'absolute', left: 4 },
    /* inline code token — JetBrains Mono 12 / #FB923C */
    '& .tok': { color: '#FB923C', fontFamily: "'JetBrains Mono', monospace", fontSize: 12 },

    /* tables */
    '& .tableWrap': { border: `1px solid ${BORDER}`, borderRadius: 10, overflow: 'hidden', margin: '12px 0', maxWidth: 720 },
    '& table': { width: '100%', borderCollapse: 'collapse' },
    '& td': { padding: '10px 14px', borderBottom: `1px solid ${BORDER}`, verticalAlign: 'top' },
    '& tr:last-child td': { borderBottom: 'none' },
    /* request-params header — JetBrains Mono 400 / 12 / #6B7280 */
    '& th': { textAlign: 'left', color: '#6B7280', fontWeight: 400, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, padding: '10px 14px', background: SURFACE, borderBottom: `1px solid ${BORDER}` },
    /* response/error header — Poppins 400 / 11 / #6B7280 */
    '& .th2 th': { fontFamily: "'Poppins', sans-serif", fontSize: 11 },
    /* param/field name cell — #FB923C 12 */
    '& .tkey': { color: '#FB923C', fontFamily: "'JetBrains Mono', monospace", fontSize: 12 },
    /* type / description cell — Poppins 400 / 13 / 16 / #D1D5DB */
    '& .tcell': { color: '#D1D5DB', fontWeight: 400, fontSize: 13, lineHeight: '16px' },
    /* Required "Yes" — Poppins 700 / 10 / #F87171 */
    '& .yes': { color: '#F87171', fontWeight: 700, fontSize: 10 },

    /* code window */
    '& .code': { background: CODEBG, border: `1px solid ${BORDER}`, borderRadius: 10, overflow: 'hidden', margin: '12px 0', maxWidth: 720 },
    '& .codeBar': { display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${BORDER}`, padding: '8px 12px' },
    '& .codeTabs': { display: 'flex', gap: 14 },
    /* tab — Poppins 11 ; active #FFFFFF / inactive #6B7280 */
    '& .codeTab': { cursor: 'pointer', color: '#6B7280', fontSize: 11, fontFamily: "'Poppins', sans-serif", background: 'none', border: 'none', padding: 0 },
    '& .codeTabActive': { color: '#FFFFFF' },
    '& .codeCopy': { cursor: 'pointer', color: '#6B7280', fontSize: 11, fontFamily: "'Poppins', sans-serif", background: 'none', border: 'none' },
    /* code body — JetBrains Mono 12 / 20 */
    '& .codeBody': { margin: 0, padding: 16, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, lineHeight: '20px', overflowX: 'auto', whiteSpace: 'pre' },

    /* HTTP response example label */
    '& .respLabel': { color: '#6B7280', fontWeight: 700, fontSize: 12, margin: '18px 0 8px' },

    /* amber 503 note — text #FCD34D / Poppins 13 / 21 */
    '& .note': { background: 'rgba(252,211,153,0.08)', border: '1px solid rgba(252,211,153,0.25)', borderRadius: 10, padding: '12px 16px', margin: '14px 0 0', maxWidth: 720 },
    '& .noteText': { color: '#FCD34D', fontWeight: 400, fontSize: 13, lineHeight: '21px', margin: 0 },

    /* FAQ */
    '& .faq': { background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 10, marginBottom: 10, maxWidth: 720 },
    '& .faqQ': { width: '100%', textAlign: 'left', cursor: 'pointer', background: 'none', border: 'none', color: '#D1D5DB', fontSize: 13, lineHeight: '16px', fontWeight: 400, padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: "'Poppins', sans-serif" },
    '& .faqA': { color: '#9CA3AF', fontSize: 13, lineHeight: '21px', padding: '0 16px 14px', maxWidth: 680 },
    '& .faqSign': { color: '#4B5563', fontSize: 14, marginLeft: 12 },
}));

/* ----------------------------------------------------------- sub views --- */

function CodeTabs({ tabsObj }) {
    const names = Object.keys(tabsObj);
    const [sel, setSel] = useState(names[0]);
    return (
        <div className='code'>
            <div className='codeBar'>
                <div className='codeTabs'>
                    {names.map((n) => (
                        <button
                            key={n}
                            type='button'
                            className={`codeTab ${n === sel ? 'codeTabActive' : ''}`}
                            onClick={() => setSel(n)}
                        >
                            {n}
                        </button>
                    ))}
                </div>
                <button type='button' className='codeCopy' onClick={() => copy(tabsObj[sel].join('\n'))}>Copy</button>
            </div>
            <pre className='codeBody'>
                {tabsObj[sel].map((ln, i) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <div key={i}>{highlight(ln)}</div>
                ))}
            </pre>
        </div>
    );
}

function JsonBlock({ lines, label }) {
    return (
        <div className='code'>
            <div className='codeBar'>
                <span className='codeTab codeTabActive'>{label}</span>
                <button type='button' className='codeCopy' onClick={() => copy(lines.join('\n'))}>Copy</button>
            </div>
            <pre className='codeBody'>
                {lines.map((ln, i) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <div key={i}>{highlight(ln)}</div>
                ))}
            </pre>
        </div>
    );
}

function Faq({ q, a }) {
    const [open, setOpen] = useState(false);
    return (
        <div className='faq'>
            <button type='button' className='faqQ' onClick={() => setOpen(!open)}>
                <span>{q}</span>
                <span className='faqSign'>{open ? '−' : '+'}</span>
            </button>
            {open && <div className='faqA'>{a}</div>}
        </div>
    );
}

/* --------------------------------------------------------- doc factory --- */

/**
 * Build the registry slots for one Request-to-Pay operation from a data object.
 * @param {object} data operation content (title, subtitle, params, ...)
 * @returns {object} { toc, intro, middle, end }
 */
export function buildDoc(data) {
    const Intro = () => (
        <Root>
            <section className='sec' style={{ marginBottom: 36 }}>
                <span className='marker'>{data.marker || '// REQUEST TO PAY'}</span>
                <h1 className='h1'>{data.title}</h1>
                <p className='lead'>{data.subtitle}</p>
            </section>
        </Root>
    );

    const Middle = () => (
        <Root>
            <section id='description' className='sec'>
                <span className='marker'>{'// OVERVIEW'}</span>
                <h2 className='h2 h2alt'>Description</h2>
                <p className='para'>{data.description}</p>
                <p className='kchar'>Key Characteristics</p>
                <ul className='points'>
                    {data.keyCharacteristics.map((p) => (<li key={p}>{renderDesc(p)}</li>))}
                </ul>
            </section>

            <section id='request-parameters' className='sec'>
                <span className='marker'>{'// REQUEST'}</span>
                <h2 className='h2 h2alt'>Request Parameters</h2>
                <p className='para'>
                    All fields are required unless marked optional. Send as a JSON body with the request
                    signed per the RSA signing guide.
                </p>
                <div className='tableWrap'>
                    <table>
                        <thead>
                            <tr><th>Parameter</th><th>Type</th><th>Required</th><th>Description</th></tr>
                        </thead>
                        <tbody>
                            {data.params.map((p) => (
                                <tr key={p.name}>
                                    <td className='tkey'>{p.name}</td>
                                    <td className='tcell'>{p.type}</td>
                                    <td><span className='yes'>{p.req}</span></td>
                                    <td className='tcell'>{renderDesc(p.desc)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <section id='request-examples' className='sec'>
                <span className='marker'>{'// EXAMPLES'}</span>
                <h2 className='h2'>Request Examples</h2>
                <CodeTabs tabsObj={data.reqTabs} />
            </section>

            <section id='success-response' className='sec'>
                <span className='marker'>{'// RESPONSE'}</span>
                <h2 className='h2'>Success Response Parameters (HTTP 200)</h2>
                <p className='para'>A successful request returns HTTP 200 OK with the following fields.</p>
                <div className='tableWrap'>
                    <table className='th2'>
                        <thead>
                            <tr><th>Field</th><th>Type</th><th>Description</th></tr>
                        </thead>
                        <tbody>
                            {data.responseFields.map((f) => (
                                <tr key={f.name}>
                                    <td className='tkey'>{f.name}</td>
                                    <td className='tcell'>{f.type}</td>
                                    <td className='tcell'>{renderDesc(f.desc)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className='respLabel'>HTTP Response Example</p>
                <JsonBlock lines={data.responseJson} label='HTTP Response 200' />
            </section>

            <section id='error-response' className='sec'>
                <span className='marker'>{'// ERROR'}</span>
                <h2 className='h2'>Error Responses</h2>
                <p className='para'>The API returns structured error bodies for all failure scenarios.</p>
                <div className='tableWrap'>
                    <table className='th2'>
                        <thead>
                            <tr><th>HTTP Code</th><th>Description</th></tr>
                        </thead>
                        <tbody>
                            {data.errors.map((e) => (
                                <tr key={e.code}>
                                    <td className='tkey'>{e.code}</td>
                                    <td className='tcell'>{renderDesc(e.desc)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {data.note503 && (
                    <div className='note'>
                        <p className='noteText'>{data.note503}</p>
                    </div>
                )}
            </section>
        </Root>
    );

    const End = () => (
        <Root>
            <section id='faqs' className='sec'>
                <span className='marker'>{'// FAQS'}</span>
                <h2 className='h2'>FAQs</h2>
                {data.faqs.map((f) => (<Faq key={f.q} q={f.q} a={f.a} />))}
            </section>
        </Root>
    );

    return {
        toc: RTP_TOC, intro: Intro, middle: Middle, end: End,
    };
}

export default buildDoc;
