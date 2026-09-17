# Glitzy Game Studios website and Echoes of History beta plan

Reviewed September 17, 2026. This is a planning deliverable; nothing has been deployed.

Implementation update: the local website now includes the homepage, filterable games directory, all six game pages with supplied descriptions, studio page, beta access guide, privacy page, and custom 404. All pages are pre-rendered with React/TypeScript and Vite; responsive images and self-hosted fonts are included. Echoes links to its existing Railway deployment. Source descriptions and unused short alternatives are centralized in `src/content.ts`. No Echoes placeholders remain after the studio supplied the final copy. See `README.md` for development, verification, and deployment instructions. Public deployment and custom-domain setup remain outstanding.

## Findings from the supplied Dropbox archive

The downloaded archive is approximately 460 MiB and contains 203 files: 201 images and two Markdown documents. The local Website workspace was empty at review time. Review covered the complete filename inventory, both documents, and a visual contact sheet of all ten website mockups, all 14 Echoes of History images, and selected primary studio logos. Other game assets were inventoried by filename, not individually inspected for visual quality.

| Collection | Files | Available material |
| --- | ---: | --- |
| Studio, under `Glizty Studios Game` | 47 | Logos, headers, presentation art, project frames, ten website mockups, visual style guide |
| Echoes of History, at archive root | 14 | Concept art, including archive interiors and composed interface concepts |
| Cleaning Chaos | 26 | Branding, final/generated presentation images, concept art, development screenshots, support README |
| Mower Madness | 39 | Branding, hero alternatives, concept art, development screenshots, promotional/support art |
| Scribblynth | 14 | Branding, hero/key art, concepts, promotional/support art |
| Early Man Experiment | 23 | Branding, presentation art, concepts, promotional/support art |
| Shoots and Ladders! No chutes! Only shoots! | 40 | Final and draft assets, branding, concepts, development screenshots |

The Dropbox folder is the website cosmetics and asset library, not the application source. The studio confirmed that Echoes of History is an existing React/TypeScript web app using Supabase, with conversational gameplay powered by the Claude API. Review of its source and deployment configuration is a separate integration step. Supported devices, existing auth/save behavior, and beta readiness remain to be verified. Text and apparent features depicted in concept artwork are not verified game functionality.

Source folder: https://www.dropbox.com/scl/fo/vrd36ef3o1gu1y61bkivm/AG7ktTeuIdTf999hueCtVf8?rlkey=hqbgzxj0knx5bye0ulst1zj7w&dl=0

## Design direction

Use `01-portal-gallery.png` as the homepage direction and `10-world-select.png` as the games directory direction. These establish a clear studio identity while giving six distinct games room to stand on their own. Use a stable hero and a visible game grid; visitors should not have to wait for a carousel to discover projects.

Follow the supplied visual style guide: deep black `#050608`, midnight navy `#07111F`, magenta `#FF19B7`, cyan `#12C8F4`, warm gold `#FFBE22`, and soft white `#F5F5F2`. Use one primary logo per placement, readable sans-serif body text, and restrained glow. Build navigation, headings, buttons, and content as actual accessible HTML rather than reproducing entire mockups as images.

Echoes of History should use the clean cinematic project treatment, warm gold, dark archive interiors, and violet accents. Concept Art 74 is a promising hero candidate; 8–10 and 69/71 provide supporting archive imagery. The dense interface concepts 83–89 should guide mood, not serve as functional website interfaces or verified screenshots.

Preserve original masters. Choose one approved version per role, prefer explicitly final assets where available, normalize web filenames, and create responsive WebP/AVIF derivatives with PNG fallbacks where needed. Label concept art and actual development screenshots accurately. Verify cropping, baked-in lettering, transparency, mobile legibility, and alternative text before launch. The style guide identifies the materials as private preparation assets; track release status during asset selection.

## First-release pages

