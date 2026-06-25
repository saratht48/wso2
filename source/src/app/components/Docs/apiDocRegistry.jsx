/* eslint-disable */
/*
 * API documentation registry (the extension point).
 *
 * Maps a published API (by the slug of its name) to its STATIC documentation,
 * split into three SLOTS that interleave with the dynamic blocks on the page:
 *
 *   [ intro ]  ->  <Endpoints (dynamic)>  ->  [ middle ]  ->  <SDKs (dynamic)>  ->  [ end ]
 *
 * To add docs for a new API in the future:
 *   1. Create its content component file exporting the slot components you need
 *      (e.g. SendMoneyIntro / SendMoneyMiddle / SendMoneyEnd) and a TOC array.
 *   2. Import them here and add one entry keyed by the API-name slug.
 * APIs with NO entry automatically render a "Documentation coming soon" page
 * plus the working dynamic Endpoints + SDKs (see DocsApi.jsx). Any slot is
 * optional — leave it out and that static block is simply skipped.
 */
import { AuthIntro, AuthMiddle, AuthEnd, AUTH_TOC } from './AuthorizationContent';

export const slugify = (s) => (s || '')
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

// key = slug(API name)  ->  { label, toc, intro?, middle?, end? }  (slots are React components)
const REGISTRY = {
    authorization: {
        label: 'Authorization', toc: AUTH_TOC, intro: AuthIntro, middle: AuthMiddle, end: AuthEnd,
    },
    // 'send-money': { label: 'Send Money', toc: SEND_MONEY_TOC, intro: SendMoneyIntro, middle: SendMoneyMiddle },
    // 'pay':        { label: 'Pay',        toc: PAY_TOC,        intro: PayIntro },
};

/**
 * Look up the static doc slots for an API handle/name. Returns null when none is mapped.
 * @param {string} handle API name or slug
 * @returns {object|null} { label, toc, intro?, middle?, end? } or null
 */
export const getApiDoc = (handle) => REGISTRY[slugify(handle)] || null;

export default REGISTRY;
