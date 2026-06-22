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

// Shared stroke icons used across the FAQ / Help Center sections.

const propTypes = { color: PropTypes.string.isRequired, size: PropTypes.number };
const defaultProps = { size: 20 };

/**
 * Question-mark in a circle (General category).
 * @param {object} props component props
 * @returns {JSX.Element} the icon
 */
export function QuestionIcon({ color, size }) {
    return (
        <svg width={size} height={size} viewBox='0 0 24 24' fill='none' aria-hidden='true'>
            <circle cx='12' cy='12' r='9' stroke={color} strokeWidth='2' />
            <path d='M9.5 9.5a2.5 2.5 0 1 1 3.6 2.2c-.7.4-1.1 1-1.1 1.8' stroke={color} strokeWidth='2' strokeLinecap='round' />
            <circle cx='12' cy='17' r='0.6' fill={color} stroke={color} strokeWidth='0.8' />
        </svg>
    );
}
QuestionIcon.propTypes = propTypes;
QuestionIcon.defaultProps = defaultProps;

/**
 * Credit-card glyph (Payments / Wallets).
 * @param {object} props component props
 * @returns {JSX.Element} the icon
 */
export function CardIcon({ color, size }) {
    return (
        <svg width={size} height={size} viewBox='0 0 24 24' fill='none' aria-hidden='true'>
            <rect x='2' y='5' width='20' height='14' rx='2' stroke={color} strokeWidth='2' />
            <path d='M2 10h20' stroke={color} strokeWidth='2' />
        </svg>
    );
}
CardIcon.propTypes = propTypes;
CardIcon.defaultProps = defaultProps;

/**
 * Shopping-bag glyph (E-Commerce).
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
 * Four-square grid glyph (Miniapps).
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
 * Tag glyph (Vouchers).
 * @param {object} props component props
 * @returns {JSX.Element} the icon
 */
export function TagIcon({ color, size }) {
    return (
        <svg width={size} height={size} viewBox='0 0 24 24' fill='none' aria-hidden='true'>
            <path d='M3 11.5V4a1 1 0 0 1 1-1h7.5a1 1 0 0 1 .7.3l8 8a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0l-8-8a1 1 0 0 1-.3-.7Z' stroke={color} strokeWidth='2' strokeLinejoin='round' />
            <circle cx='7.5' cy='7.5' r='1.4' fill={color} />
        </svg>
    );
}
TagIcon.propTypes = propTypes;
TagIcon.defaultProps = defaultProps;

/**
 * Shield glyph (E-KYC).
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
 * Dollar glyph (Credit-as-a-Service).
 * @param {object} props component props
 * @returns {JSX.Element} the icon
 */
export function DollarIcon({ color, size }) {
    return (
        <svg width={size} height={size} viewBox='0 0 24 24' fill='none' aria-hidden='true'>
            <path d='M12 2v20M16.5 6.5A4 4 0 0 0 13 5h-2a3.5 3.5 0 0 0 0 7h2a3.5 3.5 0 0 1 0 7H9a4 4 0 0 1-3.5-1.5' stroke={color} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
        </svg>
    );
}
DollarIcon.propTypes = propTypes;
DollarIcon.defaultProps = defaultProps;

/**
 * Wallet glyph (Wallets-as-a-Service).
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
 * Magnifier glyph (search bar).
 * @param {object} props component props
 * @returns {JSX.Element} the icon
 */
export function SearchIcon({ color, size }) {
    return (
        <svg width={size} height={size} viewBox='0 0 24 24' fill='none' aria-hidden='true'>
            <circle cx='11' cy='11' r='7' stroke={color} strokeWidth='2' />
            <path d='M21 21l-4.3-4.3' stroke={color} strokeWidth='2' strokeLinecap='round' />
        </svg>
    );
}
SearchIcon.propTypes = propTypes;
SearchIcon.defaultProps = defaultProps;

/**
 * Plus glyph (collapsed accordion).
 * @param {object} props component props
 * @returns {JSX.Element} the icon
 */
export function PlusIcon({ color, size }) {
    return (
        <svg width={size} height={size} viewBox='0 0 24 24' fill='none' aria-hidden='true'>
            <path d='M12 5v14M5 12h14' stroke={color} strokeWidth='2' strokeLinecap='round' />
        </svg>
    );
}
PlusIcon.propTypes = propTypes;
PlusIcon.defaultProps = defaultProps;

/**
 * Close / X glyph (expanded accordion).
 * @param {object} props component props
 * @returns {JSX.Element} the icon
 */
export function CloseIcon({ color, size }) {
    return (
        <svg width={size} height={size} viewBox='0 0 24 24' fill='none' aria-hidden='true'>
            <path d='M6 6l12 12M18 6 6 18' stroke={color} strokeWidth='2' strokeLinecap='round' />
        </svg>
    );
}
CloseIcon.propTypes = propTypes;
CloseIcon.defaultProps = defaultProps;

/**
 * Right-arrow glyph (active category / quick actions).
 * @param {object} props component props
 * @returns {JSX.Element} the icon
 */
export function ArrowRightIcon({ color, size }) {
    return (
        <svg width={size} height={size} viewBox='0 0 24 24' fill='none' aria-hidden='true'>
            <path d='M5 12h14M13 6l6 6-6 6' stroke={color} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
        </svg>
    );
}
ArrowRightIcon.propTypes = propTypes;
ArrowRightIcon.defaultProps = defaultProps;
