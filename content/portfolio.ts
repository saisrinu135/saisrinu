/**
 * Single source of truth for every piece of content on the site.
 * Rebuilt from Gampa_Saisrinu_Resume.pdf (2026-07-14).
 *
 * ponytail: `as const` + derived types instead of hand-written interfaces —
 * one literal with one consumer each doesn't need six interfaces to drift.
 */
export const portfolio = {
  personal: {
    name: "Saisrinu Gampa",
    tagline: "Python Developer · AI & Backend Engineering",
    // Drives the hero rotator.
    roles: ["Python Developer", "Backend Engineer", "AI Engineer"],
    location: "Hyderabad, India",
    email: "saisrinugampa135@gmail.com",
    resumeUrl: "/resume.pdf",
    // Not rendered anywhere today — kept so it's one line away if wanted.
    phone: "+91 7981492200",
    languages: ["Telugu (Native)", "English (Professional)"],
    social: {
      linkedin: "https://www.linkedin.com/in/saisrinu17/",
      github: "https://github.com/saisrinu135",
      instagram: "https://www.instagram.com/saisrinu__sunny/",
    },
  },

  about: [
    "Python backend developer with 2 years of experience building AI-powered APIs, automation pipelines, and cloud-integrated systems for edtech and e-commerce platforms. Proficient in FastAPI, Django, PostgreSQL, the OpenAI API, and LangChain.",
    "I've delivered end-to-end backend features including AI-driven assessment engines, conversational support agents, analytics dashboards, and a multi-provider cloud file manager — translating AI capabilities into scalable, maintainable systems.",
  ],

  skills: [
    { group: "Languages", items: ["Python", "SQL"] },
    { group: "Frameworks", items: ["FastAPI", "Django", "REST API Design"] },
    {
      group: "Databases",
      items: ["PostgreSQL", "Schema Design", "Vector Databases"],
    },
    { group: "AI / ML", items: ["LangChain", "LangGraph", "AI Agents", "RAG"] },
    {
      group: "Auth & Security",
      items: ["OAuth 2.0", "JWT", "Secure API Design"],
    },
    {
      group: "Tools & Workflow",
      items: ["Git", "GitHub", "Postman", "n8n", "Docker"],
    },
    {
      group: "Concepts",
      items: [
        "Scalable API Architecture",
        "Async Programming",
        "CI/CD",
        "System Design",
      ],
    },
  ],

  experience: [
    {
      // Designation on paper; the work itself is backend engineering.
      title: "Associate Software Engineer",
      workingTitle: "Backend Developer",
      company: "Ahex Technologies",
      location: "Hyderabad",
      duration: "Aug 2024 — Present",
      responsibilities: [
        "Engineered and deployed production-grade REST APIs and PostgreSQL schemas for an AI-powered edtech platform (iBloom), supporting assessment delivery, performance analytics, and multi-role user management.",
        "Built AI-driven features using the OpenAI API and LangChain — including an automated question and audio generation engine, and conversational support agents for e-commerce clients.",
        "Delivered analytics dashboards and marketplace modules enabling teachers, parents, and students to track progress and schedule sessions within the platform.",
        "Implemented OAuth 2.0 authentication, ensuring secure and seamless user onboarding.",
        "Conducted content audits on AI-generated question content.",
      ],
      technologies: [
        "Python",
        "FastAPI",
        "Django",
        "PostgreSQL",
        "OpenAI",
        "LangChain",
        "OAuth 2.0",
        "Docker",
      ],
    },
  ],

  awards: [
    {
      title: "Bright Beginner Award",
      issuer: "Ahex Technologies",
      note: "Recognised for rapid technical onboarding and early feature delivery.",
    },
    {
      title: "Outstanding Performance Award",
      issuer: "iBloom Project",
      note: "Acknowledged for delivering complex AI integrations to production.",
    },
  ],

  projects: [
    {
      title: "iBloom",
      subtitle: "AI-Powered Learning Platform",
      description:
        "Designed and built the complete backend infrastructure for an AI-powered edtech platform — covering API development, database modelling, authentication, AI content generation, and analytics.",
      metric: "API performance improved 40%",
      features: [
        "Implemented an OpenAI-based question generation engine that automates assessment creation across multiple subjects, producing text questions and audio files for diverse learning formats.",
        "Delivered a multi-role system (students, teachers, parents) with role-based access control and performance tracking dashboards.",
        "Built a marketplace module for scheduling tutoring sessions.",
      ],
      technologies: [
        "FastAPI",
        "PostgreSQL",
        "OpenAI API",
        "OAuth 2.0",
        "Docker",
      ],
      live: "https://www.ibloom.io",
    },
    {
      title: "ELG Diamonds",
      subtitle: "AI Customer Support Agent",
      description:
        "Built a customer-facing AI support agent for a diamond e-commerce platform using LangChain, enabling natural-language diamond search and real-time quote creation.",
      features: [
        "Structured the agent's tool architecture and multi-step conversation flows to interpret customer requirements, filter inventory by cut, carat, clarity, and price, and return structured sales quotes.",
        "Integrated the agent with live product catalogue APIs, ensuring accurate, real-time inventory data was surfaced within every conversation.",
      ],
      technologies: ["Python", "LangChain", "FastAPI", "PostgreSQL"],
      live: "https://elgdiamonds.com/",
    },
    {
      title: "CloudVault",
      subtitle: "S3-Compatible Cloud File Manager",
      description:
        "A full-stack cloud file management application that lets users configure and connect multiple S3-compatible storage providers — AWS S3, Cloudflare R2, Backblaze B2, and MinIO — from a unified interface.",
      features: [
        "Enabled secure file operations: multi-service uploads, temporary shareable link generation with expiry, and on-demand downloads, with credentials isolated per storage provider.",
        "Engineered a provider-agnostic storage abstraction layer in Python, enabling seamless switching between cloud services without altering application logic.",
      ],
      technologies: [
        "Python",
        "FastAPI",
        "S3-Compatible APIs",
        "PostgreSQL",
        "Docker",
      ],
      live: "https://cloud.saisrinu.in",
    },
  ],

  education: [
    {
      degree: "B.Tech, Electrical and Electronics Engineering",
      institute: "Siddhartha Institute of Technology and Sciences",
      location: "Hyderabad",
      year: "2020 — 2023",
    },
    {
      degree: "Diploma, Electrical and Electronics Engineering",
      institute: "Government Polytechnic College",
      location: "Cherial, Siddipet",
      year: "2017 — 2020",
    },
  ],

  // One source for both the desktop nav and the mobile sheet.
  navLinks: [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#education", label: "Education" },
    { href: "#contact", label: "Contact" },
  ],
} as const;

export type Project = (typeof portfolio)["projects"][number];
export type Experience = (typeof portfolio)["experience"][number];
export type SkillGroup = (typeof portfolio)["skills"][number];
export type Award = (typeof portfolio)["awards"][number];
export type Education = (typeof portfolio)["education"][number];
export type NavLink = (typeof portfolio)["navLinks"][number];
