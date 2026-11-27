<div align="center">

<img src="public/images/logo.svg" alt="InternBloom logo" width="280">

### Your first step towards more.

An internship portal for university students in Pakistan

**[Live website](https://internbloom.vercel.app/)** · **[GitHub repository](https://github.com/alishba-1805/internbloom)**

CS4032 Web Programming · BS Cyber Security · Fall 2026 · Assignment 3: Next.js Frontend

<br>

<img src="screenshots/home.jpg" alt="InternBloom home page" width="900">

</div>

## Contents

[Project details](#project-details) · [About](#about-the-app) · [Features](#features) · [Screenshots](#screenshots) · [Architecture](#architecture) · [Flowcharts](#flowcharts) · [How to run](#how-to-run) · [Routes](#routes) · [Contribution](#contribution-table) · [Limitations](#limitations)

## Project details

| Item | Details |
|---|---|
| Group number | 41 |
| Topic number | 48 |
| Topic title | Internship Portal for Students |
| Category | Careers |

| Name | Roll number | Role |
|---|---|---|
| Alishba Inam | 24i-2036 | Group Leader |
| Amna Zainab | 24i-2085 | Group Member |
| Hafsa Naeem | 24i-2001 | Group Member |

## About the app

InternBloom is an internship portal for university students in Pakistan. Students can search, filter and sort internships, read about each role and company, and try a demo application that appears in a tracker. It is a frontend-only project, so all companies and listings are made up and no application is actually sent or saved.

## Features

| Area | What you can do |
|---|---|
| Discover | Search 18 internships by title, company name or skill |
| Narrow down | Combine field, city and work arrangement filters, then reset them in one click |
| Compare | Sort by most recent or by stipend |
| Read more | Open a separate page for every internship and for each of the six companies |
| Apply | Fill in a form that explains exactly what needs correcting |
| Track | See submitted applications, with a block on applying twice using the same email |
| Any screen | Use it on mobile, tablet and desktop, with a menu for small screens |

## Screenshots

All screenshots were taken from the live website. The names in the form are sample data.

### Finding an internship

| Search and filters | Internship details |
|---|---|
| <img src="screenshots/internships.jpg" alt="Internship listing filtered to Cybersecurity" width="440"> | <img src="screenshots/internship-detail.jpg" alt="SOC Analyst Intern detail page" width="440"> |

### Exploring companies

| Company directory | Company profile |
|---|---|
| <img src="screenshots/companies.jpg" alt="Directory of six companies" width="440"> | <img src="screenshots/company-profile.jpg" alt="CedarByte Labs profile page" width="440"> |

### Applying and tracking

| Form validation | Confirmation and tracker |
|---|---|
| <img src="screenshots/form-validation.jpg" alt="Application form showing error messages" width="440"> | <img src="screenshots/application-tracker.jpg" alt="Confirmation message and application tracker" width="440"> |

### About and 404

| About page | Custom 404 page |
|---|---|
| <img src="screenshots/about.jpg" alt="About page" width="440"> | <img src="screenshots/not-found.jpg" alt="Custom 404 page" width="440"> |

### Mobile view (375 px)

| Home | Menu | Internships |
|:---:|:---:|:---:|
| <img src="screenshots/mobile-home.jpg" alt="Home page on a phone" width="260"> | <img src="screenshots/mobile-menu.jpg" alt="Open navigation menu on a phone" width="260"> | <img src="screenshots/mobile-internships.jpg" alt="Internship cards on a phone" width="260"> |

## Technology

| Tool | Used for |
|---|---|
| Next.js 16 (App Router) | Routing, layouts, metadata, images and links |
| React 19 | Components, props and state |
| TypeScript | Types for every record and component |
| Tailwind CSS 4 | Styling and responsive layouts |
| ESLint and npm | Code checks and packages |
| Vercel | Hosting the live website |

## Architecture

### How the app is organised

Pages read the mock data and pass it to components as props. There is no server database or API.

```mermaid
flowchart TB
    visitor(["Student in a browser"]) --> routes

    subgraph app["app/ : pages and layout"]
        layout["layout.tsx<br/>shared navbar and footer"] --> routes["Pages<br/>home, internships, companies,<br/>apply, about"]
    end

    subgraph ui["components/ : reusable interface"]
        parts["Cards, headers, filters,<br/>form, tracker and badges"]
    end

    subgraph source["data, types and helpers"]
        data["data/<br/>internships, companies, links"]
        types["types/<br/>TypeScript interfaces"]
        lib["lib/<br/>stipend and date formatting"]
    end

    routes -->|props| parts
    data --> routes
    types -.-> data
    types -.-> parts
    lib --> parts
    public["public/<br/>images and logos"] --> parts
```

### Server and Client Components

Pages stay on the server. Only the three components that need state and events are marked `"use client"`. The components they import also run in the browser.

```mermaid
flowchart TB
    layout["RootLayout"]:::server --> navbar["Navbar<br/>use client"]:::client
    layout --> footer["Footer"]:::server
    layout --> page["Current page"]:::server

    page --> explorer["InternshipExplorer<br/>use client"]:::client
    explorer --> filterbar["FilterBar"]:::shared
    explorer --> card["InternshipCard"]:::shared
    explorer --> empty["EmptyState"]:::shared

    page --> workspace["ApplicationWorkspace<br/>use client"]:::client
    workspace --> form["ApplicationForm"]:::shared
    workspace --> tracker["ApplicationTracker"]:::shared
    form --> field["FormField"]:::shared
    tracker --> badge["StatusBadge"]:::shared

    classDef server fill:#173f37,stroke:#173f37,color:#ffffff
    classDef client fill:#d9e9b8,stroke:#32745b,color:#173f37
    classDef shared fill:#ffffff,stroke:#32745b,color:#173f37
```

| Colour | Meaning |
|---|---|
| Dark green | Server Component |
| Light green | Client Component marked `"use client"` |
| White | Runs in the browser here because a Client Component imports it |

### Reusable components

| Component | Used by |
|---|---|
| `InternshipCard` | Home, internship listing, internship detail and company profile |
| `PageHeader` | Internships, companies, apply and about |
| `SectionHeading` | Home, about, internship detail and company profile |
| `EmptyState` | Internship results and application tracker |
| `FieldBadge` | Internship cards and internship detail |
| `StatusBadge` | Application confirmation and tracker |

## Flowcharts

### Moving around the site

```mermaid
flowchart LR
    home["/ Home"] --> list["/internships"]
    home --> companies["/companies"]
    home --> apply["/apply"]
    list --> detail["/internships/[id]"]
    companies --> profile["/companies/[id]"]
    detail -->|View Company| profile
    profile -->|View Details| detail
    detail -->|Apply Now| apply
    detail -.->|unknown ID| missing["404 page"]
    profile -.->|unknown ID| missing
```

### Search, filter and sort

```mermaid
flowchart TD
    change["Student types or picks a filter"] --> state["Filter state is updated"]
    state --> each["Check each internship"]
    each --> search{"Matches the<br/>search text?"}
    search -->|No| hide["Leave it out"]
    search -->|Yes or empty| filters{"Matches field, city<br/>and work arrangement?"}
    filters -->|No| hide
    filters -->|Yes| keep["Keep it"]
    keep --> sort["Sort the kept internships"]
    sort --> any{"Any results?"}
    hide --> any
    any -->|Yes| cards["Show internship cards"]
    any -->|No| none["Show empty state with reset button"]
```

### Submitting an application

```mermaid
flowchart TD
    submit["Student presses Submit"] --> stop["Stop the page from reloading"]
    stop --> validate["Check every field"]
    validate --> valid{"All fields valid?"}
    valid -->|No| errors["Show messages and focus the first problem"]
    errors --> submit
    valid -->|Yes| duplicate{"Same email and<br/>internship already used?"}
    duplicate -->|Yes| errors
    duplicate -->|No| save["Add to the list in React state"]
    save --> confirm["Show confirmation"]
    save --> update["Update the tracker"]
```

### How state moves on the apply page

```mermaid
sequenceDiagram
    actor Student
    participant Form as ApplicationForm
    participant Workspace as ApplicationWorkspace
    participant Tracker as ApplicationTracker

    Student->>Form: Type details
    Form->>Form: Update formData
    Student->>Form: Submit
    Form->>Form: Validate
    Form->>Workspace: onApplicationSubmit(application)
    Workspace->>Workspace: Update applications
    Workspace->>Tracker: New applications prop
    Workspace-->>Student: Confirmation message
    Tracker-->>Student: Updated list and count
```

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
internbloom/
├── app/            Pages, layout, 404 and loading files
├── components/     Reusable components with typed props
├── data/           Internship, company and navigation data
├── lib/            Small formatting functions
├── types/          TypeScript interfaces
├── public/         Images and company logos
└── screenshots/    Pictures used in this README
```

## Limitations

- All companies, listings, stipends and dates are sample data.
- Applications are simulated and nothing is sent to an employer.
- The tracker clears when the page is refreshed or when you leave it.

## Images

The logo, icon, illustrations and company logos are SVG files made for this project. The screenshots show our live website. No third-party images or downloaded fonts are used.
