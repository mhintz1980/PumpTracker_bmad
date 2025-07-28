# **2. Requirements**

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
