# Revamp Log

## 2026-04-21

- Started Phase 0: capture before-state screenshots
- Fixed 3 pre-existing bugs blocking clean renders:
  - Navbar: `<li>` nested inside `<li>` causing React hydration crash on all
    pages
  - `vite.config.ts`: added `resolve.dedupe` for `react`/`react-dom` to
    eliminate duplicate React instances (framer-motion)
  - `Tag` component: replaced `@reach/checkbox` (bundled React 16/17) with
    native `<label>` + `<input type="checkbox">`
- Screenshots captured (desktop 1280px + mobile 375px):
  - Home (`/`)
  - Blog index (`/blog`)
  - Blog post (`/blog/2020-retrospective`)
  - Links (`/links`)
- Saved to `docs/before/`
- Added Umami analytics script to `<head>` in `root.tsx`
- Added `.claude/` and `.playwright-mcp/` to `.gitignore`
- Audited all dependencies for unused/replaceable packages

2026-04-21 | Removed `@reach/checkbox`, `rehype-prism-plus`, `uuid`,
`@types/uuid`, `lodash.throttle`, `@types/lodash.throttle` | native throttle in
`useScrollSpy.tsx`

2026-04-21 | Prisma/SQLite/LiteFS/`better-sqlite3`/`@epic-web/remember` drop
deferred to Phase 5 | cache → lru-cache, likes+views → Umami

2026-04-21 | Deleted `ProjectSection` + `ProjectCard` | both unused, no imports
found

2026-04-21 | Cloudinary stays for blog images | `CloudinaryImg` +
`ThemedBlogImage` kept as MDX primitives. Revisit if migrating image hosting
later.
