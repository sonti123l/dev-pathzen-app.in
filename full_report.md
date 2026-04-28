# PathZen Frontend — Full Report
### Repository: `dev-app-pathzen.in` | Author: Sai Trishal Sonti | Analyzed: April 2026

---

# PART 1 — Repository Analysis

## 1. Project Overview

**PathZen** is a full-stack **EdTech / career-development platform** targeting Indian engineering students. It helps students discover career paths, take structured courses, attend live classes from teachers, and track their progress. The frontend is a **React 19 + TanStack Start SPA** backed by a separate REST API server.

| Property | Value |
|---|---|
| Author | Sai Trishal Sonti |
| Version | 1.0.1 |
| Build Tool | Vite 8 + `@vitejs/plugin-react` |
| Framework | TanStack Start (SSR-capable React meta-framework) |
| Routing | TanStack Router (file-based, type-safe) |
| Styling | Tailwind CSS v4 + shadcn/ui (Radix UI primitives) |
| Server State | TanStack Query v5 |
| Auth State | React Context (`UserProvider`) |
| Animations | Framer Motion |
| Live Streaming | Cloudflare WebRTC/WHIP (teacher) + iframe (student) |
| HTTP | Custom `FetchService` class wrapping native `fetch` |

---

## 2. Repository Structure

```
dev-app-pathzen.in/
├── src/
│   ├── routes/                        # File-based routing (TanStack Router)
│   │   ├── __root.tsx                 # Root layout: QueryClient, UserProvider, Toaster
│   │   ├── index.tsx                  # Landing page route → PathZenApp
│   │   ├── _layout.tsx                # Authenticated shell (sidebar + header)
│   │   ├── _layout/
│   │   │   ├── dashboard/index.tsx    # /dashboard
│   │   │   ├── courses/index.tsx      # /courses
│   │   │   ├── progress/              # /progress  (stub)
│   │   │   ├── certifications/        # /certifications  (stub)
│   │   │   ├── settings/              # /settings  (stub)
│   │   │   ├── plan/                  # /plan  (stub)
│   │   │   └── teachers/              # /teachers  (admin)
│   │   ├── _auth/
│   │   │   ├── login/index.tsx        # /login
│   │   │   └── register/index.tsx     # /register
│   │   └── course/$id/index.tsx       # /course/:id — live course dashboard
│   │
│   ├── components/
│   │   ├── Index.tsx                  # Landing page (Home + About) — 579 lines
│   │   ├── AppLayout.tsx              # Sidebar shell with role-filtered nav
│   │   ├── CourseCardSkeleton.tsx
│   │   ├── CourseDetailsSkeletion.tsx
│   │   ├── TruncatedItem.tsx
│   │   ├── auth/
│   │   │   ├── LoginPage.tsx
│   │   │   └── RegisterPage.tsx
│   │   ├── core/
│   │   │   ├── CourseDashboard.tsx    # Live classroom UI — 569 lines
│   │   │   ├── Header.tsx
│   │   │   └── SidebarForProject.tsx
│   │   ├── layout/
│   │   │   ├── Dashboard.tsx          # User dashboard
│   │   │   ├── Courses.tsx            # All courses grid
│   │   │   ├── Certifications.tsx     # (stub)
│   │   │   ├── Progress.tsx           # (stub)
│   │   │   ├── Settings.tsx           # (stub)
│   │   │   └── teachers/              # Admin teacher management
│   │   └── ui/                        # shadcn/ui primitives
│   │       ├── button, input, dialog, dropdown-menu
│   │       ├── sidebar, sheet, popover, select
│   │       └── skeleton, sonner, tooltip, separator
│   │
│   ├── services/
│   │   ├── appService.ts              # Live streaming API calls
│   │   ├── auth/authService.ts        # Login / Register / Register Teacher
│   │   └── resources/resourceService.ts  # Colleges, Domains, Courses
│   │
│   ├── http/
│   │   ├── fetch.ts                   # Custom FetchService class (core HTTP layer)
│   │   ├── httpErrorHandlers.ts
│   │   └── prepareURLEncodedParams.ts
│   │
│   ├── hooks/
│   │   ├── user-provider.tsx          # UserContext + useUser hook
│   │   ├── use-custom-hooks.ts        # useAllCourses (TanStack Query wrapper)
│   │   └── use-mobile.ts
│   │
│   ├── lib/
│   │   ├── utils.ts
│   │   └── interfaces/
│   │       ├── app.ts                 # UserType, CollegeData, CoursesDataType, etc.
│   │       ├── auth.ts                # loginPayload, registerPayload, etc.
│   │       └── form-auth.ts
│   │
│   ├── helpers/constants/
│   │   ├── sidebarMenu.ts             # Role-filtered sidebar config
│   │   ├── style.ts                   # 400-line inline CSS for landing page
│   │   ├── getDateAndTimeAccordingly.ts
│   │   ├── getUserDetails.ts          # localStorage helper
│   │   ├── animationSentences.ts
│   │   └── useDebounce.ts
│   │
│   ├── icons/                         # Custom SVG icon components
│   ├── styles/global.css              # Global Tailwind CSS
│   └── router.tsx                     # Router instantiation
│
├── vite.config.ts
├── tsconfig.json
├── components.json                    # shadcn/ui config
├── .env                               # VITE_PUBLIC_API_URL
└── package.json
```

