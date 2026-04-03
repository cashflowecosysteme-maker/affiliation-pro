# AffiliationPro Worklog

---
## Task ID: 1 - Fix Admin Webhook Systeme.io Save Functionality
### Work Task
Fix the `handleSaveWebhook` function in the admin page that had a TODO and fake setTimeout instead of actually saving to the database. Also wire up the `handleSaveSlug` function which had the same issue.

### Work Summary
Successfully completed all 5 sub-tasks:

**1. D1 Database Migration**
- Added `webhook_secret TEXT` column to `users` table via Cloudflare D1 API
- Added `custom_slug TEXT` column to `users` table via Cloudflare D1 API (bonus fix - the admin page referenced this but it didn't exist)
- Updated `schema-d1.sql` to document both new columns

**2. Admin API Route (`src/app/api/admin/route.ts`)**
- **GET handler**: Updated the SELECT query to include `webhook_secret` and `custom_slug` columns. The response profile object now returns both fields (null-safe with `|| null`).
- **New PATCH handler**: Added a new `PATCH /api/admin` endpoint that:
  - Authenticates the user via `getSession()`
  - Verifies the user has `admin` or `super_admin` role
  - Accepts `webhook_secret` and/or `custom_slug` in the request body
  - Dynamically builds the UPDATE SQL based on which fields are provided
  - Sanitizes `custom_slug` (lowercase, alphanumeric + hyphens only)

**3. Admin Page (`src/app/admin/page.tsx`)**
- **`handleSaveWebhook`**: Replaced the fake `setTimeout` TODO with actual `PATCH /api/admin` API call sending `{ webhook_secret }`. Added input validation (rejects empty secret) and proper error handling with toast notifications.
- **`handleSaveSlug`**: Also replaced the fake `setTimeout` TODO with actual `PATCH /api/admin` API call sending `{ custom_slug }`. Added proper error handling and calls `fetchData()` on success to refresh data.

**4. Systeme.io Webhook Route (`src/app/api/webhooks/systemeio/route.ts`)**
- Added optional webhook secret verification at the top of the POST handler
- Reads `x-webhook-secret` header from incoming requests
- If a secret is provided, looks up the stored admin's webhook_secret in the DB
- If the stored secret exists and doesn't match, returns 401
- If no `x-webhook-secret` header is sent, the request passes through (backward compatible)
- No breaking changes - all existing webhook integrations continue to work

**Lint Status**: All changes pass ESLint. The only issues found are pre-existing (unused `Calendar` import and unescaped apostrophe on the admin page).

---
## Task ID: 2 - Fix Referral Links, Add NyXia Promo & Marketplace to Dashboard
### Work Task
Fix 3 critical issues: (1) Referral link `/r/CODE` broken due to `export const runtime = 'edge'` on a client component, (2) Ambassador dashboard missing NyXia promotional link and marketplace products, (3) No public marketplace page showing active products with visible affiliate links.

### Work Summary
Successfully completed all 4 changes:

**1. Fixed `/app/r/[code]/page.tsx` — Referral Redirect Page**
- Removed `export const runtime = 'edge'` directive (incompatible with `'use client'` components on Cloudflare Workers)
- Made the page more robust: if referral tracking API fails, the referral code is still saved to localStorage and the user is always redirected to `/signup` after 2 seconds
- Changed the error state from showing "Code invalide" (which blocked the user) to showing "Redirection..." with a fallback link to `/signup`
- Added null check for `code` param — redirects immediately if missing

**2. Updated `/app/api/dashboard/route.ts` — Dashboard API**
- Added a query to fetch active marketplace products from `marketplace_products` table (joined with `marketplace_categories`)
- Added `marketplaceProducts` array to the dashboard JSON response (max 20 products)

**3. Updated `/app/dashboard/page.tsx` — Ambassador Dashboard**
- Added `MarketplaceProduct` interface and included it in `DashboardData`
- Added `copiedNyXia` and `copiedProductLinks` state for copy-to-clipboard tracking
- Added `nyxiaLink` computed property: `https://nyxiapublicationweb.com/?ref={affiliate_code}`
- Added `copyNyXiaLink()` and `copyProductLink()` helper functions
- **New Section A: "Promouvoir NyXia" card** (placed before the referral card):
  - Amber/gold gradient styling with "Produit phare" badge
  - Shows the NyXia promotional link with copy button
  - Social share buttons (Facebook, X/Twitter, WhatsApp)
  - Direct link to nyxiapublicationweb.com
- **New Section B: "Produits du Marketplace à promouvoir" card** (placed after stats grid):
  - Lists all active marketplace products with title, image, description, price, commission %
  - Each product shows its `affiliate_link` visibly with copy button and "Ouvrir le lien" link
  - Scrollable container (max-h-600px) for many products
  - Empty state message when no products are available

**4. Created `/app/marketplace/page.tsx` — Public Marketplace Page**
- New `'use client'` page at `/marketplace` route
- Fetches active products from new public API endpoint
- Beautiful grid layout (1/2/3 columns responsive) with dark theme glass cards
- Each product card shows: image, category badge, title, description, price, commission %, and the full affiliate_link VISIBLE with copy button
- Hover effects on cards (image scale, border highlight)
- Commission levels display (N1, N2, N3) when available
- Banner message at bottom: "💡 Pour recevoir des commissions sur tes ventes, tu dois t'inscrire comme ambassadeur. Sinon, merci de nous référer à vos amis !" with link to `/ambassadeur`
- Navigation back to home page

**5. Created `/app/api/public/marketplace/route.ts` — Public Marketplace API**
- New GET endpoint at `/api/public/marketplace` (no authentication required)
- Queries `marketplace_products` table with `status = 'active'`, joined with categories
- Returns up to 50 products with all display fields

**Lint Status**: All new code passes ESLint. Only pre-existing issues remain (unused imports, unescaped entities, `any` types that existed before).
