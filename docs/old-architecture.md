# PumpTracker Brownfield Enhancement Architecture

## Introduction

This document outlines the architectural approach for enhancing the **PumpTracker** project. It details the backend systems, data models, and integration strategies required to power the existing frontend specification with the features defined in the requirements document, such as drag-and-drop job scheduling, an AI query engine, and a persistent audit trail.

Its primary goal is to serve as the guiding architectural blueprint for AI-driven development, ensuring seamless integration with the established Next.js 15 and Firebase technology stack.

### Document Scope

This architecture document is focused on the areas relevant to implementing the new feature requirements, including:

* Backend logic for real-time job status updates.
* Data models for jobs, users, and audit trails in Firestore.
* An AI query engine using Google's Genkit.
* An API layer using Next.js Server Actions.
* Authentication and security using Firebase.

### Change Log

| Date | Version | Description | Author |
| :--- | :--- | :--- | :--- |
| 2025-07-26 | 1.0 | Initial brownfield architecture based on PRD and frontend spec. | Winston (Architect) |

## Enhancement Scope and Integration Strategy

### Enhancement Overview

* **Enhancement Type:** New feature addition to an existing frontend foundation.
* **Scope:** Implementing the full backend logic and data persistence for all 10 requirements in the PRD.
* **Integration Impact:** Significant. This involves creating the entire backend and data layer to support the UI.

### Integration Approach

* **Code Integration Strategy:** All backend logic will be co-located within the Next.js 15 application, leveraging Server Actions for the API layer and `lib/` directory for shared logic.
* **Database Integration:** The application will connect directly to a new Firebase Firestore instance.
* **API Integration:** The frontend will not call traditional REST endpoints. Instead, it will directly invoke typed Server Actions, providing a secure, efficient, and type-safe integration.
* **UI Integration:** The existing UI components defined in `front-end-spec.md` will be wired up to the new Server Actions and will listen for real-time data updates from Firestore.

### Compatibility Requirements

* **Existing API Compatibility:** N/A, as we are creating the API layer.
* **Database Schema Compatibility:** N/A, as we are creating the database schema.
* **UI/UX Consistency:** All backend responses and data structures must conform to the needs of the UI defined in the `front-end-spec.md`.
* **Performance Impact:** Real-time features will use Firestore listeners to minimize latency. AI queries will be executed server-side to avoid blocking the UI.

## Tech Stack Alignment

The technology stack is defined by the `front-end-spec.md` and extended to include the necessary backend components. No new technologies will be introduced without justification.

### Existing Technology Stack

