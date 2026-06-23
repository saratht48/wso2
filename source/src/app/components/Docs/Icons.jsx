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

// Shared stroke icons used across the LOOP API docs overview.

const propTypes = { color: PropTypes.string.isRequired, size: PropTypes.number };
const defaultProps = { size: 18 };

/* eslint-disable max-len -- inline SVG path data */

/**
 * @param {object} props props
 * @returns {JSX.Element} bag icon (E-Commerce)
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
 * @param {object} props props
 * @returns {JSX.Element} transfer icon (Payments)
 */
export function TransferIcon({ color, size }) {
    return (
        <svg width={size} height={size} viewBox='0 0 24 24' fill='none' aria-hidden='true'>
            <path d='M4 8h13l-3-3M20 16H7l3 3' stroke={color} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
        </svg>
    );
}
TransferIcon.propTypes = propTypes;
TransferIcon.defaultProps = defaultProps;

/**
 * @param {object} props props
 * @returns {JSX.Element} star icon (Credit)
 */
export function StarIcon({ color, size }) {
    return (
        <svg width={size} height={size} viewBox='0 0 24 24' fill='none' aria-hidden='true'>
            <path d='M12 3l2.6 5.27 5.82.85-4.21 4.1.99 5.8L12 16.9 6.8 19.02l.99-5.8-4.21-4.1 5.82-.85L12 3Z' stroke={color} strokeWidth='2' strokeLinejoin='round' />
        </svg>
    );
}
StarIcon.propTypes = propTypes;
StarIcon.defaultProps = defaultProps;

/**
 * @param {object} props props
 * @returns {JSX.Element} ticket icon (Vouchers)
 */
export function TicketIcon({ color, size }) {
    return (
        <svg width={size} height={size} viewBox='0 0 24 24' fill='none' aria-hidden='true'>
            <path d='M4 7h16v3a2 2 0 0 0 0 4v3H4v-3a2 2 0 0 0 0-4V7Z' stroke={color} strokeWidth='2' strokeLinejoin='round' />
            <path d='M14 7v10' stroke={color} strokeWidth='2' strokeDasharray='2 2' />
        </svg>
    );
}
TicketIcon.propTypes = propTypes;
TicketIcon.defaultProps = defaultProps;

/**
 * @param {object} props props
 * @returns {JSX.Element} shield-person icon (E-KYC)
 */
export function KycIcon({ color, size }) {
    return (
        <svg width={size} height={size} viewBox='0 0 24 24' fill='none' aria-hidden='true'>
            <path d='M12 3 5 5.5V11c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V5.5L12 3Z' stroke={color} strokeWidth='2' strokeLinejoin='round' />
            <circle cx='12' cy='10' r='2' stroke={color} strokeWidth='2' />
            <path d='M8.5 15.5a3.5 3.5 0 0 1 7 0' stroke={color} strokeWidth='2' strokeLinecap='round' />
        </svg>
    );
}
KycIcon.propTypes = propTypes;
KycIcon.defaultProps = defaultProps;

/**
 * @param {object} props props
 * @returns {JSX.Element} wallet icon (Wallet-as-a-Service)
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
 * @param {object} props props
 * @returns {JSX.Element} book icon (Introduction)
 */
export function BookIcon({ color, size }) {
    return (
        <svg width={size} height={size} viewBox='0 0 24 24' fill='none' aria-hidden='true'>
            <path d='M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5Z' stroke={color} strokeWidth='2' strokeLinejoin='round' />
            <path d='M4 19a2 2 0 0 0 2 2h13' stroke={color} strokeWidth='2' strokeLinecap='round' />
        </svg>
    );
}
BookIcon.propTypes = propTypes;
BookIcon.defaultProps = defaultProps;

/**
 * @param {object} props props
 * @returns {JSX.Element} house icon (Introduction)
 */
