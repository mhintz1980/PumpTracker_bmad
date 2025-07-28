# PumpTracker Product Requirements Document (PRD)

## **1. Goals and Background Context**

* **Goals**
    * To provide a centralized, real-time dashboard for production scheduling and job tracking.
    * To enable efficient drag-and-drop scheduling of jobs onto a visual calendar.
    * To offer at-a-glance KPI monitoring for key production metrics.
    * To empower department leads with natural language queries for quick data retrieval.
    * To ensure a complete audit trail for all job movements and modifications.
    * To support mobile access for on-the-floor job status updates.

* **Background Context**
    [cite_start]The PumpTracker system is designed to address the complexities of a modern manufacturing environment[cite: 1]. [cite_start]Production managers and department leads currently lack a unified, real-time view of the production schedule, leading to inefficiencies, delays, and difficulty in tracking job progress[cite: 1]. [cite_start]This PRD outlines a comprehensive solution that combines a Kanban-style interface, a drag-and-drop calendar, and a powerful AI-driven query engine to provide clarity, control, and actionable insights into the entire production workflow[cite: 1].

* **Change Log**

| Date | Version | Description | Author |
| :--- | :--- | :--- | :--- |
| 2025-07-28 | 1.0 | Initial PRD creation from requirements and specifications. | John (PM) |

---

## **2. Requirements**

#### **Functional**

* [cite_start]**FR1:** Department Leads must be able to drag and drop job cards between production stages on a Kanban board to update job status in real-time[cite: 1].
* [cite_start]**FR2:** Department Leads must be able to drag unscheduled jobs onto a calendar to schedule their start date[cite: 1].
* [cite_start]**FR3:** Admins must be able to create and manage job cards with required fields (Model, Customer, PO number, Priority) and optional fields (Build Time, Paint Color, and Serial Number)[cite: 1].
* [cite_start]**FR4:** The system must provide a real-time dashboard with collapsible sidebars displaying key performance metrics (e.g., Scheduled, In Progress, Delayed) and charts (e.g., Remaining Qty, Open Purchase Orders)[cite: 1, 2].
* [cite_start]**FR5:** The dashboard metrics and charts must update to reflect customer-specific or department-specific data when filters are applied[cite: 1].
* [cite_start]**FR6:** Department Leads must be able to query the system using natural language (e.g., "How many Model B are on order?") and receive accurate, context-aware answers, including generated charts or tables[cite: 1].
* [cite_start]**FR7:** The system must provide a responsive interface optimized for mobile and touch-based interactions[cite: 1, 2].
* [cite_start]**FR8:** The system must automatically send email notifications to vendors when a job is ready for an external stage (e.g., powder coating)[cite: 1].
* [cite_start]**FR9:** Admins must be able to export production data, including job details and audit trails, into an Excel-compatible format (.xlsx)[cite: 1].
* [cite_start]**FR10:** The system must automatically track all job movements and data modifications in a persistent audit trail, recording the user, timestamp, and details of the change[cite: 1].

#### **Non-Functional**

* [cite_start]**NFR1:** The system must use Google (Gmail) for user authentication via OAuth[cite: 1].
* [cite_start]**NFR2:** All job status changes on the dashboard must be reflected automatically within 30 seconds[cite: 1].
* [cite_start]**NFR3:** The system must support offline functionality, queuing job card movements on the client and synchronizing them when connectivity is restored[cite: 1].
* [cite_start]**NFR4:** The system must enforce role-based permissions for Admins and Department Leads[cite: 1].
* [cite_start]**NFR5:** All data in the audit trail must be immutable and protected from unauthorized modification[cite: 1].

---

## **3. User Interface Design Goals**

* [cite_start]**Overall UX Vision:** To create a sophisticated, data-dense, and highly intuitive dark-themed interface that empowers users to manage complex production schedules with ease and efficiency[cite: 2]. The UI should feel responsive, powerful, and modern.
* **Key Interaction Paradigms:**
    * [cite_start]**Drag-and-Drop:** The primary method for scheduling and status updates[cite: 1].
    * **Direct Manipulation:** Users should feel like they are directly interacting with and organizing the jobs.
    * **Progressive Disclosure:** Keep the main interface clean, revealing detailed information and actions on demand.
* **Core Screens and Views:**
    * [cite_start]**Dashboard & Calendar View:** The main, unified view containing KPIs, the "Unscheduled Jobs" list, and the scheduling calendar[cite: 2].
    * **Job Details Modal/View:** A detailed view for creating or editing a specific job card.
* **Accessibility:** WCAG 2.1 AA. The interface must be fully navigable via keyboard, and all elements must have appropriate ARIA attributes for screen readers. Color contrast will adhere to WCAG standards.
* [cite_start]**Branding:** The design will incorporate a subtle hexagon motif in backgrounds or icons to align with company branding[cite: 2]. [cite_start]The primary color palette will be dark blue/gray with vibrant yellow and strong blue accents[cite: 2].
* [cite_start]**Target Device and Platforms:** The application will be a responsive web application, designed mobile-first but optimized for a primary desktop/tablet experience[cite: 2].

---

## **4. Technical Assumptions**

