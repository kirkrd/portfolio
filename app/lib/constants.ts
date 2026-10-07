export type JobItem = {
  readonly company: string;
  readonly monthYear: string;
  readonly jobTitle: string;
  readonly jobDescription: string;
  readonly consultantCompany?: string;
};

export type ChapterVisual = "documents" | "devices" | "configurator" | "system";

export type Chapter = {
  readonly id: string;
  readonly year: number;
  readonly period: string;
  readonly title: string;
  readonly kicker: string;
  readonly story: string;
  readonly visual: ChapterVisual;
  readonly roles: JobItem[];
};

export const chapters: Chapter[] = [
  {
    id: "sharepoint-years",
    year: 2018,
    period: "2018 — 2021",
    title: "The SharePoint years",
    kicker: "Where it started",
    story:
      "I started out at DQC, a Microsoft-focused consultancy. Five client assignments in under a year — from third-line support at AFRY to an auditing tool built with a large international team at KPMG.",
    visual: "documents",
    roles: [
      {
        company: "KPMG",
        jobTitle: "Fullstack Developer",
        jobDescription:
          "Contributed to developing an auditing tool as part of a large international team.",
        monthYear: "August 2019",
        consultantCompany: "DQC",
      },
      {
        company: "Polestar",
        jobTitle: "Frontend Developer",
        jobDescription:
          "Developed a SharePoint Online web part for managing project timelines.",
        monthYear: "June 2019",
        consultantCompany: "DQC",
      },
      {
        company: "HSB",
        jobTitle: "Frontend Developer",
        jobDescription:
          "Collaborated on a team to build a document management system using SPFx Web Parts and SharePoint Online.",
        monthYear: "April 2019",
        consultantCompany: "DQC",
      },
      {
        company: "Tele2",
        jobTitle: "Frontend Developer",
        jobDescription:
          "Assisted in migrating O365 tenants between two companies, creating solutions and user tools for self-migration.",
        monthYear: "February 2019",
        consultantCompany: "DQC",
      },
      {
        company: "AFRY",
        jobTitle: "Third-Line Support",
        jobDescription:
          "Provided support for SharePoint on-prem, including file access and other issues.",
        monthYear: "October 2018",
        consultantCompany: "DQC",
      },
      {
        company: "DQC",
        jobTitle: "SharePoint Consultant",
        jobDescription:
          "Worked as a SharePoint Consultant at a Microsoft-focused company of small to medium size.",
        monthYear: "October 2018",
        consultantCompany: "Employed directly",
      },
    ],
  },
  {
    id: "apps-and-startups",
    year: 2021,
    period: "2021 — 2023",
    title: "Apps & startups",
    kicker: "Going wider",
    story:
      "At Qrew I moved into apps and startups — and built web and mobile fleet management systems for Volvofinans Bank, used by medium to large companies and their drivers.",
    visual: "devices",
    roles: [
      {
        company: "Volvofinans Bank",
        jobTitle: "Frontend Developer",
        jobDescription:
          "Developed web and mobile car fleet management systems for medium to large companies and their users.",
        monthYear: "December 2021",
        consultantCompany: "Qrew",
      },
      {
        company: "Qrew",
        jobTitle: "IT Consultant",
        jobDescription:
          "Served as an IT consultant focusing on apps and startups.",
        monthYear: "December 2021",
        consultantCompany: "Employed directly",
      },
    ],
  },
  {
    id: "polestar",
    year: 2023,
    period: "2023 — 2026",
    title: "Back at Polestar",
    kicker: "This time in-house",
    story:
      "Four years after a SharePoint assignment there, I returned to Polestar as an employee — first building showroom screens for Polestar Spaces and event systems, then the car configurator on polestar.com.",
    visual: "configurator",
    roles: [
      {
        company: "Polestar",
        jobTitle: "Software Engineer",
        jobDescription: "Developing the car configurator on polestar.com",
        monthYear: "September 2024",
        consultantCompany: "Employed directly",
      },
      {
        company: "Polestar",
        jobTitle: "Software Engineer",
        jobDescription:
          "Developing customer-facing solutions for screens in Polestar showrooms (Spaces) and managing Polestar event systems.",
        monthYear: "September 2023",
        consultantCompany: "Employed directly",
      },
    ],
  },
  {
    id: "architect",
    year: 2026,
    period: "2026 — now",
    title: "The architect",
    kicker: "AI-native, today",
    story:
      "Now at Consid, one of the Nordic region's leading tech consultancies — shaping architecture and leading delivery. AI is at the core of how I build: I've mastered tools like Claude and Codex and use them to the fullest, and I keep up with the latest in agentic coding and how to optimise it.",
    visual: "system",
    roles: [
      {
        company: "Consid AB",
        jobTitle: "Senior Software Engineer / Solution Architect",
        jobDescription:
          "Designing and delivering digital solutions for clients across the Nordics — from solution architecture and system design to hands-on development.",
        monthYear: "June 2026",
        consultantCompany: "Employed directly",
      },
    ],
  },
];

export const jobItems: JobItem[] = chapters.flatMap((chapter) => chapter.roles);

export type StackLayer = {
  readonly name: string;
  readonly caption: string;
  readonly items: string[];
};

/** Ordered top → bottom, like a stack diagram. */
export const stackLayers: StackLayer[] = [
  {
    name: "AI & agentic coding",
    caption: "How I build today",
    items: [
      "Claude",
      "Codex",
      "Agentic workflows",
      "Qwen · local",
      "Llama · local",
    ],
  },
  {
    name: "Architecture",
    caption: "How the pieces fit",
    items: [
      "Microservices",
      "Event Driven",
      "Vertical Slice",
      "Serverless",
      "Mono repositories",
    ],
  },
  {
    name: "Languages",
    caption: "What I work in",
    items: ["TypeScript", "JavaScript", "C#", "Python"],
  },
  {
    name: "Frameworks",
    caption: "What I build with",
    items: [".NET Core", "Entity Framework", "React", "Node.js"],
  },
  {
    name: "Tools",
    caption: "What keeps it running",
    items: [
      "Git",
      "Linux",
      "Ubuntu on WSL",
      "Cosmos DB",
      "DynamoDB",
      "Azure DevOps",
      "Splunk",
      "Datadog",
    ],
  },
  {
    name: "Cloud / Infrastructure",
    caption: "Where it lives",
    items: [
      "AWS",
      "Azure",
      "GitHub",
      "Terraform",
      "Docker",
      "OpenShift",
      "ArgoCD",
    ],
  },
];

export const CAREER_START = new Date(2018, 9, 1);

export const links = {
  linkedin: "https://www.linkedin.com/in/kristoffer-kirkerud/",
  github: "https://github.com/kirkrd",
  consid: "https://www.consid.com/",
} as const;
