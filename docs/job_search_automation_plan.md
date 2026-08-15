# Autonomous & Human-in-the-Loop Job Search Automation Plan

**Target Role:** Data Engineer  
**Core Tech Stack:** Python, Playwright, Claude Code / Codex, SQLite/DuckDB, Streamlit  
**Target Platforms:** LinkedIn, JobStreet, Indeed  
**Execution Strategy:** Safety-First Pipeline (Human-in-the-Loop approval before final application submission)

---

## 🏗️ Architectural Overview

```
┌───────────────────────────────────────────────────────────┐
│                    Master Orchestrator                    │
│             (Python + SQLite / DuckDB Pipeline)           │
└─────────────┬───────────────────────────────┬─────────────┘
              │                               │
              ▼                               ▼
┌───────────────────────────┐   ┌───────────────────────────┐
│     Scraping Pipeline     │   │   AI Matching & PDF Engine│
│   (Playwright Headless)   │   │   (Claude Code / Codex)   │
└─────────────┬─────────────┘   └─────────────┬─────────────┘
              │                               │
              └───────────────┬───────────────┘
                              ▼
               ┌─────────────────────────────┐
               │    Human Approval Hub       │
               │  (Streamlit / Local UI)     │
               └──────────────┬──────────────┘
                              │
                              ▼
               ┌─────────────────────────────┐
               │ Playwright Form Pre-Filler  │
               │  (Pauses at Final Submit)   │
               └─────────────────────────────┘
```

---

## 📌 Phased Implementation Roadmap

### Phase 1: Ingestion & Deduplication Pipeline
* **Goal:** Automated job discovery that collects, cleans, and stores Data Engineer listings across platforms into a single database.

#### Key Milestones
* **Milestone 1.1: Local Data Store Setup**
  * Set up SQLite or DuckDB with a unified `jobs` schema (`id`, `platform`, `title`, `company`, `location`, `description`, `apply_url`, `status`, `created_at`).
* **Milestone 1.2: Playwright Discovery Scrapers**
  * Build headless Playwright scripts in Python using semantic locators (`get_by_role()`, `get_by_text()`) to extract job listings from LinkedIn, JobStreet, and Indeed.
  * Extract title, company, job description text, and direct URLs.
* **Milestone 1.3: Normalization & Deduplication**
  * Implement Python normalization logic to clean HTML markup, standardize salary ranges, and eliminate duplicates based on `(company_name, job_title, posting_date)`.

---

### Phase 2: AI Matching & Resume Tailoring Engine
* **Goal:** Process scraped job descriptions through Claude Code / Codex to produce match scores, tailored resumes, and auto-generated Q&A responses.

#### Key Milestones
* **Milestone 2.1: Master Profile & Knowledge Base**
  * Store your master resume and a `knowledge_base.json` file containing standard answer mappings (e.g., years of experience with Python/SQL, work authorization, salary expectations).
* **Milestone 2.2: AI Match Scoring**
  * Pass raw job descriptions to Claude Code / Codex to extract key tech stack requirements and generate a 0–100 relevance score along with potential red flags.
* **Milestone 2.3: Dynamic Resume Rendering**
  * Build a Python compilation pipeline where Claude Code / Codex adjusts key bullet points in a master Markdown, LaTeX, or Typst template based on top job keywords, outputting a tailored PDF.
* **Milestone 2.4: Form Answer Generator**
  * Generate a structured JSON dictionary of anticipated application form questions and tailored answers for each candidate job.

---

### Phase 3: Human-in-the-Loop Approval Hub
* **Goal:** Provide a local control dashboard to review matched roles, inspect generated PDFs, and trigger applications seamlessly.

#### Key Milestones
* **Milestone 3.1: Streamlit Review Dashboard**
  * Build a local Streamlit interface displaying target roles ranked by match score.
  * Render side-by-side previews of the job description and the generated PDF resume.
* **Milestone 3.2: One-Click Action Center**
  * Include a button to launch the application link directly in your browser.
  * Provide one-click "Copy to Clipboard" buttons for generated Q&A responses (e.g., notice period, expected salary).
* **Milestone 3.3: Application Status Tracker**
  * Track application progress directly in the local database (`NEW` → `REVIEWED` → `PREFILLED` → `APPLIED` → `INTERVIEWING` → `REJECTED`).

---

### Phase 4: Playwright Form Pre-Fill Assistance
* **Goal:** Automate form navigation using Playwright, while keeping final submission under manual control.

#### Key Milestones
* **Milestone 4.1: Persistent Session Integration**
  * Export authenticated cookies and storage (`storage_state.json`) so Playwright runs directly within your active account context.
* **Milestone 4.2: Interactive Pre-Fill Helper**
  * When you click "Pre-fill Application" on the Streamlit dashboard, Playwright opens a visible browser (`headless=False`), navigates to the form/modal, fills out standard inputs (name, phone, tailored PDF upload), and populates text boxes.
* **Milestone 4.3: Safety Barrier (Manual Submission)**
  * The script explicitly pauses before clicking the final "Submit" button. You inspect the pre-filled fields, make any required edits, and manually click submit.

---

## 🛑 Architectural Note: Deferred Autonomous Execution Mode

> **Design Choice: Fully Autonomous Execution Deferred**
> 
> * **Modular Architecture:** The submission pipeline is designed using an abstract driver interface (`BaseJobExecutor`). This cleanly separates application submission from scraping, AI processing, and PDF generation modules.
> * **Future Upgrade Path:** Transitioning to fully autonomous, unattended submissions using `playwright-stealth`, persistent session profiles, or specialized anti-detect engines (such as `Camoufox` or `Patchright`) requires only swapping out the execution class.
> * **Reason for Deferral:** **Specifically deferred by choice.** Unattended background submissions pose a high risk of triggering automated anti-bot actions and account bans—particularly on LinkedIn. Maintaining human oversight at the final submission step ensures account safety, eliminates automated misfills, and keeps application quality high.
