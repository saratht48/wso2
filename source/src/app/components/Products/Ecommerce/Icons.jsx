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
import { ORANGE } from './tokens';

// Shared icons used across the e-commerce landing sections.

/**
 * Filled five-point star (testimonial rating).
 * @param {object} props component props
 * @returns {JSX.Element} the icon
 */
export function StarIcon({ size }) {
    return (
        <svg width={size} height={size} viewBox='0 0 24 24' fill={ORANGE} aria-hidden='true'>
            <path d='M12 2l2.95 5.98 6.6.96-4.78 4.66 1.13 6.57L12 17.98 6.1 20.17l1.13-6.57L2.45 8.94l6.6-.96L12 2z' />
        </svg>
    );
}
StarIcon.propTypes = { size: PropTypes.number };
StarIcon.defaultProps = { size: 20 };
