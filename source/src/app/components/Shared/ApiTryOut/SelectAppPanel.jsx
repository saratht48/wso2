/* eslint-disable */
import React from 'react';
import { FormControl, FormControlLabel, RadioGroup, Radio } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const ORANGE = '#FF5F00';
const panelBg = '#080808';
const border = 'rgba(255,255,255,0.12)';
const muted = '#9CA3AF';
const textColor = '#E5E7EB';
const pop = "'Poppins', sans-serif";

const labelSx = { display: 'block', fontFamily: pop, fontSize: 13, fontWeight: 500, color: muted, mb: '6px' };

const fieldSx = {
    width: '100%',
    '& .MuiOutlinedInput-root': { background: panelBg, color: textColor, borderRadius: '8px', minHeight: 48, fontFamily: pop, fontSize: 14 },
    '& .MuiOutlinedInput-notchedOutline': { borderColor: border },
    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.25)' },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: ORANGE },
    '& .MuiOutlinedInput-notchedOutline legend': { width: 0, maxWidth: 0, padding: 0 },
    '& .MuiInputLabel-root': { display: 'none' },
    '& .MuiSelect-icon': { color: muted },
    '& .MuiFormHelperText-root': { display: 'none' },
};

const radioSx = { color: '#4B5563', '&.Mui-checked': { color: ORANGE } };

const menuProps = {
    PaperProps: {
        sx: {
            background: '#141A21',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '8px',
            mt: '4px',
            '& .MuiMenuItem-root': {
                fontFamily: pop,
                color: textColor,
                fontSize: 14,
                '&:hover': { background: '#1F2937' },
                '&.Mui-selected': { background: '#1F2937' },
                '&.Mui-selected:hover': { background: '#374151' },
            },
        },
    },
};

const SelectAppPanel = (props) => {
    let { selectedApplication, selectedKeyType } = props;
    const { subscriptions, handleChanges, allApplications } = props;

    const handleSelectPanelChange = (event) => {
        const { target } = event;
        const { name, value } = target;
        switch (name) {
            case 'selectedApplication': selectedApplication = value; break;
            case 'selectedKeyType': selectedKeyType = value; break;
            default: break;
        }
        handleChanges(event);
    };

    return (
        <Box sx={{ width: '100%' }}>
            {/* Application dropdown */}
            <Box sx={{ mb: 3 }}>
                <Box component='span' sx={labelSx}>
                    {allApplications !== null ? 'Available applications' : 'Subscribed applications'}
                </Box>
                <TextField
                    fullWidth
                    id='selected-application'
                    select
                    value={selectedApplication}
                    name='selectedApplication'
                    onChange={handleSelectPanelChange}
                    variant='outlined'
                    margin='none'
                    sx={fieldSx}
                    SelectProps={{ MenuProps: menuProps }}
                >
                    {allApplications !== null
                        ? allApplications.map((app) => (
                            <MenuItem value={app.applicationId} key={app.applicationId}
                                sx={{ fontFamily: pop, color: textColor, background: '#141A21', '&:hover': { background: '#1F2937' }, '&.Mui-selected': { background: '#1F2937' } }}>
                                {app.name}
                            </MenuItem>
                        ))
                        : subscriptions.map((sub) => (
                            <MenuItem value={sub.applicationInfo.applicationId} key={sub.applicationInfo.applicationId}
                                sx={{ fontFamily: pop, color: textColor, background: '#141A21', '&:hover': { background: '#1F2937' }, '&.Mui-selected': { background: '#1F2937' } }}>
                                {sub.applicationInfo.name}
                            </MenuItem>
                        ))
                    }
                </TextField>
            </Box>

            {/* Key Type radios */}
            <Box sx={{ mb: 3 }}>
                <Box component='span' sx={labelSx} id='key-type'>Key Type</Box>
                <FormControl variant='standard' component='fieldset' sx={{ width: '100%' }}>
                    <RadioGroup
                        name='selectedKeyType'
                        value={selectedKeyType}
                        onChange={handleSelectPanelChange}
                        aria-labelledby='key-type'
                        row
                        sx={{ background: panelBg, borderRadius: '7px', padding: '12px 16px', gap: 2 }}
                    >
                        {allApplications !== null ? (
                            <>
                                <FormControlLabel value='PRODUCTION' control={<Radio sx={radioSx} />}
                                    label={<span style={{ fontFamily: pop, fontSize: 14, color: muted }}>Production</span>} />
                                <FormControlLabel value='SANDBOX' control={<Radio sx={radioSx} />}
                                    label={<span style={{ fontFamily: pop, fontSize: 14, color: muted }}>Sandbox</span>} />
                            </>
                        ) : (
                            <>
                                {subscriptions !== null && subscriptions.length > 0 && selectedApplication
                                    && subscriptions.find((sub) => sub.applicationId === selectedApplication)
                                    && (subscriptions.find((sub) => sub.applicationId === selectedApplication).status === 'UNBLOCKED'
                                        || subscriptions.find((sub) => sub.applicationId === selectedApplication).status === 'TIER_UPDATE_PENDING')
                                    && (
                                        <FormControlLabel value='PRODUCTION' control={<Radio sx={radioSx} />}
                                            label={<span style={{ fontFamily: pop, fontSize: 14, color: muted }}>Production</span>} />
                                    )}
                                <FormControlLabel value='SANDBOX' control={<Radio sx={radioSx} />}
                                    label={<span style={{ fontFamily: pop, fontSize: 14, color: muted }}>Sandbox</span>} />
                            </>
                        )}
                    </RadioGroup>
                </FormControl>
            </Box>
        </Box>
    );
};

export default SelectAppPanel;