| Route | Purpose |
| --- | --- |
| `/` | Studio introduction, portfolio hero, six-game grid, prominent Echoes beta feature |
| `/games/` | Browse all six projects with verified development status |
| `/games/echoes-of-history/` | Verified description, selected art, beta requirements, controls, known issues, Play Beta action |
| `/games/[slug]/` | Reusable pages for the other five games, screenshots/concepts, confirmed features and status |
| `/studio/` | Studio story and contact information supplied by the team |
| `/beta/echoes-of-history/` | Tester instructions, build notes, launch link, feedback form |
| `/privacy/` | Explain actual feedback and diagnostic data collection |

Avoid invented release dates, store links, team biographies, or game features. A small content-driven static site is sufficient initially; keep game metadata and page copy separate from layout code so updates are straightforward.

## Hosting the playable beta

Keep the existing Echoes deployment on Railway. The studio website can be deployed independently, with its Play Beta action linking initially to https://echoes-of-history-production.up.railway.app/ and ultimately to `play.<studio-domain>` configured as a custom domain on that same Railway service. Railway supports custom domains and automatic HTTPS; see [Railway public networking](https://docs.railway.com/networking/public-networking). The studio domain remains to be supplied.

### Repository and live-site findings

Repository: https://github.com/Glitzencode/echoes-of-history

Reviewed commit: `419e47ee59dc0592aae6aca6854395d7e9905d46`. Git access succeeded, and a separate temporary checkout was used for read-only inspection. The production homepage returned HTTP 200 with the Echoes title and React asset references. This verifies the app shell is reachable, not that authenticated gameplay or database/provider calls pass. The deployed commit has not been compared with repository HEAD.

- Root package scripts define client/server workspaces; the client uses React 18, TypeScript, and Vite.
- `Dockerfile` builds both workspaces and starts the Node/Express server, which serves the built frontend. `railway.json` selects Docker deployment with one replica and application sleep disabled.
- `server/src/db/index.ts` connects to PostgreSQL through `pg` and `DATABASE_URL`; the studio identifies Supabase as the database provider.
- `server/src/routes/auth.ts` implements bcrypt/JWT authentication and requires a beta invite code at registration. Do not replace this with Supabase Auth as part of the website project.
- The server has Claude services, cost instrumentation, admin cost routes, an invite-request route, and a Discord invite-approval integration. It starts background workers and includes configuration checks for daily spending limits, reset email, and embeddings. Their production configuration and complete behavior still need verification.
- `server/src/app.ts` provides `/health`, reads `CLIENT_ORIGIN`, and serves the frontend with an SPA fallback.

The architecture to preserve is:

```text
Studio website -> Play Beta -> Railway: React frontend + Express API
                                           |-> Supabase PostgreSQL
                                           |-> Claude API
                                           |-> Existing background jobs/integrations
```

Keep the app and API on the same origin. Reuse the existing Express Claude endpoint and Railway runtime; a new Supabase Edge Function or separate static-only app deployment is unnecessary. Keep API/database/JWT secrets server-side. The website itself needs no Claude credentials or direct access to player data. No iframe, engine export, or large binary delivery layer is needed for the initial integration.
### Application integration

1. Complete a focused review of the existing auth, invite, save, Claude, cost-control, and feedback flows before launch. Initial architecture inspection is complete; verify production configuration through the existing deployment tooling without exposing secret values.
2. Add the custom domain to the existing Railway service and configure its DNS. Update CLIENT_ORIGIN and any app URL, password-reset, or integration callback settings that depend on the domain. Verify direct navigation, login, and password-reset returns. Browser storage is origin-specific: test signing in again on the new domain and confirm server-stored progress remains available.
3. Use an isolated Supabase test environment for deployment previews where feasible. Keep previews from modifying live player data or consuming unrestricted live API budget.
4. Verify Express authorization and ownership filters for conversations, saves, profiles, and feedback, plus database permissions and any exposed Supabase Data API policies. Direct server PostgreSQL access is not automatically protected by end-user Supabase Auth policies. Test cross-user isolation and existing invite enforcement.
5. Validate the actual conversation transport, including streaming if implemented. Handle slow responses, interruption, provider errors, and expired sessions. Use request identifiers and transactional state handling to prevent duplicate turns or inconsistent saves on retries; do not blindly retry chargeable requests.
6. Validate and reuse existing cost instrumentation and daily spending controls; confirm coverage of chat, memory, and background API calls. Check per-user limits, context/output limits, concurrency handling, and stop behavior against the desired beta budget before adding anything missing.
7. Version frontend and server deployments together. Keep database migrations compatible with the previous app release where possible, and verify rollback without deleting player progress.

