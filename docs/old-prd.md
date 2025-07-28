# Requirements Document

## Introduction

The Pump Tracker is a comprehensive manufacturing job tracking and scheduling system designed for production environments. It provides a kanban-style interface for managing job cards through various production stages, from initial order creation through final shipping. The system features drag-and-drop scheduling, real-time production tracking, integrated AI querying capabilities, and mobile support for shop floor updates. All job movements and stage completions are tracked with complete audit trails, enabling detailed analytics and automated notifications.

## Requirements

### Requirement 1

**User Story:** As a Department Lead, I want to drag and drop job cards between production stages, so that I can easily update job status and track production flow in real-time.

#### Acceptance Criteria

1. WHEN a Department Lead drags a job card from one stage to another THEN the system SHALL update the job status immediately
2. WHEN a job card is moved THEN the system SHALL record the timestamp, user, and stage transition in the audit trail
3. WHEN a job card is dropped on a valid stage THEN the system SHALL visually confirm the successful move
4. WHEN a job card is dropped on an invalid stage THEN the system SHALL reject the move and display an error message
5. IF the system is offline THEN job card movements SHALL be queued locally and synchronized when connectivity is restored

### Requirement 2

**User Story:** As a Department Lead, I want to drag and drop unscheduled jobs onto a calendar timeline to set their production schedule and order, so that I can visually plan production capacity and delivery dates.

#### Acceptance Criteria

1. WHEN viewing unscheduled jobs THEN the system SHALL display them as draggable items with build time indicators
2. WHEN dragging an unscheduled job to the calendar THEN the system SHALL show a visual representation of the job's build time duration
3. WHEN dropping a job on a specific calendar date THEN the system SHALL schedule the job to start on that date
4. WHEN jobs are scheduled on the calendar THEN the system SHALL display total build time and capacity utilization for each time period
5. WHEN rearranging scheduled jobs on the calendar THEN the system SHALL automatically adjust start dates and show scheduling conflicts
6. WHEN the calendar shows capacity overload THEN the system SHALL visually highlight the conflict and suggest alternative scheduling

### Requirement 3

**User Story:** As an Admin, I want to create and manage job cards with detailed information, so that all relevant job data is captured and accessible throughout the production process.

#### Acceptance Criteria

1. WHEN creating a new job card THEN the system SHALL require Model, Customer, PO number, and Priority fields
2. WHEN creating a job card THEN the system SHALL allow optional fields for Build Time, Paint Color, and Serial Number
3. WHEN a job card is created THEN the system SHALL assign a unique identifier and creation timestamp
4. WHEN job card data is modified THEN the system SHALL log the change with user and timestamp
5. WHEN a job card is saved THEN the system SHALL validate all required fields are present

### Requirement 4

**User Story:** As a Department Lead, I want to view real-time dashboard metrics and charts, so that I can monitor overall shop status, customer-specific orders, and department performance.

#### Acceptance Criteria

1. WHEN accessing the dashboard THEN the system SHALL display collapsible sidebars with metric panels
2. WHEN selecting a customer filter THEN the system SHALL update all charts to show customer-specific data
3. WHEN selecting a department filter THEN the system SHALL display department-specific production metrics
4. WHEN job status changes THEN the dashboard metrics SHALL update automatically within 30 seconds
5. WHEN viewing revenue metrics THEN the system SHALL calculate totals using fixed model pricing (Model A: $15,000, Model B: $32,000, etc.)

### Requirement 5

**User Story:** As a Department Lead, I want to query the system using natural language through an AI agent, so that I can quickly get answers about production status, schedules, and capacity.

#### Acceptance Criteria

1. WHEN I ask a simple question like "How many Model B are on order?" THEN the AI SHALL provide an accurate count with current data
2. WHEN I ask complex questions like "When are all Model A for Customer B scheduled back from powder coating?" THEN the AI SHALL analyze schedules and provide estimated dates
3. WHEN I ask capacity questions like "If we make nothing but Model C, how long to fill Customer B's open PO?" THEN the AI SHALL calculate timeline based on current capacity and build times
4. WHEN the AI cannot answer a question THEN it SHALL explain what information is missing or unclear
5. WHEN generating visual responses THEN the AI SHALL create appropriate charts, graphs, or tables to illustrate the answer

### Requirement 6

**User Story:** As a Department Lead, I want to use the system on my mobile device to update job progress from the shop floor, so that I can maintain real-time tracking without returning to a desktop computer.

#### Acceptance Criteria

1. WHEN accessing the app on mobile THEN the system SHALL provide a responsive interface optimized for touch interaction
2. WHEN dragging job cards on mobile THEN the system SHALL support touch-based drag and drop functionality
3. WHEN the mobile device loses connectivity THEN the system SHALL continue to function and queue updates locally
4. WHEN connectivity is restored THEN the system SHALL automatically sync all queued updates
5. WHEN multiple users update the same job simultaneously THEN the system SHALL handle conflicts and notify users of changes

### Requirement 7

**User Story:** As an Admin, I want the system to automatically send notifications and alerts, so that vendors and team members are informed of relevant status changes without manual intervention.

#### Acceptance Criteria

1. WHEN a job is ready for powder coating THEN the system SHALL automatically email the designated vendor with job details
2. WHEN new jobs are created that may impact production plans THEN the system SHALL alert managers via system notification
3. WHEN jobs are overdue at any stage THEN the system SHALL send alerts to relevant Department Leads
4. WHEN notification settings are configured THEN the system SHALL respect system-wide preferences for all users
5. IF email delivery fails THEN the system SHALL retry and log the failure for admin review

### Requirement 8

**User Story:** As an Admin, I want to authenticate users through Google credentials, so that access is secure and user management is simplified.

#### Acceptance Criteria

1. WHEN a user attempts to log in THEN the system SHALL redirect to Google OAuth authentication
2. WHEN authentication is successful THEN the system SHALL create or update the user profile with Google account information
3. WHEN a user's role is assigned THEN the system SHALL enforce role-based permissions (Admin vs Department Lead)
4. WHEN a user session expires THEN the system SHALL prompt for re-authentication
5. WHEN an unauthorized user attempts access THEN the system SHALL deny access and log the attempt

### Requirement 9

**User Story:** As an Admin, I want to export production data for external analysis and backup purposes, so that I can use the data in Excel and maintain data security.

#### Acceptance Criteria

1. WHEN requesting a data export THEN the system SHALL generate files in Excel-compatible format (.xlsx)
2. WHEN exporting job data THEN the system SHALL include all job card details and audit trail information
3. WHEN exporting metrics data THEN the system SHALL include production statistics and performance data
4. WHEN an export is requested THEN the system SHALL complete the process within 60 seconds for typical data volumes
5. WHEN export is complete THEN the system SHALL provide a download link and notify the requesting user

### Requirement 10

**User Story:** As a Department Lead, I want all job movements and changes to be automatically tracked in a persistent audit trail, so that I can review production history and identify process improvements.

#### Acceptance Criteria

1. WHEN any job card is moved between stages THEN the system SHALL record user, timestamp, source stage, and destination stage
2. WHEN job card data is modified THEN the system SHALL log the specific fields changed, old values, new values, and user
3. WHEN querying audit data THEN the system SHALL provide filtering by date range, user, job, or change type
4. WHEN audit data is stored THEN the system SHALL maintain data integrity and prevent unauthorized modifications
5. WHEN displaying audit trails THEN the system SHALL present information in chronological order with clear formatting
