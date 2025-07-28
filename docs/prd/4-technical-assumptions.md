# **4. Technical Assumptions**

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
