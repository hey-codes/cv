import type { ResumeData } from "@/lib/types";

export const RESUME_DATA: ResumeData = {
  name: "Cody Mitchell",
  initials: "CM",
  location: "Chicagoland, IL → Open to Relocation",
  locationLink: "https://www.google.com/maps/place/Chicago",
  about: "Facilities, Operations & New Site Launches",
  summary:
    "9 brands, 400+ locations, 3M+ sq\u00a0ft managed, from luxury maisons and flexible coworking to launching Rivian’s East Coast service centers. Solo and with incredible teams.",
  personalWebsiteUrl: "https://codymitch.works",
  contact: {
    social: [
      {
        name: "GitHub",
        url: "https://github.com/hey-codes",
        icon: "github",
      },
      {
        name: "Instagram",
        url: "https://www.instagram.com/codestergram/",
        icon: "instagram",
        handle: "@codestergram",
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
        "Bachelor’s Degree in Environmental Design (ENVD); School of Architecture and Planning",
      start: "2008",
      end: "2012",
    },
  ],
  careerHighlights: [
    "**2× first FM hire**: built the FM programs at FENDI Americas and Balenciaga from scratch, reaching **$5.3M** in yearly managed spend at FENDI and a **$1.2M** OPEX budget at Balenciaga.",
    "**400+ locations, 9 brands, 13 years** across luxury retail, boutique fitness, EV service centers, wellness, and flex office, from J.Crew’s sales floor to FM programs for global luxury houses.",
    "**3 net-new CMMS implementations**: ServiceChannel at FENDI and Balenciaga, FEXA at Rivian. Inherited, finished, or expanded platforms at 4 more brands, hands-on across **4 systems**.",
    "**A permanent piece of the Castro**: coordinated vendors and contacts for the Harvey Milk 40th anniversary “HOPE WILL NEVER BE SILENT” neon memorial at SoulCycle Castro with [SF Illuminate](https://illuminate.org/), now part of Harvey Milk Plaza.",
  ],
  work: [
    {
      company: "Industrious",
      link: "https://www.industriousoffice.com/",
      location: "Remote (Chicago)",
      badges: ["Flex Office", "1.3M+ sq ft", "FEXA", "Parental Leave Cover"],
      title: "Facilities Consultant, West Coast Portfolio",
      start: "Apr 2026",
      end: "Aug 2026",
      defaultOpen: true,
      description:
        "Owned repair and maintenance for 48 flex-office locations across 5 West Coast districts, covering an FM’s parental leave. Interviewed on a Tuesday afternoon, started the next morning; the contract was extended past its end date.",
      highlights: [
        "Oversaw **1,500+ work orders** on FEXA, with **120 to 190** repair and member bill-back tickets open at any given time.",
      ],
    },
    {
      company: "Bathhouse",
      link: "https://www.abathhouse.com/",
      location: "New York, NY",
      badges: ["Thermal Wellness", "35K sq ft", "MaintainX", "-18% OPEX"],
      title: "Facilities & Operations Manager",
      start: "Jul 2024",
      end: "Nov 2024",
      defaultOpen: true,
      description:
        "Ran facilities and operations for a 35,000 sq\u00a0ft co-ed thermal spa serving 150 to 350 guests a day, where on-site bitcoin miners heat the 2 hottest pools. Led a 6-person technical team and began rolling out the facility’s first preventive maintenance program in MaintainX.",
      highlights: [
        "**Cut OPEX 18%** ($36K) in the first 3 months by moving outsourced work in-house and switching to new parts and materials distributors.",
      ],
    },
    {
      company: "Balenciaga",
      link: "https://www.balenciaga.com/en-us",
      location: "New York, NY",
      badges: [
        "Luxury Retail",
        "200K+ sq ft",
        "ServiceChannel",
        "$1.2M OPEX",
      ],
      title: "Facilities Manager, Americas",
      start: "Aug 2022",
      end: "Dec 2023",
      defaultOpen: true,
      description:
        "Balenciaga’s first FM hire globally, brought on to build the FM program for 54 locations in the U.S. and Canada. Built and led a 3-person FM team on an OPEX budget that grew from $450K to $1.2M, plus a $1M shared CapEx budget.",
      highlights: [
        "Set up ServiceChannel, which had been signed but never configured, and put all **54 stores** on one system with **65+ vendors** onboarded.",
      ],
    },
    {
      company: "Rivian Automotive",
      link: "https://www.rivian.com",
      location: "New York, NY",
      badges: [
        "EV / Automotive",
        "260K+ sq ft",
        "Limble → FEXA",
        "Hybrid (Travel 60%)",
      ],
      title: "Commercial Facilities Operations Specialist",
      start: "Apr 2021",
      end: "Jul 2022",
      defaultOpen: true,
      description:
        "Site launch and day-to-day facilities management during Rivian’s East Coast expansion: ran facilities readiness for 6 service center openings, then stayed on as the FM point of contact.",
      highlights: [
        "Directed biweekly new site opening (NSO) calls for **40 to 80 people** across 8 teams; core team on the Limble to FEXA migration.",
      ],
    },
    {
      company: "FENDI",
      link: "https://www.fendi.com/us-en/",
      location: "New York, NY",
      badges: [
        "Luxury Retail",
        "220K+ sq ft",
        "ServiceChannel",
        "$5.3M Managed Spend",
      ],
      title: "Facilities Manager, Americas",
      start: "Dec 2018",
      end: "Apr 2021",
      defaultOpen: true,
      description:
        "First FM hire for the Americas: built FENDI’s FM function from scratch across 67 locations in 4 countries and took ServiceChannel live in 4.5 weeks against a 12-week standard.",
      highlights: [
        "Doubled FM scope as sole FM, taking on security and cleaning in 2020 with no added headcount, for **$5.3M** in yearly managed spend. Won the inaugural peer-voted “Above & Beyond” Award.",
      ],
    },
    {
      company: "Dolce & Gabbana",
      link: "https://www.dolcegabbana.com/en-us/",
      location: "New York, NY",
      badges: ["Luxury Retail", "190K+ sq ft", "ServiceChannel"],
      title: "Facilities Manager, Americas",
      start: "Jul 2018",
      end: "Dec 2018",
      defaultOpen: true,
      description:
        "Sole FM for 48 boutiques across the U.S. and Canada: finished an inherited ServiceChannel rollout to full adoption. Recruited away by FENDI.",
    },
    {
      company: "SoulCycle",
      link: "https://www.soul-cycle.com",
      location: "San Francisco, CA",
      badges: [
        "Boutique Fitness",
        "130K+ sq ft",
        "ServiceChannel",
        "Hybrid (Travel 60%)",
      ],
      title: "Area Facilities Manager",
      start: "Apr 2015",
      end: "Jun 2018",
      defaultOpen: true,
      description:
        "Area Facilities Manager for a 33-studio portfolio across 6 markets: started with NYC Metro, then moved to San Francisco in 2016 to help restore the West Coast studios to brand standards.",
      highlights: [
        "Supported **16 studio launches** and ran **2 to 4 CapEx projects** per studio a year at $5K to $50K each.",
      ],
    },
    {
      company: "J.Crew / Madewell",
      link: "https://www.jcrew.com",
      location: "New York, NY",
      badges: ["High-End Retail", "700K+ sq ft", "ServiceChannel"],
      title: "Facilities Coordinator",
      start: "May 2010",
      end: "Apr 2015",
      defaultOpen: true,
      description:
        "Came up from the sales floor (2010) and men’s merchandising at the NYC flagship into facilities in 2013, covering 140+ stores at peak, including the entire Madewell fleet and J.Crew’s NYC Metro region.",
      highlights: [
        "Supported **50+ openings** and trained 3 new Facilities Coordinators.",
      ],
    },
  ],
  skills: [
    {
      category: "Operations & Program Management",
      items: [
        "New Site Openings (NSO)",
        "Multi-Site Portfolio Management",
        "Preventive Maintenance Programs",
        "Site Audits & Brand Standards",
        "SOP Development",
        "Landlord Relations",
      ],
    },
    {
      category: "Systems & Platforms",
      items: [
        "ServiceChannel",
        "FEXA",
        "MaintainX",
      ],
    },
    {
      category: "Technical Systems",
      items: [
        "MEP Systems",
        "Building Automation/BMS",
      ],
    },
    {
      category: "Finance & Vendor Management",
      items: [
        "CapEx/OPEX Planning",
        "R&M Forecasting",
        "RFP Development",
      ],
    },
    {
      category: "AI & Automation",
      items: [
        "Claude AI (Code, Cowork)",
        "Workflow Automation",
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
