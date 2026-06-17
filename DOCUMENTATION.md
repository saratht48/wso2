# WSO2 API Manager — Developer Portal (Dev Portal) Documentation

> A developer-facing documentation guide for the React-based **Developer Portal** web
> application that ships inside **WSO2 API Manager 4.7.0**.

---

## 1. What this project is

The **Developer Portal** (a.k.a. *Dev Portal* / *Store*) is the public-facing web
application of WSO2 API Manager. It is where **API consumers** (application developers)
go to:

- Browse and search the API catalog (REST, SOAP, GraphQL, AsyncAPI/Streaming, Solace, and **MCP Servers**).
- Read API documentation, view interactive API definitions and try them out (Swagger/OpenAPI console, GraphQL console, AsyncAPI console).
- Register **Applications**, generate OAuth2 keys / API keys, and **subscribe** applications to APIs under throttling tiers.
- Manage subscriptions, comments, ratings, and SDKs.
- Use an **AI Search Assistant / API Chat** to find APIs in natural language.

This portal is the *consumer* counterpart to the **Publisher** app (where API *providers*
create and publish APIs). Both ship as separate web apps in the same product.

### Where this app lives in the product

```
wso2am-4.7.0/                                  ← product root (the "main folder")
├── bin/            ← startup scripts (api-manager.sh/.bat)
├── repository/
│   └── deployment/server/webapps/
│       ├── devportal/   ← ★ THIS PROJECT (Developer Portal)
│       ├── publisher/   ← Publisher web app (API providers)
│       ├── admin/       ← Admin portal
│       └── api/         ← REST API backends (am/devportal, am/publisher, ...)
├── dbscripts/      ← database schemas
├── lib/            ← OSGi / Java runtime libraries
└── resources/      ← product resources
```

The portal is a **client-side React Single Page Application (SPA)** that talks to the
WSO2 backend **Devportal REST API** (`/api/am/devportal/...`). It is built with Webpack
and the bundle is served by the Tomcat/Carbon server embedded in the product.

---

## 2. Tech stack

| Concern | Technology |
|---|---|
| Language | JavaScript / JSX (some TypeScript), ES2020+ |
| UI framework | **React 18.3** (mix of class components and hooks) |
| Component library | **MUI (Material UI) v5** + `@mui/lab`, Emotion styling |
| Routing | **react-router v5** (`react-router-dom`) — client-side SPA routing |
| Internationalization | **react-intl** (FormatJS), locale files under `site/public/locales/` |
| API client | **swagger-client** (drives calls from the Swagger/OpenAPI spec) + **axios** |
| API consoles | `swagger-ui-react`, `graphiql`, `@asyncapi/react-component`, `@stoplight/elements` |
| MCP | `@wso2-org/mcp-playground` (Model Context Protocol servers) |
| Build | **Webpack 5** + Babel 7 |
| Testing | **Jest** + Enzyme / react-test-renderer |
| Lint | ESLint (Airbnb config) + Prettier |
| Node/npm | Node >= 22, npm >= 10 |

Package name: `@wso2apim/devportal`, version `4.0.1` (see [package.json](package.json)).

---

## 3. Top-level folder structure

The current directory (`.../webapps/devportal`) mixes **source code** with **runtime
deployment artifacts**. From [Readme.txt](Readme.txt):

| Path | Purpose | Needed at runtime? |
|---|---|---|
| `source/` | **React source code** of the app (this is where you develop) | No (compiled) |
| `override/` | Drop a file here to **override** a matching file from `source/src/` without copying the whole tree | Build-time |
| `services/` | **JSP** endpoints for `login`, `logout`, `refresh`, `settings` (server-side auth glue) | **Yes** |
| `site/` | Config (`site/conf`) + `site/public` static assets, locales, themes, and the built `dist/` bundle | **Yes** |
| `WEB-INF/web.xml` | Servlet config; handles server-side routing / path forwarding | **Yes** |
| `build/`, `loader.js`, `webpack.config.js`, `babel.config.js`, `jest.config.js`, `tsconfig.json`, `.eslintrc.js` | Build & tooling configuration | Build-time |
| `package.json`, `package-lock.json` | Dependencies & npm scripts | Build-time |
| `devportal/`, `META-INF/` | Generated/packaging output | — |

