/* eslint-disable require-jsdoc */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect, useRef } from 'react';
import { Box, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const ORANGE  = '#ff5500';
const BG      = '#0e1117';
const CARD_BG = '#141A21';
const BORDER  = '#1e2532';
const MUTED   = '#6b7280';
const WHITE   = '#ffffff';
const DIM     = '#4a4f6a';

const chips = ['authentication', 'webhooks', 'payment intent', 'RSA signing'];

const allDocs = [
    { section: 'Payments',       title: 'Create a Payment Intent',      path: '/docs/payments/create-intent' },
    { section: 'Payments',       title: 'Handle Payment Methods',        path: '/docs/payments/methods' },
    { section: 'Webhooks',       title: 'Webhook Events Overview',       path: '/docs/webhooks/events' },
    { section: 'Webhooks',       title: 'Signing Webhook Payloads',      path: '/docs/webhooks/signing' },
    { section: 'Authentication', title: 'API Key Authentication',        path: '/docs/auth/api-keys' },
    { section: 'Authentication', title: 'RSA Request Signing',           path: '/docs/auth/rsa-signing' },
    { section: 'Authentication', title: 'OAuth 2.0 Setup',               path: '/docs/auth/oauth' },
    { section: 'Payments',       title: 'Idempotency Keys',              path: '/docs/payments/idempotency' },
    { section: 'Payments',       title: 'Refunds & Reversals',           path: '/docs/payments/refunds' },
    { section: 'Webhooks',       title: 'Retry Logic & Failures',        path: '/docs/webhooks/retries' },
];

function ResultItem({ item, isActive, onClick }) {
    return (
        <Box
            onClick={onClick}
            sx={{
                display: 'flex', alignItems: 'center',
                justifyContent: 'space-between',
                px: 2, py: 1.25, cursor: 'pointer',
                bgcolor: isActive ? 'rgba(255,85,0,0.08)' : 'transparent',
                borderLeft: `2px solid ${isActive ? ORANGE : 'transparent'}`,
                transition: 'all 0.15s ease',
                '&:hover': { bgcolor: 'rgba(255,85,0,0.06)', borderLeftColor: ORANGE },
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <SearchIcon sx={{ color: isActive ? ORANGE : DIM, fontSize: 15, flexShrink: 0 }} />
                <Box>
                    <Box sx={{ color: isActive ? WHITE : '#c9cdd4', fontSize: '13px', fontFamily: 'Poppins, sans-serif', lineHeight: 1.3 }}>
                        {item.title}
                    </Box>
                    <Box sx={{ color: MUTED, fontSize: '11px', fontFamily: 'JetBrains Mono, Courier New, monospace', mt: 0.25 }}>
                        {item.path}
                    </Box>
                </Box>
            </Box>
            <Box sx={{ color: MUTED, fontSize: '10px', fontWeight: 700, fontFamily: 'JetBrains Mono, Courier New, monospace', letterSpacing: '1px', textTransform: 'uppercase', flexShrink: 0 }}>
                {item.section}
            </Box>
        </Box>
    );
}

// ── Default export — use directly, no wrapper needed ──
export default function SearchModal({ onClose }) {
    const [query, setQuery]         = useState('');
    const [activeIdx, setActiveIdx] = useState(0);
    const inputRef                  = useRef(null);

    const results = query.trim()
        ? allDocs.filter((d) =>
            d.title.toLowerCase().includes(query.toLowerCase()) ||
            d.section.toLowerCase().includes(query.toLowerCase()),
        )
        : [];

    // Auto-focus
    useEffect(() => { setTimeout(() => inputRef.current?.focus(), 50); }, []);

    // Reset active on new results
    useEffect(() => { setActiveIdx(0); }, [results.length]);

    // Keyboard nav
    useEffect(() => {
        const handler = (e) => {
            if (e.key === 'Escape')     { onClose(); return; }
            if (e.key === 'ArrowDown')  { e.preventDefault(); setActiveIdx((p) => Math.min(p + 1, results.length - 1)); }
            if (e.key === 'ArrowUp')    { e.preventDefault(); setActiveIdx((p) => Math.max(p - 1, 0)); }
            if (e.key === 'Enter' && results[activeIdx]) { onClose(); }
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [results, activeIdx, onClose]);

    return (
        <>
            {/* Backdrop */}
            <Box
                onClick={onClose}
                sx={{
                    position: 'fixed', inset: 0,
                    bgcolor: 'rgba(0,0,0,0.65)',
                    backdropFilter: 'blur(4px)',
                    zIndex: 1400,
                }}
            />

            {/* Modal */}
            <Box sx={{
                position: 'fixed',
                top: { xs: 0, sm: '10%' },
                left: '50%',
                transform: 'translateX(-50%)',
                width: { xs: '100%', sm: '560px' },
                maxWidth: '100%',
                maxHeight: { xs: '100%', sm: '520px' },
                height: { xs: '100%', sm: 'auto' },
                bgcolor: BG,
                border: { xs: 'none', sm: `1px solid ${BORDER}` },
                borderRadius: { xs: 0, sm: '14px' },
                display: 'flex', flexDirection: 'column',
                overflow: 'hidden',
                boxShadow: '0 32px 80px rgba(0,0,0,0.7)',
                zIndex: 1401,
            }}>

                {/* Search input */}
                <Box sx={{
                    display: 'flex', alignItems: 'center',
                    gap: 1.5, px: 2, py: 1.5,
                    borderBottom: `1px solid ${BORDER}`,
                    flexShrink: 0,
                }}>
                    <SearchIcon sx={{ color: MUTED, fontSize: 18, flexShrink: 0 }} />
                    <InputBase
                        inputRef={inputRef}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder='Search documentation...'
                        fullWidth
                        sx={{
                            color: WHITE, fontSize: '14px',
                            fontFamily: 'Poppins, sans-serif',
                            '& input::placeholder': { color: MUTED },
                        }}
                    />
                    <Box
                        onClick={onClose}
                        sx={{
                            bgcolor: CARD_BG, border: `1px solid ${BORDER}`,
                            borderRadius: '6px', px: 1, py: 0.35,
                            color: MUTED, fontSize: '10px',
                            fontFamily: 'JetBrains Mono, Courier New, monospace',
                            fontWeight: 700, cursor: 'pointer', flexShrink: 0,
                            '&:hover': { borderColor: ORANGE, color: WHITE },
                            transition: 'all 0.15s ease',
                        }}
                    >
                        ESC
                    </Box>
                </Box>

                {/* Body */}
                <Box sx={{ flex: 1, overflowY: 'auto' }}>

                    {/* Empty state */}
                    {!query.trim() && (
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: { xs: 6, sm: 5 }, px: 3, gap: 3 }}>
                            <SearchIcon sx={{ color: DIM, fontSize: 40 }} />
                            <Box sx={{ color: MUTED, fontSize: '13px', fontFamily: 'Poppins, sans-serif' }}>
                                Search across all documentation
                            </Box>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
                                {chips.map((chip, i) => (
                                    <Box
                                        key={i}
                                        onClick={() => { setQuery(chip); inputRef.current?.focus(); }}
                                        sx={{
                                            bgcolor: CARD_BG, border: `1px solid ${BORDER}`,
                                            borderRadius: '20px', px: 1.75, py: 0.6,
                                            color: '#c9cdd4', fontSize: '12px',
                                            fontFamily: 'Poppins, sans-serif', cursor: 'pointer',
                                            transition: 'all 0.15s ease',
                                            '&:hover': { borderColor: ORANGE, color: WHITE, bgcolor: 'rgba(255,85,0,0.06)' },
                                        }}
                                    >
                                        {chip}
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    )}

                    {/* Results */}
                    {query.trim() && results.length > 0 && (
                        <Box sx={{ py: 1 }}>
                            {results.map((item, i) => (
                                <ResultItem key={i} item={item} isActive={i === activeIdx} onClick={onClose} />
                            ))}
                        </Box>
                    )}

                    {/* No results */}
                    {query.trim() && results.length === 0 && (
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 6, gap: 1 }}>
                            <Box sx={{ color: MUTED, fontSize: '13px', fontFamily: 'Poppins, sans-serif' }}>No results for</Box>
                            <Box sx={{ color: WHITE, fontSize: '14px', fontFamily: 'JetBrains Mono, Courier New, monospace', fontWeight: 700 }}>
                                "{query}"
                            </Box>
                        </Box>
                    )}
                </Box>

                {/* Footer */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 2, sm: 3 }, px: 2, py: 1.25, borderTop: `1px solid ${BORDER}`, flexShrink: 0, flexWrap: 'wrap' }}>
                    {[{ key: '↑↓', label: 'navigate' }, { key: '↵', label: 'select' }, { key: 'ESC', label: 'close' }].map((s, i) => (
                        <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                            <Box sx={{ bgcolor: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: '5px', px: 0.85, py: 0.2, color: '#c9cdd4', fontSize: '10px', fontFamily: 'JetBrains Mono, Courier New, monospace', fontWeight: 700, lineHeight: 1.5 }}>
                                {s.key}
                            </Box>
                            <Box sx={{ color: MUTED, fontSize: '11px', fontFamily: 'Poppins, sans-serif' }}>
                                {s.label}
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>
        </>
    );
}