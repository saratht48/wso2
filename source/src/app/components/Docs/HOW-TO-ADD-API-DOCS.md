# LOOP API Docs — how it works & how to add a new API doc

Simple guide to the **Docs → LOOP API** section and how to document a new API.

---

## The idea (one line)

> The API list builds itself. Each API page mixes **hand-written static parts**
> with **live data from the real API**.

---

## What happens on screen

**Left menu (under "LOOP API"):**
- **"Overview"** always shows first (fixed page).
- Then **every published API** appears automatically (from WSO2). Publish/un-publish
  an API and it appears/disappears here on its own — no code change.

**When a user clicks an API**, the page is built in this **fixed order**:

```
[ intro    ]   static  (written per API)
[ Endpoints ]  DYNAMIC (real gateway URLs + Try out / Swagger / Postman)
[ middle   ]   static  (written per API)
[ SDKs     ]   DYNAMIC (real SDK languages + download)
[ end      ]   static  (written per API)
```

- **Static** parts (intro/middle/end) are hand-written per API and are optional.
- **Dynamic** parts (Endpoints, SDKs, Try-out) come from the **real published API**
  — even for Authorization.
- **Try out** opens a **popup** that embeds the real console (Generate Token + Try
  API + Postman/Swagger). It does **not** navigate away and reuses existing logic.
- If an API has **no** static docs yet → a **"Documentation coming soon"** header
  shows, but the dynamic Endpoints + SDKs + Try-out still work.

---

## The files

| File | What it does |
|------|--------------|
| `LeftNav.jsx` | Builds the left menu (Overview + live API list) |
| `DocsApi.jsx` | The per-API page; interleaves static slots + dynamic blocks |
| `apiDocRegistry.jsx` | The "address book": API name → static slots (intro/middle/end) |
| `ApiEndpoints.jsx` | Dynamic Endpoints block (URLs + Try out / Swagger / Postman) |
| `ApiSdks.jsx` | Dynamic SDK block (real languages + download) |
| `ApiTryOutModal.jsx` | Popup that embeds the stock API console (real Try-out) |
| `AuthorizationContent.jsx` | The Authorization static slots (`AuthIntro/AuthMiddle/AuthEnd`) |

---

## Matching

Each API links to its docs by a **slug of its name**:
`"Authorization" → authorization`, `"Send Money" → send-money`.
So the **name in the Publisher** is what links an API to its docs — keep it stable.

---

## ✅ How to add docs for a NEW API

### 1. Write the static slots
Create a content file, e.g. `SendMoneyContent.jsx`, exporting the slot components
you want (any are optional) plus a TOC:

```jsx
export const SEND_MONEY_TOC = [
  { id: 'endpoint', label: 'Endpoint', active: true },
  { id: 'sdk', label: 'SDK' },
  // ...your static section ids...
];

export function SendMoneyIntro()  { return (/* sections shown BEFORE Endpoints */); }
export function SendMoneyMiddle() { return (/* sections shown BETWEEN Endpoints & SDKs */); }
export function SendMoneyEnd()    { return (/* sections shown AFTER SDKs */); }
```
(Easiest: copy `AuthorizationContent.jsx` and edit the text. Don't add Endpoint or
SDK sections yourself — those are the dynamic blocks.)

### 2. Add ONE entry to the address book
In `apiDocRegistry.jsx`:

```jsx
import { SendMoneyIntro, SendMoneyMiddle, SendMoneyEnd, SEND_MONEY_TOC } from './SendMoneyContent';

const REGISTRY = {
  authorization: { label: 'Authorization', toc: AUTH_TOC, intro: AuthIntro, middle: AuthMiddle, end: AuthEnd },
  'send-money':  { label: 'Send Money', toc: SEND_MONEY_TOC, intro: SendMoneyIntro, middle: SendMoneyMiddle, end: SendMoneyEnd }, // 👈 new
};
```

### 3. Rebuild
```
npm run build:dev
```
Hard-refresh with browser cache disabled.

---

## Checklist
- [ ] API **published** in the Publisher (so it appears in the menu).
- [ ] API **name** matches the registry key slug.
- [ ] Slot component(s) + TOC exported.
- [ ] One entry added to `REGISTRY`.
- [ ] `npm run build:dev` + hard refresh.

---

## Notes
- The dynamic blocks reuse the existing devportal logic (API console, SDK
  generation, swagger), so the original API pages are untouched.
- Any slot is optional — omit it and that static block is simply skipped.
