# Data Models

The shared TypeScript interfaces in `src/lib/types` mirror the Firestore schema.

## `jobs` Collection

```typescript
type Priority = 'High' | 'Normal' | 'Low';
type JobStatus = 'Unscheduled' | 'Scheduled' | 'In Progress' | 'Delayed' | 'Requires Attention';

interface Job {
  id: string;            // Document ID
  model: string;
  customer: string;
  poNumber: string;
  priority: Priority;
  status: JobStatus;
  buildTime?: number;     // hours
  paintColor?: string;
  serialNumber?: string;
  scheduledDate?: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

## `users` Collection

```typescript
interface UserProfile {
  uid: string;   // Auth UID = Doc ID
  email: string;
  role: 'Admin' | 'Department Lead';
  displayName?: string;
  avatarUrl?: string;
}
```

## `audit_trails` Collection

```typescript
interface AuditLog {
  id: string;   // Document ID
  jobId: string;
  user: { uid: string; email: string };
  timestamp: Timestamp;
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'MOVE';
  changes: Array<{
    field: keyof Job;
    oldValue: unknown;
    newValue: unknown;
  }>;
}
```

---