---

## 3. Key Architecture Decisions

### 3.1 Routing — TanStack Router (File-based)
Routes are auto-generated into `src/routeTree.gen.ts`. The naming convention:
- `__root.tsx` — root document with global providers
- `_layout.tsx` / `_layout/` — authenticated shell (pathless layout)
- `_auth/` — auth pages (login, register)
- `course/$id/` — dynamic course route

### 3.2 HTTP Layer — `FetchService` class
A custom class wrapping native `fetch` with:
- **Automatic JWT injection** via `js-cookie` (`token` cookie)
- **Refresh token flow** — on 401, auto-calls `/refresh-token` and retries the original request
- **Request deduplication** — AbortController map; GET requests cancel previous in-flight request for the same URL
- **POST/PUT/PATCH** are concurrent by default (unique request key per call)
- Methods: `.get()`, `.post()`, `.put()`, `.patch()`, `.delete()`, `.postFormData()`
- Exported as singleton: `export const $fetch = new FetchService()`

### 3.3 Auth Flow
1. User submits login → `POST /auth/login`
2. Response returns `{ token: { access_token, refresh_token }, data: userDetails }`
3. Tokens stored in **cookies** (`js-cookie`); user details in **localStorage**
4. `UserProvider` reads localStorage on mount and hydrates React context
5. Role-based redirect: `STUDENT/TEACHER → /dashboard`, `ADMIN → /teachers`

### 3.4 User Roles
| Role | Default Route | Key Capabilities |
|---|---|---|
| `STUDENT` | `/dashboard` | View courses, watch live streams via iframe |
| `TEACHER` | `/dashboard` | Go Live (WebRTC/WHIP), schedule sessions, manage sub-modules |
| `ADMIN` | `/teachers` | Manage teacher accounts |

### 3.5 Live Streaming (WebRTC via Cloudflare)
In `CourseDashboard.tsx`:
- **Teacher side:** Uses `RTCPeerConnection` + WHIP protocol to push camera/mic to Cloudflare's stream key
- **Student side:** Polls every 5s (`refetchInterval`) to `/rooms/active/:subModuleId`; when `iframe_url` is received, renders it in an `<iframe>`
- **Session management:** Teachers schedule via dialog (`PATCH /course/submodule/:id/settime`), go live (`POST /rooms/golive/:id`), end stream (`POST /rooms/end/:roomId`)

---

