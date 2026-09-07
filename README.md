# saisrinu.in

Personal portfolio — Next.js 16 (App Router), React 19, TypeScript, Tailwind v4.

## Running it

```bash
npm install
cp .env.example .env.local     # then fill in FORMSPREE_ENDPOINT
npm run dev                    # http://localhost:3000
```

| Script | What it does |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Production build. `/` must come out as `○ (Static)` |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm test` | Contact-form validation, via Node's built-in test runner — no test framework installed |

## Environment

| Variable | Required | Notes |
|---|---|---|
| `FORMSPREE_ENDPOINT` | Yes | Full URL the contact form forwards to. Without it the form returns "Contact form is not configured." |
| `NEXT_PUBLIC_SITE_URL` | No | Canonical origin for metadata/OG/JSON-LD. Defaults to `https://saisrinu.in` |
| `CONTACT_DRY_RUN` | No | Any truthy value short-circuits the contact action to success without contacting Formspree. For local UI work and demos |

`FORMSPREE_ENDPOINT` is **not a secret.** Formspree form IDs are public by
design — anyone can POST to the endpoint directly. It is a non-`NEXT_PUBLIC_`
var purely so it can be swapped between staging and production, not as a
security boundary. Spam protection belongs in the Formspree dashboard, and a
Vercel Firewall rate-limit rule on the path if abuse ever appears.

It takes a full URL rather than a bare form id so it can be pointed at a local
echo server to verify the forwarded payload without spending a real submission.

## Editing content

Everything user-facing lives in [`content/portfolio.ts`](content/portfolio.ts) —
name, roles, skills, experience, projects, awards, education, nav links. No
component holds copy. `public/resume.pdf` backs the Resume buttons.

To add a screenshot to a project card, drop the file in `public/projects/` and
set `image` on that project; without it the card renders an accent gradient
with the project title.

## Contact form

A Server Action ([`app/actions.ts`](app/actions.ts)) rather than a client fetch,
so React submits it before hydration and the form works with JS disabled.
Validation is a pure function in [`lib/contact.ts`](lib/contact.ts), shared by
the action and the form so client and server agree.

The old static site had no `name` attribute on its Name input and a malformed
one on its textarea, so **only the email address ever reached Formspree.** All
three fields are now assembled server-side. `npm test` covers the validator;
`test/contact.test.mts` explains the `.mts` extension and explicit-extension
import, both of which are load-bearing.

## Notes for future edits

- **Dark mode** is a `.dark` class on `<html>`, set pre-paint by an inline
  script in `layout.tsx` to avoid a flash. Tokens are defined once in
  `globals.css` and flipped under `.dark`; `@theme inline` is what makes
  `bg-bg text-fg` correct in both themes without `dark:` on every element.
- **Hero entrance is CSS, not motion.** Motion serialises its `initial` state
  into the SSR'd HTML as inline `opacity:0`, which would leave the largest
  contentful element invisible until hydration. Motion still drives scroll
  reveals, hover springs, the nav indicator, and the mobile sheet; a
  `<noscript>` rule in `layout.tsx` un-hides the reveals when JS is off.
- **Reduced motion** is handled in two places: `lib/motion.ts` collapses every
  variant, and `globals.css` guards CSS animations with `0.01ms` — not
  `animation: none`, which would break `fill-mode: both` and leave elements
  permanently invisible.
- The previous static site is preserved at commit `398d7ac`.
