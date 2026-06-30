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
import GlobalStyles from '@mui/material/GlobalStyles';

/*
 * LOOP Matrix light/dark theming.
 *
 * Colours are exposed as CSS custom properties on the <html> element, switched
 * by a `data-loop-theme="light|dark"` attribute. Components reference the
 * variables (e.g. `var(--loop-text-primary)`) so a single attribute flip
 * repaints the UI with no React re-render. The chosen mode is persisted in
 * localStorage and re-applied on every page load (default: dark).
 */

const STORAGE_KEY = 'loop-theme-mode';
const ATTR = 'data-loop-theme';
export const DEFAULT_MODE = 'dark';

// Dark is the baseline; light overrides the same variables.
const DARK_VARS = {
    '--loop-header-bg': '#141A21',
    '--loop-header-border': 'rgba(255,255,255,0.08)',
    '--loop-nav-text': '#FFFFFF',
    '--loop-hero-top': '#1A222C',
    '--loop-page-bg': '#141A21',
    '--loop-section-bg': '#080808',
    '--loop-surface': '#0E141B',
    '--loop-surface-2': 'rgba(255,255,255,0.02)',
    '--loop-border': 'rgba(255,255,255,0.06)',
    '--loop-border-strong': 'rgba(255,255,255,0.1)',
    '--loop-text-primary': '#FFFFFF',
    '--loop-text-question': '#E5E7EB',
    '--loop-text-subtitle': '#94A3B8',
    '--loop-text-secondary': '#9CA3AF',
    '--loop-text-muted': '#6B7280',
    '--loop-text-rightrail': '#6B7280',
    '--loop-text-leftrail': '#9CA3AF',
    '--loop-eyebrow': '#5A6B7B',
    '--loop-active-bg': 'rgba(255,95,0,0.1)',
    '--loop-help-bg': 'rgba(255,95,0,0.05)',
    '--loop-help-border': 'rgba(255,95,0,0.3)',
    '--loop-toggle-bg': 'rgba(255,255,255,0.06)',
    '--loop-search-bg': 'rgba(8,8,8,0.6)',
    '--loop-search-border': 'rgba(255,255,255,0.1)',
    '--loop-icon-box-bg': 'rgba(255,255,255,0.03)',
    '--loop-icon-box-border': 'rgba(255,255,255,0.08)',
    // Ecommerce landing
    '--loop-text-strong': '#FFFFFF',
    '--loop-bg-deep': '#080808',
    '--loop-card-soft': '#141A21',
    '--loop-quote': '#ADB3BE',
    '--loop-hero-desc': '#FFFFFF',
    '--loop-cta-desc': '#D1D5DC',
    '--loop-cta-outline': 'rgba(255,255,255,0.2)',
    // Docs
    '--loop-docs-nav': '#F2F1F5',
    '--loop-code-bg': '#0B0F14',
    '--loop-code-text': '#D6E2EE',
};

const LIGHT_VARS = {
    '--loop-header-bg': '#F2F5F7',
    '--loop-header-border': '#F2F5F7',
    '--loop-nav-text': '#374151',
    '--loop-hero-top': '#FFFFFF',
    '--loop-page-bg': '#FFFFFF',
    '--loop-section-bg': '#F7F8FA',
    '--loop-surface': '#FFFFFF',
    '--loop-surface-2': '#FFFFFF',
    '--loop-border': '#E5E7EB',
    '--loop-border-strong': '#E5E7EB',
    '--loop-text-primary': '#111827',
    '--loop-text-question': '#111827CC',
    '--loop-text-subtitle': '#4B5563',
    '--loop-text-secondary': '#374151',
    '--loop-text-muted': '#6B7280',
    '--loop-text-rightrail': '#374151',
    '--loop-text-leftrail': '#4B5563',
    '--loop-eyebrow': '#9CA3AF',
    '--loop-active-bg': '#FFF7ED',
    '--loop-help-bg': '#FFF7ED66',
    '--loop-help-border': '#FFD6A8',
    '--loop-toggle-bg': '#F3F4F6',
    '--loop-search-bg': '#FFFFFF',
    '--loop-search-border': '#E5E7EB',
    '--loop-icon-box-bg': '#FFFFFF',
    '--loop-icon-box-border': '#E5E7EB',
    // Ecommerce landing
    '--loop-text-strong': '#141A21',
    '--loop-bg-deep': '#FFFFFF',
    '--loop-card-soft': '#F2F5F7',
    '--loop-quote': '#364153',
    '--loop-hero-desc': '#4A5565',
    '--loop-cta-desc': '#4A5565',
    '--loop-cta-outline': '#141A21',
    // Docs
    '--loop-docs-nav': '#6B7280',
    '--loop-code-bg': '#F4F6F8',
    '--loop-code-text': '#475569',
};

/**
 * Read the persisted mode (falls back to the default).
 * @returns {string} 'light' or 'dark'
 */
export function getLoopThemeMode() {
    try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        return stored === 'light' || stored === 'dark' ? stored : DEFAULT_MODE;
    } catch (e) {
        return DEFAULT_MODE;
    }
}

/**
 * Apply a mode to the document and persist it.
 * @param {string} mode 'light' or 'dark'
 * @returns {void}
 */
export function applyLoopThemeMode(mode) {
    const next = mode === 'light' ? 'light' : 'dark';
    if (typeof document !== 'undefined' && document.documentElement) {
        document.documentElement.setAttribute(ATTR, next);
    }
    try {
        window.localStorage.setItem(STORAGE_KEY, next);
    } catch (e) {
        // ignore storage failures (private mode etc.)
    }
}

/**
 * Apply the persisted mode on load. Safe to call multiple times.
 * @returns {string} the applied mode
 */
export function initLoopThemeMode() {
    const mode = getLoopThemeMode();
    applyLoopThemeMode(mode);
    return mode;
}

/**
 * Flip between light and dark, persisting the result.
 * @returns {string} the new mode
 */
export function toggleLoopThemeMode() {
    const next = getLoopThemeMode() === 'dark' ? 'light' : 'dark';
    applyLoopThemeMode(next);
    return next;
}

/**
 * Injects the LOOP theme CSS variables and the mode-driven logo/icon swaps.
 * Mount once near the app root.
 * @returns {JSX.Element} the global styles
 */
function LoopThemeStyles() {
    return (
        <GlobalStyles
            styles={{
                ':root': DARK_VARS,
                [`[${ATTR}="dark"]`]: DARK_VARS,
                [`[${ATTR}="light"]`]: LIGHT_VARS,
                // Username color in header
                [`[${ATTR}="light"] .loop-username`]: { color: '#444444 !important' },
                // Mode-driven asset swaps (logo wordmark + theme-toggle icon).
                '.loop-logo-light, .loop-themeicon-light': { display: 'none' },
                '.loop-logo-dark, .loop-themeicon-dark': { display: 'block' },
                [`[${ATTR}="light"] .loop-logo-dark, [${ATTR}="light"] .loop-themeicon-dark`]: {
                    display: 'none',
                },
                [`[${ATTR}="light"] .loop-logo-light, [${ATTR}="light"] .loop-themeicon-light`]: {
                    display: 'block',
                },
            }}
        />
    );
}

export default LoopThemeStyles;
