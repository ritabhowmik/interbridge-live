# interbridge

A business enters what it sells and which province it wants to expand into, and gets back a plain-language breakdown of which provincial regulations block it, plus a generated checklist to fix it. Every claim is grounded in a specific, cited regulation, nothing is invented.

Built for AF Hacks: Growing Canada, a 24-hour hackathon at the University of Waterloo.

## Why this, why now

In June 2025, the federal government passed the **One Canadian Economy Act (Bill C-5)**, which enacts the Free Trade and Labour Mobility in Canada Act, a framework to remove federal barriers to interprovincial movement of goods and services that already meet comparable provincial standards, plus federal recognition of provincial occupational licenses. Most provinces have passed or are advancing matching legislation.

That's the legal plumbing for mutual recognition. There's no interface for it yet. A business still can't easily answer "if I'm compliant in Ontario, what's the gap to sell in Alberta?" Interbridge is a first attempt at that interface.

Estimates of the cost of Canada's internal trade barriers vary by methodology, from the Canadian Chamber of Commerce's $14B/year to the Macdonald-Laurier Institute's $110-200B/year potential upside from removing them, but every serious estimate is double-digit billions at minimum.

## Important

**This is a triage tool, not legal advice.** It flags what to bring to a lawyer, licensing body, or the issuing authority directly. It does not state legal conclusions like "you are compliant." Every claim is grounded in and cited to a specific regulation row in the dataset; ambiguous or conflicting matches are flagged as low-confidence rather than resolved silently.

Scope for this build: 4 provinces (ON, QC, BC, AB), 4 sectors (alcohol production, food processing, trucking/logistics, professional services), curated seed data rather than live scraping. Seed data was written from real government sources but should be re-verified against the actual regulatory text before relying on it for anything beyond a demo, several `source_url` values point to a department's general page rather than a deep link to the exact clause.

## Architecture

- **Backend**: FastAPI + SQLite + SQLAlchemy. Two separate Claude API calls: one to classify the business into a sector, one to generate the grounded plain-language breakdown and checklist from the retrieved regulation rows. Retrieval itself is plain SQL, not an LLM call, so the candidate set is deterministic and auditable. `source_url` and `authority` in the API response always come from the verified database row, never from the model's own restatement of them.
- **Frontend**: Next.js (App Router) + Tailwind. Dark glassmorphism, EB Garamond display type, aura gradient background.
- **Voice**: ElevenLabs Conversational AI agent ("Wren") as an alternate intake path. See `frontend/components/VoiceIntake.tsx`.

