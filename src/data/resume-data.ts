import type { ResumeData } from "@/lib/types";

export const RESUME_DATA: ResumeData = {
  name: "Cody Mitchell",
  initials: "CM",
  location: "Chicagoland, IL → Open to Relocation",
  locationLink: "https://www.google.com/maps/place/Chicago",
  about:
    "Facilities leader who builds multi-site operations programs from the ground up.",
  summary:
    "Doing facilities management since 2013: started on the J.Crew fleet and worked my way up to running national portfolios solo. 13 years, 9 brands, 400+ locations, 3M+ sq ft. managed, and I wouldn't trade it. The problems get my gears turning; the people I solve them with are why I've stayed in FM.",
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
      school: "UNIVERSITY OF COLORADO BOULDER",
      link: "https://colorado.edu/envd",
      location: "Boulder, CO",
      degree:
        "Bachelor's Degree in Environmental Design (ENVD); School of Architecture and Planning",
      start: "2008",
      end: "2012",
    },
  ],
  careerHighlights: [
    "**2× first FM hire** - built the Americas programs at FENDI and Balenciaga from scratch, growing to **$5.3M** total managed spend and **$1.2M** OPEX respectively.",
    "**400+ locations, 9 brands, 13 years** - luxury retail, EV/automotive, boutique fitness, and wellness; from J.Crew's sales floor to programs for global luxury houses.",
    "**3 net-new CMMS implementations** (ServiceChannel at FENDI and Balenciaga, FEXA at Rivian) - standardized every portfolio; platforms inherited, finished, or expanded at 4 more brands, hands-on across **5 systems**.",
    '**A permanent piece of the Castro** - coordinated the Harvey Milk 40th anniversary "HOPE WILL NEVER BE SILENT" neon memorial at SoulCycle Castro with [SF Illuminate](https://illuminate.org/), now part of Harvey Milk Plaza.',
  ],
  work: [
    {
      company: "INDUSTRIOUS",
      note: "10 days to ramp",
      link: "https://www.industriousoffice.com/",
      location: "Remote (Chicago)",
      badges: [
        "Flex Office",
        "48 Locations",
        "5 Districts",
        "FEXA",
        "Parental Leave Cover",
      ],
      title: "Facilities Consultant, West Coast Portfolio",
      start: "Apr 2026",
      end: "Aug 2026",
      defaultOpen: true,
      description:
        "Brought in to cover a parental leave across the West Coast portfolio: interviewed on a Tuesday afternoon, started the following morning, 10am.",
      highlights: [
        "Held West Coast facilities operations steady through a period of internal change; **10 days** to learn the ropes and brand standards.",
        "Owned all repair and maintenance activities across **48 flex-office locations** in 5 districts (CA, OR, WA, CO, AZ) on the FEXA CMMS: daily work-order intake and triage, preventive maintenance, and internal technician management. Lightly assisted with CapEx.",
      ],
    },
    {
      company: "BATHHOUSE",
      note: "first PM program",
      link: "https://www.abathhouse.com/",
      location: "Denver, CO",
      badges: [
        "Thermal Wellness",
        "35,000 sq. ft.",
        "On-Site",
        "6 Direct Reports",
        "MaintainX",
        "-18% OPEX",
      ],
      title: "Facilities Operations Manager",
      start: "2024",
      end: "2024",
      description:
        "Brought on to formalize FM operations at a 35,000 sq. ft. luxury thermal wellness facility - three levels (two underground) within a 27-story residential tower, serving 150-350 daily guests. Built the facility's first preventive maintenance program across bitcoin mining heat recovery, BMS-controlled climate systems, and thermal pools.",
      highlights: [
        "Structured a **6-person technical team** (3 facilities, 3 pool) - defined roles, ownership areas, and shift accountability.",
        "**Reduced OPEX 18%** ($36K) in the first three months by bringing outsourced work in-house and shifting to distributor relationships.",
        "Built the facility's **first PM program** across interdependent thermal and aquatic systems - shifting operations from daily firefighting to scheduled maintenance.",
      ],
    },
    {
      company: "BALENCIAGA",
      note: "first FM hire, globally",
      link: "https://www.balenciaga.com/en-us",
      location: "New York, NY",
      badges: [
        "Luxury Retail",
        "54 Boutiques",
        "3 Direct Reports",
        "ServiceChannel",
        "$1.2M OPEX",
        "First FM Hire",
      ],
      title: "Facilities Manager, Americas",
      start: "2022",
      end: "2023",
      defaultOpen: true,
      description:
        "Inherited a fragmented FM operation and rebuilt it into a centralized, data-driven program across 54 locations in U.S. and Canada. First FM hire globally - grew from sole operator to leading the brand's first FM team.",
      highlights: [
        "Deployed ServiceChannel across **54 locations**, onboarded **65+ vendors**, and processed **1,600+ maintenance tasks** annually with standardized workflows.",
        "Built a **3-person FM team** - recruited from my SoulCycle network and 2 external consultants.",
        "Managed NYC headquarters operations for 80+ Balenciaga staff.",
        "Grew OPEX budget from $450K to **$1.2M**. Managed **$1M shared CapEx** budget.",
      ],
    },
    {
      company: "RIVIAN AUTOMOTIVE",
      note: "6 sites, 200K sq ft",
      link: "https://www.rivian.com",
      location: "New York, NY",
      badges: [
        "EV / Automotive",
        "6 Service Centers",
        "Hybrid (Travel 60%)",
        "Limble -> FEXA",
        "200K sq. ft.",
      ],
      title: "Commercial Facilities Operations, Specialist",
      start: "2021",
      end: "2022",
      description:
        "Hybrid site launcher and facilities manager during Rivian's rapid EV expansion - launched 6 East Coast service centers (~200,000 sq. ft. total), built steady-state playbooks, and served as ongoing FM point of contact post-launch. Traveled 50-60%.",
      highlights: [
        "Owned **full site lifecycle** - construction coordination, punchlist, opening-day vendor mobilization, then steady-state R&M.",
        "Ran biweekly NSO alignment calls with **50-80 cross-functional stakeholders**.",
        "Partnered with 2 Program Managers to standardize FM processes for **30 locations nationwide**. Core team on the CMMS migration from Limble to FEXA.",
      ],
    },
    {
      company: "FENDI",
      note: "built from zero",
      link: "https://www.fendi.com/us-en/",
      location: "New York, NY",
      badges: [
        "Hybrid",
        "Luxury Retail",
        "67 Boutiques",
        "ServiceChannel",
        "$5.3M Managed Spend",
        "4 Countries",
      ],
      title: "Facilities Manager, Americas",
      start: "2018",
      end: "2021",
      defaultOpen: true,
      description:
        "First FM hire in the Americas - built FENDI Americas' FM function from scratch across 67 locations in 4 countries. Grew R&M budget from $600K to $1M; total managed spend reached $5.3M as scope doubled within two years.",
      highlights: [
        "Absorbed **security ($3.2M)**, **cleaning ($800K)**, and **COVID-19 response ($230K)** into the FM function in 2020. Managed it all as sole FM - leveraging ServiceChannel automation to process **~1,100 work orders** that year.",
        "Managed NYC headquarters at 555 Madison (12,000 sq. ft., 90 staff) alongside the **100,000+ sq. ft.** retail portfolio.",
        'Peer-voted the inaugural "Above & Beyond" Award, recognized by the President of FENDI Americas, [Joanna M. Dubin](https://www.linkedin.com/in/joannadubin/), for crisis response during 2020.',
      ],
    },
    {
      company: "DOLCE & GABBANA",
      note: "sole FM, Americas",
      link: "https://www.dolcegabbana.com/en-us/",
      location: "New York, NY",
      badges: [
        "On-Site",
        "Luxury Retail",
        "48 Boutiques",
        "ServiceChannel",
        "Sole FM, Americas",
      ],
      title: "Facilities Manager, Americas",
      start: "2018",
      end: "2018",
      description:
        "First luxury retail FM role - finalized ServiceChannel rollout across U.S. network of 48 boutiques and established centralized regional maintenance model. Foundation for subsequent FENDI and Balenciaga approaches.",
      highlights: [
        "Audited and reconfigured ServiceChannel platform workflows. Transitioned from a collaborative FM team to sole facilities manager for the entire Americas region.",
      ],
    },
    {
      company: "SOULCYCLE",
      note: "16 studio launches",
      link: "https://www.soul-cycle.com",
      location: "San Francisco, CA",
      badges: [
        "Hybrid (Travel 60%)",
        "Boutique Fitness",
        "33 Studios",
        "1 Direct Report",
        "ServiceChannel",
        "16 Studio Launches",
        "$450K OPEX",
      ],
      title: "Area Facilities Manager",
      start: "2015",
      end: "2018",
      description:
        "Started overseeing NYC Metro studios; asked to relocate to San Francisco to stabilize West Coast operations and lead expansion into NorCal, Seattle, Vancouver, Chicago, and Texas. 33-studio portfolio across 6 markets. Traveled 60-70%.",
      highlights: [
        "Led FM handoff for **16 studio launches** and supervised 2 technicians directly. **$450K annual OPEX** portfolio.",
        "Delivered CapEx projects across the portfolio - **2-4 per location annually**, $5K-$50K per project.",
        'Coordinated Harvey Milk 40th anniversary "HOPE WILL NEVER BE SILENT" neon memorial at the Castro studio in collaboration with [SF Illuminate](https://illuminate.org/).',
      ],
    },
    {
      company: "J.CREW / MADEWELL",
      note: "sales floor to FM",
      link: "https://www.jcrew.com",
      location: "New York, NY",
      badges: [
        "High-End Retail",
        "~142 Stores",
        "ServiceChannel",
        "Travel 60%",
        "$180K/mo Peak Spend",
      ],
      title: "Facilities Coordinator",
      start: "2010",
      end: "2015",
      description:
        "Five years with the brand - from the sales floor in Broomfield, Colorado (2010) through Men's merchandising at NYC Flagship (2012) into facilities management, ultimately overseeing all repairs, maintenance and CapEx projects for the entire Madewell fleet and J.Crew's NYC Metro region.",
      highlights: [
        "Started with J.Crew West; expanded to the full Madewell fleet, then earned NYC Metro - flagship locations with up to **$180K monthly repair spend** vs. ~$30K at standard stores.",
        "Managed ServiceChannel workflows, in-store safety audits, and after-hours emergency response across **~142 stores**. Assisted with training 3 new Facilities Coordinators.",
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
