/*
 * Copyright (c) 2026, WSO2 LLC. (http://www.wso2.com).
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

const PREFIX = 'DevCodeWindow';

const classes = {
    bar: `${PREFIX}-bar`,
    dots: `${PREFIX}-dots`,
    dot: `${PREFIX}-dot`,
    fileName: `${PREFIX}-fileName`,
    body: `${PREFIX}-body`,
    line: `${PREFIX}-line`,
};

const Root = styled('div')(() => ({
    backgroundColor: '#0B0F14',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 14,
    overflow: 'hidden',
    width: '100%',
    boxSizing: 'border-box',
    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
    [`& .${classes.bar}`]: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 16px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        backgroundColor: 'rgba(255,255,255,0.02)',
    },
    [`& .${classes.dots}`]: {
        display: 'flex',
        gap: 8,
    },
    [`& .${classes.dot}`]: {
        width: 12,
        height: 12,
        borderRadius: '50%',
    },
    [`& .${classes.fileName}`]: {
        fontFamily: "'JetBrains Mono', 'Courier New', monospace",
        fontSize: 13,
        color: '#6B7280',
    },
    [`& .${classes.body}`]: {
        margin: 0,
        padding: '20px 22px',
        fontFamily: "'JetBrains Mono', 'Courier New', monospace",
        fontSize: 13.5,
        lineHeight: '22px',
        whiteSpace: 'pre',
        overflowX: 'auto',
    },
    [`& .${classes.line}`]: {
        display: 'block',
        minHeight: 22,
    },
}));

/**
 * Pick a syntax colour for a single line of pseudo-code.
 * @param {string} line the raw code line
 * @returns {string} the hex colour
 */
function lineColor(line) {
    const trimmed = line.trimStart();
    if (trimmed.startsWith('//')) {
        return '#5A6B7B';
    }
    if (trimmed.startsWith('npm') || trimmed.startsWith('import')) {
        return '#FF8940';
    }
    return '#D6E2EE';
}

/**
 * A macOS-style terminal / editor window rendering pseudo-code lines.
 * @param {object} props component props
 * @returns {JSX.Element} the code window
 */
function CodeWindow({ fileName, lines }) {
    return (
        <Root>
            <div className={classes.bar}>
                <div className={classes.dots}>
                    <span className={classes.dot} style={{ backgroundColor: '#FF5F57' }} />
                    <span className={classes.dot} style={{ backgroundColor: '#FEBC2E' }} />
                    <span className={classes.dot} style={{ backgroundColor: '#28C840' }} />
                </div>
                <span className={classes.fileName}>{fileName}</span>
            </div>
            <pre className={classes.body}>
                {lines.map((line, i) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <span key={i} className={classes.line} style={{ color: lineColor(line) }}>
                        {line || ' '}
                    </span>
                ))}
            </pre>
        </Root>
    );
}

CodeWindow.propTypes = {
    fileName: PropTypes.string.isRequired,
    lines: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CodeWindow;
