# **6. Epic 1: Foundation & Core Systems Setup**

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