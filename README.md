# SWL Detailed — VWOMS Prototype

**Vehicle Workflow & Operations Management System (VWOMS)**

SWL Detailed is a front-end prototype designed to demonstrate the main workflows of a vehicle detailing business through four role-based interfaces.

The prototype provides separate experiences for clients, managers, detailers, and reception staff, allowing the proposed system workflows and user interfaces to be explored interactively.

## Prototype Portals

The application includes four role-based portals:

* **Client Kiosk** — tablet-focused client intake workflow including customer and vehicle details, condition review, service selection, agreement acceptance, digital signature, and vehicle collection sign-off.
* **Manager Portal** — desktop management interface covering operational dashboards, job lifecycle management, quality-control processes, and reporting.
* **Detailer App** — mobile-focused interface for detailers, including PIN authentication, assigned jobs, service checklists, timers, and job-related documentation.
* **Reception Portal** — desktop interface supporting bookings, customer check-in, vehicle intake, job assignment, and invoicing workflows.

## Technology Stack

The prototype is built using:

* **React 19**
* **TypeScript**
* **Vite**
* **Tailwind CSS v4**

## Running the Project in VS Code

### Requirements

Before running the project, ensure the following are installed:

* **Node.js 20 or later**
* **npm** — included with Node.js
* **Visual Studio Code**

### 1. Open the Project

Open the project folder in VS Code:

`File > Open Folder...`

Make sure the folder containing `package.json` is opened.

### 2. Open the VS Code Terminal

Open the integrated terminal using:

`Terminal > New Terminal`

or the keyboard shortcut:

`Ctrl + ``

### 3. Install Dependencies

Run:

```bash
npm install
```

If Windows PowerShell prevents `npm.ps1` from running because of the system execution policy, use:

```bash
npm.cmd install
```

Dependencies only need to be installed again if the project dependencies change or the `node_modules` folder is removed.

### 4. Start the Development Server

Run:

```bash
npm run dev
```

If using the PowerShell workaround:

```bash
npm.cmd run dev
```

Vite will display a local development address, typically:

```text
http://localhost:5173/
```

Open the address in a web browser to access the prototype.

Changes made to files inside `src/` will automatically update in the browser through Vite's development hot reload.

## Other Scripts

### Production Build

```bash
npm run build
```

Creates a production-ready build of the application in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

Runs the generated production build locally for testing.

## Project Structure

```text
project/
├── src/
│   ├── client/
│   ├── manager/
│   ├── detailer/
│   ├── reception/
│   ├── shared/
│   ├── imports/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

### Main Directories and Files

* `src/main.tsx` — application entry point responsible for mounting the React application.
* `src/App.tsx` — main application component and role-selection interface.
* `src/client/` — Client Kiosk components and workflows.
* `src/manager/` — Manager Portal components.
* `src/detailer/` — Detailer App components.
* `src/reception/` — Reception Portal components.
* `src/shared/` — reusable components shared between portals, including branding elements.
* `src/index.css` — global styling and Tailwind CSS configuration/entry point.
* `src/imports/` — supporting design references and prototype resources.

## Prototype Scope

This project is currently a **front-end prototype**.

The purpose of the prototype is to demonstrate:

* Proposed user interfaces
* Role-based workflows
* Navigation between system functions
* User interaction patterns
* The intended structure and behaviour of the VWOMS solution

The prototype does **not** currently contain a production backend or persistent database.

Any demonstration data used by the application is stored or generated within the front-end environment and may reset when the application is refreshed.

## Important Note

This prototype is intended to demonstrate the proposed design and workflow of the SWL Detailed Vehicle Workflow & Operations Management System. It should not be considered a production-ready implementation of the complete system.
