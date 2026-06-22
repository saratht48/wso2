/* eslint-disable require-jsdoc */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';
import { Box, IconButton, InputBase, Collapse } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const ORANGE  = '#ff5500';
const BG      = '#0A0A0A';
const CARD_BG = '#141A21';
const BORDER  = '#1e2532';
const MUTED   = '#6b7280';
const WHITE   = '#ffffff';

// ── FAQ data ──────────────────────────────────────────
const faqs = [
    {
        q: 'How do I create a Payment Intent?',
        a: 'Use POST /v1/payments with your API key in the Authorization header. Pass amount, currency, and an optional metadata object. The response returns a payment_id and status: "pending".',
    },
    {
        q: 'How do webhooks work?',
        a: 'Register a webhook URL in your dashboard under Settings → Webhooks. Loop will POST a signed JSON payload to your URL on events like payment.success, payment.failed, and refund.created.',
    },
    {
        q: 'How do I sign API requests?',
        a: 'Generate an HMAC-SHA256 signature using your secret key and the raw request body. Include it as X-Loop-Signature in your headers. Verify the same signature on incoming webhooks.',
    },
    {
        q: 'What payment methods are supported?',
        a: 'Loop supports M-Pesa, Visa/Mastercard, bank transfers, and mobile wallets across 10+ African markets. Use GET /v1/payment-methods to see all available options for a given country.',
    },
    {
        q: 'How do I handle idempotency?',
        a: 'Pass a unique Idempotency-Key header with every POST request. If the same key is sent again within 24 hours, Loop returns the original response without creating a duplicate transaction.',
    },
];

// ── FAQ accordion item ────────────────────────────────
function FAQItem({ faq, isOpen, onToggle }) {
    return (
        <Box sx={{
            bgcolor: CARD_BG,
            border: `1px solid ${isOpen ? ORANGE : BORDER}`,
            borderRadius: '10px',
            overflow: 'hidden',
            transition: 'border-color 0.2s ease',
            cursor: 'pointer',
        }}>
            <Box
                onClick={onToggle}
                sx={{
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'space-between',
                    px: 3, py: 2, gap: 1,
                    '&:hover': { bgcolor: 'rgba(255,85,0,0.04)' },
                }}
            >
                <Box sx={{
                    color: isOpen ? WHITE : '#c9cdd4',
                    fontSize: '13px', fontFamily: 'Poppins, sans-serif',
                    lineHeight: 1.4, flex: 1,
                    transition: 'color 0.2s ease',
                }}>
                    {faq.q}
                </Box>
                <Box sx={{ color: isOpen ? ORANGE : MUTED, flexShrink: 0, display: 'flex' }}>
                    {isOpen
                        ? <KeyboardArrowUpIcon sx={{ fontSize: 18 }} />
                        : <KeyboardArrowDownIcon sx={{ fontSize: 18 }} />}
                </Box>
            </Box>
            <Collapse in={isOpen} timeout={200}>
                <Box sx={{ px: 2, pb: 1.5, pt: 0, borderTop: `1px solid ${BORDER}` }}>
                    <Box sx={{
                        color: MUTED, fontSize: '12px',
                        fontFamily: 'Poppins, sans-serif',
                        lineHeight: 1.75, pt: 1.25,
                    }}>
                        {faq.a}
                    </Box>
                </Box>
            </Collapse>
        </Box>
    );
}

