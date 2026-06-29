/* eslint-disable require-jsdoc */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect, useRef } from 'react';
import { Box, InputBase, CircularProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useHistory } from 'react-router-dom';
import { getSuggestions, buildSearchQuery, getPath } from 'AppComponents/Base/Header/Search/SearchUtils';
import { slugify } from 'AppComponents/Docs/apiDocRegistry';
import { getLoopThemeMode } from 'AppComponents/Shared/LoopTheme';

/*
 * Light/dark palettes for the search popup.
 * Dark = the original look. Light = exact Figma values (nodes 4146-11066 empty
 * state + 4146-12801 results): white card, #111111 titles, #6B7280/#9CA3AF text,
 * #FF5F00 accents, light-grey chips/keys (#F3F4F6 / #E5E7EB), #FFF7ED active row.
 */
const DARK = {
    bg: '#0e1117', cardBg: '#141A21', border: '#1e2532', muted: '#6b7280',
    dim: '#4a4f6a', orange: '#ff5500', backdrop: 'rgba(0,0,0,0.65)',
    shadow: '0 32px 80px rgba(0,0,0,0.7)', strongText: '#ffffff',
    titleActive: '#ffffff', titleInactive: '#c9cdd4', chipText: '#c9cdd4',
    activeBg: 'rgba(255,85,0,0.08)', hoverBg: 'rgba(255,85,0,0.06)',
};
const LIGHT = {
    bg: '#ffffff', cardBg: '#F3F4F6', border: '#E5E7EB', muted: '#6b7280',
    dim: '#D1D5DB', orange: '#FF5F00', backdrop: 'rgba(17,24,39,0.35)',
    shadow: '0 20px 60px rgba(0,0,0,0.18)', strongText: '#111111',
    titleActive: '#111111', titleInactive: '#111111', chipText: '#9CA3AF',
    activeBg: '#FFF7ED', hoverBg: '#FFF7ED',
};

const chips = ['authentication', 'webhooks', 'payment intent', 'RSA signing'];

// Display label for a search result (real API/doc object).
const titleOf = (s) => s.displayName || s.name || s.apiName || '';
// Short type tag shown on the right (API / DOC / MCP / DEFINITION …).
const sectionOf = (s) => (s.type || '').toString().toUpperCase();

// Destination for a clicked result. API / API-PRODUCT / DEFINITION (and docs that
// belong to an API) all navigate to the same LOOP-API docs screen
// (/docs/loop-api/<slug-of-api-name>) instead of the API overview. Anything with
// no resolvable API name falls back to its canonical path.
const pathForResult = (s) => {
    const type = (s.type || '').toString().toUpperCase();
    if (type === 'API' || type === 'APIPRODUCT') {
        return `/docs/loop-api/${slugify(titleOf(s))}`;
    }
    // DEFINITION / documents carry their parent API's name.
    const apiName = s.apiDisplayName || s.apiName;
    if (apiName) {
        return `/docs/loop-api/${slugify(apiName)}`;
    }
    return getPath(s);
};

