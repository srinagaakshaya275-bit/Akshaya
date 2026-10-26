/* ==========================================================================
   THE GLASSHOUSE · content
   Everything visitors read in the Corridors and Exhibition lives here.
   Text in [square brackets] is a placeholder: replace it or delete the line.
   ========================================================================== */

window.SITE = {
  /* Contact form. Create a free form at https://formspree.io, then paste its
     endpoint here, e.g. "https://formspree.io/f/abcdwxyz".
     While this is empty the form will say it is not connected (it never
     pretends to send). */
  formEndpoint: "",

  /* ------------------------------------------------------------------------
     EXPERIENCE · listed oldest → newest, the order you walk the corridor.
     ------------------------------------------------------------------------ */
  roles: [
    {
      id: "ctl",
      kind: "Internship",
      company: "Center for Teaching & Learning",
      title: "Administrative & Social Media Intern",
      dates: "Aug 2023 – Jan 2024",
      place: "Amaravati, AP",
      responsibilities: [
        "Compiled reports, structured agendas and built presentations for orientation sessions.",
        "Managed social media presence, from content creation to engagement initiatives."
      ],
      achievements: []
    },
    {
      id: "growumedia",
      kind: "Internship",
      company: "GrowUMedia",
      title: "Content Marketing Strategy Intern",
      dates: "Feb – Jun 2024",
      place: "Remote",
      responsibilities: [
        "Built and managed social media pages by curating content and implementing strategies that increased engagement.",
        "Ran podcast marketing end to end, coordinating client feedback and team collaboration."
      ],
      achievements: [{ value: "4", label: "Podcast clients" }]
    },
    {
      id: "trixal",
      kind: "Internship",
      company: "Trixal Media",
      title: "Social Media Marketing Intern",
      dates: "Jul – Aug 2024",
      place: "Remote",
      responsibilities: [
        "Executed social media content and strategy to strengthen brand presence.",
        "Directed design projects and built visual assets aligned with brand identity and marketing objectives."
      ],
      achievements: [{ value: "+65%", label: "Engagement" }]
    },
    {
      id: "phantasm",
      kind: "Internship",
      company: "Phantasm Solutions",
      title: "Digital Marketing Strategy Intern",
      dates: "Sep – Dec 2024",
      place: "Remote",
      responsibilities: [
        "Developed digital marketing and budget strategies for multiple clients, optimising campaigns and resource allocation.",
        "Optimised client SEO, backlinking and content strategies to improve visibility and brand positioning."
      ],
      achievements: []
    },
    {
      id: "runverve",
      kind: "Internship",
      company: "Runverve",
      title: "Social Media Marketing Intern",
      dates: "Dec 2024 – May 2025",
      place: "Remote",
      responsibilities: [
        "Executed multi-platform content strategies with a focus on design and storytelling to grow engagement and followers.",
        "Personalised campaigns for major product updates and webinars through targeted content and audience segmentation."
      ],
      achievements: []
    },
    {
      id: "masai-ops",
      kind: "Full-time",
      company: "Masai School",
      title: "Marketing Operations Specialist",
      dates: "Jun 2025 – [Mon 2026]",
      place: "Bengaluru",
      responsibilities: [
        "Owned ORM across platforms: improving online presence, resolving inbound escalations and managing crises.",
        "Ran influencer marketing end to end: scouting, negotiation, research, content writing, UGC and campaign creatives.",
        "Managed Instagram and LinkedIn, owned monthly content calendars and drove lead generation."
      ],
      achievements: [
        { value: "4,000+", label: "DMs handled" },
        { value: "100+", label: "Escalations resolved" },
        { value: "369K", label: "Followers managed" }
      ]
    },
    {
      id: "masai-amm",
      kind: "Full-time · Promoted",
      company: "Masai School",
      title: "Associate Marketing Manager",
      dates: "[Mon 2026] – Present",
      place: "Bengaluru",
      responsibilities: [
        "Run integrated campaigns across digital, social and offline channels, coordinating content, design and growth.",
        "Lead organic brand visibility across search, answer engines, web pages, Quora and Reddit.",
        "Plan and run BTL activations, guerilla campaigns, hackathons and on-ground events end to end."
      ],
      achievements: [
        { value: "30 days", label: "Neutral → positive AI sentiment" },
        { value: "2.5M", label: "Monthly organic reach" },
        { value: "3,600+", label: "Organic leads a month" },
        { value: "₹15L", label: "Monthly budget managed" }
      ]
    }
  ],

  /* ------------------------------------------------------------------------
     PROJECTS · each becomes a display case and a case-study room.
     category is one of: campaigns, creators, content, community, events, personal
     visuals: add image paths, e.g. ["assets/aeo-before.jpg"]; empty = placeholder
     video: a YouTube embed URL, or leave empty
     ------------------------------------------------------------------------ */
  projects: [
    {
      id: "ai-sentiment",
      featured: true,
      title: "Rewriting what AI says about a brand",
      category: "campaigns",
      categoryLabel: "ORM · AEO · Creators",
      year: "2025–26",
      role: "Scouting, negotiation, script reviews and sentiment tracking",
      summary: "AI Overviews were calling courses scams. A creator-led YouTube program changed the sources the answers were built from.",
      stats: [
        { value: "60", label: "Videos live" },
        { value: "600+", label: "Bookings" },
        { value: "55", label: "Registrations" },
        { value: "5", label: "AI verdicts turned positive" }
      ],
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
      verdicts: [
        { q: "Digital marketing course", before: "Scam allegations", after: "Potentially worthwhile" },
        { q: "Business analytics course", before: "Can be good", after: "Best course, job-ready curriculum" },
        { q: "The brand itself", before: "An existing option", after: "Good, intensive, industry-relevant career school" }
      ],
      learnings: [
        "Fix the source first: the brand's own fees page was causing part of the pricing confusion.",
        "Neutral, explainer-style videos moved AI answers more than glowing reviews did.",
        "Regional creators reach the audiences that big channels miss."
      ],
      visuals: [],
      visualHints: ["Before: AI Overview screenshot, brand blurred", "After: AI Overview screenshot, brand blurred"],
      video: ""
    },
    {
      id: "creator-residence",
      title: "Creator in Residence",
      category: "creators",
      categoryLabel: "Creator partnerships · Community",
      year: "2025–26",
      role: "[Your role]",
      summary: "60 students became brand creators for two months, with weekly themes, masterclasses, script reviews and a live leaderboard.",
      stats: [
        { value: "989", label: "Visitors" },
        { value: "311", label: "Bookings" },
        { value: "148", label: "Registrations" }
      ],
      challenge: "[What problem did the program solve?]",
      objective: "Drive bookings and registrations for IIT Mandi's AI & Data Science program through student creators.",
      strategy: "Turn students into creators, with structure (themes, briefs, reviews) and motivation (a live leaderboard).",
      execution: [
        "60 students joined as brand creators for two months.",
        "Ran weekly themes, masterclasses and script reviews.",
        "Kept a live leaderboard to sustain momentum."
      ],
      deliverables: ["[Number of creator posts]"],
      learnings: ["[What you learned]"],
      visuals: [],
      visualHints: ["Creator content collage", "Leaderboard screenshot"],
      video: ""
    },
    {
      id: "organic-social",
      title: "Organic growth, zero ad spend",
      category: "content",
      categoryLabel: "Content strategy · Social",
      year: "2025–26",
      role: "Instagram & LinkedIn owner",
      summary: "Instagram and LinkedIn run end to end on recurring formats that earned their place through data.",
      stats: [
        { value: "98K → 167K", label: "Instagram followers" },
        { value: "162K → 202K", label: "LinkedIn followers" },
        { value: "1,000", label: "Bookings from social" }
      ],
      challenge: "[Where the accounts started and what was holding them back]",
      objective: "Grow both accounts organically and turn attention into bookings.",
      strategy: "Recurring content formats, kept or cut based on performance data.",
      execution: [
        "Built recurring series: Monday Motivation, Tech Tips Tuesday, AI News Flash and Masai Wrapped.",
        "Owned the monthly content calendar from ideation to publishing."
      ],
      deliverables: ["Monthly content calendars", "Recurring story and post formats"],
      extraStats: [
        { value: "378K", label: "Best Instagram post reach" },
        { value: "344K", label: "Best LinkedIn post reach" }
      ],
      learnings: ["[What you learned]"],
      visuals: [],
      visualHints: ["Best-performing post", "Profile growth screenshot"],
      video: ""
    },
    {
      id: "himshikhar",
      title: "HIMSHIKHAR 2026",
      category: "campaigns",
      categoryLabel: "Marketing campaign",
      year: "2026",
      role: "Content & campaign lead",
      summary: "Multi-channel launch for IIT Mandi's ₹1.5L residential program across YouTube, Telegram, WhatsApp, Instagram and LinkedIn.",
      stats: [{ value: "2.6K", label: "Visitors" }],
      challenge: "[The challenge]",
      objective: "Launch the residential program across five channels.",
      strategy: "[Your strategy]",
      execution: ["Ran the launch across YouTube, Telegram, WhatsApp, Instagram and LinkedIn."],
      deliverables: ["[Deliverables]"],
      learnings: ["[What you learned]"],
      visuals: [],
      visualHints: ["Campaign creative"],
      video: ""
    },
    {
      id: "masai-unlimited",
      title: "Masai Unlimited",
      category: "campaigns",
      categoryLabel: "Growth campaign",
      year: "2025–26",
      role: "Campaign owner",
      summary: "A Telegram and WhatsApp channel campaign covering sourcing, negotiation, copy and creatives.",
      stats: [{ value: "1,606", label: "Paid in 2 months" }],
      challenge: "[The challenge]",
      objective: "[The objective]",
      strategy: "Use Telegram and WhatsApp channels as the main acquisition route.",
      execution: ["Sourced and negotiated with channels.", "Wrote the copy and briefed the creatives."],
      deliverables: ["[Deliverables]"],
      learnings: ["[What you learned]"],
      visuals: [],
      visualHints: ["Channel post screenshot"],
      video: ""
    },
    {
      id: "linkedin-orm",
      title: "LinkedIn Paid ORM",
      category: "creators",
      categoryLabel: "Brand · Creator partnerships",
      year: "2025–26",
      role: "Creator sourcing & tracking",
      summary: "A creator-led brand awareness push that got Masai ranking in LinkedIn search.",
      stats: [{ value: "810K", label: "Impressions" }],
      challenge: "[The challenge]",
      objective: "Get the brand ranking in LinkedIn search.",
      strategy: "Creator-led awareness on LinkedIn.",
      execution: ["Sourced creators and tracked results."],
      deliverables: ["[Deliverables]"],
      learnings: ["[What you learned]"],
      visuals: [],
      visualHints: ["LinkedIn search result screenshot"],
      video: ""
    },
    {
      id: "regional-creators",
      title: "Regional Creator Network",
      category: "creators",
      categoryLabel: "Creator partnerships",
      year: "2025–26",
      role: "Scouting & negotiation",
      summary: "Scouted Tamil, Kannada and Telugu creators, including mega creators.",
      stats: [{ value: "[number]", label: "Creators onboarded" }],
      challenge: "[The challenge]",
      objective: "Reach regional audiences that big channels miss.",
      strategy: "[Your strategy]",
      execution: ["Scouted and negotiated with Tamil, Kannada and Telugu creators, including mega creators."],
      deliverables: ["[Deliverables]"],
      learnings: ["[What you learned]"],
      visuals: [],
      visualHints: ["Creator roster or content"],
      video: ""
    },
    {
      id: "dm-desk",
      title: "The DM & escalations desk",
      category: "community",
      categoryLabel: "ORM · Community",
      year: "2025–26",
      role: "ORM owner",
      summary: "Ran the Instagram and LinkedIn DM dashboard and fixed recurring issues at the root.",
      stats: [
        { value: "4,000+", label: "DMs handled" },
        { value: "100+", label: "Escalations resolved" }
      ],
      challenge: "[The challenge]",
      objective: "Resolve inbound issues quickly and stop them recurring.",
      strategy: "Fix recurring issues at the root, not one reply at a time.",
      execution: ["Ran the Instagram and LinkedIn DM dashboard.", "Handled escalations and crisis responses."],
      deliverables: ["[Deliverables]"],
      learnings: ["[What you learned]"],
      visuals: [],
      visualHints: ["Dashboard screenshot (anonymised)"],
      video: ""
    },
    {
      id: "on-ground",
      title: "[Hackathon or on-ground event]",
      category: "events",
      categoryLabel: "Events · BTL",
      year: "[year]",
      role: "[Your role]",
      summary: "[One line on the hackathon, guerilla campaign or BTL activation.]",
      stats: [{ value: "[number]", label: "[Footfall / participants / registrations]" }],
      challenge: "[The challenge]",
      objective: "[The objective]",
      strategy: "[Your strategy]",
      execution: ["[What you did]"],
      deliverables: ["[Deliverables]"],
      learnings: ["[What you learned]"],
      visuals: [],
      visualHints: ["Event photo", "Event photo"],
      video: ""
    }
  ]
};