// ── Chat message bubble ───────────────────────────────
function ChatMessage({ msg }) {
    const isUser = msg.role === 'user';
    return (
        <Box sx={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start', mb: 1 }}>
            <Box sx={{
                maxWidth: '85%',
                bgcolor: isUser ? ORANGE : CARD_BG,
                border: `1px solid ${isUser ? ORANGE : BORDER}`,
                borderRadius: isUser ? '12px 12px 4px 12px' : '12px 12px 12px 4px',
                px: 1.75, py: 1,
                color: WHITE, fontSize: '12.5px',
                fontFamily: 'Poppins, sans-serif', lineHeight: 1.65,
            }}>
                {msg.text}
            </Box>
        </Box>
    );
}

// ── Chat popup ────────────────────────────────────────
function ChatPopup({ onClose }) {
    const [input, setInput]       = useState('');
    const [openFaq, setOpenFaq]   = useState(null);
    const [messages, setMessages] = useState([]);
    const [view, setView]         = useState('faq');

    const handleSend = () => {
        const trimmed = input.trim();
        if (!trimmed) return;
        const match = faqs.find((f) => f.q.toLowerCase() === trimmed.toLowerCase());
        const botMsg = {
            role: 'bot',
            text: match
                ? match.a
                : "I don't have a specific answer for that yet. Check our docs at docs.loop.dev or reach our support team.",
        };
        setMessages((prev) => [...prev, { role: 'user', text: trimmed }, botMsg]);
        setInput('');
        setView('chat');
    };

    return (
        <Box sx={{
            position: 'fixed',
            bottom: { xs: 0, sm: '70px' },
            right: { xs: 0, sm: '24px' },
            left: { xs: 0, sm: 'auto' },
            top: { xs: 0, sm: 'auto' },
            width: { xs: '100%', sm: '380px' },
            height: { xs: '100%', sm: 'auto' },
            maxHeight: { xs: '100%', sm: '620px' },
            bgcolor: BG,
            border: { xs: 'none', sm: `1px solid ${BORDER}` },
            borderRadius: { xs: 0, sm: '16px' },
            display: 'flex', flexDirection: 'column',
            overflow: 'hidden',
            boxShadow: '0 24px 64px rgba(0, 0, 0, 0.12)',
            zIndex: 1300,
        }}>

            {/* Header */}
            <Box sx={{
                display: 'flex', alignItems: 'center', gap: '12px',
                px: 2, py: 1.5,
                borderBottom: `1px solid ${BORDER}`,
                flexShrink: 0,
            }}>
                <Box sx={{
                    width: 38, height: 38, borderRadius: '50%',
                    bgcolor: ORANGE, display: 'flex',
                    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                    <AddIcon sx={{ color: WHITE, fontSize: 20 }} />
                </Box>

                <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{
                            color: WHITE, fontWeight: 700, fontSize: '15px',
                            fontFamily: 'JetBrains Mono, Courier New, monospace',
                            letterSpacing: '0.5px',
                        }}>
                            LOOP GPT
                        </Box>
                        <Box sx={{
                            bgcolor: 'rgba(255,85,0,0.12)',
                            border: '1px solid rgba(255,85,0,0.3)',
                            color: ORANGE, fontSize: '10px', fontWeight: 600,
                            fontFamily: 'Poppins, sans-serif',
                            px: 1, py: 0.2, borderRadius: '4px', letterSpacing: '0.5px',
                        }}>
                            Beta
                        </Box>
                    </Box>
                    <Box sx={{ color: MUTED, fontSize: '11px', fontFamily: 'Poppins, sans-serif' }}>
                        E-Commerce API Assistant
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                    {view === 'chat' && (
                        <Box
                            onClick={() => { setView('faq'); setMessages([]); }}
                            sx={{
                                color: MUTED, fontSize: '10px', fontFamily: 'Poppins, sans-serif',
                                cursor: 'pointer', px: 1, py: 0.5,
                                border: `1px solid ${BORDER}`, borderRadius: '6px',

                                transition: 'all 0.2s',
                            }}
                        >
                            FAQ
                        </Box>
                    )}
                    <IconButton size='small' sx={{ color: MUTED, '&:hover': { color: WHITE } }} onClick={onClose}>
                        <CloseIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                    <IconButton size='small' sx={{ color: MUTED, '&:hover': { color: WHITE } }}>
                        <OpenInFullIcon sx={{ fontSize: 14 }} />
                    </IconButton>
                </Box>
            </Box>

            {/* Greeting */}
            <Box sx={{ px: 2, pt: 2, pb: 1.5, flexShrink: 0 }}>
                <Box sx={{
                    bgcolor: CARD_BG, border: `1px solid ${BORDER}`,
                    borderRadius: '12px', p: 2,
                    display: 'flex', gap: '12px', alignItems: 'flex-start',
                }}>
                    <Box sx={{
                        width: 32, height: 32, borderRadius: '8px',
                        bgcolor: ORANGE, display: 'flex',
                        alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                        <AddIcon sx={{ color: WHITE, fontSize: 18 }} />
                    </Box>
                    <Box sx={{ color: WHITE, fontSize: '13px', fontFamily: 'Poppins, sans-serif', lineHeight: 1.65 }}>
                        Hey 👋 I'm{' '}
                        <Box component='span' sx={{ fontWeight: 700, fontFamily: 'JetBrains Mono, Courier New, monospace' }}>
                            LOOP GPT
                        </Box>
                        {' '}— your AI assistant for the Loop E-Commerce API.
                        <br />Ask me anything about payments, webhooks, or authentication.
                    </Box>
                </Box>
            </Box>

            {/* Scrollable body */}
            <Box sx={{ flex: 1, overflowY: 'auto', px: 2, pb: 1 }}>
                {view === 'faq' && (
                    <>
                        <Box sx={{
                            color: MUTED, fontSize: '10px', fontWeight: 700,
                            letterSpacing: '1.5px', textTransform: 'uppercase',
                            fontFamily: 'JetBrains Mono, Courier New, monospace',
                            mb: 1.5,
                        }}>
                            Suggested
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {faqs.map((faq, i) => (
                                <FAQItem
                                    key={i}
                                    faq={faq}
                                    isOpen={openFaq === i}
                                    onToggle={() => setOpenFaq((prev) => (prev === i ? null : i))}
                                />
                            ))}
                        </Box>
                    </>
                )}
                {view === 'chat' && (
                    <Box sx={{ pt: 1 }}>
                        {messages.map((msg, i) => <ChatMessage key={i} msg={msg} />)}
                    </Box>
                )}
            </Box>

            {/* Input bar */}
            <Box sx={{ px: 2, py: 1.5, borderTop: `1px solid ${BORDER}`, flexShrink: 0 }}>
                <Box sx={{
                    display: 'flex', alignItems: 'center',
                    bgcolor: CARD_BG, border: `1px solid ${BORDER}`,
                    borderRadius: '10px', px: 1.5, py: 0.5, gap: 1,
                    '&:focus-within': { borderColor: ORANGE },
                    transition: 'border-color 0.2s ease',
                }}>
                    <InputBase
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder='Ask about the Loop API...'
                        fullWidth
                        sx={{
                            color: WHITE, fontSize: '13px',
                            fontFamily: 'Poppins, sans-serif',
                            '& input::placeholder': { color: MUTED },
                        }}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    />
                    <IconButton
                        size='small'
                        onClick={handleSend}
                        sx={{
                            bgcolor: input.trim() ? ORANGE : BORDER,
                            color: WHITE, width: 28, height: 28, flexShrink: 0,
                            transition: 'background 0.2s ease',
                            '&:hover': { bgcolor: input.trim() ? '#e04a00' : BORDER },
                        }}
                    >
                        <ArrowForwardIcon sx={{ fontSize: 15 }} />
                    </IconButton>
                </Box>
                <Box sx={{
                    textAlign: 'center', mt: 1.25,
                    color: MUTED, fontSize: '10px',
                    fontFamily: 'JetBrains Mono, Courier New, monospace',
                    letterSpacing: '0.5px',
                }}>
                    LOOP GPT · Powered by Loop DFS
                </Box>
            </Box>
        </Box>
    );
}

// ── Main — FAB with exact design from image ───────────
export default function AskAI() {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Mobile backdrop */}
            {open && (
                <Box
                    onClick={() => setOpen(false)}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        position: 'fixed', inset: 0,
                        bgcolor: 'rgba(0,0,0,0.5)', zIndex: 1299,
                    }}
                />
            )}

            {open && <ChatPopup onClose={() => setOpen(false)} />}

            {/* ── FAB — outer dark pill container + inner white pill button ── */}
            <Box sx={{
                position: 'fixed',
                bottom: '12px',
                right: '40px',
                zIndex: 1200,
                // Outer dark rounded container (the grey pill in the image)
                bgcolor: '#1a1d2653',
                borderRadius: '50px',
                p: '5px',
                boxShadow: '0 4px 32px rgba(0,0,0,0.5)',
                cursor: 'pointer',
                transition: 'box-shadow 0.25s ease',
                padding:'10px 30px',
                
            }}
                onClick={() => setOpen((prev) => !prev)}
            >
                {/* Inner white pill button */}
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '7px',
                    bgcolor: WHITE,
                    borderRadius: '50px',
                    px: 2,
                    py: 1.2,
                }}>
                    {/* Orange sparkle icon */}
                    <AutoAwesomeIcon sx={{ color: ORANGE, fontSize: 15 }} />
                    {/* Orange text */}
                    <Box sx={{
                        color: ORANGE,
                        fontSize: '13px',
                        fontWeight: 700,
                        fontFamily: 'Poppins, sans-serif',
                        letterSpacing: '0.2px',
                        lineHeight: 1,
                    }}>
                        Ask AI
                    </Box>
                </Box>
            </Box>
        </>
    );
}