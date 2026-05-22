# Accessibility Requirements

## Baseline

- Semantic HTML landmarks
- Skip link to main content
- Visible keyboard focus states
- Proper color contrast
- Reduced motion support
- Alt text for images and placeholders

## Implementation Rules

- Every major section must have an accessible heading
- Interactive controls must remain fully usable by keyboard
- Motion must respect `prefers-reduced-motion`
- Contact information must be readable without relying on icons alone

## QA Checklist

- Tab through the full page in reading order
- Verify skip link visibility on focus
- Check reduced motion behavior in browser settings
- Confirm download buttons communicate disabled states when files are absent
