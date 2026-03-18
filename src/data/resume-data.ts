import type { ResumeData } from "@/lib/types";

export const RESUME_DATA: ResumeData = {
  name: "Cody Mitchell",
  initials: "CM",
  location: "Chicagoland, IL, CST",
  locationLink: "https://www.google.com/maps/place/Chicago",
  about:
    "Facilities & operations professional building FM programs from the ground up.",
  summary:
    "Facilities and operations professional with 12+ years across 350+ locations - luxury retail, EV/automotive, boutique fitness, and wellness facilities. Recently relocated to the Chicago area to be closer to family.",
  avatarUrl:
    "https://ui-avatars.com/api/?name=CM&size=256&background=0D8ABC&color=fff",
  personalWebsiteUrl: "https://codymitch.works",
  contact: {
    // email: "cody.mitchell@gmail.com",
    // tel: "+720-384-3964",
    social: [
      {
        name: "GitHub",
        url: "https://github.com/heycodes",
        icon: "github",
      },
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/hey-cody/",
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
    "First FM hire at both FENDI and Balenciaga - created both Americas programs from scratch, growing to $5.3M and $1.2M in total managed spend respectively.",
    "350+ locations and 12+ years across luxury retail, EV/automotive, boutique fitness, and wellness - from J.Crew's sales floor to building programs for global luxury houses.",
    "6 CMMS implementations across every employer - ServiceChannel, FEXA, and MaintainX. Each time converting unstructured maintenance into data-driven FM operations.",
    'Coordinated Harvey Milk 40th anniversary "HOPE WILL NEVER BE SILENT" neon memorial at SoulCycle Castro - a streetscape installation in collaboration with [SF Illuminate](https://illuminate.org/). Now a permanent part of Harvey Milk Plaza and the Castro community.',
  ],
  work: [
    {
      company: "BATHHOUSE",
      link: "https://www.abathhouse.com/",
      location: "Denver, CO",
      badges: [
        "Thermal Wellness",
        "35,000 sq. ft.",
        "On-Site",
        "6 Direct Reports",
        "MaintainX",
      ],
      title: "Facilities Operations Manager",
      start: "2024",
      end: "2024",
      description:
        "Brought on to formalize FM operations at a 35,000 sq. ft. luxury thermal wellness facility - three levels (two underground) within a 27-story residential tower, serving 200+ daily guests. Built the facility's first preventive maintenance program across bitcoin mining heat recovery, BMS-controlled climate systems, and thermal pools.",
      highlights: [
        "Structured a 6-person technical team (3 facilities, 3 pool) - defined roles, ownership areas, and shift accountability.",
        "Reduced OPEX 18% ($36K annualized) by renegotiating vendor contracts, bringing outsourced work in-house, and shifting to distributor relationships.",
        "Built the facility's first PM program across interdependent thermal and aquatic systems - shifting operations from daily firefighting to scheduled maintenance.",
      ],
    },
    {
      company: "BALENCIAGA",
      link: "https://www.balenciaga.com/en-us",
      location: "New York, NY",
      badges: [
        "Luxury Retail",
        "54 Boutiques",
        "3 Direct Reports",
        "ServiceChannel",
      ],
      title: "Facilities Manager, Americas",
      start: "2022",
      end: "2023",
      description:
        "Inherited a fragmented FM operation and rebuilt it into a centralized, data-driven program across 54 locations in U.S. and Canada. First FM hire globally - grew from sole operator to leading the brand's first FM team.",
      highlights: [
        "Deployed ServiceChannel across 54 locations, onboarded 65+ vendors, and processed 1,600+ maintenance tasks annually with standardized workflows.",
        "Built a 3-person FM team - recruited from my SoulCycle network and 2 external consultants.",
        "Managed NYC headquarters operations for 120+ Balenciaga and Kering staff.",
        "Grew OPEX budget from $450K to $1.2M. Managed $1M shared CapEx budget.",
      ],
    },
    {
      company: "RIVIAN AUTOMOTIVE",
      link: "https://www.rivian.com",
      location: "New York, NY",
      badges: [
        "EV / Automotive",
        "6 Service Centers",
        "Hybrid (Travel 60%)",
        "Limble -> FEXA",
      ],
      title: "Commercial Facilities Operations, Specialist",
      start: "2021",
      end: "2022",
      description:
        "Hybrid site launcher and facilities manager during Rivian's rapid EV expansion - launched 6 East Coast service centers (~270,000 sq. ft. total), built steady-state playbooks, and served as ongoing FM point of contact post-launch. Traveled 50-60%.",
      highlights: [
        "Owned full site lifecycle - construction coordination, punchlist, opening-day vendor mobilization, then steady-state R&M.",
        "Ran biweekly NSO alignment calls with 50-80 cross-functional stakeholders.",
        "Partnered with 2 Program Managers to standardize FM processes for 30 locations nationwide. Led CMMS migration from Limble to FEXA.",
      ],
    },
    {
      company: "FENDI",
      link: "https://www.fendi.com/us-en/",
      location: "New York, NY",
      badges: ["Hybrid", "Luxury Retail", "67 Boutiques", "ServiceChannel"],
      title: "Facilities Manager, Americas",
      start: "2018",
      end: "2021",
      description:
        "First global FM Hire - built FENDI Americas' FM function from scratch across 67 locations in 4 countries. Grew R&M budget from $600K to $1M; total managed spend reached $5.3M as scope doubled within two years.",
      highlights: [
        "Absorbed security ($3.2M), cleaning ($800K), and COVID-19 response ($230K) into the FM function in 2020. Managed it all as sole FM - leveraging ServiceChannel automation to scale from ~650 to ~1,100 work orders year-over-year.",
        "Managed NYC headquarters at 555 Madison (12,000 sq. ft., 90 staff) alongside the 100,000+ sq. ft. retail portfolio.",
        'Peer-nominated for the "Above & Beyond" Award by the President of FENDI Americas, [Joanna M. Dubin](https://www.linkedin.com/in/joannadubin/), for crisis response during 2020.',
      ],
    },
    {
      company: "DOLCE & GABBANA",
      link: "https://www.dolcegabbana.com/en-us/",
      location: "New York, NY",
      badges: ["On-Site", "Luxury Retail", "48 Boutiques", "ServiceChannel"],
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
      link: "https://www.soul-cycle.com",
      location: "San Francisco, CA",
      badges: [
        "Hybrid (Travel 60%)",
        "Boutique Fitness",
        "33 Studios",
        "1 Direct Reports",
        "ServiceChannel",
      ],
      title: "Area Facilities Manager",
      start: "2015",
      end: "2018",
      description:
        "Started overseeing NYC Metro studios; asked to relocate to San Francisco to stabilize West Coast operations and lead expansion into NorCal, Seattle, Vancouver, Chicago, and Texas. 33-studio portfolio across 6 markets. Traveled 50-60%.",
      highlights: [
        "Led FM handoff for 16 studio launches and supervised 2 technicians directly. $450K annual OPEX portfolio.",
        "Delivered CapEx projects across the portfolio - 2-4 per location annually, $5K-$50K per project.",
        'Coordinated Harvey Milk 40th anniversary "HOPE WILL NEVER BE SILENT" neon memorial at the Castro studio in collaboration with [SF Illuminate](https://illuminate.org/).',
      ],
    },
    {
      company: "J.CREW / MADEWELL",
      link: "https://www.jcrew.com",
      location: "New York, NY",
      badges: ["High-End Retail", "148 Stores", "ServiceChannel", "Travel 60%"],
      title: "Facilities Coordinator",
      start: "2010",
      end: "2015",
      description:
        "Five years with the brand - from the sales floor in Broomfield, Colorado (2010) through Men's merchandising at NYC Flagship (2012) into facilities management, ultimately overseeing all repairs, maintenance and CapEx projects for the entire Madewell fleet and J.Crew's NYC Metro region.",
      highlights: [
        "Started with J.Crew West; expanded to the full Madewell fleet, then earned NYC Metro - flagship locations with up to $180K monthly repair spend vs. ~$30K at standard stores.",
        "Managed ServiceChannel workflows, in-store safety audits, and after-hours emergency response across 150+ stores. Trained 3 new coordinators.",
      ],
    },
  ],
  skills: [
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
        "Google Workspace",
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
        "Aquatic/Pool Systems",
        "EV Charging Infrastructure",
        "MEP Systems",
      ],
    },
    {
      category: "Operations & Program Management",
      items: [
        "Multi-Site Portfolio Management",
        "Preventive Maintenance Programs",
        "New Site Openings (NSO)",
        "End-to-End Project Delivery",
        "Process Standardization",
        "Cross-Functional Collaboration",
        "Landlord Relations",
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
