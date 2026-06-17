/*
 * Copyright (c) 2026, WSO2 LLC. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

/**
 * A simple sample screen built with a functional component.
 * Used to verify that newly added files are picked up by the build.
 * @returns {JSX.Element} the sample page
 */
const SamplePage = () => {
    const [count, setCount] = useState(0);

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                p: 4,
            }}
        >
            <Paper elevation={3} sx={{ p: 4, textAlign: 'center', maxWidth: 480 }}>
                <Typography variant='h4' gutterBottom>
                    🎉 Sample Page
                </Typography>
                <Typography variant='body1' color='textSecondary' gutterBottom>
                    This screen is a functional component added as a brand-new file.
                    If you can see it, new files are being picked up by the build.
                </Typography>
                <Typography variant='h6' sx={{ my: 2 }}>
                    Count:
                    {' '}
                    {count}
                </Typography>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={() => setCount((prev) => prev + 1)}
                >
                    Click me
                </Button>
            </Paper>
        </Box>
    );
};

export default SamplePage;
