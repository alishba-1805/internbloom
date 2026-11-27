# InternBloom

*Your first step towards more.*

- **Live website:** <https://internbloom.vercel.app/>
- **GitHub repository:** <https://github.com/alishba-1805/internbloom>

CS4032 Web Programming, BS Cyber Security, Fall 2026. Assignment 3: Next.js Frontend.

| Item | Details |
|---|---|
| Group number | 41 |
| Topic number | 48 |
| Topic title | Internship Portal for Students |
| Category | Careers |

## Group members

| Name | Roll number | Role |
|---|---|---|
| Alishba Inam | 24i-2036 | Group Leader |
| Amna Zainab | 24i-2085 | Group Member |
| Hafsa Naeem | 24i-2001 | Group Member |

## About the app

InternBloom is an internship portal for university students in Pakistan. Students can search, filter and sort internships, read about each role and company, and try a demo application that appears in a tracker. It is a frontend-only project, so all companies and listings are made up and no application is actually sent or saved.

## Features

- Search by internship title, company name or skill
- Filters for field, city and work arrangement that work together, with a reset button
- Sorting by most recent or by stipend
- A separate page for every internship and company
- Application form that explains what needs correcting
- Application tracker that blocks applying twice with the same email
- Custom 404 page, loading screen and a menu for small screens
- Layouts for mobile, tablet and desktop

## Technology

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, ESLint and npm.

## How to run

You need Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>.

To check the production build:

```bash
npm run build
npm start
```

## Routes

| Route | What it shows |
|---|---|
| `/` | Introduction, newest internships, popular fields and how it works |
| `/internships` | All internships with search, filters and sorting. `?field=` selects a field |
| `/internships/[id]` | Full details of one internship and similar roles |
| `/companies` | The six companies and how many internships each offers |
| `/companies/[id]` | Company profile, working environment and its internships |
| `/apply` | Application form and tracker. `?internship=` selects a role |
| `/about` | Why we built the app, its features and our team |
| Any unknown address or ID | Custom 404 page |

## Contribution table

| Member | Responsibility | Pages | Components and other files | Share |
|---|---|---|---|---:|
| Alishba Inam (Leader) | Architecture, core internship module, integration and deployment | `/internships`, `/internships/[id]` | InternshipExplorer, FilterBar, InternshipCard, FieldBadge, internship data, shared types, formatting helpers, project setup | 35% |
| Amna Zainab | UI/UX, homepage, layout and company module | `/`, `/about`, `/companies`, `/companies/[id]`, root layout | Navbar, Footer, CompanyCard, SectionHeading, PageHeader, company data, global styles, logos and images | 33% |
| Hafsa Naeem | Application form, validation and state management | `/apply`, 404 page, loading screen | ApplicationWorkspace, ApplicationForm, ApplicationTracker, FormField, StatusBadge, EmptyState | 32% |

## Project structure

```text
app/          Pages, layout, 404 and loading files
components/   Reusable components with typed props
data/         Internship, company and navigation data
lib/          Small formatting functions
types/        TypeScript interfaces
public/       Images and company logos
```

## Limitations

- All companies, listings, stipends and dates are sample data.
- Applications are simulated and nothing is sent to an employer.
- The tracker clears when the page is refreshed or when you leave it.

## Images

The logo, icon, illustrations and company logos are SVG files made for this project. No third-party images or downloaded fonts are used.

## AI tools used

We used Claude (Claude Code) to generate the initial code, sample data, images and documentation drafts, and to review and test the app.
