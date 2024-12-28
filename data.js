const portfolioData = {
  personal: {
    name: "Saisrinu Gampa",
    roles: ["Backend Developer"],
    email: "saisrinugampa135@gmail.com",
    // title: " Developer",
    social: {
      linkedin: "https://www.linkedin.com/in/saisrinu17/",
      github: "https://github.com/saisrinu135",
      instagram: "https://www.instagram.com/saisrinu__sunny/",
    },
  },
  experience: {
    current: {
      title: "Associate Software Developer",
      company: "Ahex Technologies, Hyderabad",
      duration: "Aug 2023 - Present",
      responsibilities: [
        "Developing robust backend services using FastAPI",
        "Building scalable APIs for educational platform",
        "Implementing AI-driven features for enhanced learning",
      ],
      technologies: ["Python", "Django", "FastAPI", "LangChain", "React", "AI"],
    },
  },
  projects: [
    {
      title: "MailMaster",
      description:
        "Bulk email automation system with personalized content delivery",
      features: [
        "Develper a fullstack web application for sending bulk emails.",
        "Impplemented file upload funcionality supporting CSV, XLSX formats.",
        "Integrated email template functionality allowing personalized emailing using SMTP.",
      ],
      technologies: ["Django", "JavaScript", "SMTP"],
      github: "https://github.com/saisrinu135/MailMaster",
    //   live: "https://mailmaster.herokuapp.com/",
    },
    {
      title: "AI Content Generator",
      description: "Dual-purpose generator leveraging OpenAI's powerful models",
      features: [
        "DALL·E integration for image generation",
        "GPT-3.5 powered text generation",
        "Intuitive Bootstrap interface",
      ],
      technologies: ["Django", "OpenAI", "Bootstrap", "API"],
      github: "https://github.com/saisrinu135/image-generator",
    },
    {
      title: "Lead Tracker Extension",
      description: "Chrome extension for efficient lead management",
      features: [
        "Used to save the leads.",
        "Used local storage to store the leads.",
        "Leveraged Chrome API for seamless integration",
      ],
      technologies: ["JavaScript", "Chrome API", "LocalStorage"],
      github: "https://github.com/saisrinu135/leads-tracker-extension",
    },
  ],
  education: [
    {
      degree: "B.Tech in Electrical and Electronics Engineering",
      institute: "Siddhartha Institute of Technology and Sciences, Hyderabad",
      year: "2020 - 2023",
    },
    {
      degree: "Diploma in Electrical and Electronics Engineering",
      institute: "Government Polytechnic College, Cherial, Siddipet",
      year: "2017 - 2020",
    },
  ],
  about: {
    description: [
      "I'm a Software Developer specializing in Python backend development and AI integration, currently building scalable educational technology solutions at Ahex Technologies.",
      "My work focuses on creating innovative solutions, from automated bulk email systems to AI-powered content generators.",
    ],
    skills: [
      "Python",
      "Django",
      "FastAPI",
      "REST APIs",
      "OpenAI",
      "LangChain",
      "JavaScript",
      "React",
      "Bootstrap",
    ],
  },
};