| Category | Current Technology | Version | Usage in Enhancement | Notes |
| :--- | :--- | :--- | :--- | :--- |
| Framework | Next.js | 15.x | Core for entire application (frontend and backend logic) | App Router and Server Actions are central. |
| UI Library | ShadCN/ui | latest | All UI components | Adhere to existing component styles. |
| Styling | Tailwind CSS | latest | All styling | Continue using utility-first classes. |
| **Backend** | | | | |
| Database | **Firebase Firestore** | v9+ | Primary data store for all application data | Chosen for its real-time capabilities and scalability. |
| Authentication | **Firebase Auth** | v9+ | User login and session management | Directly supports Google Auth (Requirement #8). |
| AI Engine | **Google Genkit** | latest | Natural language queries and automation | Integrates well with Firebase and Google AI. |
| Testing | Vitest / Playwright| latest | Unit and E2E testing | To be implemented. |

## Data Models and Schema Changes

The following collections will be created in Firestore.

### New Data Models

#### `jobs`

* **Purpose:** Stores all information related to a manufacturing job.
* **Integration:** This is the primary data source for the Kanban board and calendar views.
* **Key Attributes:**
    * `jobId`: (string) - Unique identifier.
    * `model`: (string) - e.g., "Model A", "Model B".
    * `customer`: (string) - Customer name or ID.
    * `poNumber`: (string) - Purchase Order number.
    * `priority`: (string) - e.g., "High", "Normal".
    * `status`: (string) - 'Queued', 'In Progress', 'Blocked', 'Done'.
    * `buildTime`: (number, optional) - Estimated build time in hours.
    * `paintColor`: (string, optional)
    * `serialNumber`: (string, optional)
    * `scheduledDate`: (timestamp, optional) - Start date for the job.
    * `order`: (number) - Vertical order within a Kanban stage.
    * `createdAt`: (timestamp)
    * `updatedAt`: (timestamp)

#### `users`

* **Purpose:** Stores user profile information, linked to Firebase Auth.
* **Integration:** Used for role-based access control (RBAC).
* **Key Attributes:**
    * `uid`: (string) - Matches Firebase Auth UID.
    * `email`: (string)
    * `role`: (string) - 'Admin' or 'Department Lead'.
    * `displayName`: (string, optional)

#### `audit_trails`

* **Purpose:** Logs all changes to job cards for traceability (Requirement #10).
* **Integration:** Data is written whenever a job is created or updated.
* **Key Attributes:**
    * `logId`: (string) - Unique identifier.
    * `jobId`: (string) - Foreign key to the job.
    * `timestamp`: (timestamp)
    * `user`: (string) - User who made the change.
    * `action`: (string) - e.g., "CREATE", "UPDATE_STATUS", "EDIT_FIELD".
    * `changes`: (map) - Details of the change (e.g., `{ field: 'status', from: 'Queued', to: 'In Progress' }`).

## Component Architecture

### New Components

#### **Backend Components**

* **Job Service (`lib/jobs.ts`):** Contains core business logic for creating, updating, and validating jobs.
* **Auth Service (`middleware.ts`):** Handles user authentication and session management, protecting routes and actions.
* **AI Service (`lib/genkit/`):** Orchestrates Genkit flows for natural language queries (Requirement #5) and automated scheduling.
* **Notification Service (`lib/notifications.ts`):** Manages sending emails and alerts (Requirement #7).
* **Export Service (`app/actions/exportActions.ts`):** Logic for generating and exporting data to `.xlsx` (Requirement #9).

#### **Frontend Components**

(As defined in `front-end-spec.md`)
* `JobKanbanBoard.tsx`
* `JobCalendarView.tsx`
* `KpiCards.tsx`
* `UnscheduledJobsList.tsx`

### Component Interaction Diagram

```mermaid
graph TD
    subgraph Frontend (Browser)
        UI_Kanban[JobKanbanBoard]
        UI_Calendar[JobCalendarView]
        UI_Query[AI Query Input]
    end

    subgraph Backend (Next.js Server)
        SA[Server Actions]
        JS[Job Service]
        AS[Auth Service]
        AIS[AI Service]
        NS[Notification Service]
        ES[Export Service]
    end

    subgraph External Services
        FB_Auth[Firebase Auth]
        FB_DB[Firestore Database]
        Genkit[Google Genkit/AI]
        Email[Email Service]
    end

    UI_Kanban -- "updateJobStatus()" --> SA
    UI_Calendar -- "scheduleJob()" --> SA
    UI_Query -- "runAiQuery()" --> SA
    SA -- invokes --> JS
    SA -- invokes --> AIS
    SA -- invokes --> ES
    SA -- protected by --> AS

    JS -- reads/writes --> FB_DB
    JS -- triggers --> NS
    AS -- verifies against --> FB_Auth
    AIS -- orchestrates --> Genkit
    NS -- sends via --> Email

    FB_DB -- "real-time updates" --> UI_Kanban
    FB_DB -- "real-time updates" --> UI_Calendar
```

## API Design and Integration

The API will be implemented using **Next.js Server Actions**, not a traditional REST or GraphQL API. This provides a type-safe, co-located API layer.

### New API Endpoints (Server Actions)

#### `jobActions.ts`
* `createJob(data: JobData)`: Creates a new job card (Requirement #3).
* `updateJobStatus(jobId: string, newStatus: string, order: number)`: Handles drag-and-drop updates (Requirement #1).
* `scheduleJob(jobId: string, scheduledDate: timestamp)`: Schedules a job from the calendar (Requirement #2).
* `getJobs()`: Fetches all jobs for display.

#### `aiActions.ts`
* `runNaturalLanguageQuery(query: string)`: Executes a query via the AI Service (Requirement #5).
* `runAutoSchedule()`: Triggers the auto-scheduling AI flow.

#### `exportActions.ts`
* `exportJobsToExcel()`: Generates and returns an Excel file (Requirement #9).

## Source Tree Integration

The new backend logic will be integrated directly into the existing Next.js project structure.

### New File Organization

```plaintext
/
├── src/
│   ├── app/
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   └── actions/                # NEW: Server Actions
│   │       ├── jobActions.ts
│   │       ├── aiActions.ts
│   │       └── exportActions.ts
│   ├── components/
│   │   ├── ui/
│   │   └── custom/
│   │       ├── JobKanbanBoard.tsx
│   │       └── JobCalendarView.tsx
│   ├── lib/
│   │   ├── firebase/
│   │   │   ├── client.ts           # Client-side Firebase init
│   │   │   └── firestore.ts        # Server-side Firestore helpers
│   │   ├── genkit/                 # NEW: Genkit AI Flows
│   │   │   ├── query.flow.ts
│   │   │   └── schedule.flow.ts
│   │   ├── types/
│   │   │   └── index.ts            # Shared TypeScript interfaces
│   │   ├── jobs.ts                 # NEW: Core job business logic
│   │   └── notifications.ts        # NEW: Notification logic
│   └── middleware.ts               # NEW: Auth middleware
├── .env.local
└── next.config.mjs

## Infrastructure and Deployment Integration

### Existing Infrastructure
* **Current Deployment:** Deployed via CI/CD to a hosting provider (assumed to be Vercel or similar).
* **Infrastructure Tools:** Next.js, assumed serverless environment.

### Enhancement Deployment Strategy
* **Deployment Approach:** The application will be deployed to Firebase Hosting, which has native support for Next.js applications.
* **Infrastructure Changes:**
    * A new Firebase Project will be created.
    * Firestore and Firebase Authentication services will be enabled.
    * Cloud Functions for Firebase may be used for Genkit flows.
* **Pipeline Integration:** The existing CI/CD pipeline (e.g., GitHub Actions) will be updated with Firebase CLI commands to deploy the application.

## Testing Strategy

### New Testing Requirements
* **Unit Tests (Vitest):**
    * All Server Actions will have unit tests mocking the database layer.
    * All business logic functions in lib/ will be unit tested.
    * Target coverage: ≥ 90%.
* **Integration Tests:**
    * Tests will be written to verify Server Action interactions with a live Firebase Emulator Suite.
* **End-to-End Tests (Playwright):**
    * Test scripts will simulate user workflows like dragging a job card and verifying the database update.
    * Test the full AI query flow.

## Security Integration

### Existing Security Measures
* **Authentication:** The frontend spec implies a user is logged in, but no mechanism is defined.

### Enhancement Security Requirements
* **Authentication:** Firebase Authentication with Google Provider will be implemented as the sole auth method (Requirement #8).
* **Authorization:** A user's role (Admin vs. Department Lead) will be stored in Firestore and checked in a server-side middleware (middleware.ts) and within each Server Action to enforce permissions.
* **Data Protection:** Firestore Security Rules will be written to provide defense-in-depth, ensuring users can only read/write data they are authorized to access, even if they bypass the application logic.