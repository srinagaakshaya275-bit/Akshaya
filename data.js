/* ==========================================================================
   PORTFOLIO CONTENT · every word and number lives here
   --------------------------------------------------------------------------
   This one file feeds every section of the site. Edit it and the site updates.

   • Anything in [square brackets] is a placeholder. It shows in italics, and
     any record that still contains one is marked DRAFT on the site.
   • To link a skill to a project, add the skill's id to the project's
     `skills` list. To link a skill to a responsibility, add it to that
     responsibility's `skills`. The Capability Map is built only from these.
   • Screenshots: put images in an `assets/` folder and list them in a
     project's `visuals`. Use WebP or JPEG, about 1600px wide.
   ========================================================================== */

window.ARCHIVE = {
  meta: {
    name: "Akshaya Reddy",
    positioning: "Associate Marketing Manager at Masai School",
    focus: "ORM, AEO, creator partnerships, social and on-ground marketing",
    intro: "I make brands look right wherever people check them, from Google and AI answers to the feed and the campus floor.",
    location: "Bengaluru, India",
    updated: "13 Nov 2026",
    email: "srinagaakshaya275@gmail.com",
    linkedin: "https://www.linkedin.com/in/akshayareddyp/",
    resume: "Akshaya_Resume.pdf",
    /* Contact form: create a free form at https://formspree.io and paste its
       endpoint here, e.g. "https://formspree.io/f/abcdwxyz". While this is
       empty the form says it is not connected. It never pretends to send. */
    formEndpoint: ""
  },

  /* Hero headline. `lead` is white, `accent` is blue. */
  hero: {
    lead: "Marketing that",
    accent: "shows up in metrics."
  },

  /* Portrait shown in the hero. Replace assets/portrait.jpg, or set src to "" to hide it. */
  portrait: { src: "assets/portrait.jpg", alt: "Akshaya Reddy" },

  /* Follower growth, used by the hero card and the Impact charts. from/to are in thousands. */
  growth: [
    { name: "Instagram", from: 98, to: 166, a: "98K", b: "166K", organic: true },
    { name: "LinkedIn", from: 162, to: 214, a: "162K", b: "214K" }
  ],

  /* The stat strip under the hero. */
  highlights: [
    { value: "2.5M", label: "Monthly organic reach" },
    { value: "369K", label: "Audience managed" },
    { value: "3,600+", label: "Leads a month" }
  ],

  /* The scrolling band under the stat strip. */
  marquee: ["ORM", "AEO", "GEO", "SEO", "SERP visibility", "Influencer marketing", "UGC", "Performance marketing", "Social media", "Community management", "Content creation", "Content writing", "Campaign planning", "Brand marketing", "Lead generation", "BTL marketing", "Offline events", "Performance tracking", "Process improvement"],

  /* Projects shown in the Impact section, in order (ids from `projects`). */
  impact: ["CF-001", "CF-006", "CF-002"],

  /* ---------------------------- ABOUT ---------------------------------- */
  about: {
    id: "PR-001",
    statement: [
      "I started in social media and kept chasing one question: when someone looks up a brand, what do they actually find?",
      "That took me into ORM, search visibility, and now AEO, where I shape what Google's AI Overviews and ChatGPT say about a brand. Today I run reputation, creators, social and on-ground campaigns at Masai, and I judge all of it by the numbers."
    ],
    cards: [
      { title: "ORM & AEO", text: "Fixing what people and AI find when they search you.", icon: "search" },
      { title: "Social Media", text: "Organic growth across Instagram, LinkedIn, YouTube, X, Reddit and Quora.", icon: "chat" },
      { title: "Performance & UGC", text: "Performance ads and performance marketing, with creators and UGC in the mix.", icon: "video" },
      { title: "Community Management", text: "Managing student communities.", icon: "people" },
      { title: "Offline & Events", text: "Hackathons, on-ground events and BTL marketing.", icon: "pin" }
    ],
    principles: [
      "Start with the audience and what they find when they search.",
      "Turn insights into content, creator briefs and campaigns.",
      "Ship fast, across online and on-ground.",
      "Track it with UTMs, keep what works, cut what doesn't."
    ],
    facts: [
      { k: "Based in", v: "Bengaluru" },
      { k: "Experience", v: "Around 3 years across full-time roles and internships" },
      { k: "Languages", v: "English, Hindi, Telugu" },
      { k: "Studied", v: "BBA Digital Marketing, Vellore Institute of Technology" }
    ]
  },

  /* ---------------------------- SKILLS ---------------------------------- */
  skillGroups: {
    search: "Reputation & search",
    creators: "Creators & community",
    content: "Content & social",
    campaigns: "Campaigns & offline",
    ops: "Analytics & operations"
  },
  skills: [
    { id: "orm", name: "ORM", group: "search" },
    { id: "aeo", name: "AEO / GEO", group: "search" },
    { id: "seo", name: "SEO & SERP visibility", group: "search" },
    { id: "crisis", name: "Crisis management", group: "search" },
    { id: "creator", name: "Creator partnerships", group: "creators" },
    { id: "ugc", name: "UGC", group: "creators" },
    { id: "community", name: "Community management", group: "creators" },
    { id: "social", name: "Social media strategy", group: "content" },
    { id: "content", name: "Content creation", group: "content" },
    { id: "video", name: "Video shooting & editing", group: "content" },
    { id: "copy", name: "Copywriting", group: "content" },
    { id: "calendar", name: "Content calendars", group: "content" },
    { id: "campaign", name: "Campaign planning & execution", group: "campaigns" },
    { id: "offline", name: "BTL, guerilla & events", group: "campaigns" },
    { id: "brand", name: "Brand marketing", group: "campaigns" },
    { id: "analytics", name: "Performance tracking & reporting", group: "ops" },
    { id: "process", name: "Process improvement", group: "ops" },
    { id: "leadgen", name: "Lead generation", group: "ops" }
  ],
  /* The Skills section cards. `search` shows a small search mock-up in the first card. */
  skillCards: [
    { title: "ORM & Search", sub: "What people and AI find when they look you up", icon: "search", search: true,
      items: ["ORM", "AEO / GEO", "SEO", "SERP & Search Visibility", "Crisis Management", "Reddit & Quora Citations", "Brand Sentiment Tracking", "Keyword Research", "Backlinking"] },
    { title: "Marketing", sub: "Campaigns, creators and growth", icon: "mega",
      items: ["Campaign Planning & Execution", "Brand Marketing", "Influencer Marketing", "Performance Marketing", "Performance Ads", "UGC", "Lead Generation", "Funnel Optimisation", "Budget Planning", "Go-to-Market Planning"] },
    { title: "Content & Social", sub: "From idea to shoot to post", icon: "video",
      items: ["Social Media Strategy", "Content Creation", "Content Writing", "Copywriting", "Video Shooting & Editing", "Short-Form Video", "Content Calendars", "Community Management", "Creative Briefing", "Storytelling"] },
    { title: "Offline & Events", sub: "Where the brand meets people in person", icon: "pin",
      items: ["Hackathons", "On-Ground Events", "BTL Marketing", "Guerilla Campaigns", "Event Planning & Logistics", "Vendor Coordination", "Vendor Negotiation"] },
    { title: "Analytics & Ops", sub: "Measure it, then fix it", icon: "chart",
      items: ["Performance Tracking & Reporting", "UTM Tracking", "Process Improvement", "Dashboarding", "Marketing Automation", "CRM Management", "Project Management", "Cross-Team Coordination"] },
    { title: "Ways of Working", sub: "How the work gets done", icon: "people",
      items: ["Time Management", "Ownership", "Problem Solving", "Communication", "Team Management"] }
  ],
  /* Tools: `brand` uses a logo from icons.js; `glyph` uses a generic icon (bolt, share, people, video, grid, chart, search). */
  tools: [
    { name: "Meta Business Suite", brand: "meta" }, { name: "Sprout Social", glyph: "share" }, { name: "Agorapulse", glyph: "share" },
    { name: "Hootsuite", brand: "hootsuite" }, { name: "Metabase", brand: "metabase" }, { name: "Notion", brand: "notion" },
    { name: "Jira", brand: "jira" }, { name: "CRM tools", glyph: "people" }, { name: "ChatGPT", brand: "openai" },
    { name: "Claude", brand: "claude" }, { name: "Automation tools", glyph: "bolt" }, { name: "Canva", brand: "canva" },
    { name: "InShot", glyph: "video" }, { name: "VN", glyph: "video" }, { name: "Office 365", glyph: "grid" },
    /* Added: common for this role. Delete any you don't use. */
    { name: "Google Analytics", brand: "googleanalytics" }, { name: "Google Search Console", brand: "googlesearchconsole" },
    { name: "Google Ads", brand: "googleads" }, { name: "Semrush", brand: "semrush" }, { name: "Ahrefs", glyph: "search" },
    { name: "HubSpot", brand: "hubspot" }, { name: "Zapier", brand: "zapier" }, { name: "Slack", brand: "slack" },
    { name: "Figma", brand: "figma" }, { name: "CapCut", glyph: "video" }
  ],

  /* ---------------------------- EXPERIENCE ------------------------------ */

  /* type: "full-time" | "internship". Listed oldest first; the site shows newest first. */
  roles: [
    {
      id: "XP-001", type: "internship", company: "Center for Teaching & Learning", title: "Administrative & Social Media Intern",
      dates: "Aug 2023 – Jan 2024", startYear: 2023, endYear: 2024, place: "Amaravati, AP",
      summary: "Social media and orientation reporting.",
      responsibilities: [
        { text: "Created structured reports, agendas and presentations for orientation sessions to support organisational planning.", skills: [] },
        { text: "Managed internal and external communication, including social media updates and engagement initiatives.", skills: [] },
        { text: "Assisted with event coordination and documentation, ensuring streamlined information flow and accessibility.", skills: [] }
      ],
      achievements: []
    },
    {
      id: "XP-002", type: "internship", company: "GrowUMedia", title: "Content Marketing Strategy Intern",
      dates: "Feb – Jun 2024", startYear: 2024, endYear: 2024, place: "Remote",
      summary: "Social pages and podcast marketing for 4 clients.",
      responsibilities: [
        { text: "Managed content calendars and social media platforms, curating engaging content tailored to diverse audiences.", skills: [] },
        { text: "Led podcast marketing efforts for multiple clients, aligning content with audience preferences and brand identity.", skills: [] },
        { text: "Researched industry trends and optimised content strategies for improved audience engagement.", skills: [] }
      ],
      achievements: [{ value: "4", label: "Podcast marketing clients" }]
    },
    {
      id: "XP-003", type: "internship", company: "Trixal Media", title: "Social Media Marketing Intern",
      dates: "Jul – Aug 2024", startYear: 2024, endYear: 2024, place: "Remote",
      summary: "Social content and visual assets aligned to brand identity.",
      responsibilities: [
        { text: "Created and scheduled social media content, improving brand presence and engagement by 65%.", skills: [] },
        { text: "Managed paid advertising campaigns, increasing visibility and engagement through targeted marketing strategies.", skills: [] },
        { text: "Collaborated on sustainability-focused campaigns to align brand messaging with environmental initiatives.", skills: [] }
      ],
      achievements: [{ value: "+65%", label: "Engagement" }]
    },
    {
      id: "XP-004", type: "internship", company: "Phantasm Solutions", title: "Digital Marketing Strategy Intern",
      dates: "Sep – Dec 2024", startYear: 2024, endYear: 2024, place: "Remote",
      summary: "Marketing and budget plans, SEO and backlinking for clients.",
      responsibilities: [
        { text: "Optimised SEO strategies, backlinking and content marketing to enhance digital presence and brand positioning.", skills: [] },
        { text: "Conducted competitor analysis and web performance tracking to refine digital marketing strategies.", skills: [] },
        { text: "Developed content calendars and marketing plans to drive engagement across social media and online platforms.", skills: [] }
      ],
      achievements: []
    },
    {
      id: "XP-005", type: "internship", company: "Runverve", title: "Social Media Marketing Intern",
      dates: "Dec 2024 – May 2025", startYear: 2024, endYear: 2025, place: "Remote",
      summary: "Multi-platform content and campaigns for launches and webinars.",
      responsibilities: [
        { text: "Developing and managing engaging content for athletes and the sports tech community across multiple platforms.", skills: [] },
        { text: "Tracking and analysing social media performance, optimising content for brand visibility and engagement.", skills: [] },
        { text: "Creating and executing multi-platform content strategies to enhance brand awareness and audience interaction.", skills: [] }
      ],
      achievements: []
    },
    {
      id: "XP-006", type: "full-time", company: "Masai School", title: "Marketing Operations Specialist",
      dates: "Jun 2025 – Apr 2026", startYear: 2025, endYear: 2026, place: "Bengaluru",
      summary: "ORM, influencer marketing, Instagram and LinkedIn, and lead generation.",
      responsibilities: [
        { text: "Owned ORM across platforms: improving online presence, resolving inbound escalations and managing crises.", skills: ["orm", "crisis"] },
        { text: "Ran influencer marketing end to end: scouting, negotiation, research, content writing, UGC and campaign creatives.", skills: ["creator", "ugc", "copy"] },
        { text: "Managed Instagram and LinkedIn, owned monthly content calendars and drove lead generation.", skills: ["social", "calendar", "leadgen"] }
      ],
      roleIds: [],
      achievements: [
        { value: "4,000+", label: "DMs handled" },
        { value: "100+", label: "Escalations resolved" },
        { value: "369K", label: "Followers managed" }
      ]
    },
    {
      id: "XP-007", type: "full-time", company: "Masai School", title: "Associate Marketing Manager",
      dates: "Apr 2026 – Present", startYear: 2026, endYear: 2026, place: "Bengaluru",
      summary: "AEO, SERP visibility, organic leads, and BTL and on-ground events.",
      responsibilities: [
        { text: "Running integrated campaigns across digital, social and offline channels, coordinating content, design and growth.", skills: ["campaign"] },
        { text: "Leading organic brand visibility across search, answer engines, web pages, Quora and Reddit.", skills: ["aeo", "seo", "leadgen"] },
        { text: "Planning and running BTL activations, guerilla campaigns, hackathons and on-ground events end to end.", skills: ["offline"] }
      ],
      achievements: [
        { value: "30 days", label: "Neutral → positive AI sentiment" },
        { value: "2.5M", label: "Monthly organic reach" },
        { value: "3,600+", label: "Organic leads a month" },
        { value: "₹15L", label: "Monthly budget managed" }
      ]
    }
  ],

  /* ---------------------------- PROJECTS -------------------------------- */
  /* layout: "feature" (full-width) | "exhibit" (visual card) | "text" (text-led row)
     type:   one of the keys in projectTypes below
     roleIds: the role records this work belongs to (leave [] if unsure)       */
  projectTypes: {
    campaigns: "Campaigns",
    creators: "Creator partnerships",
    content: "Content & social",
    community: "ORM & community",
    events: "Events & offline"
  },
  projects: [
    {
      id: "CF-001", layout: "feature", type: "campaigns", filedUnder: "ORM · AEO · Creators",
      title: "Rewriting what AI says about a brand", year: "2025–26", years: [2025, 2026],
      stamp: "Verdicts flipped ×5",
      role: "Scouting, negotiation, script reviews and sentiment tracking", roleIds: ["XP-007"],
      skills: ["aeo", "orm", "creator", "seo", "analytics"],
      summary: "AI Overviews were calling courses scams. A creator-led YouTube program changed the sources the answers were built from.",
      challenge: "People researching the courses were getting scam allegations and mixed verdicts straight from Google's AI Overviews, before they ever reached the website.",
      objective: "Shift what AI answers say about the brand and its courses from doubtful to positive.",
      strategy: "AI answers summarise what the web already says. So instead of arguing with the answer, change the sources it pulls from.",
      execution: [
        "Collaborated with creators end to end every month, on a ₹15L per month budget.",
        "Briefed creators documentary-style rather than testimonial-style, for Tier 2 and 3 audiences.",
        "Reviewed every script, and tuned titles and descriptions to the queries that feed AI Overviews.",
        "Tracked sentiment weekly and reported monthly, adjusting briefs as the answers moved."
      ],
      deliverables: ["400+ creator videos live", "Weekly sentiment tracker", "Monthly reports"],
      visuals: [], visualHints: ["Before: AI Overview screenshot, brand blurred", "After: AI Overview screenshot, brand blurred"], video: "",
      outcome: [
        { value: "400+", label: "Videos live" }, { value: "1,000+", label: "Bookings" },
        { value: "100+", label: "Registrations" }, { value: "7", label: "AI verdicts turned positive" }
      ],
      /* One row per offering. Replace the [Before] / [After] rows and add context when you have it. */
      verdicts: [
        { q: "Offering 1", before: "Scam allegations", after: "Potentially worthwhile" },
        { q: "Offering 2", before: "Can be good", after: "Best course, job-ready curriculum" },
        { q: "Offering 3", before: "An existing option", after: "Good, intensive, industry-relevant career school" },
        { q: "Offering 4", before: "[Before]", after: "[After]" },
        { q: "Offering 5", before: "[Before]", after: "[After]" }
      ],
      learnings: []
    },
    {
      id: "CF-002", layout: "exhibit", type: "content", filedUnder: "Content strategy · Social",
      title: "Organic growth, zero ad spend", year: "2025–26", years: [2025, 2026],
      role: "Instagram & LinkedIn owner", roleIds: ["XP-006"],
      skills: ["social", "content", "calendar", "analytics"],
      summary: "Instagram and LinkedIn run end to end on recurring formats that earned their place through data.",
      challenge: "[Where the accounts started and what was holding them back]",
      objective: "Grow both accounts organically and turn attention into bookings.",
      strategy: "Recurring content formats, kept or cut based on performance data.",
      execution: [
        "Built recurring series: Monday Motivation, Tech Tips Tuesday, AI News Flash and Masai Wrapped.",
        "Owned the monthly content calendar from ideation to publishing."
      ],
      deliverables: ["Monthly content calendars", "Recurring story and post formats"],
      visuals: [], visualHints: ["Best-performing post", "Profile growth screenshot"], video: "",
      outcome: [
        { value: "98K → 166K", label: "Instagram followers" }, { value: "162K → 214K", label: "LinkedIn followers" },
        { value: "378K", label: "Best Instagram post reach" }, { value: "344K", label: "Best LinkedIn post reach" },
        { value: "1,000", label: "Bookings from social" }
      ],
      learnings: ["[What you learned]"]
    },
    {
      id: "CF-003", layout: "exhibit", type: "campaigns", filedUnder: "Marketing campaign",
      title: "HIMSHIKHAR 2026", year: "2026", years: [2026],
      role: "Content & campaign lead", roleIds: [],
      skills: ["campaign", "content", "social"],
      summary: "Multi-channel launch for IIT Mandi's ₹1.5L residential program across YouTube, Telegram, WhatsApp, Instagram and LinkedIn.",
      challenge: "[The challenge]",
      objective: "Launch the residential program across five channels.",
      strategy: "[Your strategy]",
      execution: ["Ran the launch across YouTube, Telegram, WhatsApp, Instagram and LinkedIn."],
      deliverables: ["[Deliverables]"],
      visuals: [], visualHints: ["Campaign creative"], video: "",
      outcome: [{ value: "2.6K", label: "Visitors" }],
      learnings: ["[What you learned]"]
    },
    {
      id: "CF-004", layout: "text", type: "campaigns", filedUnder: "Growth campaign",
      title: "Masai Unlimited", year: "2025–26", years: [2025, 2026],
      role: "Campaign owner", roleIds: [],
      skills: ["campaign", "copy"],
      summary: "A Telegram and WhatsApp channel campaign covering sourcing, negotiation, copy and creatives.",
      challenge: "[The challenge]",
      objective: "[The objective]",
      strategy: "Use Telegram and WhatsApp channels as the main acquisition route.",
      execution: ["Sourced and negotiated with channels.", "Wrote the copy and briefed the creatives."],
      deliverables: ["[Deliverables]"],
      visuals: [], visualHints: ["Channel post screenshot"], video: "",
      outcome: [{ value: "1,606", label: "Paid in 2 months" }],
      learnings: ["[What you learned]"]
    },
    {
      id: "CF-005", layout: "text", type: "creators", filedUnder: "Creator partnerships",
      title: "Regional Creator Network", year: "2025–26", years: [2025, 2026],
      role: "Scouting & negotiation", roleIds: ["XP-006"],
      skills: ["creator"],
      summary: "Scouted Tamil, Kannada and Telugu creators, including mega creators.",
      challenge: "[The challenge]",
      objective: "Reach regional audiences that big channels miss.",
      strategy: "[Your strategy]",
      execution: ["Scouted and negotiated with Tamil, Kannada and Telugu creators, including mega creators."],
      deliverables: ["[Deliverables]"],
      visuals: [], visualHints: ["Creator roster or content"], video: "",
      outcome: [{ value: "[number]", label: "Creators onboarded" }],
      learnings: ["[What you learned]"]
    },
    {
      id: "CF-006", layout: "feature", type: "creators", filedUnder: "Creator partnerships · Community",
      title: "Creator in Residence", year: "2025–26", years: [2025, 2026],
      role: "[Your role]", roleIds: [],
      skills: ["creator", "ugc", "community", "campaign"],
      summary: "60 students became brand creators for two months, with weekly themes, masterclasses, script reviews and a live leaderboard.",
      challenge: "[What problem did the program solve?]",
      objective: "Drive bookings and registrations for IIT Mandi's AI & Data Science program through student creators.",
      strategy: "Turn students into creators, with structure (themes, briefs, reviews) and motivation (a live leaderboard).",
      execution: [
        "60 students joined as brand creators for two months.",
        "Ran weekly themes, masterclasses and script reviews.",
        "Kept a live leaderboard to sustain momentum."
      ],
      deliverables: ["[Number of creator posts]"],
      visuals: [], visualHints: ["Creator content collage", "Leaderboard screenshot"], video: "",
      outcome: [{ value: "900+", label: "Visitors" }, { value: "300+", label: "Bookings" }, { value: "150+", label: "Registrations" }],
      learnings: ["[What you learned]"]
    },
    {
      id: "CF-007", layout: "exhibit", type: "creators", filedUnder: "Brand · Creator partnerships",
      title: "LinkedIn Paid ORM", year: "2025–26", years: [2025, 2026],
      role: "Creator sourcing & tracking", roleIds: ["XP-006"],
      skills: ["orm", "creator", "brand", "analytics", "social"],
      summary: "A creator-led brand awareness push that got Masai ranking in LinkedIn search.",
      challenge: "[The challenge]",
      objective: "Get the brand ranking in LinkedIn search.",
      strategy: "Creator-led awareness on LinkedIn.",
      execution: ["Sourced creators and tracked results."],
      deliverables: ["[Deliverables]"],
      visuals: [], visualHints: ["LinkedIn search result screenshot"], video: "",
      outcome: [{ value: "810K", label: "Impressions" }],
      learnings: ["[What you learned]"]
    },
    {
      id: "CF-008", layout: "exhibit", type: "events", filedUnder: "Events · BTL",
      title: "[Hackathon or on-ground event]", year: "[year]", years: [],
      role: "[Your role]", roleIds: ["XP-007"],
      skills: ["offline"],
      summary: "[One line on the hackathon, guerilla campaign or BTL activation.]",
      challenge: "[The challenge]",
      objective: "[The objective]",
      strategy: "[Your strategy]",
      execution: ["[What you did]"],
      deliverables: ["[Deliverables]"],
      visuals: [], visualHints: ["Event photo", "Event photo"], video: "",
      outcome: [{ value: "[number]", label: "[Footfall / participants / registrations]" }],
      learnings: ["[What you learned]"]
    },
    {
      id: "CF-009", layout: "text", type: "community", filedUnder: "ORM · Community",
      title: "The DM & escalations desk", year: "2025–26", years: [2025, 2026],
      role: "ORM owner", roleIds: ["XP-006"],
      skills: ["orm", "crisis", "community", "process", "social"],
      summary: "Ran the Instagram and LinkedIn DM dashboard and fixed recurring issues at the root.",
      challenge: "[The challenge]",
      objective: "Resolve inbound issues quickly and stop them recurring.",
      strategy: "Fix recurring issues at the root, not one reply at a time.",
      execution: ["Ran the Instagram and LinkedIn DM dashboard.", "Handled escalations and crisis responses."],
      deliverables: ["[Deliverables]"],
      visuals: [], visualHints: ["Dashboard screenshot (anonymised)"], video: "",
      outcome: [{ value: "4,000+", label: "DMs handled" }, { value: "100+", label: "Escalations resolved" }],
      learnings: ["[What you learned]"]
    }
  ],

  /* ---------------------------- EDUCATION ------------------------------- */
  education: [
    { id: "AR-001", years: "2022 – 2025", program: "BBA Digital Marketing", institution: "Vellore Institute of Technology", score: "CGPA 9.15" },
    { id: "AR-002", years: "2022", program: "Class XII", institution: "Sri Shirdi Sai Junior College, AP", score: "93.2%" },
    { id: "AR-003", years: "2020", program: "Class X", institution: "Sri Shirdi Sai Vidya Nikethan, AP", score: "97.33%" }
  ],
  coursework: [
    { group: "Digital marketing", items: ["Fundamentals of Digital Marketing", "Search Engine Optimisation", "Google Analytics", "Google Ads", "CRM", "Omni-channel Marketing", "Gen AI", "Content Writing"] },
    { group: "Social media marketing", items: ["Fundamentals of Social Media Marketing", "Social Media Marketing Specialization (Meta)", "Social Media Monitoring", "Content Creating using Canva"] }
  ],



  enquiryTypes: ["Full-time role", "Marketing project", "Creator or brand collaboration", "Something else"]
};
