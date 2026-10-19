import {
  Flower2,
  Building2,
  Palmtree,
  BedDouble,
  Briefcase,
  Plane,
  LineChart,
  Users,
} from 'lucide-react';

export const services = [
  {
    id: 'wedding-planner',
    number: '01',
    category: 'Weddings & Celebrations',
    title: 'Wedding Planner',
    tagline: 'Artistry, Precision & Bespoke Celebrations',
    description:
      'Thoughtful wedding planning and coordination — venue selection, design direction, planning, and event coordination that turn celebrations into lasting memories.',
    overview:
      'From intimate ceremonies to grand multi-day celebrations, our wedding advisory orchestrates every chapter with creative vision, vendor mastery, and serene, meticulous precision. We relieve the pressure of planning so you and your families can immerse fully in every moment.',
    image:
      'https://images.pexels.com/photos/37828118/pexels-photo-37828118.jpeg?auto=compress&cs=tinysrgb&w=1600',
    alt: 'Elegant outdoor wedding ceremony with floral arrangements and pastel decor',
    cta: 'Explore Wedding Planning',
    icon: Flower2,
    deliverables: [
      'Concept design, theme narrative & complete mood board curation',
      'Venue search, date locking & vendor contract negotiation',
      'Artisanal floral, lighting, stage & tablescape styling',
      'Guest hospitality, RSVP tracking & bespoke welcome suites',
      'Day-of minute-by-minute timeline direction and back-of-house coordination',
    ],
    highlights: [
      { label: 'Coordination', value: '360° End-to-End' },
      { label: 'Aesthetic', value: 'Bespoke Luxury' },
      { label: 'Guest Service', value: 'White-Glove' },
    ],
    process: [
      { step: '01', title: 'Creative Discovery', desc: 'Understanding your story, aesthetic preferences, guest count, and family traditions.' },
      { step: '02', title: 'Venue & Vendor Matching', desc: 'Shortlisting handpicked venues and securing top caterers, florists, and artists.' },
      { step: '03', title: 'Detailed Design & Logistics', desc: 'Curating floorplans, tasting sessions, decor mockups, and minute-by-minute schedules.' },
      { step: '04', title: 'Seamless Execution', desc: 'On-ground direction ensuring every ceremony unfolds gracefully without friction.' },
    ],
    idealFor: [
      'Couples seeking a tranquil, elevated wedding planning journey',
      'Multi-day traditional and fusion celebrations requiring heavy logistics',
      'Families desiring discreet, high-touch guest hospitality management',
    ],
    gallery: [
      {
        video: '/images/Destinations Wedding.mp4',
        url: 'https://images.pexels.com/photos/37828118/pexels-photo-37828118.jpeg?auto=compress&cs=tinysrgb&w=1600',
        caption: 'Bespoke floral garden ceremony film & setup',
      },
      {
        url: 'https://images.pexels.com/photos/32476128/pexels-photo-32476128.jpeg?auto=compress&cs=tinysrgb&w=1200',
        caption: 'Bespoke floral garden ceremony design',
      },
      {
        url: 'https://images.pexels.com/photos/33485965/pexels-photo-33485965.jpeg?auto=compress&cs=tinysrgb&w=1200',
        caption: 'Grand evening reception tablescape',
      },
    ],
    video: {
      src: '/images/Destinations Wedding.mp4',
      loop: '/images/Destinations Wedding.mp4',
      poster: 'https://images.pexels.com/photos/37828118/pexels-photo-37828118.jpeg?auto=compress&cs=tinysrgb&w=1600',
      title: 'Watch Wedding Film',
      caption: 'Artistry, precision and bespoke celebrations brought to life',
    },
  },
  {
    id: 'banquet-booking',
    number: '02',
    category: 'Weddings & Celebrations',
    title: 'Banquet Booking & Consultancy',
    tagline: 'Premier Venues & Seamless Event Hospitality',
    description:
      'Guidance for selecting suitable banquet venues, coordinating event-space requirements, and evaluating hospitality and event-planning options.',
    overview:
      'Selecting the ideal banquet space requires evaluating acoustic quality, circulation flows, catering infrastructure, and contractual terms. We audit venues objectively to guarantee optimal spaces, negotiated privileges, and seamless on-ground hospitality.',
    image:
      'https://images.pexels.com/photos/30311728/pexels-photo-30311728.jpeg?auto=compress&cs=tinysrgb&w=1600',
    alt: 'Luxurious ballroom with chandeliers arranged for a grand evening event',
    cta: 'Explore Banquet Consultancy',
    icon: Building2,
    deliverables: [
      'Comprehensive venue site audits, capacity checks & technical evaluations',
      'Exclusive date reservations & favorable contractual term negotiations',
      'Banquet layout design, stage placement & guest circulation planning',
      'Catering menu curation, live food station planning & beverage advisory',
      'Liaison with hotel banqueting teams and operational management',
    ],
    highlights: [
      { label: 'Venue Network', value: '150+ Partner Spaces' },
      { label: 'Contracting', value: 'Optimized Value' },
      { label: 'Setup', value: 'Flawless Spatial Flow' },
    ],
    process: [
      { step: '01', title: 'Needs Analysis', desc: 'Establishing spatial, culinary, AV, and budget benchmarks for your gathering.' },
      { step: '02', title: 'Site Inspection', desc: 'Auditing physical ballrooms, green rooms, loading bays, and acoustic balance.' },
      { step: '03', title: 'Negotiation & Booking', desc: 'Securing preferred pricing, corkage terms, and complimentary room provisions.' },
      { step: '04', title: 'Event Handover', desc: 'Aligning the venue banquet team with your decorators and event production leads.' },
    ],
    idealFor: [
      'High-profile anniversary galas and family milestone dinners',
      'Corporate annual banquets and prestigious appreciation awards',
      'Pre-wedding sangeet and cocktail evenings requiring expansive ballrooms',
    ],
    gallery: [
      {
        video: '/images/Banquetbooking.mp4',
        url: 'https://images.pexels.com/photos/30311728/pexels-photo-30311728.jpeg?auto=compress&cs=tinysrgb&w=1600',
        caption: 'Grand ballroom walkthrough & table illumination',
      },
      {
        url: 'https://images.pexels.com/photos/33914530/pexels-photo-33914530.jpeg?auto=compress&cs=tinysrgb&w=1200',
        caption: 'Chandeliers and illuminated ballroom layout',
      },
      {
        url: 'https://images.pexels.com/photos/695193/pexels-photo-695193.jpeg?auto=compress&cs=tinysrgb&w=1600',
        caption: 'Welcoming reception foyer and banquet arrival lobby',
      },
    ],
    video: {
      src: '/images/Banquetbooking.mp4',
      loop: '/images/Banquetbooking.mp4',
      poster: 'https://images.pexels.com/photos/30311728/pexels-photo-30311728.jpeg?auto=compress&cs=tinysrgb&w=1600',
      title: 'Watch Banquet Film',
      caption: 'Grand ballroom layouts, chandelier lighting and seamless guest flow',
    },
  },
  {
    id: 'resorts',
    number: '03',
    category: 'Hospitality & Stays',
    title: 'Resorts',
    tagline: 'Visionary Resort Concepts, Architecture & Operations',
    description:
      'Consultancy for resort concepts, property planning, guest experiences, hospitality strategy, and operational improvement.',
    overview:
      'We guide developers and owners through the complete lifecycle of luxury resorts — from pristine greenfield master planning and architectural positioning to signature wellness concepts and operational yield optimization.',
    image:
      'https://images.pexels.com/photos/38406370/pexels-photo-38406370.jpeg?auto=compress&cs=tinysrgb&w=1600',
    alt: 'Luxurious resort with infinity pool, palm trees, and elegant architecture',
    cta: 'Explore Resort Consultancy',
    icon: Palmtree,
    deliverables: [
      'Feasibility studies, destination positioning & guest persona blueprints',
      'Architectural master-planning collaboration & villa flow optimization',
      'Interior narrative, sensory touchpoint curation & procurement advisory',
      'Standard Operating Procedures (SOPs), staff recruitment & hospitality training',
      'Pre-opening countdown management & post-launch asset performance review',
    ],
    highlights: [
      { label: 'Capability', value: 'Concept to Launch' },
      { label: 'Focus', value: 'High ADR & Yield' },
      { label: 'Scope', value: 'Boutique to Sanctuary' },
    ],
    process: [
      { step: '01', title: 'Concept & Positioning', desc: 'Defining the resort narrative, target traveler demographics, and revenue model.' },
      { step: '02', title: 'Design & Engineering Review', desc: 'Reviewing schematics for circulation, energy efficiency, and guest intimacy.' },
      { step: '03', title: 'Pre-Opening Readiness', desc: 'Hiring leadership, curating culinary concepts, and conducting mock service drills.' },
      { step: '04', title: 'Asset Stewardship', desc: 'Ongoing quality audits, guest satisfaction tracking, and profitability benchmarking.' },
    ],
    idealFor: [
      'Property developers entering high-end hospitality and eco-resorts',
      'Existing properties needing repositioning, renovation, and brand revitalization',
      'Hospitality investors seeking objective operational audits before acquisitions',
    ],
    gallery: [
      {
        video: '/images/Resorts.mp4',
        url: 'https://images.pexels.com/photos/38406370/pexels-photo-38406370.jpeg?auto=compress&cs=tinysrgb&w=1600',
        caption: 'Eco-resort master plan & cliffside deck',
      },
      {
        url: 'https://images.pexels.com/photos/23696832/pexels-photo-23696832.jpeg?auto=compress&cs=tinysrgb&w=1400',
        caption: 'Tropical sanctuary infinity pool and architectural deck',
      },
      {
        url: 'https://images.pexels.com/photos/3011575/pexels-photo-3011575.jpeg?auto=compress&cs=tinysrgb&w=1600',
        caption: 'Serene pavilion overlooking natural wilderness landscapes',
      },
    ],
    video: {
      src: '/images/Resorts.mp4',
      loop: '/images/Resorts.mp4',
      poster: 'https://images.pexels.com/photos/38406370/pexels-photo-38406370.jpeg?auto=compress&cs=tinysrgb&w=1600',
      title: 'Watch Resort Film',
      caption: 'Sanctuary architecture, infinity pools, and serene guest retreats',
    },
  },
  {
    id: 'hotel-stays',
    number: '04',
    category: 'Hospitality & Stays',
    title: 'Hotel Stays',
    tagline: 'Curated Stays, Bespoke Partnerships & VIP Access',
    description:
      'Assistance with hotel accommodation options, hospitality partnerships, and suitable stay experiences for different travel and business requirements.',
    overview:
      'Whether traveling for executive roadshows, leisure retreats, or private milestone getaways, our stay advisory provides access to preferred room inventories, bespoke concierge upgrades, and seamless check-in protocols across verified luxury properties.',
    image:
      'https://images.pexels.com/photos/8082217/pexels-photo-8082217.jpeg?auto=compress&cs=tinysrgb&w=1600',
    alt: 'Spacious modern hotel bedroom with chandelier and minimalist elegant design',
    cta: 'Explore Hotel Stays',
    icon: BedDouble,
    deliverables: [
      'Tailored hotel shortlisting tailored to personal preferences and geography',
      'Negotiated corporate and bespoke leisure rates with complimentary perks',
      'Direct liaison with hotel general managers for VIP guest protocol',
      'Early check-in, late check-out & suite upgrade prioritization',
      'Discreet on-call support for dietary, transport, or schedule adjustments',
    ],
    highlights: [
      { label: 'Partnerships', value: 'Preferred Tier Privileges' },
      { label: 'Flexibility', value: 'Effortless Modifications' },
      { label: 'Support', value: '24/7 Dedicated Concierge' },
    ],
    process: [
      { step: '01', title: 'Preferences Profiling', desc: 'Capturing room style, neighborhood proximity, dining tastes, and schedule constraints.' },
      { step: '02', title: 'Curation & Sourcing', desc: 'Recommending curated options with negotiated rates and tailored inclusions.' },
      { step: '03', title: 'Booking & VIP Confirmation', desc: 'Briefing the hotel management team on guest preferences and arrival details.' },
      { step: '04', title: 'Stay Accompaniment', desc: 'Real-time assistance throughout the stay for concierge requests and smooth departures.' },
    ],
    idealFor: [
      'C-suite executives and board members requiring seamless business stays',
      'Discerning couples and families seeking curated boutique experiences',
      'Long-term residential guests and diplomatic delegations',
    ],
    gallery: [
      {
        video: '/images/Hotels.mp4',
        url: 'https://images.pexels.com/photos/8082217/pexels-photo-8082217.jpeg?auto=compress&cs=tinysrgb&w=1600',
        caption: 'Presidential suite walkthrough & hospitality lounge',
      },
      {
        url: 'https://images.pexels.com/photos/3688261/pexels-photo-3688261.jpeg?auto=compress&cs=tinysrgb&w=1200',
        caption: 'Refined boutique suite with bespoke architectural lighting',
      },
      {
        url: 'https://images.pexels.com/photos/695193/pexels-photo-695193.jpeg?auto=compress&cs=tinysrgb&w=1600',
        caption: 'Grand executive lounge for private meetings and quiet relaxation',
      },
    ],
    video: {
      src: '/images/Hotels.mp4',
      loop: '/images/Hotels.mp4',
      poster: 'https://images.pexels.com/photos/8082217/pexels-photo-8082217.jpeg?auto=compress&cs=tinysrgb&w=1600',
      title: 'Watch Hotel Experience Film',
      caption: 'Luxury suites, executive hospitality, and urban sanctuaries',
    },
  },
  {
    id: 'corporate-events',
    number: '05',
    category: 'Corporate & Advisory',
    title: 'Corporate Events',
    tagline: 'Strategic Summits, Conferences & Immersive Galas',
    description:
      'Planning and coordination support for corporate gatherings, conferences, business events, professional meetings, and associated hospitality requirements.',
    overview:
      'We elevate business summits, investor gatherings, product unveilings, and executive retreats into compelling brand touchpoints. We combine state-of-the-art audiovisual production, precise timekeeping, and world-class hospitality.',
    image:
      'https://images.pexels.com/photos/9275222/pexels-photo-9275222.jpeg?auto=compress&cs=tinysrgb&w=1600',
    alt: 'Audience watching a presentation at a conference with stage lights',
    cta: 'Explore Corporate Events',
    icon: Briefcase,
    deliverables: [
      'End-to-end event production, keynote staging & broadcast-grade AV setup',
      'Delegate journey mapping, automated badge registration & crowd flow',
      'VIP speaker handling, private green rooms & high-security protocols',
      'Curated executive networking lunches, gala dinners & live entertainment',
      'Comprehensive post-event documentation, media asset packages & attendee feedback',
    ],
    highlights: [
      { label: 'Scale', value: '50 to 2,500+ Attendees' },
      { label: 'Technology', value: 'Broadcast-Grade AV' },
      { label: 'Execution', value: 'Zero-Tolerance Precision' },
    ],
    process: [
      { step: '01', title: 'Brief & Objective Alignment', desc: 'Clarifying brand messaging, target audience, agenda structure, and deliverables.' },
      { step: '02', title: 'Production & Technical Blueprint', desc: 'Designing stage lighting, acoustics, projection mapping, and digital engagement tools.' },
      { step: '03', title: 'Hospitality & Delegate Care', desc: 'Managing lodging blocks, dietary requirements, transfers, and welcome kits.' },
      { step: '04', title: 'Live Direction & Debrief', desc: 'Full show-calling on-site, stage manager coordination, and final performance reporting.' },
    ],
    idealFor: [
      'Annual enterprise conferences, partner summits & product showcases',
      'Executive leadership retreats requiring confidentiality and high sophistication',
      'Global investor symposiums and international trade forums',
    ],
    gallery: [
      {
        video: '/images/Corporate Event.mp4',
        url: 'https://images.pexels.com/photos/9275222/pexels-photo-9275222.jpeg?auto=compress&cs=tinysrgb&w=1600',
        caption: 'Auditorium keynote staging & delegate session',
      },
      {
        url: 'https://images.pexels.com/photos/20733081/pexels-photo-20733081.jpeg?auto=compress&cs=tinysrgb&w=1400',
        caption: 'Keynote stage and presentation amphitheater design',
      },
      {
        url: 'https://images.pexels.com/photos/7108210/pexels-photo-7108210.jpeg?auto=compress&cs=tinysrgb&w=1600',
        caption: 'Collaborative breakout session environment and networking lounge',
      },
    ],
    video: {
      src: '/images/Corporate Event.mp4',
      loop: '/images/Corporate Event.mp4',
      poster: 'https://images.pexels.com/photos/9275222/pexels-photo-9275222.jpeg?auto=compress&cs=tinysrgb&w=1600',
      title: 'Watch Corporate Summit Film',
      caption: 'Broadcast-grade summits, keynote stages, and seamless executive offsites',
    },
  },
  {
    id: 'destination-weddings',
    number: '06',
    category: 'Weddings & Celebrations',
    title: 'Destination Weddings',
    tagline: 'Iconic Palaces, Coastal Havens & Distant Horizons',
    description:
      'Guidance for destination selection, wedding venue coordination, guest accommodation, logistics, and memorable celebrations in distinctive locations.',
    overview:
      'A destination wedding is a multi-day communal journey. Whether set in a royal palace in Rajasthan, a cliffside resort by the sea, or an alpine valley, we orchestrate travel charters, local authority permits, culinary imports, and authentic cultural hospitality.',
    image:
      'https://images.pexels.com/photos/33485963/pexels-photo-33485963.jpeg?auto=compress&cs=tinysrgb&w=1600',
    alt: 'Beautiful outdoor wedding setup in an Indian palace courtyard',
    cta: 'Explore Destination Weddings',
    icon: Plane,
    deliverables: [
      'Comprehensive destination & property scouting with multi-criteria audit',
      'Flight charters, train bookings, airport reception desks & luxury fleet transit',
      'Multilingual guest relations team stationed at all arrival hubs',
      'Custom decor staging, structural engineering & regional municipal clearances',
      'Excursion curation, local artisan bazaars & immersive pre-wedding festivities',
    ],
    highlights: [
      { label: 'Destinations', value: 'Heritage & Tropical' },
      { label: 'Logistics', value: 'End-to-End Guest Journey' },
      { label: 'Exclusivity', value: 'Private Property Buyouts' },
    ],
    process: [
      { step: '01', title: 'Destination Scouting', desc: 'Comparing weather patterns, flight access, property capacities, and local regulations.' },
      { step: '02', title: 'Property Buyout & Lock-in', desc: 'Negotiating full property privatization, exclusivity agreements, and room tariffs.' },
      { step: '03', title: 'Cross-Border Supply Chain', desc: 'Deploying decor teams, specialty chefs, sound engineers, and floral suppliers.' },
      { step: '04', title: 'Three-Day Celebration Control', desc: 'Running 24-hour hospitality desks, seamless event transitions, and guest departure support.' },
    ],
    idealFor: [
      'Heritage palace weddings in Jaipur, Udaipur, Jodhpur, and South India',
      'Beachside celebrations in Goa, Kerala, and international island escapes',
      'Non-resident and international families looking for effortless Indian celebrations',
    ],
    gallery: [
      {
        video: '/images/Destinations Wedding.mp4',
        url: 'https://images.pexels.com/photos/33485963/pexels-photo-33485963.jpeg?auto=compress&cs=tinysrgb&w=1600',
        caption: 'Royal palace celebration & night illumination',
      },
      {
        url: 'https://images.pexels.com/photos/33485965/pexels-photo-33485965.jpeg?auto=compress&cs=tinysrgb&w=1200',
        caption: 'Palace courtyard illumination and ceremonial mandap setup',
      },
      {
        url: 'https://images.pexels.com/photos/32476128/pexels-photo-32476128.jpeg?auto=compress&cs=tinysrgb&w=1200',
        caption: 'Lush sunset lawn arrangement for traditional sangeet celebration',
      },
    ],
    video: {
      src: '/images/Destinations Wedding.mp4',
      loop: '/images/Destinations Wedding.mp4',
      poster: 'https://images.pexels.com/photos/33485963/pexels-photo-33485963.jpeg?auto=compress&cs=tinysrgb&w=1600',
      title: 'Watch Destination Wedding Film',
      caption: 'Palace ceremonies, beachside sunsets, and royal celebrations',
    },
  },
  {
    id: 'management-consultancy',
    number: '07',
    category: 'Corporate & Advisory',
    title: 'Management Consultancy',
    tagline: 'Strategic Growth, Operational Agility & Hospitality Profitability',
    description:
      'Strategic consultancy for business planning, management improvement, hospitality operations, performance evaluation, and long-term business development.',
    overview:
      'We bring deep industry perspective to hospitality entrepreneurs and property owners. By combining rigorous operational audits, financial modeling, service standardization, and brand repositioning, we transform underperforming operations into resilient, high-margin businesses.',
    image:
      'https://images.pexels.com/photos/7108210/pexels-photo-7108210.jpeg?auto=compress&cs=tinysrgb&w=1600',
    alt: 'Two business professionals discussing documents in a modern office building',
    cta: 'Explore Management Consultancy',
    icon: LineChart,
    deliverables: [
      '360° operational diagnostic audits & guest satisfaction benchmarks',
      'Food & beverage margin analysis, menu engineering & waste minimization',
      'Standard operating manual (SOP) authoring & front-line leadership coaching',
      'Revenue management, distribution channel optimization & yield strategy',
      'Organizational structuring, key performance metrics & retention plans',
    ],
    highlights: [
      { label: 'Impact', value: 'Measurable EBITDA Lift' },
      { label: 'Approach', value: 'Data + Operational Reality' },
      { label: 'Tenure', value: 'Advisory to Turnaround' },
    ],
    process: [
      { step: '01', title: 'Diagnostic Immersion', desc: 'Analyzing P&Ls, guest review metrics, payroll efficiency, and operational bottlenecks.' },
      { step: '02', title: 'Strategic Roadmap', desc: 'Formulating actionable interventions across pricing, purchasing, service, and marketing.' },
      { step: '03', title: 'Implementation Coaching', desc: 'Working hands-on with property general managers and department heads to execute changes.' },
      { step: '04', title: 'Quarterly Performance Auditing', desc: 'Measuring progress against established KPIs and fine-tuning market strategies.' },
    ],
    idealFor: [
      'Independent hotels and resort properties seeking improved operating margins',
      'Restaurant groups and event venues planning regional expansion or franchise models',
      'Owners looking for structured turnaround leadership for hospitality assets',
    ],
    gallery: [
      {
        video: '/images/Managemnet Consulting.mp4',
        url: 'https://images.pexels.com/photos/7108210/pexels-photo-7108210.jpeg?auto=compress&cs=tinysrgb&w=1600',
        caption: 'Strategic management review & operational diagnostics',
      },
      {
        url: 'https://images.pexels.com/photos/9275222/pexels-photo-9275222.jpeg?auto=compress&cs=tinysrgb&w=1600',
        caption: 'Strategic board review and executive advisory presentation',
      },
      {
        url: 'https://images.pexels.com/photos/695193/pexels-photo-695193.jpeg?auto=compress&cs=tinysrgb&w=1600',
        caption: 'Refined lobby operations and front-of-house service optimization',
      },
    ],
    video: {
      src: '/images/Managemnet Consulting.mp4',
      loop: '/images/Managemnet Consulting.mp4',
      poster: 'https://images.pexels.com/photos/7108210/pexels-photo-7108210.jpeg?auto=compress&cs=tinysrgb&w=1600',
      title: 'Watch Consultancy Film',
      caption: 'Strategic master planning, asset yield, and hospitality leadership',
    },
  },
  {
    id: 'group-booking',
    number: '08',
    category: 'Hospitality & Stays',
    title: 'Group Booking',
    tagline: 'Effortless Coordination for Large Group Accommodations',
    description:
      'Coordination support for group accommodation and booking requirements involving corporate teams, families, celebrations, organized travel, and other group arrangements.',
    overview:
      'Coordinating room blocks across multiple properties, tracking arrival waves, and managing master folio billing can overwhelm coordinators. We serve as your single point of accountability — negotiating preferential group rates, managing room allocation portals, and ensuring seamless arrivals.',
    image:
      'https://images.pexels.com/photos/695193/pexels-photo-695193.jpeg?auto=compress&cs=tinysrgb&w=1600',
    alt: 'Spacious luxury hotel lobby with crystal chandeliers and marble statue',
    cta: 'Explore Group Booking',
    icon: Users,
    deliverables: [
      'Multi-hotel room block negotiations & unified contract consolidation',
      'Dynamic guest rooming list management & custom dietary tracking',
      'Dedicated digital check-in coordination & expedited key distribution',
      'Master billing reconciliation & split incidentals management',
      'Private group dining spaces, hospitality suites & transit coordination',
    ],
    highlights: [
      { label: 'Capacity', value: '10 to 500+ Rooms' },
      { label: 'Rates', value: 'Tiered Volume Advantages' },
      { label: 'Accountability', value: 'Single Point of Contact' },
    ],
    process: [
      { step: '01', title: 'Block Requirement Mapping', desc: 'Assessing room counts, bed configurations, stay dates, and budget thresholds.' },
      { step: '02', title: 'Inventory Negotiation', desc: 'Securing block holds with lenient attrition clauses and favorable deposit schedules.' },
      { step: '03', title: 'Rooming List Coordination', desc: 'Gathering flight times, special accommodations, and pairing requests systematically.' },
      { step: '04', title: 'Arrival Concierge', desc: 'On-site team handling pre-keyed packet distribution and welcoming arriving parties.' },
    ],
    idealFor: [
      'Wedding guest contingents requiring multi-day lodging in designated properties',
      'Corporate conference attendees, executive teams & international sales meetings',
      'Cultural delegations, sports teams & organized heritage travel expeditions',
    ],
    gallery: [
      {
        video: '/images/Group booking.mp4',
        url: 'https://images.pexels.com/photos/695193/pexels-photo-695193.jpeg?auto=compress&cs=tinysrgb&w=1600',
        caption: 'VIP group reception & coordinated arrivals',
      },
      {
        url: 'https://images.pexels.com/photos/8082217/pexels-photo-8082217.jpeg?auto=compress&cs=tinysrgb&w=1600',
        caption: 'Interconnected rooms and suites customized for group hospitality',
      },
      {
        url: 'https://images.pexels.com/photos/30311728/pexels-photo-30311728.jpeg?auto=compress&cs=tinysrgb&w=1600',
        caption: 'Private banquet breakfast hall reserved exclusively for group delegates',
      },
    ],
    video: {
      src: '/images/Group booking.mp4',
      loop: '/images/Group booking.mp4',
      poster: 'https://images.pexels.com/photos/695193/pexels-photo-695193.jpeg?auto=compress&cs=tinysrgb&w=1600',
      title: 'Watch Group Hospitality Film',
      caption: 'Group delegation coordination, room blocks, and VIP transit',
    },
  },
];

