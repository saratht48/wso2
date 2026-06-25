/* eslint-disable */
/*
 * Try-out modal for the docs API page.
 * Embeds the STOCK ApiConsole (Generate Token + Try API + Postman/Swagger) inside
 * a dialog, so the real functionality runs here without navigating to the API
 * details page. ApiConsole only needs { api: { id } } from ApiContext — it fetches
 * the API details, swagger and subscriptions itself, so nothing is duplicated.
 */
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import { ApiContext } from 'AppComponents/Apis/Details/ApiContext';
import ApiConsole from 'AppComponents/Apis/Details/ApiConsole/ApiConsole';

function ApiTryOutModal({ api, open, onClose }) {
    if (!api || !api.id) return null;
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth='lg'
            fullWidth
            PaperProps={{ sx: { bgcolor: '#0D1117', backgroundImage: 'none', borderRadius: '14px', border: '1px solid #1F2937' } }}
        >
            <Box sx={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                p: '18px 22px', borderBottom: '1px solid #1F2937',
            }}
            >
                <Typography sx={{ fontFamily: "'JetBrains Mono', monospace", color: '#fff', fontWeight: 700, fontSize: 18 }}>
                    {`${api.name || 'API'} — Try Out`}
                </Typography>
                <IconButton onClick={onClose} sx={{ color: '#9CA3AF' }}><Icon>close</Icon></IconButton>
            </Box>
            <DialogContent sx={{ p: 0 }}>
                {/* Mount the console only while open so it fetches fresh + resets on close. */}
                {open && (
                    <ApiContext.Provider value={{ api: { id: api.id } }}>
                        <ApiConsole />
                    </ApiContext.Provider>
                )}
            </DialogContent>
        </Dialog>
    );
}

export default ApiTryOutModal;
