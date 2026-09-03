// Contains constant data for using in website
// ! Don't remove anything from here if not sure

import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  meta,
  starbucks,
  tesla,
  shopify,
  threejs,
  project1,
  project2,
  project3,
  project4,
  project5,
  project6,
  user1,
  user2,
  user3,
  youtube,
  linkedin,
  twitter,
  github,
} from "../assets";

// Navbar Links
export const NAV_LINKS = [
  {
    id: "about",
    title: "About",
    link: null,
  },
  {
    id: "work",
    title: "Experience",
    link: null,
  },
  {
    id: "projects",
    title: "Projects",
    link: null,
  },
  {
    id: "contact",
    title: "Contact",
    link: null,
  },
  {
    id: "resume",
    title: "Resume CV",
    link: "/keerti_cv.pdf",
  },
] as const;

// Services
export const SERVICES = [
  {
    title: "AI / ML Developer",
    icon: creator,
  },
  {
    title: "Full Stack Web Developer",
    icon: web,
  },
  {
    title: "React & Next.js Specialist",
    icon: mobile,
  },
  {
    title: "Python & Backend Developer",
    icon: backend,
  },
] as const;

// Technologies
export const TECHNOLOGIES = [
  {
    name: "Python",
    icon: javascript, // using tech icon fallback
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "docker",
    icon: docker,
  },
] as const;

// Experiences
export const EXPERIENCES = [
  {
    title: "AI / Machine Learning Intern",
    company_name: "Edubot Private Limited",
    icon: starbucks,
    iconBg: "#383E56",
    date: "2025",
    points: [
      "Developed a Flask-based web application that predicts whether a patient will show up or miss a scheduled appointment using a trained XGBoost ML model.",
      "Evaluated model performance using Accuracy and F1-score to ensure high precision in predictions.",
      "Engineered a secure Flask web application with user authentication, real-time predictions, appointment history tracking, and automated email notifications.",
    ],
  },
  {
    title: "Business Development Intern",
    company_name: "ACIC BMU (Mera Business Initiative)",
    icon: tesla,
    iconBg: "#E6DEDD",
    date: "2024",
    points: [
      "Worked as a Business Development Intern for Mera Business Initiative at ACIC BMU.",
      "Implemented core application features and backend APIs adhering to industry coding standards.",
      "Collaborated with cross-functional teams to streamline business processes and digital initiatives.",
    ],
  },
  {
    title: "B.Tech in Computer Science Engineering",
    company_name: "BML Munjal University",
    icon: meta,
    iconBg: "#383E56",
    date: "2023 - 2027",
    points: [
      "Pursuing B.Tech in CSE with CGPA 6.75/10.0.",
      "Core Coursework: Data Structures & Algorithms, Object-Oriented Programming, REST APIs, System Design Basics, Machine Learning, NLP.",
      "Key Achievements: Smart India Hackathon 2024 Participant, Women Who Master Hackathon 2026 Participant, Selected for IDE Bootcamp at NIT Surathkal, 5 Coursera AI/ML Certifications.",
    ],
  },
] as const;

// Achievements & Recognition
export const TESTIMONIALS = [
  {
    testimonial:
      "Participant in Smart India Hackathon 2024 — Tackled real-world domain challenges with innovative AI & web solutions.",
    name: "Smart India Hackathon",
    designation: "Participant",
    company: "SIH 2024",
    image: user1,
  },
  {
    testimonial:
      "Selected for the intensive IDE Bootcamp held at NIT Surathkal to build and scale tech innovations.",
    name: "IDE Bootcamp",
    designation: "Selected Delegate",
    company: "NIT Surathkal",
    image: user2,
  },
  {
    testimonial:
      "Participant in Women Who Master Hackathon 2026 & completed 5 Coursera Certifications in AI/ML & Data Science.",
    name: "Women Who Master 2026",
    designation: "Hackathon Finalist",
    company: "Coursera AI/ML Certified",
    image: user3,
  },
] as const;

// Projects
export const PROJECTS = [
  {
    name: "HireFlow AI (HirePro)",
    description:
      "Engineered an end-to-end AI career platform automating ATS resume evaluation, target job description keyword matching, and tailored cover letter generation. Features an interactive mock interview suite with real-time voice speech-to-text dictation, live filler-word analysis, adaptive recruiter simulation, and client-side PDF analytics report export.",
    tags: [
      {
        name: "nextjs16",
        color: "blue-text-gradient",
      },
      {
        name: "react19",
        color: "green-text-gradient",
      },
      {
        name: "typescript",
        color: "pink-text-gradient",
      },
      {
        name: "gemini-2.5-api",
        color: "blue-text-gradient",
      },
    ],
    image: project1,
    source_code_link: "https://github.com/Keerti121",
    live_site_link: "https://hirepro-ai.vercel.app/dashboard",
  },
  {
    name: "EcoLife360",
    description:
      "Built an AI-powered sustainability dashboard integrating 5+ sustainability metrics including carbon footprint, energy, water, waste, and transportation tracking. Developed an NLP-based transport planner supporting multiple transportation modes using Google Maps API to compare routes, estimate CO2 emissions, and recommend eco-friendly alternatives.",
    tags: [
      {
        name: "reactjs",
        color: "blue-text-gradient",
      },
      {
        name: "nodejs",
        color: "green-text-gradient",
      },
      {
        name: "gemini-api",
        color: "pink-text-gradient",
      },
      {
        name: "google-maps",
        color: "blue-text-gradient",
      },
    ],
    image: project2,
    source_code_link: "https://github.com/Keerti121",
    live_site_link: "https://github.com/Keerti121",
  },
  {
    name: "HealthPredict Flask App",
    description:
      "Developed an ML-based patient no-show prediction system using XGBoost evaluated with Accuracy and F1-score. Built a secure Flask web application featuring authentication, real-time predictions, history tracking, and automated email notifications.",
    tags: [
      {
        name: "python",
        color: "blue-text-gradient",
      },
      {
        name: "flask",
        color: "green-text-gradient",
      },
      {
        name: "xgboost",
        color: "pink-text-gradient",
      },
      {
        name: "sqlite",
        color: "blue-text-gradient",
      },
    ],
    image: project3,
    source_code_link: "https://github.com/Keerti121",
    live_site_link: "https://github.com/Keerti121",
  },
] as const;

export const SOCIALS = [
  {
    name: "Email",
    icon: youtube, // SVG icon fallback
    link: "mailto:keerti.yadav.23cse@bmu.edu.in",
  },
  {
    name: "Linkedin",
    icon: linkedin,
    link: "https://www.linkedin.com/in/Keerti-Yadav",
  },
  {
    name: "GitHub",
    icon: github,
    link: "https://github.com/Keerti121",
  },
] as const;
