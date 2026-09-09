# SWL Detailed — VWOMS Prototype

Vehicle Workflow & Operations Management System — a clickable prototype covering
four role-based portals:

- **Client Kiosk** (tablet) — intake wizard, service selection, digital sign-off
- **Manager Portal** (desktop) — dashboard, job lifecycle, QC checklists, reports
- **Detailer App** (mobile) — PIN login, job list, checklists, timers, photos
- **Reception Portal** (desktop) — bookings, check-in, job assignment, invoicing

Built with React 19, TypeScript, Vite, and Tailwind CSS v4.

## Running in VS Code

**Requirements:** [Node.js](https://nodejs.org) 20 or later, and npm (bundled with Node).

1. Open this folder in VS Code (`File > Open Folder…`).
2. Open a terminal in VS Code (`` Ctrl+` `` / `` Cmd+` ``).
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the dev server:
   ```bash
   npm run dev
   ```
5. Open the printed local URL (defaults to `http://localhost:5173`) in your
   browser, or let it open automatically. Edits to files in `src/` hot-reload
   in the browser.

## Other scripts

- `npm run build` — type-checks and produces a production build in `dist/`
- `npm run preview` — serves the production build locally

## Project structure

- `src/main.tsx` — React entry point, mounts `src/App.tsx`
- `src/App.tsx` — role-selector landing screen
- `src/client/` — Client Kiosk portal
- `src/manager/` — Manager Portal
- `src/detailer/` — Detailer App
- `src/reception/` — Reception Portal
- `src/shared/` — shared components (logo, etc.)
- `src/index.css` — global styles and Tailwind entry point
- `src/imports/` — original design reference images and the source brief

## Notes

This is a front-end prototype only: all data is generated in-memory when the
app loads and resets on refresh. There is no backend or persistence layer.