## 4. All API Endpoints Referenced

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/auth/login` | Login |
| POST | `/auth/register` | Student registration |
| POST | `/auth/register-teacher` | Teacher registration |
| POST | `/refresh-token` | Token refresh |
| GET | `/api/colleges?page=&limit=&search=` | Paginated + searchable college list |
| GET | `/api/domains` | All learning domains |
| GET | `/api/courses/:domainId` | Courses by domain |
| GET | `/api/course/:courseId` | Course details (modules + sub-modules) |
| GET | `/api/courses` | All courses |
| PATCH | `/course/submodule/:id/settime` | Schedule live time |
| POST | `/rooms/golive/:subModuleId` | Create live stream room |
| GET | `/rooms/active/:subModuleId` | Check if room is live (student polling) |
| POST | `/rooms/end/:roomId` | End live stream |

---

## 5. Data Models

### `UserType` (React Context)
```ts
{
  user_id?, user_name?, user_mail?,
  role?: "ADMIN" | "STUDENT" | "TEACHER",
  user_course_id?,
  student_college_id?, student_roll_no?, branch_name?,
  teacher_experience?, teacher_technicalities?: string[]
}
```

### Course Detail API Shape
```ts
{
  course: [{ course_id, course_name, field_id, course_created_at, course_meta_data }],
  domain: [{ domain_id, domain_name }],
  modules: [{
    module_id, module_name, course_id_for_module, is_module_complete,
    sub_modules: [{
      sub_module_id, sub_module_title, is_active
    }]
  }]
}
```

### Auth Payloads
```ts
// Login
{ email: string; password: string }

// Student Register
{ name, email, password, branchName, collegeId, domainId, rollNo, courseId }

// Teacher Register
{ fullName, email, password, courseId, experience, technicalSkills: { skills: string[] } }
```

---

## 6. Landing Page Design (`src/components/Index.tsx`)

The public-facing landing page is a self-contained single-file component (579 lines):
- Home and About pages managed via local `useState` (`"home" | "about"`)
- All CSS injected via a 400-line string from `helpers/constants/style.ts`
- **Fonts:** Syne (display headings) + DM Sans (body) from Google Fonts
- **Color Palette:** Dark `#1c2030` hero + cream `#f5f2eb` sections + teal `#0a9e8a` accent + gold `#e8a020` highlight
- **Responsive:** Hamburger menu ≤700px, grid → single-column ≤900px
- **Sections:** Hero → What is PathZen → What We Offer → How It Works → Why Choose → CTA
- **About Page:** Hero → Vision & Mission → The Problem → What Makes Us Different → Founder's Note

---

## 7. Bugs & Issues Found

> [!WARNING]
> **Confirmed Bugs**

| # | File | Issue |
|---|---|---|
| 1 | `Index.tsx:547` | `navigate({ to: "/get-started" })` — route does not exist in the router |
| 2 | `CourseDashboard.tsx:285` | Progress bar hardcoded to `38%` — not computed from real data |
| 3 | `CourseDashboard.tsx:331` | Sub-module label hardcoded to `"Foundation"` — should be dynamic |
| 4 | `LoginPage.tsx:42` | Checks `error?.status === 402` — HTTP 402 is non-standard, likely should be `401` |
| 5 | `AppLayout.tsx:16` | `useState([])` without generic loses TypeScript type info for sidebar items |
| 6 | `Dashboard.tsx:33` | `res?.data?.data?.data` — triple nesting, extremely fragile API shape dependency |
| 7 | `Courses.tsx:32` | Loading state renders empty `<p></p>` — no skeleton or spinner shown |

> [!NOTE]
> **Incomplete Features (Stubs)**

`Progress.tsx`, `Certifications.tsx`, `Settings.tsx` — all registered as routes but have zero implementation.

> [!TIP]
> **Code Quality Suggestions**

- Move landing page CSS from runtime JS string to a real `.css` file (enable caching + purging)
- Unify date utilities — both `dayjs` AND `luxon` are installed; only one is needed
- Wire up `next-themes` (installed but dark mode never activated)
- Standardize `queryKey` — `["course-details"]` vs `["course-details", id]` could cause cache collisions
- Add TypeScript generics to all `useState([])` and `useState({})` calls
- Define API response types instead of using `any`

---

## 8. Dependency Overview