* [cite_start]**Repository Structure:** Monorepo[cite: 1483]. This will facilitate sharing of types and logic between the frontend and backend components.
* [cite_start]**Service Architecture:** A serverless architecture leveraging Next.js Server Actions and Firebase services[cite: 1483]. [cite_start]The backend logic will be co-located with the Next.js frontend[cite: 1483].
* **Technology Stack:**
    * [cite_start]**Framework:** Next.js 15 (App Router) [cite: 2, 1483]
    * [cite_start]**Language:** TypeScript [cite: 2, 1483]
    * [cite_start]**Styling:** Tailwind CSS with ShadCN/ui for base components. [cite: 2, 1483]
    * [cite_start]**Database:** Firebase Firestore [cite: 1483]
    * [cite_start]**Authentication:** Firebase Authentication [cite: 1483]
    * [cite_start]**AI Engine:** Google Genkit [cite: 1483]
* **Testing Requirements:** A full testing pyramid will be implemented:
    * [cite_start]**Unit Tests:** Vitest will be used for testing individual functions and Server Actions[cite: 1483].
    * **Integration Tests:** The Firebase Local Emulator Suite will be used to test interactions with Firestore and Auth.
    * [cite_start]**End-to-End Tests:** Playwright will be used to test critical user flows[cite: 1483].
* **Additional Assumptions:**
    * [cite_start]The application will be deployed to Firebase Hosting for seamless integration with the backend services[cite: 1483].

---

## **5. Epic List**

1.  **Epic 1: Foundation & Core Systems Setup:** Establish the foundational project structure, connect to Firebase, implement user authentication with Google, and set up the basic dashboard layout.
2.  **Epic 2: Job & Schedule Management:** Implement the core functionality for creating, viewing, and managing jobs, including the "Unscheduled Jobs" list and the main calendar display.
3.  **Epic 3: Interactive Scheduling & Kanban:** Enable all drag-and-drop functionality for moving jobs between stages on a Kanban board and scheduling them on the calendar, including real-time database updates and the persistent audit trail.
4.  **Epic 4: Dashboard Intelligence & AI Queries:** Implement the KPI cards, data visualizations (charts), and the Genkit-powered natural language query interface.
5.  **Epic 5: Automation, Exports, & Notifications:** Develop the system for automatic vendor notifications and the feature for exporting production data to Excel.

---

## **6. Epic 1: Foundation & Core Systems Setup**

**Epic Goal:** To establish the project's technical foundation, including the Next.js 15 application structure, Firebase integration for authentication and database, a basic responsive layout, and a secure system for role-based access control. This epic delivers a shell application that a logged-in user can access.

* **Story 1.1: Project Initialization & Firebase Setup**
    * **As a** developer,
    * **I want** to set up a new Next.js 15 project with TypeScript and Tailwind CSS,
    * **so that** I have a clean foundation to build the application on.
    * **Acceptance Criteria:**
        1.  [cite_start]A new Next.js 15 project is created using the App Router[cite: 2].
        2.  [cite_start]TypeScript and Tailwind CSS are correctly configured[cite: 2].
        3.  A new Firebase project is created.
        4.  Firebase SDK is integrated into the Next.js application, with separate configurations for client and server.
        5.  The project is connected to a local Git repository with an initial commit.

* **Story 1.2: User Authentication with Google**
    * **As an** Admin,
    * **I want** to log in to the application using my Google credentials,
    * [cite_start]**so that** I can access the system securely[cite: 1].
    * **Acceptance Criteria:**
        1.  [cite_start]Firebase Authentication with the Google Provider is enabled[cite: 1, 1483].
        2.  A "Login with Google" button is present on the login page.
        3.  [cite_start]Clicking the button initiates the Google OAuth flow[cite: 1].
        4.  [cite_start]Upon successful authentication, a user record is created in Firebase Auth[cite: 1].
        5.  [cite_start]A corresponding user document is created in a `users` collection in Firestore, storing their UID, email, and a default role of "Department Lead"[cite: 1, 1483].
        6.  The user is redirected to the main dashboard page after login.
        7.  A logout mechanism is available.

* **Story 1.3: Basic Dashboard Layout & Theming**
    * **As a** user,
    * **I want** to see a responsive, dark-themed dashboard layout with a global header and a left sidebar,
    * **so that** the application has a consistent and professional appearance.
    * **Acceptance Criteria:**
        1.  [cite_start]The application implements the dark theme colors as specified in `front-end-spec.md`[cite: 2].
        2.  [cite_start]A global header component is created containing a placeholder `Search` input, "Add Job" button, notification icon, and user avatar[cite: 2].
        3.  [cite_start]A left sidebar component is created with the title "Unscheduled Jobs" and placeholder filter/sort controls[cite: 2].
        4.  [cite_start]The main content area is established[cite: 2].
        5.  [cite_start]On screens smaller than 768px, the left sidebar stacks on top of the main content area[cite: 2].

* **Story 1.4: Role-Based Access Control (RBAC) Middleware**
    * **As an** Admin,
    * **I want** the system to enforce access controls based on user roles,
    * [cite_start]**so that** only authorized users can perform certain actions[cite: 1].
    * **Acceptance Criteria:**
        1.  [cite_start]A `middleware.ts` file is created to protect application routes[cite: 1483].
        2.  [cite_start]The middleware checks the user's session and retrieves their role from the `users` collection in Firestore[cite: 1483].
        3.  Routes can be designated as "Admin-only" or "Department Lead-only".
        4.  [cite_start]Unauthorized users attempting to access a protected route are redirected or shown an error[cite: 1].
        5.  A mechanism exists for an Admin to change a user's role from "Department Lead" to "Admin".