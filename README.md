# 📚 HHES Lesson Ordering System

> A streamlined web platform for SDA-affiliated organisations to place, manage, and track their quarterly lesson book orders — replacing a fully manual, paper-based process with a real-time digital system.

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-gold)
![Status](https://img.shields.io/badge/status-In%20Development-blue)
![Stack](https://img.shields.io/badge/stack-Next.js%2015%20%7C%20Supabase%20%7C%20TypeScript-0D1B2A)
![License](https://img.shields.io/badge/license-MIT-green)
![PRD](https://img.shields.io/badge/PRD-Approved%20Final%20Draft-success)

</div>

---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Product Requirements Document (PRD)](#-product-requirements-document-prd)
  - [Goals & Objectives](#-goals--objectives)
  - [Scope](#-scope)
  - [User Personas](#-user-personas)
  - [Functional Requirements](#-functional-requirements)
  - [Non-Functional Requirements](#-non-functional-requirements)
  - [Assumptions & Constraints](#-assumptions--constraints)
- [Tech Stack](#-tech-stack)
- [Tech Stack Visual Representation](#-tech-stack-visual-representation)
- [Installation & Setup](#-installation--setup)
- [Project Structure](#-project-structure)
- [Order Status State Machine](#-order-status-state-machine)
- [API Routes Reference](#-api-routes-reference)
- [Environment Variables](#-environment-variables)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🏥 Project Overview

**Home Health Education Service (HHES) Kenya** is an SDA Church-affiliated procurement centre that sources and distributes Health, Religious, and Education books to affiliated organisations across Kenya. A core operational function is the **quarterly distribution of lesson books** across six age-group categories.

### ❌ Problems Addressed

The entire ordering process was previously conducted by **pen and paper**. Affiliated organisations — churches, universities, and schools — had to physically dispatch a representative to the HHES centre each quarter to place orders in person.

| Problem | Impact |
|---|---|
| 🚶 Manual in-person ordering | Travel costs + lost productive time every quarter |
| 📉 Zero demand visibility | HHES couldn't forecast stock until reps physically arrived |
| ✏️ High error & loss rate | Handwritten orders prone to illegibility and misplacement |
| 🔕 No order acknowledgement | No confirmation record — disputes impossible to resolve |
| ⏰ No deadline enforcement | HHES couldn't communicate or enforce quarterly deadlines |
| 📈 Unsustainable at scale | Process collapses as affiliated organisations grow |

### ✅ Solution

A **web-based order management system** that enables:
- Affiliated organisations to **self-register, place, and manage** quarterly lesson book orders online
- HHES Admin to have **real-time visibility** into demand, manage quarterly cycles, confirm pickups, and run reports
- A complete **digital audit trail** from order submission through to collection

### 👥 Target Users

| User | Organisation |
|---|---|
| 🏢 HHES Admin Staff | Home Health Education Service Kenya |
| ⛪ Church Representatives | SDA-affiliated churches across Kenya |
| 🎓 University / School Representatives | SDA-affiliated academic institutions |

---

## 📄 Product Requirements Document (PRD)

> **PRD Version:** v1.0 — Approved Final Draft  
> **Status:** All 9 open questions resolved · Ready for engineering handoff

---

### 🎯 Goals & Objectives

**Primary Goal:** Replace the manual, paper-based lesson book ordering process at HHES Kenya with a web-based order management system — giving organisations a self-service ordering platform and giving HHES staff complete real-time visibility over the quarterly ordering cycle.

**Measurable Objectives** *(Increase / Reduce / Improve / Eliminate framework)*:

| # | Objective | Target |
|---|---|---|
| 1 | 📈 **Increase** digital order adoption | 100% of orgs ordering online within 2 quarters of go-live |
| 2 | 📉 **Reduce** order processing errors | Zero lost, duplicated, or miscounted orders per quarter |
| 3 | ⚡ **Reduce** demand visibility lag | From days → real-time |
| 4 | ✅ **Improve** order fulfilment audit coverage | 100% of orders digitally confirmed at pickup |
| 5 | 🔧 **Increase** order amendment self-service | 100% — zero manual admin intervention required |
| 6 | ⏱️ **Reduce** procurement planning time | 60% reduction via dashboards and AI forecasts (Q4) |
| 7 | 📅 **Improve** deadline compliance rate | 95%+ on-time submission rate |

---

### 🗂️ Scope

#### ✅ In Scope — Version 1

- Organisation self-registration with admin approval gate
- Quarterly order cycle management (open, publish, close)
- Lesson book catalogue with pricing per quarter
- Order placement, amendment, and cancellation
- Pickup confirmation and status management
- Admin reporting dashboard and exports
- Email notifications (10 transactional events)
- Historical data migration (one-time batch import)

#### ❌ Out of Scope — Version 1

| Item | Reason |
|---|---|
| 💳 Payment integration (M-Pesa / bank transfer) | Deferred by stakeholder decision — future phase |
| 🚚 Book delivery / logistics | All fulfilment is pickup-only at HHES centre |
| 📱 Dedicated mobile application | Web app is mobile-responsive — native app not required |
| 🏢 Multi-location management | Single HHES centre only |
| 🤖 Full AI feature implementation | Targeted for v2 (Q4 post-go-live activation) |

---

### 👤 User Personas

```
┌─────────────────────────────────────────────────────────────────────┐
│                        SYSTEM USERS                                 │
├──────────────────┬──────────────────────┬───────────────────────────┤
│   🏢 HHES Admin  │   ⛪ Church Rep       │  🎓 University/School Rep  │
├──────────────────┼──────────────────────┼───────────────────────────┤
│ Centre Staff /   │ Church Administrator │ Procurement Officer /     │
│ Manager          │ or Secretary         │ Admin                     │
├──────────────────┼──────────────────────┼───────────────────────────┤
│ • Manage cycles  │ • Self-register      │ • Order in bulk           │
│ • Approve orgs   │ • Place orders       │ • Access order history    │
│ • Confirm pickup │ • Amend orders       │ • Institutional records   │
│ • Run reports    │ • Track status       │ • Amend quantities        │
│ • Set pricing    │ • Email alerts       │ • QoQ comparisons         │
├──────────────────┼──────────────────────┼───────────────────────────┤
│ FULL ACCESS      │ OWN ORG ONLY         │ OWN ORG ONLY              │
└──────────────────┴──────────────────────┴───────────────────────────┘
```

---

### ⚙️ Functional Requirements

Organised by Epic (E1–E8). E9 (AI Features) is scoped for v2.

<details>
<summary><strong>E1 — Authentication & Organisation Management</strong> 🔐</summary>

- Organisation self-registration form (name, contact, email, password, org type)
- Account status flow: `pending` → `approved` / `rejected` / `inactive`
- Admin approval, rejection, and deactivation of org accounts
- Automated approval email with login link
- Org rep profile and organisation detail management
- Role-based access: `admin` | `org_rep`

</details>

<details>
<summary><strong>E2 — Quarterly Cycle Management</strong> 📅</summary>

- Admin creates quarters: name, open date, deadline date
- Quarter statuses: `draft` → `published` → `closed`
- One active published quarter at a time
- **Hard block** on order submission after deadline
- Per-organisation deadline override (mandatory reason field)
- All overrides logged — **immutable** append-only audit trail

</details>

<details>
<summary><strong>E3 — Lesson Book Catalogue</strong> 📚</summary>

Six fixed categories (seeded at deployment):

| # | Category |
|---|---|
| 1 | Adults Lesson |
| 2 | Adults Lesson Double Quarter |
| 3 | Kindergarten |
| 4 | Primary |
| 5 | Cornerstone |
| 6 | Realtime |

- Admin sets uniform price + stock per category per quarter
- Prices **locked** once quarter is published (BR-07)
- Org reps see: name, price, stock status (`Available` / `Low` / `Out`) — not exact numbers

</details>

<details>
<summary><strong>E4 — Order Placement & Amendment</strong> 🛒</summary>

- One order per organisation per quarter (enforced by DB unique constraint)
- Order blocked if: no active quarter · past deadline · org not approved · order already collected
- Edit and cancel allowed until order status = `collected`
- Every amendment triggers an automated email confirmation

</details>

<details>
<summary><strong>E5 — Order & Pickup Management</strong> 📦</summary>

- Admin dashboard: all orders for active quarter with filters
- Status transitions: `submitted` → `ready_for_pickup` → `collected`
- Mark as Ready for Pickup → triggers email to org rep
- Mark as Collected → order locked, triggers pickup confirmation email
- "Not Yet Ordered" panel: active orgs with no order this quarter

</details>

<details>
<summary><strong>E6 — Reporting & Dashboard</strong> 📊</summary>

- Real-time demand summary table (stock vs ordered vs remaining)
- Colour-coded stock status (green / amber / red)
- Override audit log (filterable, exportable, immutable)
- Quarter history selector
- CSV and PDF export
- Org rep: personal order history, category breakdown, QoQ comparison

</details>

<details>
<summary><strong>E7 — Email Notifications</strong> 📧</summary>

10 automated email events:

| Trigger | Recipient |
|---|---|
| Registration received | Org Rep |
| Organisation approved | Org Rep |
| Organisation rejected | Org Rep |
| New quarter opened | All active Org Reps |
| Deadline reminder (3 days) | Org Reps who haven't ordered |
| Order submitted | Org Rep |
| Order amended | Org Rep |
| Order cancelled | Org Rep |
| Order ready for pickup | Org Rep |
| Order collected / pickup confirmed | Org Rep |

</details>

<details>
<summary><strong>E8 — Historical Data Migration</strong> 🗄️</summary>

- One-time batch import of existing HHES digital order records
- No OCR required — data already in digital format
- Admin migration page: file upload (CSV/JSON), field mapping, import summary
- Imported records are read-only historical data

</details>

---

### 🔒 Non-Functional Requirements

| Category | Requirement |
|---|---|
| 🔐 **Security** | Supabase Row Level Security (RLS) — org reps cannot access other orgs' data |
| 🔐 **Authentication** | Email/password via Supabase Auth. Pending/rejected orgs blocked at middleware |
| ⚡ **Performance** | Real-time dashboard updates via Supabase Realtime subscriptions |
| 📱 **Responsiveness** | Mobile-responsive web app — no native app required |
| ✅ **Type Safety** | TypeScript strict mode throughout — no `any` types |
| 🧪 **Validation** | Zod schema validation on all API route inputs |
| 📧 **Email Reliability** | Transactional emails via Resend API — server-side only |
| 🗃️ **Data Integrity** | No hard deletes — soft deletes / status fields preserve full history |
| 📋 **Audit Trail** | Override logs are immutable (INSERT only — no UPDATE or DELETE) |
| 🌐 **Accessibility** | WCAG 2.1 AA target — keyboard navigable, screen reader friendly |

---

### 📌 Assumptions & Constraints

#### Assumptions
- All affiliated organisations have browser-capable devices and adequate internet connectivity
- HHES Admin manually opens each quarterly cycle — no automated scheduling required for v1
- Pricing is uniform across all organisation types
- All fulfilment is pickup-only at a single HHES centre
- Organisation count remains under 50 for the near term
- Historical order data will be provided as existing digital files by HHES
- Three full quarters of clean digital data will be available by Q4 to activate AI forecasting

#### Constraints

| Constraint | Detail |
|---|---|
| 🛠️ Tech stack is fixed | Next.js 15 (App Router) + Supabase + TypeScript + Tailwind CSS v4 |
| 💳 No payment processing | Financial transactions are explicitly out of scope for v1 |
| 📍 Single HHES location | All pickups at one centre — no multi-branch logic |
| 📧 Email only | SMS integration (Africa's Talking) deferred to a future release |
| 📚 Six fixed categories | Admin adjusts pricing/stock but cannot add new categories in v1 |
| 🤖 AI in v2 only | v1 schema is AI-ready but no live AI features in this release |

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| 🖥️ **Frontend** | Next.js 15 (React 19) | App Router, SSR, React Server Components |
| 🔷 **Language** | TypeScript (strict) | Full type safety across client and server |
| 🎨 **Styling** | Tailwind CSS v4 | Responsive UI, utility-first, mobile-ready |
| 🗃️ **State Management** | Redux Toolkit + Context API | Global state (auth, active quarter, notifications) |
| 🔑 **Backend & Auth** | Supabase | Email/password auth, RBAC via RLS, REST APIs |
| 🐘 **Database** | PostgreSQL (Supabase) | Relational data — orders, orgs, quarters, catalogue |
| ⚡ **Realtime** | Supabase Realtime | Live dashboard updates — order counts, stock levels |
| 📧 **Email** | Resend + React Email | Transactional emails — 10 event types |
| 📁 **File Exports** | Papa Parse + jsPDF | CSV and PDF report generation |
| ✅ **Validation** | Zod + React Hook Form | Schema validation on all forms and API inputs |
| 🚀 **Deployment** | Vercel | Serverless, CI/CD, edge functions |

---

## 🏗️ Tech Stack Visual Representation

```
┌─────────────────────────────────────────────────────────────────┐
│                        BROWSER / CLIENT                         │
│                                                                 │
│   ┌─────────────────┐   ┌────────────────┐   ┌─────────────┐  │
│   │   Next.js 15    │   │  Tailwind CSS  │   │    Redux    │  │
│   │   App Router    │   │      v4        │   │   Toolkit   │  │
│   │   React 19      │   │  Responsive UI │   │ Global State│  │
│   └────────┬────────┘   └───────┬────────┘   └──────┬──────┘  │
│            └───────────────────┬┘                   │         │
│                                │◄───────────────────┘         │
└────────────────────────────────┼────────────────────────────── ┘
                                 │ HTTP / RSC / Server Actions
┌────────────────────────────────┼─────────────────────────────── ┐
│                      NEXT.JS SERVER                             │
│                                │                                │
│   ┌────────────────────────────▼──────────────────────────┐    │
│   │                  API Route Handlers                    │    │
│   │   /api/auth  /api/orders  /api/quarters  /api/reports  │    │
│   │              Zod Validation on all inputs              │    │
│   └────────────────────┬──────────────────────────────────┘    │
│                        │                                        │
│   ┌────────────────────▼──────────────────────────────────┐    │
│   │              middleware.ts (Route Protection)          │    │
│   │   Unauthenticated → /login                            │    │
│   │   org_rep → /admin/* blocked                          │    │
│   │   admin → /rep/* blocked                              │    │
│   │   pending/rejected org → blocked                      │    │
│   └────────────────────────────────────────────────────────┘   │
│                                                                 │
│   ┌────────────────────────────────────────────────────────┐   │
│   │        Resend API  (server-side email only)            │   │
│   │   10 transactional email templates via React Email     │   │
│   └────────────────────────────────────────────────────────┘   │
└──────────────────────────────┬──────────────────────────────── ┘
                               │
┌──────────────────────────────▼──────────────────────────────── ┐
│                          SUPABASE                               │
│                                                                 │
│   ┌─────────────────┐   ┌────────────────┐   ┌─────────────┐  │
│   │   PostgreSQL    │   │  Supabase Auth │   │  Realtime   │  │
│   │                 │   │                │   │  Channels   │  │
│   │  organisations  │   │ email/password │   │             │  │
│   │  quarters       │   │ Row Level Sec  │   │  Live order │  │
│   │  catalogue_items│   │ 2 roles:       │   │  count &    │  │
│   │  orders         │   │  admin         │   │  stock      │  │
│   │  order_items    │   │  org_rep       │   │  updates    │  │
│   │  order_amendments   └────────────────┘   └─────────────┘  │
│   │  deadline_overrides                                        │
│   └─────────────────┘                                          │
└──────────────────────────────────────────────────────────────── ┘

                        DEPLOYED ON VERCEL
                    ┌───────────────────────┐
                    │  CI/CD · Serverless   │
                    │  Edge Functions       │
                    │  Preview Deployments  │
                    └───────────────────────┘
```

---

## 🚀 Installation & Setup

### Prerequisites

Make sure you have the following installed:

- **Node.js** `>= 18.x`
- **npm** `>= 9.x`
- A **Supabase** account and project → [supabase.com](https://supabase.com)
- A **Resend** account for transactional email → [resend.com](https://resend.com)
- A **Vercel** account for deployment (optional for local dev) → [vercel.com](https://vercel.com)

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-org/hhes-ordering-system.git
cd hhes-ordering-system
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Set Up Environment Variables

Copy the example environment file and fill in your values:

```bash
cp .env.local.example .env.local
```

Open `.env.local` and populate all required keys (see [Environment Variables](#-environment-variables) section below).

### 4️⃣ Set Up Supabase

#### Create the database tables

Run the following in your Supabase SQL editor (or use the migration files in `/supabase/migrations/`):

```sql
-- organisations
CREATE TABLE organisations (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name            text NOT NULL,
  type            text NOT NULL CHECK (type IN ('church', 'university', 'school')),
  contact_name    text NOT NULL,
  contact_email   text UNIQUE NOT NULL,
  phone           text,
  status          text NOT NULL DEFAULT 'pending'
                  CHECK (status IN ('pending', 'approved', 'rejected', 'inactive')),
  approved_by     uuid REFERENCES auth.users(id),
  approved_at     timestamptz,
  created_at      timestamptz DEFAULT now(),
  updated_at      timestamptz DEFAULT now()
);

-- quarters
CREATE TABLE quarters (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name            text NOT NULL,
  open_date       date NOT NULL,
  deadline_date   date NOT NULL,
  status          text NOT NULL DEFAULT 'draft'
                  CHECK (status IN ('draft', 'published', 'closed')),
  created_by      uuid REFERENCES auth.users(id),
  closed_at       timestamptz,
  created_at      timestamptz DEFAULT now(),
  updated_at      timestamptz DEFAULT now()
);

-- catalogue_items
CREATE TABLE catalogue_items (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quarter_id      uuid NOT NULL REFERENCES quarters(id),
  category_name   text NOT NULL,
  category_slug   text NOT NULL
                  CHECK (category_slug IN (
                    'adults_lesson', 'adults_dq', 'kindergarten',
                    'primary', 'cornerstone', 'realtime'
                  )),
  price_kes       numeric NOT NULL,
  stock_quantity  integer NOT NULL,
  is_locked       boolean DEFAULT false,
  created_at      timestamptz DEFAULT now()
);

-- orders
CREATE TABLE orders (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organisation_id  uuid NOT NULL REFERENCES organisations(id),
  quarter_id       uuid NOT NULL REFERENCES quarters(id),
  status           text NOT NULL DEFAULT 'submitted'
                   CHECK (status IN (
                     'submitted', 'ready_for_pickup', 'collected', 'cancelled'
                   )),
  is_historical    boolean DEFAULT false,
  submitted_at     timestamptz,
  collected_at     timestamptz,
  created_by       uuid REFERENCES auth.users(id),
  collected_by     uuid REFERENCES auth.users(id),
  created_at       timestamptz DEFAULT now(),
  updated_at       timestamptz DEFAULT now(),
  UNIQUE(organisation_id, quarter_id)   -- BR-02: one order per org per quarter
);

-- order_items
CREATE TABLE order_items (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id          uuid NOT NULL REFERENCES orders(id),
  catalogue_item_id uuid REFERENCES catalogue_items(id),
  category_slug     text NOT NULL,
  quantity          integer NOT NULL CHECK (quantity >= 0),
  unit_price_kes    numeric NOT NULL,
  created_at        timestamptz DEFAULT now()
);

-- order_amendments
CREATE TABLE order_amendments (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id      uuid NOT NULL REFERENCES orders(id),
  amended_by    uuid REFERENCES auth.users(id),
  previous_data jsonb NOT NULL,
  new_data      jsonb NOT NULL,
  amended_at    timestamptz DEFAULT now()
);

-- deadline_overrides (IMMUTABLE — INSERT only via RLS)
CREATE TABLE deadline_overrides (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organisation_id   uuid NOT NULL REFERENCES organisations(id),
  quarter_id        uuid NOT NULL REFERENCES quarters(id),
  original_deadline date NOT NULL,
  new_deadline      date NOT NULL,
  reason            text NOT NULL,
  granted_by        uuid NOT NULL REFERENCES auth.users(id),
  granted_at        timestamptz DEFAULT now()
);
```

#### Seed the six lesson book categories

```sql
-- Run this once after your first quarter is created
-- Replace 'YOUR_QUARTER_ID' with the actual quarter uuid

INSERT INTO catalogue_items (quarter_id, category_name, category_slug, price_kes, stock_quantity)
VALUES
  ('YOUR_QUARTER_ID', 'Adults Lesson',               'adults_lesson', 0, 0),
  ('YOUR_QUARTER_ID', 'Adults Lesson Double Quarter', 'adults_dq',     0, 0),
  ('YOUR_QUARTER_ID', 'Kindergarten',                'kindergarten',   0, 0),
  ('YOUR_QUARTER_ID', 'Primary',                     'primary',        0, 0),
  ('YOUR_QUARTER_ID', 'Cornerstone',                 'cornerstone',    0, 0),
  ('YOUR_QUARTER_ID', 'Realtime',                    'realtime',       0, 0);
```

#### Generate TypeScript types from your schema

```bash
npx supabase gen types typescript --project-id YOUR_PROJECT_ID > lib/supabase/types.ts
```

### 5️⃣ Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6️⃣ Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler check (no emit)
```

---

## 📁 Project Structure

```
hhes-ordering-system/
├── app/
│   ├── (auth)/                        # 🔓 Unauthenticated routes
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   ├── forgot-password/page.tsx
│   │   └── layout.tsx
│   │
│   ├── (admin)/                       # 🏢 HHES Admin routes (full access)
│   │   ├── dashboard/page.tsx         # E5+E6: metrics, demand table, feeds
│   │   ├── quarters/
│   │   │   ├── page.tsx               # E2: list all quarters
│   │   │   ├── new/page.tsx           # E2: create new quarter
│   │   │   └── [id]/page.tsx          # E2: edit, publish, override deadlines
│   │   ├── catalogue/
│   │   │   ├── page.tsx               # E3: all categories overview
│   │   │   └── [quarterId]/page.tsx   # E3: set prices and stock
│   │   ├── orders/
│   │   │   ├── page.tsx               # E5: all orders, filters, actions
│   │   │   └── [id]/page.tsx          # E5: order detail, timeline, log
│   │   ├── organisations/
│   │   │   ├── page.tsx               # E1: approval queue + all orgs
│   │   │   └── [id]/page.tsx          # E1: org detail, status control
│   │   ├── reports/page.tsx           # E6: demand summary, audit log, exports
│   │   ├── migration/page.tsx         # E8: historical data import
│   │   ├── profile/page.tsx           # Admin profile + activity log
│   │   └── layout.tsx
│   │
│   ├── (rep)/                         # ⛪🎓 Org Rep routes (own data only)
│   │   ├── dashboard/page.tsx         # E4+E6: status card, quarter banner
│   │   ├── order/
│   │   │   ├── place/page.tsx         # E4: order placement form
│   │   │   ├── [id]/page.tsx          # E4: order detail + progress bar
│   │   │   └── [id]/edit/page.tsx     # E4: amend order
│   │   ├── orders/page.tsx            # E4: full order history
│   │   ├── catalogue/page.tsx         # E3: read-only catalogue
│   │   ├── reports/page.tsx           # E6: personal reports + exports
│   │   ├── profile/page.tsx           # E1: org profile management
│   │   └── layout.tsx
│   │
│   ├── api/                           # 🔌 API Route Handlers
│   │   ├── auth/
│   │   │   ├── register/route.ts
│   │   │   └── callback/route.ts
│   │   ├── organisations/
│   │   │   ├── route.ts
│   │   │   └── [id]/route.ts
│   │   ├── quarters/
│   │   │   ├── route.ts
│   │   │   └── [id]/route.ts
│   │   ├── catalogue/[quarterId]/route.ts
│   │   ├── orders/
│   │   │   ├── route.ts
│   │   │   └── [id]/
│   │   │       ├── route.ts
│   │   │       ├── cancel/route.ts
│   │   │       └── status/route.ts
│   │   ├── overrides/route.ts
│   │   ├── reports/[type]/route.ts
│   │   └── migration/route.ts
│   │
│   ├── layout.tsx                     # Root layout — fonts, metadata, Redux provider
│   └── page.tsx                       # Public landing → redirects to login
│
├── components/
│   ├── ui/                            # 🎨 Reusable primitives
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Badge.tsx
│   │   ├── Modal.tsx
│   │   ├── Table.tsx
│   │   └── Spinner.tsx
│   ├── layout/                        # 🧭 Navigation components
│   │   ├── AdminNavbar.tsx
│   │   ├── RepNavbar.tsx
│   │   ├── Footer.tsx
│   │   └── QuarterPill.tsx
│   ├── dashboard/                     # 📊 Dashboard panels
│   │   ├── MetricCard.tsx
│   │   ├── DemandTable.tsx
│   │   ├── PendingPickups.tsx
│   │   ├── RecentOrders.tsx
│   │   └── NotYetOrderedPanel.tsx
│   ├── orders/                        # 📦 Order components
│   │   ├── OrderForm.tsx
│   │   ├── OrderStatusBadge.tsx
│   │   ├── OrderStatusTimeline.tsx
│   │   └── AmendmentLog.tsx
│   ├── catalogue/                     # 📚 Catalogue components
│   │   ├── CatalogueTable.tsx
│   │   └── StockStatusBadge.tsx
│   ├── reports/                       # 📈 Report components
│   │   ├── ExportButton.tsx
│   │   └── QuarterSelector.tsx
│   └── notifications/
│       └── NotificationBell.tsx
│
├── emails/                            # 📧 React Email templates (10 total)
│   ├── RegistrationReceived.tsx
│   ├── OrgApproved.tsx
│   ├── OrgRejected.tsx
│   ├── QuarterOpened.tsx
│   ├── DeadlineReminder.tsx
│   ├── OrderSubmitted.tsx
│   ├── OrderAmended.tsx
│   ├── OrderCancelled.tsx
│   ├── OrderReadyForPickup.tsx
│   └── OrderCollected.tsx
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts                  # Browser Supabase client
│   │   ├── server.ts                  # Server Supabase client (cookies)
│   │   └── types.ts                   # Generated DB types
│   ├── validations/
│   │   ├── order.schema.ts
│   │   ├── quarter.schema.ts
│   │   ├── organisation.schema.ts
│   │   └── catalogue.schema.ts
│   ├── email.ts                       # Resend send helper
│   ├── export.ts                      # CSV + PDF generation
│   └── utils.ts                       # Date helpers, classname utility
│
├── store/
│   ├── index.ts                       # Redux store config
│   ├── StoreProvider.tsx              # Client-side Redux provider
│   └── slices/
│       ├── authSlice.ts               # { user, role, orgStatus }
│       ├── quarterSlice.ts            # { activeQuarter, status }
│       └── notificationSlice.ts       # { unreadCount, notifications }
│
├── types/
│   ├── index.ts                       # Shared TS interfaces + union types
│   └── supabase.ts                    # Re-exports Database type
│
├── middleware.ts                      # Route protection by role
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── .env.local.example
└── package.json
```

---

## 🔄 Order Status State Machine

```
                    ┌─────────────┐
                    │   PLACED    │
                    │  (Submit)   │
                    └──────┬──────┘
                           │
                           ▼
                    ┌─────────────┐
                    │  SUBMITTED  │◄──── Org Rep can EDIT or CANCEL here
                    └──────┬──────┘
                           │ Admin: Mark Ready
                           ▼
                    ┌─────────────┐
                    │  READY FOR  │◄──── Email sent to Org Rep
                    │   PICKUP    │      Org Rep can still CANCEL here
                    └──────┬──────┘
                           │ Admin: Mark Collected
                           ▼
                    ┌─────────────┐
                    │  COLLECTED  │  ✅ TERMINAL — order locked, no further edits
                    └─────────────┘

            At any point before COLLECTED:
                    ┌─────────────┐
                    │  CANCELLED  │  ❌ TERMINAL
                    └─────────────┘
```

> **Business Rule BR-04:** Once an order reaches `collected` or `cancelled`, no further status changes or edits are permitted by any user.

---

## 🔌 API Routes Reference

| Method | Route | Access | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | Public | Create pending org account |
| `GET` | `/api/auth/callback` | Public | Supabase auth callback handler |
| `GET` | `/api/organisations` | Admin | List all organisations |
| `PATCH` | `/api/organisations/[id]` | Admin | Approve / reject / deactivate |
| `GET` | `/api/quarters` | Both | List quarters |
| `POST` | `/api/quarters` | Admin | Create new quarter |
| `PATCH` | `/api/quarters/[id]` | Admin | Publish / close quarter |
| `GET` | `/api/catalogue/[quarterId]` | Both | Get catalogue items |
| `POST` | `/api/catalogue/[quarterId]` | Admin | Set prices and stock |
| `GET` | `/api/orders` | Both | Admin: all orders · Rep: own orders |
| `POST` | `/api/orders` | Rep | Submit new order |
| `PATCH` | `/api/orders/[id]` | Rep | Amend order quantities |
| `POST` | `/api/orders/[id]/cancel` | Rep | Cancel order |
| `PATCH` | `/api/orders/[id]/status` | Admin | Update order status |
| `POST` | `/api/overrides` | Admin | Grant deadline override |
| `GET` | `/api/reports/[type]` | Admin | Generate report data |
| `POST` | `/api/migration` | Admin | Import historical data |

---

## 🔐 Environment Variables

Create a `.env.local` file by copying `.env.local.example`:

```bash
# ─── Supabase ───────────────────────────────────────────
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# ─── Resend (Email) ─────────────────────────────────────
RESEND_API_KEY=re_your_resend_api_key
EMAIL_FROM=noreply@hhes.co.ke

# ─── Application ────────────────────────────────────────
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=HHES Lesson Ordering System

# ─── HHES Centre Info (used in email templates) ─────────
HHES_ADDRESS=HHES Centre, Nairobi, Kenya
HHES_PHONE=+254 700 000 000
HHES_OFFICE_HOURS=Monday-Friday, 8:00AM - 5:00PM
```

> ⚠️ **Never commit `.env.local` to version control.** It is already listed in `.gitignore`.

---

## 🗺️ Roadmap

### ✅ Version 1.0 (Current)
- [x] PRD — Approved Final Draft
- [x] Product Backlog — 67 user stories across 9 epics
- [x] LLM Engineering Prompt
- [x] Project Skeleton
- [ ] E1 — Authentication & Organisation Management
- [ ] E2 — Quarterly Cycle Management
- [ ] E3 — Lesson Book Catalogue
- [ ] E4 — Order Placement & Amendment
- [ ] E5 — Order & Pickup Management
- [ ] E6 — Reporting & Dashboard
- [ ] E7 — Email Notifications
- [ ] E8 — Historical Data Migration

### 🔮 Version 2.0 (Post Q4 Go-Live)
- [ ] 🤖 E9 — AI Demand Forecasting *(requires 3 quarters of data)*
- [ ] 🤖 Smart Stock Alerts
- [ ] 🤖 Anomaly Detection
- [ ] 🤖 AI-Generated Quarterly Procurement Summaries
- [ ] 💳 Payment Integration (M-Pesa / Bank Transfer)
- [ ] 👁️ Read-Only Viewer Role
- [ ] 📱 SMS Notifications (Africa's Talking)

---

## 🤝 Contributing

Contributions are welcome. Please follow the process below to ensure consistency with the approved PRD and product backlog.

### Contribution Guidelines

1. **Fork** the repository and create a feature branch from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Reference the epic and user story** in your branch name where possible:
   ```bash
   git checkout -b feature/E4-order-placement-form
   ```

3. **Follow the file comment block format** defined in the LLM Engineering Prompt:
   ```ts
   /**
    * @file    components/orders/OrderForm.tsx
    * @epic    E4 — Order Placement & Amendment
    * @persona Church Rep, University / School Rep
    * @purpose Order form component with 6 category quantity fields.
    */
   ```

4. **Ensure TypeScript passes** before opening a PR:
   ```bash
   npm run type-check
   npm run lint
   ```

5. **Never hard-delete records** from the database — use status fields or soft deletes to preserve the full audit trail for AI features in v2.

6. Open a **Pull Request** against `main` with:
   - A clear description of what was built
   - The epic(s) and user story ID(s) covered (e.g. `US-E4-01`)
   - Screenshots or recordings for UI changes

### Business Rules to Respect

All contributions must uphold the 10 core business rules:

| Rule | Summary |
|---|---|
| BR-01 | Hard deadline enforcement — no late order submissions without admin override |
| BR-02 | One order per organisation per quarter |
| BR-03 | Uniform pricing — no org-specific discounts |
| BR-04 | Order locked once marked as collected |
| BR-05 | Every amendment triggers a confirmation email |
| BR-06 | Override audit logs are immutable — INSERT only |
| BR-07 | Catalogue prices lock when quarter is published |
| BR-08 | Org reps see stock status only — not exact quantities |
| BR-09 | Organisations cannot access any feature before admin approval |
| BR-10 | No payment processing in v1 |

---

## 📜 License

```
MIT License

Copyright (c) 2025 Home Health Education Service Kenya

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

---

<div align="center">

**Built for Home Health Education Service Kenya 🇰🇪**

*SDA Church Affiliated · Nairobi, Kenya*

---

📚 Distributing lesson books · ⛪ Serving churches · 🎓 Empowering institutions

</div>