export function HomeIcon({ color, size }) {
    return (
        <svg width={size} height={size} viewBox='0 0 24 24' fill='none' aria-hidden='true'>
            <path d='M4 11 12 4l8 7' stroke={color} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
            <path d='M6 10v9h12v-9' stroke={color} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
        </svg>
    );
}
HomeIcon.propTypes = propTypes;
HomeIcon.defaultProps = defaultProps;

/**
 * @param {object} props props
 * @returns {JSX.Element} rocket icon (Get Started)
 */
export function RocketIcon({ color, size }) {
    return (
        <svg width={size} height={size} viewBox='0 0 24 24' fill='none' aria-hidden='true'>
            <path d='M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2a2.83 2.83 0 0 0-3-3Z' stroke={color} strokeWidth='2' strokeLinejoin='round' />
            <path d='M9 13c-1.5-3 0-7 5-10 3 0 5 2 5 5-3 5-7 6.5-10 5Z' stroke={color} strokeWidth='2' strokeLinejoin='round' />
            <circle cx='14.5' cy='8.5' r='1.3' fill={color} />
        </svg>
    );
}
RocketIcon.propTypes = propTypes;
RocketIcon.defaultProps = defaultProps;

/**
 * @param {object} props props
 * @returns {JSX.Element} compass icon (Get Started)
 */
export function CompassIcon({ color, size }) {
    return (
        <svg width={size} height={size} viewBox='0 0 24 24' fill='none' aria-hidden='true'>
            <circle cx='12' cy='12' r='9' stroke={color} strokeWidth='2' />
            <path d='m15.5 8.5-2 5-5 2 2-5 5-2Z' stroke={color} strokeWidth='2' strokeLinejoin='round' />
        </svg>
    );
}
CompassIcon.propTypes = propTypes;
CompassIcon.defaultProps = defaultProps;

/**
 * @param {object} props props
 * @returns {JSX.Element} angle-brackets icon (LOOP API)
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
 * @param {object} props props
 * @returns {JSX.Element} magnifier icon
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
 * @param {object} props props
 * @returns {JSX.Element} chevron-right icon
 */
export function ChevronRightIcon({ color, size }) {
    return (
        <svg width={size} height={size} viewBox='0 0 24 24' fill='none' aria-hidden='true'>
            <path d='m9 6 6 6-6 6' stroke={color} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
        </svg>
    );
}
ChevronRightIcon.propTypes = propTypes;
ChevronRightIcon.defaultProps = defaultProps;

/**
 * @param {object} props props
 * @returns {JSX.Element} chevron-down icon
 */
export function ChevronDownIcon({ color, size }) {
    return (
        <svg width={size} height={size} viewBox='0 0 24 24' fill='none' aria-hidden='true'>
            <path d='m6 9 6 6 6-6' stroke={color} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
        </svg>
    );
}
ChevronDownIcon.propTypes = propTypes;
ChevronDownIcon.defaultProps = defaultProps;

/**
 * @param {object} props props
 * @returns {JSX.Element} arrow up-right (external link)
 */
export function ArrowUpRightIcon({ color, size }) {
    return (
        <svg width={size} height={size} viewBox='0 0 24 24' fill='none' aria-hidden='true'>
            <path d='M7 17 17 7M8 7h9v9' stroke={color} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
        </svg>
    );
}
ArrowUpRightIcon.propTypes = propTypes;
ArrowUpRightIcon.defaultProps = defaultProps;

/**
 * @param {object} props props
 * @returns {JSX.Element} warning triangle
 */
export function WarningIcon({ color, size }) {
    return (
        <svg width={size} height={size} viewBox='0 0 24 24' fill='none' aria-hidden='true'>
            <path d='M12 3 2 20h20L12 3Z' stroke={color} strokeWidth='2' strokeLinejoin='round' />
            <path d='M12 10v4' stroke={color} strokeWidth='2' strokeLinecap='round' />
            <circle cx='12' cy='17' r='0.7' fill={color} />
        </svg>
    );
}
WarningIcon.propTypes = propTypes;
WarningIcon.defaultProps = defaultProps;

/**
 * @param {object} props props
 * @returns {JSX.Element} right arrow
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

/* eslint-enable max-len */