function ResultItem({ item, isActive, onSelect, P }) {
    return (
        <Box
            onClick={() => onSelect(item)}
            sx={{
                display: 'flex', alignItems: 'center',
                justifyContent: 'space-between',
                px: 2, py: 1.25, cursor: 'pointer',
                bgcolor: isActive ? P.activeBg : 'transparent',
                borderLeft: `2px solid ${isActive ? P.orange : 'transparent'}`,
                transition: 'all 0.15s ease',
                '&:hover': { bgcolor: P.hoverBg, borderLeftColor: P.orange },
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, minWidth: 0 }}>
                <SearchIcon sx={{ color: isActive ? P.orange : P.dim, fontSize: 15, flexShrink: 0 }} />
                <Box sx={{ minWidth: 0 }}>
                    <Box sx={{ color: isActive ? P.titleActive : P.titleInactive, fontSize: '13px', fontFamily: 'Poppins, sans-serif', lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {titleOf(item)}
                    </Box>
                    <Box sx={{ color: P.muted, fontSize: '11px', fontFamily: 'JetBrains Mono, Courier New, monospace', mt: 0.25, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {pathForResult(item)}
                    </Box>
                </Box>
            </Box>
            <Box sx={{ color: P.muted, fontSize: '10px', fontWeight: 700, fontFamily: 'JetBrains Mono, Courier New, monospace', letterSpacing: '1px', textTransform: 'uppercase', flexShrink: 0, ml: 1 }}>
                {sectionOf(item)}
            </Box>
        </Box>
    );
}

// ── Default export — use directly, no wrapper needed ──
export default function SearchModal({ onClose }) {
    const [query, setQuery]         = useState('');
    const [results, setResults]     = useState([]);
    const [loading, setLoading]     = useState(false);
    const [activeIdx, setActiveIdx] = useState(0);
    const inputRef                  = useRef(null);
    const history                   = useHistory();

    // Pick the palette from the current LOOP theme mode (light/dark).
    const P = getLoopThemeMode() === 'light' ? LIGHT : DARK;

    // Real search — same data source as the existing HeaderSearch (debounced).
    useEffect(() => {
        const text = query.trim();
        if (!text) { setResults([]); setLoading(false); return undefined; }
        setLoading(true);
        const t = setTimeout(() => {
            getSuggestions(text, '')
                .then((body) => { setResults((body && body.obj && body.obj.list) || []); })
                .catch(() => setResults([]))
                .finally(() => setLoading(false));
        }, 300);
        return () => clearTimeout(t);
    }, [query]);

    // Navigate to a selected result (same paths as HeaderSearch), then close.
    const goToResult = (item) => {
        if (!item) return;
        history.push(pathForResult(item));
        onClose();
    };

    // Full-text search results page (same as pressing Enter in HeaderSearch).
    const goToSearchPage = () => {
        if (!query.trim()) return;
        history.push('/search?query=' + buildSearchQuery(query, ''));
        onClose();
    };

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
            if (e.key === 'Enter') {
                if (results[activeIdx]) goToResult(results[activeIdx]);
                else goToSearchPage();
            }
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [results, activeIdx, query]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            {/* Backdrop */}
            <Box
                onClick={onClose}
                sx={{
                    position: 'fixed', inset: 0,
                    bgcolor: P.backdrop,
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
                bgcolor: P.bg,
                border: { xs: 'none', sm: `1px solid ${P.border}` },
                borderRadius: { xs: 0, sm: '14px' },
                display: 'flex', flexDirection: 'column',
                overflow: 'hidden',
                boxShadow: P.shadow,
                zIndex: 1401,
            }}>

                {/* Search input */}
                <Box sx={{
                    display: 'flex', alignItems: 'center',
                    gap: 1.5, px: 2, py: 1.5,
                    borderBottom: `1px solid ${P.border}`,
                    flexShrink: 0,
                }}>
                    <SearchIcon sx={{ color: P.muted, fontSize: 18, flexShrink: 0 }} />
                    <InputBase
                        inputRef={inputRef}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder='Search documentation...'
                        fullWidth
                        sx={{
                            color: P.titleActive, fontSize: '14px',
                            fontFamily: 'Poppins, sans-serif',
                            '& input::placeholder': { color: P.muted, opacity: 1 },
                        }}
                    />
                    {loading && <CircularProgress size={16} sx={{ color: P.muted, flexShrink: 0 }} />}
                    <Box
                        onClick={onClose}
                        sx={{
                            bgcolor: P.cardBg, border: `1px solid ${P.border}`,
                            borderRadius: '6px', px: 1, py: 0.35,
                            color: P.muted, fontSize: '10px',
                            fontFamily: 'JetBrains Mono, Courier New, monospace',
                            fontWeight: 700, cursor: 'pointer', flexShrink: 0,
                            '&:hover': { borderColor: P.orange, color: P.strongText },
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
                            <SearchIcon sx={{ color: P.dim, fontSize: 40 }} />
                            <Box sx={{ color: P.muted, fontSize: '13px', fontFamily: 'Poppins, sans-serif' }}>
                                Search across all documentation
                            </Box>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
                                {chips.map((chip, i) => (
                                    <Box
                                        key={i}
                                        onClick={() => { setQuery(chip); inputRef.current?.focus(); }}
                                        sx={{
                                            bgcolor: P.cardBg, border: `1px solid ${P.border}`,
                                            borderRadius: '20px', px: 1.75, py: 0.6,
                                            color: P.chipText, fontSize: '12px',
                                            fontFamily: 'JetBrains Mono, Courier New, monospace', fontWeight: 500, cursor: 'pointer',
                                            transition: 'all 0.15s ease',
                                            '&:hover': { borderColor: P.orange, color: P.strongText, bgcolor: P.hoverBg },
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
                                <ResultItem key={item.id || i} item={item} isActive={i === activeIdx} onSelect={goToResult} P={P} />
                            ))}
                        </Box>
                    )}

                    {/* No results */}
                    {query.trim() && !loading && results.length === 0 && (
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 6, gap: 1 }}>
                            <Box sx={{ color: P.muted, fontSize: '13px', fontFamily: 'Poppins, sans-serif' }}>No results for</Box>
                            <Box sx={{ color: P.strongText, fontSize: '14px', fontFamily: 'JetBrains Mono, Courier New, monospace', fontWeight: 700 }}>
                                "{query}"
                            </Box>
                        </Box>
                    )}
                </Box>

                {/* Footer */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 2, sm: 3 }, px: 2, py: 1.25, borderTop: `1px solid ${P.border}`, flexShrink: 0, flexWrap: 'wrap' }}>
                    {[{ key: '↑↓', label: 'navigate' }, { key: '↵', label: 'select' }, { key: 'ESC', label: 'close' }].map((s, i) => (
                        <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                            <Box sx={{ bgcolor: P.cardBg, border: `1px solid ${P.border}`, borderRadius: '5px', px: 0.85, py: 0.2, color: P.chipText, fontSize: '10px', fontFamily: 'JetBrains Mono, Courier New, monospace', fontWeight: 700, lineHeight: 1.5 }}>
                                {s.key}
                            </Box>
                            <Box sx={{ color: P.muted, fontSize: '11px', fontFamily: 'Poppins, sans-serif' }}>
                                {s.label}
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>
        </>
    );
}