The repository already implements an invited beta. Preserve its account and invite-request flow for the initial website integration. Link visitors to the existing app entry flow; do not create a second website account system or a duplicate invite workflow. Confirm whether the studio wants to change this access policy.

## Tester experience and feedback

Prioritize conversational play: sign in, start or resume a story, send a turn, see a response/progress indicator, and return later without losing confirmed progress. Show build version, known issues, and clear recovery guidance when a request fails. Test responsive conversation layout, mobile keyboards, long messages, accessible status announcements, and keyboard navigation. Fullscreen is optional rather than a launch requirement.

Provide an in-app Report an issue action and a feedback link on the website's beta hub. Attach build version and a request identifier where available. Ask for reproduction steps and expected/actual behavior. Do not attach full conversations automatically; let testers explicitly choose whether to include an excerpt. Protect feedback records with appropriate access rules and confirm successful submission.

Explain that gameplay messages are processed by the AI provider and state how the app stores conversation history, how long diagnostic records are kept, and how testers can request deletion. Base these statements on the inspected implementation.

Measure successful story starts, completed turns, response latency, failed requests, saved-session recovery, and feedback delivery. Estimate operating cost from active testers x turns per tester x measured input/output token usage at the selected model's current rates, plus Supabase, Railway, and other enabled API/service usage. A fixed cost estimate is premature until the model and typical conversation lengths are known.

## Delivery sequence and completion criteria

1. **Asset and content preparation:** select logos, heroes, and thumbnails; optimize derivatives; collect accurate project descriptions. Complete when each website page has usable responsive assets and confirmed copy.
2. **App deployment review:** inspect the existing React/TypeScript app and its Supabase/Claude integration. Complete when a test account can start a conversation, receive a real response, and resume saved progress in a preview environment.
3. **Website implementation:** build shared navigation/footer, homepage, six-game directory, reusable project pages, studio page, and beta information page. Complete when responsive layouts, keyboard access, contrast, links, metadata, and image loading are checked.
4. **Beta integration:** connect the Play Beta journey, authentication, invitation policy if selected, usage limits, feedback, and version display, reusing existing implementations where available. Complete when eligible testers can play and submit reports, while ineligible requests are rejected by the backend.
5. **Live testing:** check Chrome, Edge, Firefox, Safari, and target mobile browsers. Test login/logout, cross-user data isolation, expired sessions, double submissions, long conversations, interrupted responses, provider failure, spending-limit behavior, save recovery, and rollback.
6. **Launch and iteration:** connect the confirmed domain, verify HTTPS and auth callbacks, run an initial tester round, track gameplay defects and API cost, and expand access as appropriate.

Website implementation and app deployment review can proceed independently. Beta work is integration and operational readiness for the existing web app; no engine conversion is planned. Set a launch estimate after inspecting the current app and deployment state.

## Information needed to finalize implementation

- Repository and current deployment are confirmed above; remaining access needs concern deployment settings only when implementation reaches domain configuration.
- Confirm staging/live database separation, deployed revision, and production configuration for the existing Express integrations.
- Invited or public beta, expected tester volume, target devices, and desired API spending cap.
- Studio domain and hosting account, final contact details, confirmed project descriptions/status, and selected website assets.

Existing local Git credentials were used for repository read access. No application accounts were created, gameplay requests sent, public assets uploaded, or infrastructure changed.
