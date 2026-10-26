/* ==========================================================================
   THE CURIOSITY INDEX · every record lives here
   --------------------------------------------------------------------------
   This one file feeds the search, the filters, the skill map and the record
   pages. Edit it and the whole site updates.

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
    updated: "26 Oct 2026",
    email: "srinagaakshaya275@gmail.com",
    linkedin: "https://www.linkedin.com/in/akshayareddyp/",
    resume: "Akshaya_Resume.pdf",
    /* Contact form: create a free form at https://formspree.io and paste its
       endpoint here, e.g. "https://formspree.io/f/abcdwxyz". While this is
       empty the form says it is not connected. It never pretends to send. */
    formEndpoint: ""
  },

  /* ---------------------------- ABOUT ---------------------------------- */
  about: {
    id: "PR-001",
    statement: [
      "I started in social media and kept chasing one question: when someone looks up a brand, what do they actually find?",
      "That took me into ORM, search visibility, and now AEO, where I shape what Google's AI Overviews and ChatGPT say about a brand. Today I run reputation, creators, social and on-ground campaigns at Masai, and I judge all of it by the numbers."
    ],
    interests: ["ORM & AEO", "Social media", "Creators & UGC", "Community", "Offline & events"],
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
  tools: ["Meta Business Suite", "Sprout Social", "Agorapulse", "Hootsuite", "Metabase", "Notion", "Jira", "CRM tools", "ChatGPT", "Claude", "Automation tools", "Canva", "InShot", "VN", "Office 365"],

  /* ---------------------------- EXPERIENCE ------------------------------ */
  /* type: "full-time" | "internship". Listed oldest first; the site shows newest first. */
  roles: [
    {
      id: "XP-001", type: "internship", company: "Center for Teaching & Learning", title: "Administrative & Social Media Intern",
      dates: "Aug 2023 – Jan 2024", startYear: 2023, endYear: 2024, place: "Amaravati, AP",
      summary: "Social media and orientation reporting.",
      responsibilities: [
        { text: "Compiled reports, structured agendas and built presentations for orientation sessions.", skills: [] },
        { text: "Managed social media presence, from content creation to engagement initiatives.", skills: ["social", "content"] }
      ],
      achievements: []
    },
    {
      id: "XP-002", type: "internship", company: "GrowUMedia", title: "Content Marketing Strategy Intern",
      dates: "Feb – Jun 2024", startYear: 2024, endYear: 2024, place: "Remote",
      summary: "Social pages and podcast marketing for 4 clients.",
      responsibilities: [
        { text: "Built and managed social media pages by curating content and implementing strategies that increased engagement.", skills: ["social", "content"] },
        { text: "Ran podcast marketing end to end, coordinating client feedback and team collaboration.", skills: ["campaign"] }
      ],
      achievements: [{ value: "4", label: "Podcast marketing clients" }]
    },
    {
      id: "XP-003", type: "internship", company: "Trixal Media", title: "Social Media Marketing Intern",
      dates: "Jul – Aug 2024", startYear: 2024, endYear: 2024, place: "Remote",
      summary: "Social content and visual assets aligned to brand identity.",
      responsibilities: [
        { text: "Executed social media content and strategy to strengthen brand presence.", skills: ["social", "content"] },
        { text: "Directed design projects and built visual assets aligned with brand identity and marketing objectives.", skills: ["brand", "content"] }
      ],
      achievements: [{ value: "+65%", label: "Engagement" }]
    },
    {
      id: "XP-004", type: "internship", company: "Phantasm Solutions", title: "Digital Marketing Strategy Intern",
      dates: "Sep – Dec 2024", startYear: 2024, endYear: 2024, place: "Remote",
      summary: "Marketing and budget plans, SEO and backlinking for clients.",
      responsibilities: [
        { text: "Developed digital marketing and budget strategies for multiple clients, optimising campaigns and resource allocation.", skills: ["campaign"] },
        { text: "Optimised client SEO, backlinking and content strategies to improve visibility and brand positioning.", skills: ["seo", "brand", "content"] }
      ],
      achievements: []
    },
    {
      id: "XP-005", type: "internship", company: "Runverve", title: "Social Media Marketing Intern",
      dates: "Dec 2024 – May 2025", startYear: 2024, endYear: 2025, place: "Remote",
      summary: "Multi-platform content and campaigns for launches and webinars.",
      responsibilities: [
        { text: "Executed multi-platform content strategies with a focus on design and storytelling to grow engagement and followers.", skills: ["social", "content"] },
        { text: "Personalised campaigns for major product updates and webinars through targeted content and audience segmentation.", skills: ["campaign"] }
      ],
      achievements: []
    },
    {
      id: "XP-006", type: "full-time", company: "Masai School", title: "Marketing Operations Specialist",
      dates: "Jun 2025 – [Mon 2026]", startYear: 2025, endYear: 2026, place: "Bengaluru",
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
      dates: "[Mon 2026] – Present", startYear: 2026, endYear: 2026, place: "Bengaluru", promoted: true,
      summary: "AEO, SERP visibility, organic leads, and BTL and on-ground events.",
      responsibilities: [
        { text: "Run integrated campaigns across digital, social and offline channels, coordinating content, design and growth.", skills: ["campaign"] },
        { text: "Lead organic brand visibility across search, answer engines, web pages, Quora and Reddit.", skills: ["aeo", "seo", "leadgen"] },
        { text: "Plan and run BTL activations, guerilla campaigns, hackathons and on-ground events end to end.", skills: ["offline"] }
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
      role: "Scouting, negotiation, script reviews and sentiment tracking", roleIds: ["XP-007"],
      skills: ["aeo", "orm", "creator", "seo", "analytics"],
      summary: "AI Overviews were calling courses scams. A creator-led YouTube program changed the sources the answers were built from.",
      challenge: "People researching the courses were getting scam allegations and mixed verdicts straight from Google's AI Overviews, before they ever reached the website.",
      objective: "Shift what AI answers say about the brand and its courses from doubtful to positive.",
      strategy: "AI answers summarise what the web already says. So instead of arguing with the answer, change the sources it pulls from.",
      execution: [
        "Scouted and negotiated with 30 creators a month across Tamil, Hindi, Telugu and English channels, on a ₹[X]L monthly budget.",
        "Briefed creators documentary-style rather than testimonial-style, for Tier 2 and 3 audiences.",
        "Reviewed every script, and tuned titles and descriptions to the queries that feed AI Overviews.",
        "Tracked sentiment weekly and reported monthly, adjusting briefs as the answers moved."
      ],
      deliverables: ["60 creator videos in two months", "Weekly sentiment tracker", "Monthly reports"],
      visuals: [], visualHints: ["Before: AI Overview screenshot, brand blurred", "After: AI Overview screenshot, brand blurred"], video: "",
      outcome: [
        { value: "60", label: "Videos live" }, { value: "600+", label: "Bookings" },
        { value: "55", label: "Registrations" }, { value: "5", label: "AI verdicts turned positive" }
      ],
      verdicts: [
        { q: "Digital marketing course", before: "Scam allegations", after: "Potentially worthwhile" },
        { q: "Business analytics course", before: "Can be good", after: "Best course, job-ready curriculum" },
        { q: "The brand itself", before: "An existing option", after: "Good, intensive, industry-relevant career school" }
      ],
      learnings: [
        "Fix the source first: the brand's own fees page was causing part of the pricing confusion.",
        "Neutral, explainer-style videos moved AI answers more than glowing reviews did.",
        "Regional creators reach the audiences that big channels miss."
      ]
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
        { value: "98K → 167K", label: "Instagram followers" }, { value: "162K → 202K", label: "LinkedIn followers" },
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
      outcome: [{ value: "989", label: "Visitors" }, { value: "311", label: "Bookings" }, { value: "148", label: "Registrations" }],
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


  /* ---------------------------- MARGIN NOTES ---------------------------- */
  /* Short handwritten asides in the side margins (wide screens only).
     on:   a section id ("#experience") or a case-file id ("CF-001")
     side: "l" or "r"      top: distance from the top of that element
     Delete a line to remove a note. */
  marginNotes: [
    { on: "#experience", side: "r", top: "330px", text: "newest first" },
    { on: "CF-001", side: "r", top: "46%", text: "this is where AI changed its mind" },
    { on: "#skills", side: "l", top: "300px", text: "pick one and watch the lines" }
  ],

  enquiryTypes: ["Full-time role", "Marketing project", "Creator or brand collaboration", "Something else"]
};
