# Content Guide — Hanna S. Dunham

## Content Philosophy

This is an employer-facing document, not a resume dump. Every word is edited for signal density. Bullets are rewritten as positioning statements. Responsibilities are reframed as evidence of judgment.

**Rule**: If a sentence could appear on any analyst's resume, cut it. Every sentence must be specific to Hanna.

---

## Client Positioning

**Name**: Hanna S. Dunham, J.D.  
**Title**: Enterprise Contract Governance & Infrastructure Portfolio Analyst  
**Tagline**: *Translating legal complexity into operational clarity.*

**Why this tagline**: It defines her unique value proposition in 7 words. It bridges the legal side (J.D., regulatory language) with the operational side (governance frameworks, compliance monitoring). It signals bilingual fluency in two organizational languages.

---

## Section-by-Section Guide

### Profile / Executive Summary

**Current copy** (`src/data/content.js → profile.summary`):

> Contract governance and infrastructure portfolio analyst with a Juris Doctor and proven expertise across AWS infrastructure services, enterprise lease oversight, and vendor financial compliance. Bridges legal precision with operational discipline — translating complex regulatory and contractual frameworks into governance structures that reduce organizational risk, enforce accountability, and protect enterprise assets at scale. Bilingual in English and Swedish.

**Editorial decisions made**:
- Opens with the role compound (no pronoun, confident)
- "Bridges legal precision with operational discipline" — the core value statement
- Ends with language fluency (differentiator, not filler)
- No filler phrases: "results-driven", "team player", "passionate"

**To update**: Replace with Hanna's exact positioning once finalized.

---

### Experience

**Source**: `src/data/content.js → experience[]`

Each entry has:
- `period`: Year range (e.g., `"2021 — Present"`)
- `company`: Employer name — **[PLACEHOLDER]**
- `role`: Job title
- `description`: 2–3 sentences, active voice, outcome-focused
- `tags`: 4 skill tags per entry

**Writing rules for descriptions**:
1. Start with an active verb (Govern, Manage, Lead, Architect)
2. State the scope or scale when possible ("multi-year portfolio", "cross-functional")
3. End with what it produces (compliance, accountability, risk reduction)
4. No bullet lists. One coherent paragraph.

**To update**: Replace `[Company Name]` placeholders with actual employers.

---

### Competencies

**Source**: `src/data/content.js → competencies[]`

Four categories:
1. Contract & Legal
2. Infrastructure & Cloud
3. Portfolio & Risk
4. Languages

**Display style**: Plain text list with accent dot markers. No badge pills, no progress bars, no star ratings. Employers know these systems are arbitrary.

**To update**: Add or remove skills as appropriate. Keep each category to 4–6 items for visual balance.

---

### Education

**Source**: `src/data/content.js → education[]`

Currently two entries with placeholders:
1. Juris Doctor — **[PLACEHOLDER: institution + year]**
2. Undergraduate — **[PLACEHOLDER: degree + institution + year]**

**Display**: Each credential is a card with the abbreviated degree (J.D.) in italic Playfair Display as the visual anchor.

**To update**: Fill in `institution` and `year` fields. Optionally add `honors` (e.g., "Cum Laude", "Law Review").

---

### Downloads

Minimal copy — a short CTA paragraph then two action buttons:
- Download Resume (PDF, links to `/public/Hanna-Dunham-Resume.pdf`)
- View LinkedIn

**To update**: Add the resume PDF to `/public/` and update `meta.resumeUrl` in `src/data/content.js`.

---

### Contact

**To update**: Replace placeholder email and LinkedIn URL in `src/data/content.js → meta`:

```js
export const meta = {
  email: 'hanna@example.com',     // ← replace
  linkedin: 'https://linkedin.com/in/hannadunham', // ← replace
  resumeUrl: '/Hanna-Dunham-Resume.pdf',            // ← add PDF to /public/
};
```

---

## Launch Checklist

- [ ] Replace all `[PLACEHOLDER]` values in `src/data/content.js`
- [ ] Add resume PDF to `/public/Hanna-Dunham-Resume.pdf`
- [ ] Confirm email address
- [ ] Confirm LinkedIn URL
- [ ] Review executive summary with Hanna
- [ ] Add headshot to `/public/` if desired (see Hero component for integration point)
- [ ] Confirm education institutions and years
- [ ] Verify all job titles match official titles
- [ ] Add `favicon.svg` to `/public/`
