# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Project context
- Stack: Next.js 15 (App Router) + React 19 + TypeScript + Tailwind CSS 4
- Animations and 3D: framer-motion, framer-motion-3d, @react-three/fiber, @react-three/drei, GSAP, OGL
- Package manager: npm (package-lock.json present)
- Path alias: @/* -> src/* (see tsconfig.json)
- Images: next.config.ts allows external images from storage.googleapis.com
- Linting: ESLint flat config extending next/core-web-vitals and next/typescript
- Builds use Turbopack (next dev/build invoked with --turbopack)

Common commands
- Install dependencies
```bash path=null start=null
npm install
```

- Start dev server (Next.js + Turbopack)
```bash path=null start=null
npm run dev
```

- Build (production)
```bash path=null start=null
npm run build
```

- Start production server (after build)
```bash path=null start=null
npm run start
```

- Lint the project
```bash path=null start=null
npm run lint
```

- Lint a specific file or directory (example)
```bash path=null start=null
npx eslint src/components/Header.tsx
```

Note: next.config.ts sets eslint.ignoreDuringBuilds = true, so builds won’t fail on lint errors. Run lint explicitly to surface issues.

Testing
- No test tooling or scripts are configured in package.json, and no test config files are present. If tests are added later (e.g., Jest/Vitest/Playwright), include/update scripts accordingly and document how to run a single test.

High-level architecture
- App Router: Pages are colocated under src/app with per-route directories (e.g., src/app/about/page.tsx). Global layout in src/app/layout.tsx applies shared Header and Footer; don’t re-add them in individual pages.
- Client components: Many components are interactive. Use the "use client" directive for components that rely on hooks or browser APIs.
- Styling: Tailwind CSS 4 is used for all styling. The site follows a “soft dark” theme (e.g., slate-700/800 backgrounds, slate-200 text, slate-900 for header/footer). Global styles live in src/app/globals.css.
- Animations: All “on-scroll” reveal behavior was refactored to trigger on page load to avoid App Router navigation inconsistencies. Where needed, a unique key derived from usePathname is applied at the page root to force re-renders and reliably replay animations on client navigation.
- 3D and effects: @react-three/fiber/drei and OGL are used for visual effects (e.g., starfields, grid/technical backgrounds). GSAP powers timeline-based animations for specific components.
- Forms and integrations: Contact/newsletter forms integrate with external webhooks (see component implementations under src/components and relevant pages under src/app).

Tooling and configs
- ESLint: Flat config (eslint.config.mjs) extends next/core-web-vitals and next/typescript, ignoring node_modules, .next, and build outputs. Use npm run lint to check locally; builds won’t block on lint by design.
- TypeScript: tsconfig.json enables strict mode, bundler moduleResolution, and an @/* alias to src/*. JSX is preserved for Next’s tooling.
- Next config: next.config.ts enables external image domain storage.googleapis.com and disables lint blocking during builds.

Additional notes from README
- Reuse components in src/components (e.g., MagneticButton, MagicCard, TiltedCard, ImageSection) before creating new ones.
- Animations should trigger on load (not whileInView). If an animation must replay on navigation, the route keying pattern via usePathname is already established.

Rules/docs files
- No CLAUDE rules, Cursor rules, or Copilot instructions files were found.