export const resortCapabilities = [
  {
    number: 'I',
    title: 'Resort Concept Planning',
    description:
      'Defining the vision, positioning, and guest promise that shape every later design and operational decision.',
  },
  {
    number: 'II',
    title: 'Resort Construction Planning',
    description:
      'Coordinating build sequencing, budgets, and timelines so construction supports the intended guest experience.',
  },
  {
    number: 'III',
    title: 'Resort Interior Planning',
    description:
      'Interior direction that balances atmosphere, durability, and brand identity across every guest touchpoint.',
  },
  {
    number: 'IV',
    title: 'Resort Infrastructure Planning',
    description:
      'Utility, circulation, and back-of-house infrastructure planned for operational flow and long-term flexibility.',
  },
  {
    number: 'V',
    title: 'Resort Operation Management',
    description:
      'Standard operating procedures, staffing structure, and service design that keep daily operations effortless.',
  },
  {
    number: 'VI',
    title: 'Resort Pre-opening Services',
    description:
      'Pre-opening readiness — recruitment, training, soft launches, and positioning that set up a confident opening.',
  },
  {
    number: 'VII',
    title: 'Resort Asset Management',
    description:
      'Long-term stewardship of the property as an asset: performance review, reinvestment planning, and value protection.',
  },
];

export const projects = [
  {
    id: 'p1',
    title: 'Coastal Resort Refinement',
    category: 'Resort Consultancy',
    location: 'Demonstration Entry',
    description:
      'A concept and operations review for a beachfront resort, focusing on guest journey and service flow.',
    image:
      'https://images.pexels.com/photos/23696832/pexels-photo-23696832.jpeg?auto=compress&cs=tinysrgb&w=1400',
    alt: 'Sunset over a tropical resort pool with palm trees and vibrant sky reflections',
    span: 'wide',
  },
  {
    id: 'p2',
    title: 'Garden Wedding Direction',
    category: 'Wedding Planning',
    location: 'Demonstration Entry',
    description:
      'Design direction and coordination for a multi-day wedding across garden and banquet settings.',
    image:
      'https://images.pexels.com/photos/32476128/pexels-photo-32476128.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Sophisticated wedding decoration with white floral arrangements and elegant seating',
    span: 'tall',
  },
  {
    id: 'p3',
    title: 'Heritage Palace Celebration',
    category: 'Destination Wedding',
    location: 'Demonstration Entry',
    description:
      'Destination selection and guest logistics for a celebration set within a heritage palace property.',
    image:
      'https://images.pexels.com/photos/33485965/pexels-photo-33485965.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Stunning wedding setup at a grand Indian palace with elaborate floral arrangements',
    span: 'regular',
  },
  {
    id: 'p4',
    title: 'Business Conference Staging',
    category: 'Corporate Events',
    location: 'Demonstration Entry',
    description:
      'Stage design, AV planning, and hospitality coordination for a multi-day corporate conference.',
    image:
      'https://images.pexels.com/photos/20733081/pexels-photo-20733081.jpeg?auto=compress&cs=tinysrgb&w=1400',
    alt: 'Large audience listening to a speaker at a conference venue',
    span: 'wide',
  },
  {
    id: 'p5',
    title: 'Boutique Hotel Stay Curation',
    category: 'Hotel Stays',
    location: 'Demonstration Entry',
    description:
      'Accommodation strategy and hospitality partnerships for a curated boutique stay programme.',
    image:
      'https://images.pexels.com/photos/3688261/pexels-photo-3688261.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Spacious luxurious hotel room with two comfortable twin beds and stylish design',
    span: 'regular',
  },
  {
    id: 'p6',
    title: 'Grand Banquet Coordination',
    category: 'Banquet Consultancy',
    location: 'Demonstration Entry',
    description:
      'Venue evaluation and event-space planning for a large-scale banquet celebration.',
    image:
      'https://images.pexels.com/photos/33914530/pexels-photo-33914530.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Luxurious wedding hall decorated with chandeliers and floral arrangements',
    span: 'tall',
  },
];
