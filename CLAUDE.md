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
