# InternBloom

*Your first step towards more.*

A frontend-only internship discovery portal for university students, built with Next.js.

- **Live website:** <https://internbloom.vercel.app/>
- **GitHub repository:** <https://github.com/alishba-1805/internbloom>
- **Video demo** (`A3_G41_Video.mp4`): *link pending*

CS4032 Web Programming, BS Cyber Security, Fall 2026. Assignment 3: Next.js Frontend.

| Item | Details |
|---|---|
| Group number | 41 |
| Topic number | 48 |
| Official topic | Internship Portal for Students |
| Category | Careers |

## Group members

| Name | Roll number | Role |
|---|---|---|
| Alishba Inam | 24i-2036 | Group Leader |
| Amna Zainab | 24i-2085 | Group Member |
| Hafsa Naeem | 24i-2001 | Group Member |

## About the app

InternBloom is an internship discovery portal for university students in Pakistan. Students can search, filter and sort internships, read role and company details, and submit a simulated application that appears in a temporary tracker. It is frontend only: all companies and listings are fictional mock data, nothing is sent to employers and applications are not saved.

## Main features

- Search by internship title, company name or skill
- Filters for field, city and work arrangement that work together, plus reset
- Sorting by most recent or by stipend
- Dynamic internship and company pages with their own titles and descriptions
- Controlled application form with inline validation messages
- Application tracker with duplicate prevention (same email and internship)
- Custom 404 page, loading skeleton and a mobile navigation menu
- Responsive layouts for mobile, tablet and desktop

## Technology

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, ESLint, npm.

## How to run

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

Production build:

```bash
npm run build
npm start
```

## Routes

| Route | What it shows |
|---|---|
| `/` | Hero, featured internships, popular fields, how it works |
| `/internships` | All internships with search, filters and sorting. `?field=` preselects a field |
| `/internships/[id]` | One internship in full, with related roles |
| `/companies` | Directory of six companies and their internship counts |
| `/companies/[id]` | Company profile, working environment and open internships |
| `/apply` | Application form and tracker. `?internship=` preselects a role |
| `/about` | Purpose, problems addressed, features and team |
| Any unknown URL or ID | Custom 404 page |

The tracker uses React state. It clears when the page is refreshed or when you leave `/apply`.

## Contribution table

Planned division of work. The percentages show each member's planned share of the workload.

| Member | Area | Pages | Components and other files |
|---|---|---|---|
| Alishba Inam (35%) | Leadership, architecture and internship module | `/internships`, `/internships/[id]` | InternshipExplorer, FilterBar, InternshipCard, FieldBadge, internship data, shared types, formatting helpers, project setup, integration, quality assurance, GitHub and deployment |
| Amna Zainab (33%) | Visual design and company module | `/`, `/about`, `/companies`, `/companies/[id]`, root layout | Navbar, Footer, CompanyCard, SectionHeading, PageHeader, company data, global styles, logos and images |
| Hafsa Naeem (32%) | Application module and state management | `/apply`, 404 page, loading screen | ApplicationWorkspace, ApplicationForm, ApplicationTracker, FormField, StatusBadge, EmptyState, form testing, documentation |

## Project structure

```text
app/          Routes, layout, 404 and loading files
components/   Reusable components with typed props
data/         Mock internships, companies and navigation links
lib/          Small formatting functions
types/        TypeScript interfaces
public/       Local images and company logos
```

## Limitations

- All companies, listings, stipends and dates are fictional demonstration data.
- Applications are simulated. Nothing is sent to an employer or stored.
- The tracker and duplicate check last only until the page is refreshed or left.

## Assets

The logo, favicon, illustrations and company marks are original SVG files made for this project. No third-party images or downloaded fonts are used.

## AI tools used

Claude (Anthropic, through Claude Code) was used to generate the initial source code, mock data, SVG artwork and draft documentation, and to review and test the project.