> **Runtime essentials:** Only `services/`, `site/`, and `WEB-INF/web.xml` are required
> when the app runs in the deployed product. Everything else is for building.

---

## 4. Source layout (`source/src`)

```
source/src/
├── index.js              ← Webpack entry point; mounts <DevPortal/> into the DOM
├── DevPortal.jsx         ← Root component (theme, i18n, settings, top-level routing)
└── app/
    ├── ProtectedApp.jsx  ← Auth/tenant resolution gate; wraps the authenticated app
    ├── AppRouts.jsx      ← Main client-side route table (APIs, Applications, MCP, etc.)
    ├── TenantListing.jsx ← Tenant chooser (multi-tenant deployments)
    ├── LoginDenied.jsx   ← Shown when user lacks required scopes
    ├── components/       ← All UI feature components (see §6)
    ├── data/             ← Data/business layer: REST client, models, auth (see §5)
    ├── utils/            ← Helpers (portal mode, misc utils)
    └── webWorkers/       ← timer.worker.js (session timeout countdown off main thread)
```

### Application bootstrap flow

```
index.js
  └─ <DevPortal>                          (source/src/DevPortal.jsx)
       • Loads settings via API.getSettings()
       • Loads theme (default merged with tenant theme JSON) + locale messages
       • Provides SettingsContext, MUI ThemeProvider, IntlProvider
       • Router: /logout → <Logout>, everything else → <ProtectedApp>
          └─ <ProtectedApp>               (app/ProtectedApp.jsx)
               • Resolves tenant list & environments
               • Resolves user (AuthManager) and checks "apim:subscribe" scope
               • Decides: Anonymous view | Login redirect | Tenant listing | Authenticated
               • Renders <Base> (header/menu shell) + <AppRouts>
                  └─ <AppRouts>           (app/AppRouts.jsx)
                       • Lazy-loaded routes for each feature area
```

---

## 5. Data layer (`source/src/app/data`)

This is the **business/service layer** — a clean separation between UI and the backend
REST API. UI components import these classes rather than calling `fetch`/`axios` directly.

| File | Responsibility |
|---|---|
| `api.jsx` | **Main `API` model class (~1300 lines).** One method per backend operation: `getAllAPIs`, `getAPIById`, `getDocuments`, `getSubscriptions`, `addComment`, `getSwagger`, ratings, SDKs, etc. Extends `Resource`. |
| `APIClient.jsx` | Wraps **swagger-client**: downloads the Devportal REST API Swagger spec and builds a callable client whose methods mirror the spec operations. |
| `APIClientFactory.jsx` | **Singleton factory** caching one `APIClient` per gateway *environment* (multi-environment support). |
| `AuthManager.jsx` | Authentication: current user, scopes, token handling, login/logout helpers, "is user logged in" checks. |
| `User.jsx` | User model + cookie/scope constants (e.g. `DEVPORTAL_CLIENT_ID`, session-state cookie). |
| `Application.jsx` | Application model: create/update apps, generate & manage OAuth keys / API keys. |
| `Subscription.jsx` | Subscription model (app ↔ API under a throttling tier). |
| `MCPServer.jsx` | Model for **MCP (Model Context Protocol) Servers** — a 4.7.x feature. |
| `Wsdl.js` | SOAP / WSDL handling. |
| `Tenants.js` | Tenant listing (multi-tenancy). |
| `ConfigManager.jsx` | Loads gateway environment configuration. |
| `Constants.jsx` | App-wide constants: HTTP methods, error codes, API types (`SSE/WS/WEBSUB/ASYNC/GRAPHQL`), default subscription-less plans, etc. |
| `Resource.jsx` | Base class with shared request metadata. |
| `Utils.jsx` | Data-layer utilities: environment/cookie helpers, base URLs. |
| `defaultTheme.js` | The default theme configuration object (merged with tenant overrides). |

