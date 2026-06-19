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

// Shared stroke icons used across the payments landing sections.

/**
 * Right-pointing arrow icon used inside buttons.
 * @param {object} props component props
 * @returns {JSX.Element} the icon
 */
export function ArrowIcon({ color }) {
    return (
        <svg width='18' height='18' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
            <path
                d='M5 12h14M13 6l6 6-6 6'
                stroke={color}
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
}
ArrowIcon.propTypes = { color: PropTypes.string.isRequired };

/**
 * Check / tick icon.
 * @param {object} props component props
 * @returns {JSX.Element} the icon
 */
export function CheckIcon({ color }) {
    return (
        <svg width='16' height='16' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
            <path
                d='M20 6 9 17l-5-5'
                stroke={color}
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
}
CheckIcon.propTypes = { color: PropTypes.string.isRequired };