| Package | Purpose |
|---|---|
| `@tanstack/react-router` | File-based, type-safe routing |
| `@tanstack/react-start` | SSR/meta-framework layer |
| `@tanstack/react-query` | Server state, caching, mutations |
| `@tanstack/react-form` | Form management (Registration) |
| `framer-motion` | Animations |
| `hls.js` | HLS video playback (installed, not yet used in inspected code) |
| `js-cookie` | Cookie-based token storage |
| `sonner` | Toast notifications |
| `lucide-react` | Icon library |
| `@radix-ui/themes` | Base for shadcn/ui components |
| `dayjs` + `luxon` | Date utilities (redundant — both installed) |
| `next-themes` | Dark mode (installed but not wired up) |

---
---

# PART 2 — Developer Assessment

## Overall Level: **Mid-Junior → Early Mid-Level**
### Estimated Experience: **1.5 – 2.5 years** (self-taught / bootcamp background)

---

## ✅ Strengths (What's Impressive)

### 1. Tooling Choices — Above Average for Juniors
- Chose **TanStack Router** (not React Router) — most juniors never discover this
- Correctly uses **TanStack Query** mutations with `onSuccess`, `onError`, `queryKey`, `enabled`, `refetchInterval` — real understanding of server state, not just tutorials
- Understands the difference between loading states, error states, and success states

### 2. Custom FetchService — Genuinely Impressive
Built from scratch with:
- `AbortController` map for request cancellation and GET deduplication
- Automatic refresh token retry on 401
- FormData vs JSON Content-Type detection
- Concurrent vs deduplicated request logic
Most developers at this level just copy-paste an axios setup. This shows real engineering thinking.

### 3. WebRTC Live Streaming — Punching Above Weight
- Implementing **WebRTC + WHIP protocol** with Cloudflare is not junior-level work
- Correctly uses `createOffer → setLocalDescription → WHIP POST → setRemoteDescription`
- Student-side polling with `refetchInterval` is a pragmatic, production-valid approach
- This single feature demonstrates curiosity, research ability, and willingness to tackle hard problems

### 4. Code Organization
- Clean separation: `services/`, `http/`, `hooks/`, `helpers/`, `lib/interfaces/`
- Role-based sidebar config in a separate file (`sidebarMenu.ts`) — extensible thinking
- TypeScript interfaces defined for all major data shapes (even if not always used strictly)

### 5. Design Sense
- Landing page shows real aesthetic sensibility — design tokens, CSS variables, responsive breakpoints, micro-animations, good typography choices
- The app UI (Dashboard, CourseDashboard) is clean and structured, not chaotic
- Above-average for a developer-first person

---

## ❌ Weaknesses (Where They Fall Short)

### 1. TypeScript — Inconsistent and Immature
```ts
// Found throughout the codebase:
const [sidebarItems, setSidebarItems] = useState([])  // no generic
modules: any[]                                         // any type
data: any                                              // any type
```
This is the #1 giveaway. A mid-level developer treats TypeScript as a contract, not an afterthought.

### 2. Hardcoded Values That Shouldn't Exist
- Progress bar locked to `38%` — not computed
- Sub-module label locked to `"Foundation"` — not dynamic
- These are the fingerprints of **demo-first, production-second** development

### 3. Basic Bugs Left Unfixed
- A route (`/get-started`) that doesn't exist being navigated to
- A non-standard HTTP status code (`402`) in the error handler
- These suggest the code was never fully end-to-end tested

### 4. No Tests — Zero
Not a single test file. No unit tests, no integration tests, no E2E tests. In any professional team environment, this is unacceptable. It signals the developer has never worked in a real codebase with CI/CD pipelines.

### 5. Fragile API Data Access
```ts
res?.data?.data?.data  // triple nesting
```
No response type definitions means any API shape change will silently break the UI.

### 6. Inconsistent Patterns
- Two date libraries installed (dayjs + luxon)
- `next-themes` installed but dark mode never built
- CSS as runtime JS string (landing page) vs Tailwind everywhere else
- These show good initial intentions but poor follow-through and cleanup habits

---

## 📊 Skill Radar

