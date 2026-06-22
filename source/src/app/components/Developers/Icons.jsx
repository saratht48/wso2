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

// Shared stroke icons used across the developer-resources landing sections.

const propTypes = { color: PropTypes.string.isRequired, size: PropTypes.number };
const defaultProps = { size: 24 };

/**
 * Lightning-bolt glyph.
 * @param {object} props component props
 * @returns {JSX.Element} the icon
 */
export function ZapIcon({ color, size }) {
    return (
        <svg width={size} height={size} viewBox='0 0 24 24' fill='none' aria-hidden='true'>
            <path d='M13 2 4 14h7l-1 8 9-12h-7l1-8Z' stroke={color} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
        </svg>
    );
}
ZapIcon.propTypes = propTypes;
ZapIcon.defaultProps = defaultProps;

/**
 * Globe glyph.
 * @param {object} props component props
 * @returns {JSX.Element} the icon
 */
export function GlobeIcon({ color, size }) {
    return (
        <svg width={size} height={size} viewBox='0 0 24 24' fill='none' aria-hidden='true'>
            <circle cx='12' cy='12' r='9' stroke={color} strokeWidth='2' />
            <path d='M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18' stroke={color} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
        </svg>
    );
}
GlobeIcon.propTypes = propTypes;
GlobeIcon.defaultProps = defaultProps;

/**
 * Shield glyph.
 * @param {object} props component props
 * @returns {JSX.Element} the icon
 */
export function ShieldIcon({ color, size }) {
    return (
        <svg width={size} height={size} viewBox='0 0 24 24' fill='none' aria-hidden='true'>
            <path d='M12 3 4 6v6c0 5 3.5 7.5 8 9 4.5-1.5 8-4 8-9V6l-8-3Z' stroke={color} strokeWidth='2' strokeLinejoin='round' />
        </svg>
    );
}
ShieldIcon.propTypes = propTypes;
ShieldIcon.defaultProps = defaultProps;

/**
 * Four-square grid glyph.
 * @param {object} props component props
 * @returns {JSX.Element} the icon
 */
export function GridIcon({ color, size }) {
    return (
        <svg width={size} height={size} viewBox='0 0 24 24' fill='none' aria-hidden='true'>
            <rect x='3' y='3' width='7' height='7' rx='1.5' stroke={color} strokeWidth='2' />
            <rect x='14' y='3' width='7' height='7' rx='1.5' stroke={color} strokeWidth='2' />
            <rect x='3' y='14' width='7' height='7' rx='1.5' stroke={color} strokeWidth='2' />
            <rect x='14' y='14' width='7' height='7' rx='1.5' stroke={color} strokeWidth='2' />
        </svg>
    );
}
GridIcon.propTypes = propTypes;
GridIcon.defaultProps = defaultProps;

/**
 * Terminal / point-of-sale glyph.
 * @param {object} props component props
 * @returns {JSX.Element} the icon
 */
export function TerminalIcon({ color, size }) {
    return (
        <svg width={size} height={size} viewBox='0 0 24 24' fill='none' aria-hidden='true'>
            <rect x='3' y='4' width='18' height='16' rx='2' stroke={color} strokeWidth='2' />
            <path d='m7 9 3 3-3 3M13 15h4' stroke={color} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
        </svg>
    );
}
TerminalIcon.propTypes = propTypes;
TerminalIcon.defaultProps = defaultProps;

/**
 * Stacked-layers glyph.
 * @param {object} props component props
 * @returns {JSX.Element} the icon
 */
export function LayersIcon({ color, size }) {
    return (
        <svg width={size} height={size} viewBox='0 0 24 24' fill='none' aria-hidden='true'>
            <path d='m12 3 9 5-9 5-9-5 9-5Z' stroke={color} strokeWidth='2' strokeLinejoin='round' />
            <path d='m3 13 9 5 9-5M3 17l9 5 9-5' stroke={color} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
        </svg>
    );
}
LayersIcon.propTypes = propTypes;
LayersIcon.defaultProps = defaultProps;

/**
 * Angle-brackets (code) glyph.
 * @param {object} props component props
 * @returns {JSX.Element} the icon
 */
export function CodeIcon({ color, size }) {
    return (
        <svg width={size} height={size} viewBox='0 0 24 24' fill='none' aria-hidden='true'>
            <path d='m8 6-6 6 6 6M16 6l6 6-6 6' stroke={color} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
        </svg>
    );
}
CodeIcon.propTypes = propTypes;
CodeIcon.defaultProps = defaultProps;

/**
 * Circled check glyph.
 * @param {object} props component props
 * @returns {JSX.Element} the icon
 */
export function CheckCircleIcon({ color, size }) {
    return (
        <svg width={size} height={size} viewBox='0 0 24 24' fill='none' aria-hidden='true'>
            <circle cx='12' cy='12' r='9' stroke={color} strokeWidth='2' />
            <path d='m8.5 12 2.5 2.5 4.5-5' stroke={color} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
        </svg>
    );
}
CheckCircleIcon.propTypes = propTypes;
CheckCircleIcon.defaultProps = defaultProps;

/**
 * Shopping-bag glyph (e-commerce tab).
 * @param {object} props component props
 * @returns {JSX.Element} the icon
 */
export function BagIcon({ color, size }) {
    return (
        <svg width={size} height={size} viewBox='0 0 24 24' fill='none' aria-hidden='true'>
            <path d='M6 7h12l-1 13H7L6 7Z' stroke={color} strokeWidth='2' strokeLinejoin='round' />
            <path d='M9 7a3 3 0 0 1 6 0' stroke={color} strokeWidth='2' strokeLinecap='round' />
        </svg>
    );
}
BagIcon.propTypes = propTypes;
BagIcon.defaultProps = defaultProps;

/**
 * Upward-trend glyph (credit / investment tab).
 * @param {object} props component props
 * @returns {JSX.Element} the icon
 */
export function TrendingIcon({ color, size }) {
    return (
        <svg width={size} height={size} viewBox='0 0 24 24' fill='none' aria-hidden='true'>
            <path d='M3 17 9 11l4 4 8-8M15 7h6v6' stroke={color} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
        </svg>
    );
}
TrendingIcon.propTypes = propTypes;
TrendingIcon.defaultProps = defaultProps;

/**
 * Wallet glyph (wallets tab).
 * @param {object} props component props
 * @returns {JSX.Element} the icon
 */
export function WalletIcon({ color, size }) {
    return (
        <svg width={size} height={size} viewBox='0 0 24 24' fill='none' aria-hidden='true'>
            <rect x='3' y='6' width='18' height='13' rx='2' stroke={color} strokeWidth='2' />
            <path d='M3 10h18M16 14h2' stroke={color} strokeWidth='2' strokeLinecap='round' />
        </svg>
    );
}
WalletIcon.propTypes = propTypes;
WalletIcon.defaultProps = defaultProps;

/**
 * Four-point sparkle glyph (badge accent).
 * @param {object} props component props
 * @returns {JSX.Element} the icon
 */
export function SparkleIcon({ color, size }) {
    return (
        <svg width={size} height={size} viewBox='0 0 24 24' fill='none' aria-hidden='true'>
            <path d='M12 3c.6 4.2 1.8 5.4 6 6-4.2.6-5.4 1.8-6 6-.6-4.2-1.8-5.4-6-6 4.2-.6 5.4-1.8 6-6Z' fill={color} />
        </svg>
    );
}
SparkleIcon.propTypes = propTypes;
SparkleIcon.defaultProps = defaultProps;
