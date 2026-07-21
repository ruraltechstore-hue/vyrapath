export type BlogSection =
  | { type: "p"; content: string }
  | { type: "h2"; content: string }
  | { type: "ul"; items: string[] };

export type BlogPost = {
  slug: string;
  tag: string;
  title: string;
  description: string;
  read: string;
  cover: string;
  publishedAt: string;
  sections: BlogSection[];
  relatedLinks: { label: string; to: string; hash?: string }[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-create-ats-friendly-resume",
    tag: "ATS",
    title: "How to Create an ATS-Friendly Resume",
    description:
      "Learn how to format, structure, and keyword-optimize your resume so applicant tracking systems can read it and match you to relevant jobs.",
    read: "6 min",
    cover: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=900&auto=format&fit=crop&q=75",
    publishedAt: "2026-06-15",
    relatedLinks: [
      { label: "check your ATS resume score", to: "/ats-checker" },
      { label: "explore resume building services", to: "/services", hash: "digital-resume" },
    ],
    sections: [
      {
        type: "p",
        content:
          "Most large employers use applicant tracking systems (ATS) to filter resumes before a recruiter reads them. An ATS-friendly resume is structured so software can extract your skills, education, and experience — and match them to a job description.",
      },
      { type: "h2", content: "Use a simple, parseable layout" },
      {
        type: "p",
        content:
          "Avoid text boxes, multi-column tables, headers/footers with critical information, and graphics that replace plain text. Stick to standard section headings like Experience, Education, Skills, and Projects. Use a single-column layout with consistent fonts.",
      },
      { type: "h2", content: "Include role-relevant keywords" },
      {
        type: "p",
        content:
          "Read the job description carefully and mirror its language where it honestly reflects your background. If the role asks for React, TypeScript, and REST APIs, those terms should appear in your skills and project descriptions — not buried in an image.",
      },
      { type: "h2", content: "Save and export correctly" },
      {
        type: "p",
        content:
          "Export as a text-selectable PDF or DOCX. Scanned image PDFs often return empty text to ATS software. Before applying, run your file through an ATS resume checker to see how well it parses.",
      },
      { type: "h2", content: "When to get professional help" },
      {
        type: "p",
        content:
          "If you are a fresher with projects but no full-time experience, professional resume building can help you present your strengths in ATS-safe language. VyraPath builds digital and traditional resumes designed for both automated screening and recruiter review.",
      },
    ],
  },
  {
    slug: "what-is-an-ats-resume",
    tag: "ATS",
    title: "What Is an ATS Resume?",
    description:
      "Understand what applicant tracking systems are, how they read resumes, and what makes a resume ATS-compatible for job applications.",
    read: "5 min",
    cover: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&auto=format&fit=crop&q=75",
    publishedAt: "2026-06-10",
    relatedLinks: [
      { label: "use our free ATS checker", to: "/ats-checker" },
      { label: "see ATS-friendly resume services", to: "/services" },
    ],
    sections: [
      {
        type: "p",
        content:
          "An ATS resume is a resume formatted and written so applicant tracking systems — software used by employers to collect, sort, and rank applications — can accurately read and score it.",
      },
      { type: "h2", content: "How ATS systems work" },
      {
        type: "p",
        content:
          "When you apply online, your resume is often stored in a database. Recruiters search that database using keywords from the job description: skills, tools, certifications, and job titles. If your resume uses different wording or unreadable formatting, it may never surface in search results.",
      },
      { type: "h2", content: "ATS resume vs. traditional resume" },
      {
        type: "p",
        content:
          "A traditional resume prioritizes visual design. An ATS resume prioritizes machine readability first, then human readability. That does not mean boring — it means clear headings, bullet points, and honest keyword alignment with your target role.",
      },
      { type: "h2", content: "Check before you apply" },
      {
        type: "p",
        content:
          "VyraPath offers a free ATS resume score checker that evaluates compatibility against common screening criteria. Use it to spot formatting issues and missing keyword signals before submitting applications.",
      },
    ],
  },
  {
    slug: "how-to-improve-resume-ats-score",
    tag: "ATS",
    title: "How to Improve Your Resume ATS Score",
    description:
      "Practical steps to raise your resume ATS compatibility score: formatting fixes, keyword alignment, and section structure.",
    read: "5 min",
    cover: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&auto=format&fit=crop&q=75",
    publishedAt: "2026-06-08",
    relatedLinks: [
      { label: "check your ATS score now", to: "/ats-checker" },
      { label: "build an ATS-friendly resume", to: "/services", hash: "resume-building" },
    ],
    sections: [
      {
        type: "p",
        content:
          "A low ATS score usually means your resume is hard to parse, missing important keywords, or structured in a way screening software cannot interpret. Here is how to improve it systematically.",
      },
      { type: "h2", content: "Fix parsing problems first" },
      {
        type: "ul",
        items: [
          "Remove images, icons, and charts that replace text",
          "Use standard section names recruiters and ATS expect",
          "Export a text-selectable PDF instead of a scan",
          "Avoid tables for core content like work history",
        ],
      },
      { type: "h2", content: "Align keywords with the job description" },
      {
        type: "p",
        content:
          "Compare your resume to a target job posting. Add relevant skills and tools you actually know. Fresher candidates should emphasize projects, internships, coursework, and certifications using the same terminology employers use.",
      },
      { type: "h2", content: "Re-check after every major edit" },
      {
        type: "p",
        content:
          "Run your updated file through an ATS resume checker after changes. VyraPath's tool gives category-level feedback so you know whether formatting, keywords, or structure needs more work.",
      },
    ],
  },
  {
    slug: "resume-mistakes-freshers-should-avoid",
    tag: "Resumes",
    title: "Resume Mistakes Freshers Should Avoid",
    description:
      "Common resume errors that hurt freshers in ATS screening and recruiter reviews — and how to fix them.",
    read: "5 min",
    cover: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=900&auto=format&fit=crop&q=75",
    publishedAt: "2026-05-28",
    relatedLinks: [
      { label: "get resume help for freshers", to: "/services" },
      { label: "check your resume ATS score", to: "/ats-checker" },
    ],
    sections: [
      { type: "h2", content: "Using a one-size-fits-all resume" },
      {
        type: "p",
        content:
          "Sending the same resume to every role signals low effort. Tailor your summary, skills, and top projects to each job description. Even small keyword adjustments can improve ATS matching.",
      },
      { type: "h2", content: "Listing duties instead of outcomes" },
      {
        type: "p",
        content:
          "Replace vague lines like 'worked on a project' with specifics: what you built, what tools you used, and what result you achieved. Freshers can cite academic projects, hackathons, and internships.",
      },
      { type: "h2", content: "Overdesigning the layout" },
      {
        type: "p",
        content:
          "Creative templates with columns and graphics often break in ATS. Prioritize clarity. You can share a portfolio link for visual work instead of cramming design into the resume file.",
      },
      { type: "h2", content: "Skipping proofreading" },
      {
        type: "p",
        content:
          "Typos in your email, phone number, or job title create instant rejection. Read aloud, use spell-check, and ask someone else to review before you apply.",
      },
    ],
  },
  {
    slug: "resume-with-no-work-experience",
    tag: "Resumes",
    title: "How to Write a Resume With No Work Experience",
    description:
      "A practical guide for students and freshers to build a strong resume using projects, education, skills, and internships.",
    read: "6 min",
    cover: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=900&auto=format&fit=crop&q=75",
    publishedAt: "2026-05-20",
    relatedLinks: [
      { label: "resume builder for students", to: "/services", hash: "digital-resume" },
      { label: "create a professional portfolio", to: "/services", hash: "portfolio-building" },
    ],
    sections: [
      {
        type: "p",
        content:
          "You do not need a full-time job to have a hire-ready resume. Employers hiring freshers look for potential, relevant skills, and evidence you can learn quickly.",
      },
      { type: "h2", content: "Lead with a focused summary" },
      {
        type: "p",
        content:
          "Write two or three lines stating your target role, core skills, and strongest proof point — such as a capstone project, internship, or certification.",
      },
      { type: "h2", content: "Make projects your experience section" },
      {
        type: "p",
        content:
          "Treat academic, personal, and open-source projects like work entries. Include the problem, your contribution, technologies used, and a measurable or concrete outcome.",
      },
      { type: "h2", content: "Add supporting sections" },
      {
        type: "ul",
        items: [
          "Education with relevant coursework",
          "Technical and soft skills grouped clearly",
          "Certifications and online courses",
          "Volunteering or leadership roles",
        ],
      },
      { type: "h2", content: "Pair your resume with a portfolio" },
      {
        type: "p",
        content:
          "A live portfolio gives recruiters proof behind your bullets. VyraPath helps freshers build both ATS-friendly resumes and portfolio sites designed for early-career applications.",
      },
    ],
  },
  {
    slug: "customize-resume-for-job-description",
    tag: "Applications",
    title: "How to Customize a Resume for a Job Description",
    description:
      "Learn a repeatable process to tailor your resume keywords and highlights for each job application without starting from scratch.",
    read: "5 min",
    cover: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&auto=format&fit=crop&q=75",
    publishedAt: "2026-05-12",
    relatedLinks: [
      { label: "job application assistance", to: "/services", hash: "job-applications" },
      { label: "check ATS compatibility", to: "/ats-checker" },
    ],
    sections: [
      { type: "h2", content: "Highlight the job description keywords" },
      {
        type: "p",
        content:
          "Copy the posting into a document and mark repeated skills, tools, and responsibilities. These are the terms ATS and recruiters will scan for.",
      },
      { type: "h2", content: "Reorder and rewrite bullets" },
      {
        type: "p",
        content:
          "Move the most relevant project or internship to the top. Rewrite bullets to mirror the posting's language while staying truthful. Do not claim skills you cannot demonstrate.",
      },
      { type: "h2", content: "Adjust your skills section" },
      {
        type: "p",
        content:
          "Group skills the employer cares about first. Remove outdated or irrelevant tools that distract from your fit for this specific role.",
      },
      { type: "h2", content: "Save a version per role family" },
      {
        type: "p",
        content:
          "Maintain base templates for role types — frontend, data analyst, marketing — then make small edits per application. VyraPath's job application service and monthly resume subscription help automate this tailoring process.",
      },
    ],
  },
  {
    slug: "how-to-improve-linkedin-profile",
    tag: "LinkedIn",
    title: "How to Improve Your LinkedIn Profile for Job Seekers",
    description:
      "Practical LinkedIn optimization tips: headline, About section, experience, and keywords that help recruiters find you.",
    read: "5 min",
    cover: "https://images.unsplash.com/photo-1611944212129-29977ae1398c?w=900&auto=format&fit=crop&q=75",
    publishedAt: "2026-05-05",
    relatedLinks: [
      { label: "improve your LinkedIn profile", to: "/services", hash: "linkedin-optimization" },
      { label: "build a matching ATS resume", to: "/services", hash: "digital-resume" },
    ],
    sections: [
      {
        type: "p",
        content:
          "Recruiters search LinkedIn by job title, skills, and location. A well-optimized profile helps you appear in those searches and gives hiring teams a clear reason to message you.",
      },
      { type: "h2", content: "Write a searchable headline" },
      {
        type: "p",
        content:
          "Go beyond your current status. Use a headline like 'Aspiring Data Analyst | Python, SQL, Tableau | Open to internships' so you show up when recruiters search for your target role.",
      },
      { type: "h2", content: "Make your About section scannable" },
      {
        type: "p",
        content:
          "Open with your goal, list core skills, highlight two or three projects or achievements, and end with what roles you are seeking. Short paragraphs work better than a wall of text.",
      },
      { type: "h2", content: "Align LinkedIn with your resume" },
      {
        type: "p",
        content:
          "Use consistent job titles, dates, and skills across your resume and LinkedIn. Inconsistencies confuse recruiters and weaken your professional story.",
      },
      { type: "h2", content: "Professional LinkedIn optimization" },
      {
        type: "p",
        content:
          "VyraPath rewrites headlines, About sections, experience, and skills with recruiter-search keywords — a focused service for job seekers who want their profile to work as hard as their resume.",
      },
    ],
  },
  {
    slug: "professional-portfolio-as-fresher",
    tag: "Portfolio",
    title: "How to Create a Professional Portfolio as a Fresher",
    description:
      "What to include in a student or fresher portfolio, how to present projects, and why a live URL strengthens job applications.",
    read: "6 min",
    cover: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=900&auto=format&fit=crop&q=75",
    publishedAt: "2026-04-28",
    relatedLinks: [
      { label: "portfolio building for students", to: "/services", hash: "portfolio-building" },
      { label: "see portfolio work samples", to: "/portfolio" },
    ],
    sections: [
      {
        type: "p",
        content:
          "A portfolio shows what you can do — not just what you claim on a resume. For freshers, it is often the difference between a ignored application and an interview callback.",
      },
      { type: "h2", content: "Choose three to six strong projects" },
      {
        type: "p",
        content:
          "Quality beats quantity. Pick projects that match your target role. Each case study should explain the problem, your approach, technologies used, and the outcome.",
      },
      { type: "h2", content: "Include essential pages" },
      {
        type: "ul",
        items: [
          "Home with a clear introduction and target role",
          "Projects or case studies with context and results",
          "About page with your background and skills",
          "Contact information or a simple contact form",
        ],
      },
      { type: "h2", content: "Keep it fast and mobile-friendly" },
      {
        type: "p",
        content:
          "Recruiters often open portfolio links on their phone. Use readable typography, fast loading images, and a simple navigation structure.",
      },
      { type: "h2", content: "Portfolio building services" },
      {
        type: "p",
        content:
          "VyraPath builds responsive portfolio sites for students and freshers, including deployment guidance so you have a professional URL to share in applications and on LinkedIn.",
      },
    ],
  },
  {
    slug: "how-to-apply-for-jobs-as-fresher",
    tag: "Applications",
    title: "How to Apply for Jobs as a Fresher",
    description:
      "A step-by-step job search guide for students and freshers: resume, ATS check, LinkedIn, portfolio, and application strategy.",
    read: "7 min",
    cover: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=900&auto=format&fit=crop&q=75",
    publishedAt: "2026-04-20",
    relatedLinks: [
      { label: "career services for freshers", to: "/services" },
      { label: "job application support", to: "/contact" },
    ],
    sections: [
      {
        type: "p",
        content:
          "Applying as a fresher is a numbers game tempered by quality. You need materials that pass ATS screening, a visible online presence, and a consistent application routine.",
      },
      { type: "h2", content: "Prepare your core materials" },
      {
        type: "ul",
        items: [
          "ATS-friendly resume tailored to your target role",
          "LinkedIn profile with a searchable headline",
          "Portfolio or project links for technical and creative roles",
          "Short cover letter template you can customize",
        ],
      },
      { type: "h2", content: "Check your resume before each batch" },
      {
        type: "p",
        content:
          "Run your resume through an ATS checker to catch formatting and keyword gaps. Fix issues before you send ten applications with the same problem.",
      },
      { type: "h2", content: "Apply with intention" },
      {
        type: "p",
        content:
          "Target roles that match your skills and location preferences. Customize your resume keywords for each posting. Track where you applied and follow up politely after one to two weeks.",
      },
      { type: "h2", content: "Get career support when you need it" },
      {
        type: "p",
        content:
          "VyraPath offers job application assistance, resume building, and career packages for freshers. We help you apply more effectively — we do not guarantee employment outcomes.",
      },
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
