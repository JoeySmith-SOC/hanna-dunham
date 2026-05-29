# Content Guide — Hanna S. Dunham

## Content Philosophy

Every word on this site must earn its place. The goal is not comprehensiveness — it is authority. A hiring executive should understand exactly who Hanna is and what she does in 30–60 seconds.

---

## Source of Truth

**All content lives in `src/data/content.js`.**

Never hardcode copy in JSX. Never duplicate content. If something needs updating, update `content.js` only — components will reflect the change automatically.

---

## Content Structure

### `meta` — Identity

```js
meta = {
  name: 'Hanna S. Dunham',
  credentials: 'J.D.',
  title: 'Enterprise Contract Governance & Infrastructure Portfolio Analyst',
  tagline: '...',
  location: 'United States',
  email: 'hanna@example.com',     // [PLACEHOLDER — update before launch]
  linkedin: 'https://...',         // [PLACEHOLDER — update before launch]
  resumeUrl: '/documents/hanna-dunham-resume.pdf',
  resumeDocxUrl: '/documents/hanna-dunham-resume.docx',
}
```

### `profile` — Executive Summary

One paragraph. Authoritative, third-person. States current employer, core expertise, and differentiators. Should not be a list.

Highlights: 4 key facts shown in the glass card (Current Employer, Specialization, Legal Credential, Languages).

### `experience` — Career Timeline (10 entries)

Each entry:

```js
{
  id: 'exp-N',
  period: 'Month Year — Month Year',
  company: 'Company Name',
  subcompany: null,        // or 'Division · Team'
  role: 'Job Title',
  location: 'City, ST or United States',
  description: 'Paragraph describing responsibilities and impact.',
  tags: ['Tag1', 'Tag2', ...],
}
```

**Rendering by tier:**
- `exp-1` (AWS, index 0): Full description shown. All tags.
- `exp-2` through `exp-10` (indices 1–9): Role + company + period + 3 tags. Description available in data but not rendered to reduce visual length.

### `competencies` — Capability Framework (5 groups)

```js
{
  category: 'Category Name',
  skills: ['Skill 1', 'Skill 2', ...5 skills],
}
```

Rendered via the SVG capability network in `ExperienceExpertise.jsx`. Active category's skills are displayed in the skills panel below the network.

**Category order matters** — index 0 is the hub node (Enterprise Governance) which is active by default. Keep it first.

### `education` — Credentials (2 entries)

```js
{
  id: 'edu-N',
  degree: 'Full Degree Name',
  abbreviation: 'J.D.',
  institution: 'University Name',
  year: null,
  honors: 'Honors string or null',
}
```

---

## Content Rules

### Voice

- Third-person, authoritative, precise
- No filler phrases ("passionate about," "proven track record," "results-driven")
- No weak qualifiers ("helped with," "assisted in")
- Strong, active verbs: governs, audits, interprets, delivers, manages, maintains
- Legal/enterprise register — not casual, not corporate-speak

### Description paragraphs

- One unified paragraph per role (no bullet lists in descriptions)
- Start with the scope of responsibility, then the specific activities
- End with the outcome or strategic value where possible
- AWS description should communicate enterprise scale and legal + financial expertise intersection

### Tags

- 3–8 tags per role
- Noun phrases, not verb phrases
- Should be scannable skill signals for a hiring manager
- Consistent casing: title case for multi-word ("Contract Governance"), lowercase for single words only if conventional

### Competency categories

- Short, precise category names that sound like enterprise frameworks
- Skills within each category should feel interconnected, not random
- Each skill should be 2–5 words maximum

---

## Pending Updates Before Launch

| Field | Status | Notes |
|-------|--------|-------|
| `meta.email` | PLACEHOLDER | Replace `hanna@example.com` |
| `meta.linkedin` | PLACEHOLDER | Replace with real LinkedIn URL |
| Resume PDF | MISSING | Add to `public/documents/hanna-dunham-resume.pdf` |
| Resume DOCX | MISSING | Add to `public/documents/hanna-dunham-resume.docx` |

---

## Content Sections — Display Notes

### Hero tagline

Short, declarative sentence. Should communicate the intersection of legal + operational + financial expertise. Currently: "Translating legal complexity into operational clarity across enterprise infrastructure environments."

Keep it specific. Avoid abstract corporate phrases.

### Profile summary

The most important paragraph on the page. Should mention AWS by name. Should reference the J.D. and enterprise/infrastructure scale. Should mention bilingual Swedish capability.

### Experience condensation rationale

Older roles (indices 5–9) are condensed to 3 tags and no description in the current UI. This is intentional — the page prioritizes narrative clarity over enumeration. Full descriptions remain in `content.js` for PDF/DOCX resume generation if needed in the future.

The foundation period (2014–2015) roles are still individually listed, preserving the full career trajectory for anyone who explores deeply.
