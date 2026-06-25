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
import DocsLayout from './DocsLayout';
import AuthorizationContent from './AuthorizationContent';

/*
 * Authorization docs page (/docs/loop-api/authorization). Uses the shared
 * DocsLayout with the Authorization left-nav item active and its own
 * "on this page" table of contents.
 */

export const AUTH_TOC = [
    { id: 'endpoint', label: 'Endpoint', active: true },
    { id: 'overview', label: 'Overview' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'security-credentials', label: 'Security Credentials' },
    {
        id: 'oauth2-bearer-token',
        label: 'OAuth2 Bearer Token',
        subs: [
            { id: 'request', label: 'Request' },
            { id: 'response', label: 'Response' },
        ],
    },
    { id: 'sdk', label: 'SDK' },
    { id: 'faqs', label: 'FAQs' },
];

/**
 * Authorization documentation page.
 * @returns {JSX.Element} the rendered page
 */
function DocsAuthorization() {
    return (
        <DocsLayout activeNav='authorization' tocSections={AUTH_TOC}>
            <AuthorizationContent />
        </DocsLayout>
    );
}

export default DocsAuthorization;