**Why `swagger-client`?** The portal does not hard-code endpoint URLs. It fetches the
backend's OpenAPI/Swagger definition and generates the client dynamically, so the UI stays
in sync with the backend contract (`client.apis.APIs.get_apis(...)`).

---

## 6. UI components (`source/src/app/components`)

| Folder | What it covers |
|---|---|
| `Base/` | App shell: `Header/`, left menu, `Loading/`, `Errors/` (PageNotFound, ScopeNotFound), and `CustomRouter/` (a customized `BrowserRouter`). |
| `Apis/` | The heart of the portal. <br>• `Listing/` — catalog views: card/table/tag-cloud, thumbnails, recommendations, category listing. <br>• `Details/` — single-API pages: `Overview`, `Documents`, `Credentials` (subscribe/keys), `Comments`, `Social` (ratings), `Definitions`, and try-out consoles: `ApiConsole` (REST/Swagger), `GraphQLConsole`, `AsyncApiConsole`, `SolaceApi`, `MCPTryOut`, `APIKeys`. <br>• `Chat/` — **AI Search Assistant / API Chat** (natural-language API discovery): `ChatWindow`, `ChatInput`, `ChatMessages`, `SimilaritySearch`. |
| `Applications/` | Developer applications: `Create/`, `Listing/`, `Details/` (overview, subscriptions, webhooks, invoices), and `ApplicationFormHandler`. |
| `MCPServers/` | Listing/detail entry for **MCP Servers** (new in 4.7). |
| `LandingPage/` | Marketing-style home page: `Landing`, `Carousel`, `ParallaxScroll`, `Contact`, `ApisWithTag`. |
| `Settings/` | User settings, e.g. `ChangePassword/`. |
| `Login/` | `RedirectToLogin` (kicks off the OAuth login flow). |
| `Shared/` | Cross-cutting widgets & infra: `Alert`, `ConfirmDialog`, `SettingsContext` (React Context for settings), `PortalModeRouteGuard`, `ScopeValidation`, `AppsAndKeys/` (key generation, secrets, key manager config), `ApiTryOut/`, `CustomIcon`, etc. |
| `Logout.jsx` | Logout handling. |
| `SessionTimeout.jsx` | Idle/session-timeout warning (uses the web worker timer). |

### Routing map (from `AppRouts.jsx`)

| Path | Component | Notes |
|---|---|---|
| `/` | redirect | → `/home`, `/api-groups`, `/apis`, or `/mcp-servers` depending on theme & portal mode |
| `/home` | `Landing` | Landing page |
| `/api-groups` | `TagCloudListing` | Tag-wise browsing |
| `/apis`, `/api-products` | `Apis` | API catalog & details (guarded by portal mode) |
| `/mcp-servers` | `MCPServers` | MCP server catalog (guarded) |
| `/applications` (+ `/create`, `/:id/edit`, `/:id/`, `/:id/webhooks/`) | `Listing` / `ApplicationFormHandler` / `Details` | Require auth; show `ScopeNotFound`/`RedirectToLogin` otherwise |
| `/settings/change-password/` | `ChangePassword` | Requires auth |
| `/search` | `Apis` | Search results |
| `*` | `PageNotFound` | Fallback |

### Portal Modes (`utils/PortalModeUtils.js`)

A 4.7 concept controlling what the portal exposes, driven by the backend `devportalMode`
setting:

- **`HYBRID`** (default) — both APIs and MCP Servers.
- **`API_ONLY`** — only APIs.
- **`MCP_ONLY`** — only MCP Servers.

`PortalModeRouteGuard` and `usePortalMode()` enforce/route based on this.

---

## 7. Authentication & session model

The portal uses **OAuth2 / OIDC** against the WSO2 Identity Provider, glued together with
the JSP endpoints under `services/`:

- `services/login/` — `idp.jsp`, `login_callback.jsp`, `introspect.jsp` (OAuth code → token exchange, token introspection).
- `services/logout/` — `logout.jsp`, `logout_callback.jsp`.
- `services/refresh/refresh.jsp` — token refresh.
- `services/settings/` — `settings.jsp`, `userTheme.jsp`, `exclusion.jsp` (server-injected runtime settings/theme).

