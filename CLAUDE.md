# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server at localhost:3000
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Architecture

This is a **Next.js 16 App Router** portfolio site using **Tailwind CSS v4** and **React 19**.

- `app/layout.js` — Root layout with Geist font and metadata (title: "Joann Zhang", description: "Product Designer Portfolio")
- `app/page.js` — Single-page home (`'use client'`); contains the entire portfolio: navbar, hero, project cards, and concepts section
- `app/globals.css` — Tailwind v4 import (`@import "tailwindcss"`) plus CSS variables for light/dark background/foreground colors
- `public/Images/` — Project mockup images and videos (`.png`, `.mp4`)
- `public/Icons/` — App icons for each project card

## Key Patterns

**Tailwind v4**: Uses `@import "tailwindcss"` (not `@tailwind` directives). PostCSS is configured via `@tailwindcss/postcss`.

**Styling approach**: Mix of Tailwind utility classes and inline `style` props. Inline styles are used for precise values (pixel spacing, letter-spacing, specific colors). Component-scoped CSS is injected via a `<style>` tag inside `page.js` for hover animations (`.arrow-btn`, `.arrow-icon`, `.nav-wrapper`).

**Navbar**: Fixed position with scroll-hide behavior — hides on scroll down past 80px, reappears on scroll up. Controlled via `navVisible` state and a `hidden` CSS class.

**Project cards**: Each card is a self-contained `<div>` with a `group` class enabling Tailwind group-hover for the image lift animation (`group-hover:-translate-y-4`) and the arrow button expand animation.

**No routing yet**: The `/about` nav link exists in the navbar but no `app/about/` route has been created. The `Joann-Portfolio/` subdirectory appears to be a nested copy of the project — work only in the root directory.

**Path alias**: `@/*` maps to the project root (configured in `jsconfig.json`).

## Design Standards

**Card title typography**: `font-size: 24px`, `line-height: 32px`, `letter-spacing: -0.03em`, `font-weight: 500`, `color: #212121`. Apply via `.card-title` class + matching inline style. Mobile override: 20px / 26px.

**Card border**: `box-shadow: inset 0 0 0 1px rgba(0,0,0,0.08)` on `.project-card`. No SVG borders or clip-path squircles.

**Card corner radius**: `border-radius: 10px`.

**Desktop padding**: `64px` left/right on main content, hero section, navbar, and concepts section.

**Nav links**: `font-size: 14px`, `line-height: 20px`.
