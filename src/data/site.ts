export type Service = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  includes: string[];
  price: number;
  priceLabel?: string;
  icon: string;
  featured?: boolean;
  image: string;
};

// Consistent Unsplash imagery — sharp, modern, diverse students & professionals.
const U = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?w=${w}&auto=format&fit=crop&q=85`;

export const images = {
  heroMain: "/images/hero-indian-professional.png",
  heroSecondary: "/images/hero-secondary-indian.png",
  celebrate: U("photo-1523240795612-9a054b0db644", 1600),
  workspace: U("photo-1600880292203-757bb62b4baf", 1400),
  team: U("photo-1522071820081-009f0129c71c", 1400),
  support: U("photo-1573496359142-b8d87734a5a2", 1000),
  interview: U("photo-1573496359142-b8d87734a5a2", 1200),
  step1: "/images/steps/step-1-pick-service.png",
  step2: "/images/steps/step-2-intake-call.png",
  step3: "/images/steps/step-3-build-refine.png",
  step4: "/images/steps/step-4-start-applying.png",
};

export const contactInfo = {
  emails: ["support@vyrapath.com", "hr@vyrapath.com"] as const,
  phones: ["+91 63019 87060", "+91 79974 74891"] as const,
  address: "Madhapur, Hyderabad",
};

export const services: Service[] = [
  {
    slug: "digital-resume",
    name: "Digital Resume Building",
    tagline: "A living resume recruiters can click through",
    description:
      "A modern, ATS-friendly resume with embedded live links to your intro video, certifications, portfolio and LinkedIn — the format hiring managers remember.",
    includes: [
      "ATS-optimized layout with parseable structure",
      "Embedded self-introduction video link",
      "Live certification & credential links",
      "Portfolio & LinkedIn integration",
      "2 rounds of revisions included",
    ],
    price: 80,
    icon: "FileCode2",
    featured: true,
    image: "/images/services/digital-resume.png",
  },
  {
    slug: "resume-building",
    name: "Normal Resume Building",
    tagline: "Classic, clean, recruiter-ready",
    description:
      "A polished traditional resume tailored to your role, keyword-optimized for ATS and designed to pass the 7-second recruiter scan.",
    includes: [
      "Custom-written role-specific content",
      "ATS-safe formatting",
      "Keyword optimization for your domain",
      "1 round of revisions included",
    ],
    price: 60,
    icon: "FileText",
    image: U("photo-1499750310107-5fef28a66643", 900),
  },
  {
    slug: "portfolio-building",
    name: "Portfolio Building",
    tagline: "A portfolio that showcases what you can actually do",
    description:
      "A responsive personal portfolio site to host your projects, case studies, resume and contact — the anchor of your online presence.",
    includes: [
      "Custom-designed responsive portfolio site",
      "Up to 6 project case studies",
      "Contact form & analytics setup",
      "Deployment guidance",
    ],
    price: 100,
    icon: "LayoutDashboard",
    image: U("photo-1467232004584-a241de8bcf5d", 900),
  },
  {
    slug: "it-certification",
    name: "IT Certification (3 Certificates)",
    tagline: "Credentials that make your resume stand out",
    description:
      "Guided path to earn 3 industry-recognized IT certifications relevant to your target role, with prep materials and mock tests.",
    includes: [
      "3 curated certifications for your domain",
      "Study roadmap & prep resources",
      "Mock tests & readiness checks",
      "Credential publishing guidance",
    ],
    price: 120,
    icon: "Award",
    image: "/images/services/it-certification.png",
  },
  {
    slug: "linkedin-optimization",
    name: "LinkedIn Optimization",
    tagline: "Show up in more recruiter searches",
    description:
      "Headline, About, Experience and Skills rewritten and keyword-optimized so recruiters find you and reach out first.",
    includes: [
      "Headline & About rewrite",
      "Experience & Skills optimization",
      "Banner & photo guidance",
      "Search visibility tips",
    ],
    price: 15,
    icon: "Linkedin",
    image: U("photo-1611944212129-29977ae1398c", 900),
  },
  {
    slug: "job-applications",
    name: "Applications for Job Roles",
    tagline: "Targeted applications, handled for you",
    description:
      "We identify matching roles, tailor your resume and cover letter for each application, submit on your behalf, and keep you updated with weekly progress reports.",
    includes: [
      "Role targeting aligned to your profile",
      "Tailored resume & cover letter per role",
      "Application submission on your behalf",
      "Weekly progress & response tracking",
    ],
    price: 150,
    icon: "Briefcase",
    image: U("photo-1454165804606-c3d57bc86b40", 900),
  },
  {
    slug: "resume-monthly-subscription",
    name: "Resume Monthly Subscription",
    tagline: "A fresh, role-tailored resume every day",
    description:
      "Paste a job description and receive a daily AI-tailored resume optimized for that role — keyword-matched, ATS-safe, and ready to send. Cancel anytime.",
    includes: [
      "Daily AI-tailored resume per job description",
      "Keyword matching against each JD",
      "ATS-safe formatting every time",
      "Priority email support",
      "Cancel anytime",
    ],
    price: 279,
    priceLabel: "Monthly",
    icon: "Sparkles",
    featured: true,
    image: "/images/services/resume-monthly-subscription.png",
  },
];

export type PricingRow = { name: string; price: number; note?: string };

export const alaCarte: PricingRow[] = [
  { name: "Digital Resume", price: 80 },
  { name: "Resume", price: 60 },
  { name: "Portfolio", price: 100 },
  { name: "IT Certification (3 Certificates)", price: 120 },
  { name: "LinkedIn Optimization", price: 15 },
  { name: "Resume Monthly Subscription", price: 279, note: "Monthly" },
  { name: "Applications for Job Roles (20+ Applications)", price: 150 },
  { name: "Applications for Job Roles (40+ Applications)", price: 280 },
  { name: "Job Board Access", price: 80 },
];

export type Plan = {
  name: string;
  price: number;
  tagline: string;
  features: string[];
  popular?: boolean;
};

export const plans: Plan[] = [
  {
    name: "Basic",
    price: 229,
    tagline: "Get resume-ready fast",
    features: [
      "Digital Resume Building",
      "LinkedIn Optimization",
      "Job Board Access",
      "1 revision round",
      "Email support",
    ],
  },
  {
    name: "Standard",
    price: 399,
    tagline: "Everything to start applying with confidence",
    popular: true,
    features: [
      "Everything in Basic",
      "Portfolio Building",
      "Applications for Job Roles (20+ applications)",
      "2 revision rounds",
      "Priority support",
    ],
  },
  {
    name: "Premium",
    price: 699,
    tagline: "The full hire-ready package",
    features: [
      "Everything in Standard",
      "IT Certification (3 Certificates)",
      "Applications for Job Roles (40+ Applications)",
      "Resume Monthly Subscription (1 month included)",
      "Unlimited revisions",
      "Dedicated career coach",
    ],
  },
];

export type OutcomeProof = {
  type: "offer_letter" | "interview_invite" | "recruiter_reply" | "shortlist";
  subject: string;
  preview: string;
  fromLabel: string;
  role: string;
  domain: string;
  rating: number;
  dateLabel: string;
};

export const outcomeProofs: OutcomeProof[] = [
  {
    type: "interview_invite",
    subject: "Interview invitation — Frontend Developer",
    preview: "We'd like to schedule a technical round for the Frontend Developer role. Please share your availability for this week.",
    fromLabel: "Talent · Aurora Tech",
    role: "Junior Frontend Developer",
    domain: "IT",
    rating: 5,
    dateLabel: "2 days ago",
  },
  {
    type: "recruiter_reply",
    subject: "Re: Your profile — Data Analyst openings",
    preview: "Your LinkedIn profile stood out. We have two Data Analyst openings that match your background. Are you open to a quick call?",
    fromLabel: "Recruiting · Meridian Analytics",
    role: "Data Analyst",
    domain: "Analytics",
    rating: 5,
    dateLabel: "4 days ago",
  },
  {
    type: "shortlist",
    subject: "Shortlisted — UX Designer portfolio review",
    preview: "Thank you for applying. Your portfolio impressed our design lead. We'd like to move you to the next stage of our hiring process.",
    fromLabel: "HR · Pixelcraft Studio",
    role: "UX Designer",
    domain: "Design",
    rating: 5,
    dateLabel: "1 week ago",
  },
  {
    type: "offer_letter",
    subject: "Offer letter — Cloud Engineer",
    preview: "We are pleased to extend an offer for the Cloud Engineer position. Please review the attached terms and let us know your decision.",
    fromLabel: "People Ops · Nimbus Systems",
    role: "Cloud Engineer",
    domain: "IT",
    rating: 5,
    dateLabel: "3 days ago",
  },
  {
    type: "interview_invite",
    subject: "Phone screen scheduled — Marketing Associate",
    preview: "Your application for the Digital Marketing Associate role has been reviewed. We'd like to schedule a 30-minute phone screen.",
    fromLabel: "Hiring · Brightlane Media",
    role: "Digital Marketing Associate",
    domain: "Marketing",
    rating: 4,
    dateLabel: "5 days ago",
  },
  {
    type: "recruiter_reply",
    subject: "Re: Backend Developer — resume follow-up",
    preview: "Your tailored resume landed well with our client. They'd like to discuss the Backend Developer opening with you next week.",
    fromLabel: "Staffing · CoreStack IT",
    role: "Backend Developer",
    domain: "IT",
    rating: 5,
    dateLabel: "6 days ago",
  },
  {
    type: "shortlist",
    subject: "Final round — Financial Analyst",
    preview: "Congratulations on passing the initial review. You've been shortlisted for the final interview round for the Financial Analyst role.",
    fromLabel: "Talent · Summit Finance",
    role: "Financial Analyst",
    domain: "Finance",
    rating: 5,
    dateLabel: "1 week ago",
  },
  {
    type: "interview_invite",
    subject: "ATS review passed — QA Engineer callback",
    preview: "Your resume scored well in our screening. We'd like to invite you for a QA Engineer interview. Please confirm your preferred time slot.",
    fromLabel: "Recruitment · Verity Labs",
    role: "QA Engineer",
    domain: "IT",
    rating: 4,
    dateLabel: "2 weeks ago",
  },
];

export type FAQ = { q: string; a: string };

export const contactFaqs: FAQ[] = [
  { q: "What's the typical turnaround?", a: "Most services are delivered in 3–5 business days. Digital resumes and portfolios take 5–7 days including one revision round." },
  { q: "Do you offer refunds?", a: "Yes — see our refund policy. If we haven't started work, you get a full refund. Partial refunds apply once drafts are shared." },
  { q: "How does the process work?", a: "You place an order, fill a short intake form, hop on a 20-minute call, and we deliver a draft. You review, we revise, we ship." },
  { q: "Do you guarantee interview calls?", a: "No credible service can guarantee outcomes. What we can promise is a resume, portfolio and profile that help you get significantly more interview calls, messages and mails." },
  { q: "Can I upgrade later?", a: "Absolutely. Anything you pay à la carte is credited if you upgrade to a subscription plan within 30 days." },
];

export const domains = ["IT", "Marketing", "Finance", "Design", "Data & Analytics", "Product", "Operations", "Other"];

export const stats = [
  { value: "500+", label: "Interview Schedules" },
  { value: "1,000+", label: "Resumes Delivered" },
  { value: "4.9/5", label: "Average Rating" },
  { value: "24hr", label: "Response Guarantee" },
];