Key behaviors:

- **Required scope:** `apim:subscribe`. Without it the user gets `LoginDenied`.
- **Anonymous mode:** If `IsAnonymousModeEnabled`, unauthenticated users can browse the catalog read-only.
- **Passive login:** In passive mode the app silently checks whether the user is already logged in (SSO).
- **Single Logout (SLO):** A hidden `iframeOP` posts to the OIDC `checkSession` endpoint on an interval to detect remote logout.
- **Multi-tenancy:** Tenant is taken from the `?tenant=` query param or a custom URL domain; each tenant can supply its own theme JSON under `site/public/tenant_themes/<tenant>/apim/defaultTheme.json`.

---

## 8. Theming & internationalization

- **Theme:** `data/defaultTheme.js` provides defaults; merged (via `lodash.merge`) with deployment `Configurations` and per-tenant theme JSON at runtime. Drives MUI theme + layout toggles (landing page on/off, tag-wise browsing, language switcher, custom CSS/logo).
- **i18n:** Strings are wrapped in `react-intl` `FormatMessage`. The `npm run i18n:en` script extracts message IDs into `site/public/locales/en.json`. Locale files are fetched at runtime based on browser/saved language; RTL languages set `dir` on `<body>`.

---

## 9. Build & development

Common npm scripts (from [package.json](package.json)):

| Script | What it does |
|---|---|
| `npm run build:prod` | Production build → `site/public/dist/` (extracts i18n, runs Webpack in production mode) |
| `npm run build:dev` | Development build with `--watch` |
| `npm start` | Webpack dev server on **port 8084** (watch mode) |
| `npm run lint` | ESLint over `source/` |
| `npm run test:ci` / `test:coverage` | Jest tests |
| `npm run i18n:en` | Extract i18n messages to `en.json` |
| `npm run analysis` | Webpack bundle analyzer |

### Webpack notes (`webpack.config.js`)

- **Module aliases** (so imports read cleanly):
  - `AppData` → `source/src/app/data/`
  - `AppComponents` → `source/src/app/components/`
  - `Settings`, `Config` → injected globals (runtime settings & configuration objects)
- **Output:** `site/public/dist/` with content-hashed bundle filenames; lazy chunks per feature (`webpackChunkName`).
- **Dev server proxy:** routes `/services/`, `/api/am`, `/devportal/...` to the backend so the SPA can call real APIs during development.
- **Code splitting:** Each major route (`Apis`, `MCPServers`, `Landing`, `Applications`, ...) is `React.lazy`-loaded for smaller initial bundles.

### Typical dev workflow

1. Have a running WSO2 API Manager backend (for `/api/am/devportal` and `/services`).
2. `npm install` (Node 22+).
3. `npm run build:dev` (or `npm start`) to compile into `site/public/dist/`.
4. Use `override/` to customize a component without editing `source/src` directly.

---

## 10. Quick mental model

```
Consumer (browser)
   │  React SPA (this app)
   ▼
DevPortal.jsx → ProtectedApp.jsx → AppRouts.jsx → feature components (Apis, Applications, MCP…)
   │                                   │
   │  UI components call               ▼
   │                            data/ layer  (API, Application, Subscription, AuthManager…)
   │                                   │  swagger-client / axios
   ▼                                   ▼
services/*.jsp (auth glue)   ──►  WSO2 backend REST API  (/api/am/devportal/...)
                                   + OAuth2/OIDC Identity Provider
```

- **UI** lives in `app/components`.
- **Logic & backend access** lives in `app/data`.
- **Auth/session/settings** are bootstrapped in `DevPortal.jsx` + `ProtectedApp.jsx` and shared via `SettingsContext`.
- **Runtime config/theme/locale** come from the server (`services/`, `site/`), not hard-coded.

---

*Generated as an onboarding/architecture overview of the WSO2 API Manager 4.7.0 Developer
Portal React application. For backend REST contracts, see the product's `/api/am/devportal`
OpenAPI definition.*