| Skill Area | Rating | Notes |
|---|---|---|
| React fundamentals | ⭐⭐⭐⭐☆ | Solid — hooks, context, state management |
| TypeScript | ⭐⭐☆☆☆ | Present but not disciplined |
| API integration | ⭐⭐⭐⭐☆ | Strong — custom HTTP layer, token refresh |
| Routing | ⭐⭐⭐⭐☆ | Advanced tooling choices |
| UI/Design | ⭐⭐⭐⭐☆ | Above average visual sense |
| WebRTC/Streaming | ⭐⭐⭐☆☆ | Implemented correctly, impressive attempt |
| Testing | ⭐☆☆☆☆ | None whatsoever |
| Code cleanliness | ⭐⭐⭐☆☆ | Good structure, but debugging leftovers, hardcoded values |
| Production readiness | ⭐⭐☆☆☆ | Stubs, hardcoded data, missing routes |
| System design | ⭐⭐☆☆☆ | Not demonstrated at scale |

---

## 💼 Job Readiness

| Role | Verdict | Reason |
|---|---|---|
| Frontend Intern | ✅ Strong candidate | Exceeds typical intern expectations |
| Junior Frontend Developer (React) | ✅ Hireable right now | Solid foundation, can learn on the job |
| Mid-level Frontend Developer | ⚠️ Not yet | TypeScript gaps, no testing, no production experience |
| Full-stack Developer | ❌ Not demonstrated | No backend code shown |
| Frontend at FAANG / Top Unicorn | ❌ Not yet | Needs TypeScript mastery, testing, DSA, system design |

### What would push him to Mid-level (6–12 months of work):
1. Strict TypeScript — no `any`, proper generics, response types
2. At least basic unit tests with Vitest/Jest
3. Shipping features to real users and fixing production bugs
4. Proper error boundaries and loading states throughout
5. Code reviews in a team setting

---

## 💰 Salary Estimates

### 🇮🇳 India

| Stage | CTC Range | Timeline |
|---|---|---|
| **Right now** (Junior Frontend) | **₹4 – 7 LPA** | Immediately hireable |
| After fixing gaps (6–12 months) | ₹8 – 14 LPA | With professional experience |
| Mid-level (2–3 more years) | ₹14 – 25 LPA | Product companies |
| Senior (5+ years, system design) | ₹25 – 50 LPA | Top-tier companies |

**Realistic today:** ₹5 – 7 LPA at a startup or service company.
Product companies (Razorpay, Zepto, Groww, CRED tier) typically want clean TypeScript + tests before offering ₹10+ LPA.

### 🇺🇸 United States

| Stage | Annual Salary | Notes |
|---|---|---|
| **Right now** (Junior Frontend) | **$65,000 – $85,000** | US startup or mid-size company |
| After fixing gaps | $90,000 – $110,000 | Solid mid-market |
| Mid-level | $110,000 – $140,000 | Product companies |
| Senior | $150,000 – $200,000+ | FAANG/top startups |

**For US market specifically:** Would need to practice DSA (LeetCode) for interviews, sharpen TypeScript significantly, and learn testing. With 6–12 months of deliberate preparation, a **$70K–$85K junior role** at a US startup is achievable. H1B sponsorship adds complexity.

---

## 🏁 Final Verdict

> **This developer is talented, ambitious, and clearly a self-learner.** The decision to implement WebRTC live streaming, build a custom HTTP service with refresh token logic, and adopt the TanStack ecosystem shows someone who goes beyond tutorials and actually figures things out.
>
> However, the codebase has the hallmarks of **solo/portfolio development** — built to demonstrate capability, not to survive production. The hardcoded values, missing routes, empty pages, zero tests, and loose TypeScript tell a clear story: *this developer has never worked in a real professional team environment yet.*
>
> **Hire as Junior? Absolutely yes.**
> **Expect mid-level output? Not yet — but likely within 1 year of real team experience.**

---

*Report generated by Antigravity AI | Conversation: 554422aa-d4eb-4568-96b3-a0bb36c71e89*
