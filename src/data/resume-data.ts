import type { ResumeData } from "@/lib/types";

export const RESUME_DATA: ResumeData = {
  name: "Cody Mitchell",
  initials: "CM",
  location: "Chicagoland, IL → Open to Relocation",
  locationLink: "https://www.google.com/maps/place/Chicago",
  about: "Facilities, Operations & New Site Launches",
  summary:
    "9 brands, 400+ locations, 3M+ sq. ft. managed, from luxury maisons and flexible coworking to launching Rivian's East Coast service centers. Solo and with incredible teams.",
  personalWebsiteUrl: "https://codymitch.works",
  contact: {
    social: [
      {
        name: "GitHub",
        url: "https://github.com/hey-codes",
        icon: "github",
      },
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/heycody/",
        icon: "linkedin",
      },
    ],
  },
  education: [
    {
      school: "University of Colorado Boulder",
      link: "https://colorado.edu/envd",
      location: "Boulder, CO",
      degree:
        "Bachelor's Degree in Environmental Design (ENVD); School of Architecture and Planning",
      start: "2008",
      end: "2012",
    },
  ],
  careerHighlights: [
    "**2× first FM hire**: built the Americas programs at FENDI and Balenciaga from scratch, growing to **$5.3M** total managed spend and **$1.2M** OPEX respectively.",
    "**400+ locations, 9 brands, 13 years**: luxury retail, EV/automotive, boutique fitness, and wellness; from J.Crew's sales floor to programs for global luxury houses.",
    "**3 net-new CMMS implementations** (ServiceChannel at FENDI and Balenciaga, FEXA at Rivian): standardized every portfolio; platforms inherited, finished, or expanded at 4 more brands, hands-on across **4 systems**.",
    '**A permanent piece of the Castro**: coordinated the Harvey Milk 40th anniversary "HOPE WILL NEVER BE SILENT" neon memorial at SoulCycle Castro with [SF Illuminate](https://illuminate.org/), now part of Harvey Milk Plaza.',
  ],
  work: [
    {
      company: "Industrious",
      note: "2 weeks to ramp",
      link: "https://www.industriousoffice.com/",
      location: "Remote (Chicago)",
      badges: ["Flex Office", "1.3M+ sq. ft.", "FEXA", "Parental Leave Cover"],
      title: "Facilities Consultant, West Coast Portfolio",
      start: "Apr 2026",
      end: "Aug 2026",
      defaultOpen: true,
      description:
        "Owned repair and maintenance for 48 flex-office locations across 5 West Coast districts (AZ, CA, CO, OR, WA). Brought in to cover a parental leave: interviewed on a Tuesday afternoon, started the following morning at 10am, and learned the brand's people, processes, and standards in 2 weeks.",
      highlights: [
        "Oversaw **1,500+ work orders** on FEXA (repairs, member bill-backs, and preventive maintenance), with **120-190** repair and bill-back tickets open at any given time.",
        "Held West Coast facilities operations steady through a period of internal change: daily work-order intake and triage, preventive maintenance, and management of the in-house technician. Lightly assisted with CapEx where needed.",
      ],
    },
    {
      company: "Bathhouse",
      note: "first PM program",
      link: "https://www.abathhouse.com/",
      location: "New York, NY",
      badges: ["Thermal Wellness", "35K sq. ft.", "MaintainX", "-18% OPEX"],
      title: "Facilities & Operations Manager",
      start: "Jul 2024",
      end: "Nov 2024",
      defaultOpen: true,
      description:
        "Brought on to formalize FM operations at a 35,000 sq. ft. luxury thermal wellness facility: three levels (two underground) in a 27-story residential tower, where on-site bitcoin miners heat the thermal pools, serving 150-350 guests a day. Built the facility's first preventive maintenance program across its critical MEP systems, moving the team from daily firefighting to scheduled maintenance.",
      highlights: [
        "Led a **6-person technical team** (3 facilities, 3 pool): defined roles, ownership areas, and shift accountability.",
        "**Reduced OPEX 18%** ($36K) in the first three months by shifting outsourced work to in-house technicians and sourcing materials, tools, and hardware competitively (bulk buys, sales, trusted online suppliers).",
      ],
    },
    {
      company: "Balenciaga",
      note: "first FM hire, globally",
      link: "https://www.balenciaga.com/en-us",
      location: "New York, NY",
      badges: [
        "Luxury Retail",
        "200K+ sq. ft.",
        "ServiceChannel",
        "$1.2M OPEX",
      ],
      title: "Facilities Manager, Americas",
      start: "Aug 2022",
      end: "Dec 2023",
      defaultOpen: true,
      description:
        "Balenciaga's first FM hire globally, brought on to build a centralized, data-driven FM program across 54 locations in the U.S. and Canada. Grew the function from a solo role to a team.",
      highlights: [
        "Deployed ServiceChannel across **54 locations**, onboarded **65+ vendors**, and processed **1,600+ maintenance tasks** annually with standardized workflows.",
        "Built a **3-person FM team**: hired a Facilities Coordinator and selected 2 external consultants.",
        "Managed NYC headquarters operations for 80+ Balenciaga staff.",
        "Built the case for and secured OPEX budget growth from $450K to **$1.2M**, backed by maintenance tracking and needs analysis. Managed a **$1M shared CapEx** budget.",
      ],
    },
    {
      company: "Rivian Automotive",
      note: "6 sites launched",
      link: "https://www.rivian.com",
      location: "New York, NY",
      badges: [
        "EV / Automotive",
        "260K+ sq. ft.",
        "Limble -> FEXA",
        "Hybrid (Travel 60%)",
      ],
      title: "Commercial Facilities Operations Specialist",
      start: "Apr 2021",
      end: "Jul 2022",
      defaultOpen: true,
      description:
        "Hybrid site launcher and facilities manager during Rivian's rapid EV expansion: launched 6 East Coast service centers, built steady-state playbooks, and stayed on as the FM point of contact after launch.",
      highlights: [
        "Owned the **full site lifecycle**: construction coordination, punchlist, opening-day vendor mobilization, then steady-state R&M, with the punchlist-to-steady-state handoff improving over time.",
        "Directed biweekly NSO calls with **40 to 80 people** per call across 8 cross-functional teams.",
        "With the East Coast manager and coordinator, served as the core team on the Limble to FEXA migration, building the SOPs, protocols, and playbooks adopted across all **~30 Rivian locations** nationally.",
      ],
    },
    {
      company: "FENDI",
      note: "built from zero",
      link: "https://www.fendi.com/us-en/",
      location: "New York, NY",
      badges: [
        "Luxury Retail",
        "220K+ sq. ft.",
        "ServiceChannel",
        "$5.3M Managed Spend",
      ],
      title: "Facilities Manager, Americas",
      start: "Dec 2018",
      end: "Apr 2021",
      defaultOpen: true,
      description:
        "First FM hire in the Americas: built FENDI Americas' FM function from scratch across 67 locations in 4 countries. Grew the R&M budget from $600K to $1M as scope doubled within two years.",
      highlights: [
        "Absorbed security and loss prevention, cleaning, and COVID-19 response into the FM function in 2020, growing total managed spend to **$5.3M**. Managed it all as sole FM, using ServiceChannel automation to process **1,100+ work orders** that year.",
        "Managed NYC headquarters at 555 Madison (12,000 sq. ft., 90 staff) alongside the retail portfolio.",
        'Peer-voted the inaugural "Above & Beyond" Award, recognized by the President of FENDI Americas, [Joanna M. Dubin](https://www.linkedin.com/in/joannadubin/), for crisis response during 2020.',
      ],
    },
    {
      company: "Dolce & Gabbana",
      note: "sole FM, Americas",
      link: "https://www.dolcegabbana.com/en-us/",
      location: "New York, NY",
      badges: ["Luxury Retail", "190K+ sq. ft.", "ServiceChannel"],
      title: "Facilities Manager, Americas",
      start: "Jul 2018",
      end: "Dec 2018",
      defaultOpen: true,
      description:
        "First luxury retail FM role: finalized the ServiceChannel rollout across 48+ boutiques in the U.S. and Canada and established a centralized regional maintenance model.",
      highlights: [
        "Audited and reconfigured ServiceChannel platform workflows. Transitioned from a collaborative FM team to sole facilities manager for the entire Americas region.",
      ],
    },
    {
      company: "SoulCycle",
      note: "16 studio launches",
      link: "https://www.soul-cycle.com",
      location: "San Francisco, CA",
      badges: [
        "Boutique Fitness",
        "130K+ sq. ft.",
        "ServiceChannel",
        "Hybrid (Travel 60%)",
      ],
      title: "Area Facilities Manager",
      start: "Apr 2015",
      end: "Jun 2018",
      defaultOpen: true,
      description:
        "Started overseeing NYC Metro studios; asked to relocate to San Francisco to stabilize West Coast operations and lead expansion into NorCal, Seattle, Vancouver, Chicago, and Texas. 33-studio portfolio across 6 markets. Traveled 60-70%.",
      highlights: [
        "Led the FM handoff for **16 studio launches** and supervised 1 technician directly, hiring their replacement when they moved on. **$450K annual OPEX** portfolio.",
        "Delivered CapEx projects across the portfolio: **2-4 per location annually**, $5K-$50K per project.",
      ],
    },
    {
      company: "J.Crew / Madewell",
      note: "sales floor to FM",
      link: "https://www.jcrew.com",
      location: "New York, NY",
      badges: ["High-End Retail", "700K+ sq. ft.", "ServiceChannel"],
      title: "Facilities Coordinator",
      start: "May 2010",
      end: "Apr 2015",
      defaultOpen: true,
      description:
        "Five years with the brand: from the sales floor in Broomfield, Colorado (2010) through Men's merchandising at the NYC Flagship (2012) into facilities management in 2013, ultimately overseeing all repairs, maintenance and CapEx projects for the entire Madewell fleet and J.Crew's NYC Metro region.",
      highlights: [
        "Started with J.Crew West; expanded to the full Madewell fleet, then earned NYC Metro and its flagship locations.",
        "Managed ServiceChannel workflows, in-store safety audits, and after-hours emergency response across **140+ stores**. Trained 3 new Facilities Coordinators.",
      ],
    },
  ],
  skills: [
    {
      category: "Operations & Program Management",
      items: [
        "Multi-Site Portfolio Management",
        "Preventive Maintenance Programs",
        "New Site Openings (NSO)",
        "Work Order Management",
        "Process Standardization",
        "Site Audits & Brand Standards",
        "SOP Development",
        "Landlord Relations",
        "Tenant/Member Experience",
      ],
    },
    {
      category: "Systems & Platforms",
      items: [
        "ServiceChannel",
        "FEXA",
        "MaintainX",
        "Procore",
        "Confluence",
        "Airtable",
        "Asana",
        "Notion",
        "Microsoft Office",
        "Google Workspace (Sheets, Drive)",
      ],
    },
    {
      category: "Technical Systems",
      items: [
        "HVAC",
        "Plumbing",
        "Electrical",
        "Fire/Life Safety",
        "Building Automation/BMS",
        "Dehumidification",
        "Heat Exchangers",
        "MEP Systems",
      ],
    },
    {
      category: "Finance & Vendor Management",
      items: [
        "CapEx/OPEX Planning",
        "Budget Development",
        "R&M Forecasting",
        "RFP Development",
        "Multi-Trade Coordination",
        "Sustainable Procurement",
      ],
    },
    {
      category: "AI & Automation",
      items: [
        "Claude AI (Code, Cowork)",
        "Cursor",
        "Prompt Engineering",
        "Documentation Pipelines",
        "Workflow Automation",
        "AI FM Strategies",
      ],
    },
  ],
  projects: [
    {
      title: "Blade & Balm",
      techStack: ["Website Revamp", "Brand Visibility", "Space Design"],
      description:
        "Revamping business website, increasing brand visibility, and optimizing men's salon/shop layout.",
      location: "Woodstock, IL",
      status: "on-boarding",
      link: {
        label: "bladeandbalm.glossgenius.com",
        href: "https://bladeandbalm.glossgenius.com/",
      },
    },
    {
      title: "Tierney Builders",
      techStack: [
        "Real Estate Listings",
        "Operations Enhancement",
        "AI Optimization",
      ],
      description:
        "Consultation on real estate listings, operational enhancements, and AI integration for future projects.",
      location: "Woodstock, IL",
      status: "on-boarding",
    },
    {
      title: "Twisted Stems",
      techStack: [
        "Space Optimization",
        "BoH Storage Revamp",
        "R&M",
        "Operations Efficiency",
      ],
      description:
        "Facilities and operations quick-wins for a local flower shop - repairs, storage/layout revamp, and business efficiency improvements.",
      location: "Crystal Lake, IL",
      status: "in-progress",
      link: {
        label: "twistedstemfloral.com",
        href: "https://www.twistedstemfloral.com/",
      },
    },
    {
      title: "Mangione Landscaping",
      techStack: ["AI Optimization", "TBD"],
      description:
        "AI optimizations to assist with client landscaping projects.",
      location: "Woodstock, IL",
      status: "complete",
    },
    {
      title: "Bee's Knees",
      techStack: [
        "Preventive Maintenance",
        "Specialty Repairs",
        "Restaurant & Bar",
      ],
      description:
        "Evaluating restaurant and bar space for a preventive maintenance program and specialty repairs.",
      location: "Brooklyn, NY",
      status: "complete",
      link: {
        label: "beeskneesbk.com",
        href: "https://www.beeskneesbk.com/",
      },
    },
  ],
} as const;
