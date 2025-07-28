You are an expert frontend developer tasked with creating a sophisticated, data-driven dashboard application using Next.js 15, TypeScript, and Tailwind CSS. The application is a production scheduling and job tracking system called "PumpTracker." You must follow all instructions precisely.

**Part 1: High-Level Goal**

The primary goal is to create the main "Dashboard & Calendar View" for the PumpTracker application. This view will serve as the central hub for an Admin user to manage the production schedule. It must be a responsive, dark-themed interface that displays key performance indicators (KPIs), a list of unscheduled jobs, and a main calendar for scheduling.

**Part 2: Detailed, Step-by-Step Instructions**

1.  **Tech Stack:** Use **Next.js 15** (App Router), **TypeScript**, and **Tailwind CSS**. All components must be functional components with TypeScript props. Use ShadCN/ui for base components.
2.  **Theme and Colors:** Implement a **dark theme**.
    * Primary Background: Use a dark blue/gray like `#0D1117`.
    * Component/Card Backgrounds: Use a slightly lighter dark blue like `#161B22`.
    * Borders: Use a low-contrast gray like `#30363D`.
    * Primary Accent (Buttons, interactive elements): Use a vibrant yellow.
    * Secondary Accent (Selected items, highlights): Use a strong blue.
    * Text: Use white or light gray for high readability.
3.  **Overall Layout:** Create a responsive layout with a global header, a left sidebar, and a main content area.
4.  **Global Header:**
    * Create a slim header bar at the top.
    * On the left, include a `Search` input field.
    * On the right, include a primary action button with a yellow background that says "Add Job," a notification icon, and a user profile avatar.
5.  **Left Sidebar:**
    * This sidebar should be dedicated to a scrollable list titled "Unscheduled Jobs."
    * Populate the list with placeholder job cards. Each card should show a Job Title (e.g., "Job #1"), a model number (e.g., "HC150-SAFE"), and a customer name.
    * Include "Filter" and "Sort" controls at the top of this list.
6.  **Main Content Area (Top Section):**
    * Create a responsive grid for KPI cards.
    * Include four KPI cards labeled: "Scheduled," "In Progress," "Delayed," and "Requires Attention." Each should display a large number.
    * Below the KPI cards, add two more components: a large circular progress chart titled "Remaining Qty" and a bar chart titled "Open Purchase Orders."
7.  **Main Content Area (Bottom Section):**
    * This section should be dominated by a large **Calendar** component, showing a full month view.
    * Directly above the calendar grid, create three buttons: "Auto-Schedule All," "Reset Schedule," and "Level Schedule."
    * Populate the calendar with a few placeholder scheduled jobs, represented as solid-colored bars spanning one or more days.
8.  **Global Filter Interactivity:**
    * All components (KPIs, charts, calendar) must be designed to react to a global filter. When a filter is applied in the header's search/filter bar, the entire dashboard should update to reflect that context. You do not need to implement the logic, but the structure should support it.
9.  **Subtle Branding:**
    * Incorporate a subtle hexagon motif, perhaps as a faint background watermark or for icons, to align with the company's branding.

**Part 3: Code Examples, Data Structures & Constraints**

* **Component Library:** Use **ShadCN/ui** components as the base for all elements (Button, Card, Input, etc.). Do not use a different component library like Material-UI or Ant Design.
* **Styling:** Use **Tailwind CSS utility classes** for all styling. Do not write custom CSS files.
* **Responsiveness:** The layout must be fully responsive. On screens smaller than 768px (tablets), the left sidebar ("Unscheduled Jobs") should stack on top of the main content area.
* **Font:** Use a modern, clean sans-serif font like **Inter**.
* **No Logic:** You are only responsible for the UI layout and styling. Do not implement any backend logic, state management, or complex interactivity. This is a static visual scaffold.

**Part 4: Define a Strict Scope**

* You are to create a **single page component** representing this entire "Dashboard & Calendar View."
* Create placeholder components for the charts and calendar grid; they do not need to be functional.
* Do not create any other pages or navigation.
* Do not set up routing.
* The final output should be a single, self-contained JSX/TSX file that renders the complete dashboard layout.