import {
  Code2,
  Smartphone,
  Search,
  Palette,
  Cloud,
  Brain,
  Zap,
  Shield,
  Globe,
  Sparkles,
  Layers,
  Users,
  FileCheck,
  Megaphone,
  ShoppingCart,
  GraduationCap,
  Layout,
  Server,
  Share2,
} from 'lucide-react';

export const BG_VIDEO = '/inteli-brijj-reel.mp4';

export const BRAND_NAME = 'Inteliq Brijj';
export const BRAND_EMAIL = 'hello@inteliqbrijj.com';

export const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'IT Solutions', path: '/it-solutions' },
  { label: 'Digital Marketing', path: '/digital-marketing' },
  { label: 'Industries', path: '/industries' },
  { label: 'Contact', path: '/contact' },
];

export const services = [
  {
    icon: Code2,
    title: 'Web Development',
    description:
      'Responsive, performance-ready websites and web applications engineered for speed, security and scale.',
    features: ['Business & product sites', 'Custom web apps', 'E-commerce ready'],
  },
  {
    icon: Smartphone,
    title: 'App Development',
    description:
      'iOS and Android apps built for real usage — clean interfaces, solid performance and App Store readiness.',
    features: ['iOS & Android', 'Cross-platform builds', 'Launch support'],
  },
  {
    icon: Search,
    title: 'Digital Marketing & SEO',
    description:
      'Visibility that puts you in front of the right audience — SEO, content optimisation, campaigns and paid acquisition.',
    features: ['Keyword & on-page SEO', 'Campaign management', 'Google & paid media'],
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description:
      'User-centred interfaces and flows that feel clear, modern and conversion-ready across web and mobile.',
    features: ['Interface design', 'User flows', 'Design systems'],
  },
  {
    icon: Cloud,
    title: 'Cloud & DevOps',
    description:
      'Secure, automated infrastructure on AWS, GCP and Azure with CI/CD pipelines that ship confidently every day.',
    features: ['Infrastructure as code', 'Observability', 'Zero-downtime deploys'],
  },
  {
    icon: Brain,
    title: 'AI & Intelligent Systems',
    description:
      'Practical AI integrations—chat agents, recommendation engines and automation—that deliver real business value.',
    features: ['LLM orchestration', 'Custom models', 'AI-powered workflows'],
  },
];

export const processSteps = [
  {
    step: '01',
    title: 'Discover',
    description:
      'We map your goals, challenges and success metrics so the work starts from real business needs — not assumptions.',
  },
  {
    step: '02',
    title: 'Plan',
    description:
      'A clear roadmap, priorities and architecture so every sprint moves the product and the pipeline in the same direction.',
  },
  {
    step: '03',
    title: 'Build',
    description:
      'Web, app and growth systems delivered in transparent cycles with weekly demos and reviewable progress.',
  },
  {
    step: '04',
    title: 'Launch & Refine',
    description:
      'Ship, measure and improve — testing, analytics and continuous optimisation after go-live.',
  },
];

export const techStack = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL',
  'AWS', 'Docker', 'Kubernetes', 'GraphQL', 'Tailwind', 'Framer Motion',
];

export const values = [
  { icon: Zap, label: 'Performance first' },
  { icon: Shield, label: 'Security by design' },
  { icon: Globe, label: 'Global scale ready' },
  { icon: Sparkles, label: 'Delight in the details' },
];

export const pillars = [
  {
    icon: Users,
    title: 'Built Around Your Business',
    description:
      'Solutions planned around your goals, audience and market — not a one-size package.',
  },
  {
    icon: Layers,
    title: 'IT + Marketing Together',
    description:
      'Technology and digital marketing under one team so build and reach move as one system.',
  },
  {
    icon: FileCheck,
    title: 'Outcome Focused',
    description:
      'We focus on leads, conversions and meaningful results — not vanity deliverables alone.',
  },
  {
    icon: Globe,
    title: 'Serving Across India',
    description:
      'Based in Jaipur, delivering IT and digital marketing for businesses across India.',
  },
];

export const capabilities = [
  {
    title: 'Commerce & Marketplaces',
    category: 'Web · Full-stack',
    description:
      'Headless storefronts, real-time inventory and checkout flows engineered to convert and scale with demand.',
    color: 'from-emerald-500/20 to-teal-500/10',
  },
  {
    title: 'Operations Dashboards',
    category: 'SaaS · Data',
    description:
      'Internal tools and analytics platforms that turn raw operational data into decisions your team can act on same-day.',
    color: 'from-emerald-500/20 to-teal-500/10',
  },
  {
    title: 'Mobile Product Experiences',
    category: 'iOS · Android',
    description:
      'Offline-first, App Store-ready apps built for daily engagement — from onboarding through retention.',
    color: 'from-green-500/20 to-teal-500/10',
  },
];

/** Detailed service offerings for Industries / IT / Digital Marketing pages */
export const detailedServices = [
  {
    id: 'digital-marketing',
    number: '01',
    title: 'Digital Marketing',
    headline: 'Turn Attention Into Opportunity',
    description:
      'We create digital marketing strategies that connect your business with the right audience and turn online attention into meaningful opportunities.',
    services: [
      'Search Engine Marketing',
      'PPC / Google Ads',
      'Meta Ads',
      'Content Marketing',
      'Email Marketing',
      'Affiliate Marketing',
      'Conversion Rate Optimisation',
      'Online Reputation Management',
      'Lead Generation',
      'Marketing Automation',
    ],
    cta: 'Explore Digital Marketing',
    path: '/digital-marketing',
    icon: Megaphone,
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&q=85&auto=format&fit=crop',
    accent: '#7c3aed',
  },
  {
    id: 'seo',
    number: '02',
    title: 'SEO',
    headline: 'Be Visible When Your Customers Are Searching',
    description:
      'Our SEO services combine technical optimisation, useful content and search strategy to improve visibility and attract relevant audiences.',
    services: [
      'Local SEO',
      'Technical SEO',
      'On Page SEO',
      'Off Page SEO',
      'E-commerce SEO',
      'International SEO',
      'Enterprise SEO',
      'SEO Audit',
      'Link Building',
      'Keyword Research',
      'Competitor SEO Analysis',
      'Google Business Profile Optimisation',
    ],
    cta: 'Explore SEO Services',
    path: '/digital-marketing#seo',
    icon: Search,
    image:
      'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=1400&q=85&auto=format&fit=crop',
    accent: '#059669',
  },
  {
    id: 'website-development',
    number: '03',
    title: 'Website Development',
    headline: 'Websites Built for People. Designed for Growth.',
    description:
      'We build modern, responsive websites around your brand, customers and business objectives, from business websites to advanced digital platforms.',
    services: [
      'Custom Website Development',
      'WordPress Development',
      'E-commerce Development',
      'Shopify Development',
      'WooCommerce Development',
      'PHP Development',
      'Front End Development',
      'Back End Development',
      'Full Stack Development',
      'CMS Development',
      'Website Maintenance',
      'Website Migration',
      'Website Redesign',
    ],
    cta: 'Explore Website Development',
    path: '/it-solutions#web',
    icon: Code2,
    image:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1400&q=85&auto=format&fit=crop',
    accent: '#0d9488',
  },
  {
    id: 'mobile-app',
    number: '04',
    title: 'Mobile App Development',
    headline: 'From Idea to App',
    description:
      'We turn app ideas into functional digital products designed around your users, features and business requirements.',
    services: [
      'Android App Development',
      'iOS App Development',
      'Cross Platform App Development',
      'Flutter App Development',
      'React Native Development',
      'Custom App Development',
      'App UI/UX Design',
      'App Testing',
      'App Maintenance & Support',
    ],
    cta: 'Explore App Development',
    path: '/it-solutions#mobile',
    icon: Smartphone,
    image:
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1400&q=85&auto=format&fit=crop',
    accent: '#2563eb',
  },
  {
    id: 'social-media',
    number: '05',
    title: 'Social Media Marketing',
    headline: 'Make Your Brand Part of the Conversation',
    description:
      'We combine social strategy, creative content and campaign management to help businesses build stronger relationships with their audiences.',
    services: [
      'Social Media Management',
      'Social Media Marketing',
      'Instagram Marketing',
      'Facebook Marketing',
      'LinkedIn Marketing',
      'YouTube Marketing',
      'Social Media Advertising',
      'Social Media Strategy',
      'Content Creation',
      'Reels & Short Form Video Marketing',
      'Influencer Marketing',
      'Social Media Analytics',
    ],
    cta: 'Explore Social Media Marketing',
    path: '/digital-marketing#social',
    icon: Share2,
    image:
      'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1400&q=85&auto=format&fit=crop',
    accent: '#db2777',
  },
  {
    id: 'uiux',
    number: '06',
    title: 'UI/UX & Design',
    headline: 'Make Digital Experiences Feel Right',
    description:
      'We bring together visual design, usability and user experience to create digital experiences that are clear, engaging and purposeful.',
    services: [
      'UI/UX Design',
      'Website UI Design',
      'Mobile App UI/UX',
      'UX Research',
      'Wireframing',
      'Prototyping',
      'Landing Page Design',
      'Graphic Design',
      'Brand Identity Design',
      'Logo Design',
    ],
    cta: 'Explore UI/UX & Design',
    path: '/it-solutions#design',
    icon: Layout,
    image:
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1400&q=85&auto=format&fit=crop',
    accent: '#7c3aed',
  },
  {
    id: 'software',
    number: '07',
    title: 'Software Development',
    headline: 'Software Built Around Your Business',
    description:
      'We develop custom software around your workflows, operational needs and technical requirements.',
    services: [
      'Custom Software Development',
      'Business Software',
      'CRM Development',
      'ERP Development',
      'SaaS Development',
      'API Development',
      'Third Party API Integration',
      'Business Automation',
      'Custom Web Applications',
      'Enterprise Software',
    ],
    cta: 'Explore Software Development',
    path: '/it-solutions#software',
    icon: Server,
    image:
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1400&q=85&auto=format&fit=crop',
    accent: '#0f766e',
  },
  {
    id: 'ecommerce',
    number: '08',
    title: 'E-commerce Solutions',
    headline: 'Build an Online Store That Does More Than Look Good',
    description:
      'We create and improve e-commerce experiences by combining development, user experience, SEO and digital marketing.',
    services: [
      'E-commerce Website Development',
      'Shopify Development',
      'WooCommerce Development',
      'E-commerce SEO',
      'E-commerce Marketing',
      'Product Page Optimisation',
      'Payment Gateway Integration',
      'E-commerce Maintenance',
      'Marketplace Development',
    ],
    cta: 'Explore E-commerce Solutions',
    path: '/it-solutions#ecommerce',
    icon: ShoppingCart,
    image:
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1400&q=85&auto=format&fit=crop',
    accent: '#ea580c',
  },
  {
    id: 'academic',
    number: '09',
    title: 'Academic Content & Research Support',
    headline: 'Structured Content. Clear Research. Thoughtful Support.',
    description:
      'Our academic content and research support services focus on structured content, editing, proofreading, research support and academic presentation.',
    services: [
      'Academic Content Writing',
      'Research Content',
      'Academic Editing',
      'Academic Proofreading',
      'Dissertation Editing',
      'Research Paper Editing',
      'Literature Review Support',
      'Referencing & Citation Support',
      'Academic Content Development',
      'Research Formatting',
      'Technical & Academic Documentation',
    ],
    cta: 'Explore Academic Content',
    path: '/contact',
    icon: GraduationCap,
    image:
      'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1400&q=85&auto=format&fit=crop',
    accent: '#4f46e5',
  },
];

/** Industry verticals for the Industries page scroll stories */
export const industryStories = [
  {
    id: 'financial',
    title: 'Financial Services',
    tag: 'FinTech · Banking · Insurance',
    downloadLabel: 'Download Now',
    paragraphs: [
      'With customer expectations continuing to change, financial institutions are under pressure to tailor their services to resonate with their customers. The rising level of competition calls for effective marketing strategies to acquire and retain customers to sustain growth. A second area of concern is that of security and compliance, as failing to meet these will result in the organization losing its credibility to serve its customers.',
      'Bringing digital transformation to financial services will result in improved operational efficiency by automating manual tasks and integrating data into a central place so that all teams have convenient access to it for improved business intelligence. Cloud-enabled solutions offer enhanced security and simplify scaling to meet the growing needs of customers. Cloud also facilitates organizations to stay compliant with evolving industry regulations.',
      'Backed by a team of consultants, architects, and developers driven by the challenges of financial services, we lead digital transformation with a holistic approach to empower finance systems to function proactively. The industry is highly competitive, which is why our consultants will work with you to improve compliance, utilize cutting-edge technology, cut operating costs, and improve efficiency with customized solutions that are tailored to your industry and most importantly to your unique requirements.',
    ],
    image:
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1400&q=85&auto=format&fit=crop',
    cardTitle: 'Powering Account Scoring & Reporting Through Salesforce AppExchange Application',
    cardLink: '#',
  },
  {
    id: 'insurance',
    title: 'Insurance',
    tag: 'InsurTech · Providers · Claims',
    downloadLabel: 'Download Now',
    paragraphs: [
      'The insurance industry, which was once stable and predictable, today faces digital disruption, changing customer behaviour, and a competitive market placing immense pressure on insurers. Technology-led strategies put greater emphasis on customer experience for continued success.',
      'By leveraging technological advancements and data analytics, insurance companies can build seamless, digital-first experiences from quote to sale to claim settlement that put customers first.',
      'The development of technology must be preceded by a sound strategic plan that notes current challenges and identifies future growth strategies. Our team brings sector knowledge and functional expertise geared towards improving business processes while reducing costs.',
    ],
    image:
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1400&q=85&auto=format&fit=crop',
    cardTitle: 'Enhanced Operational Efficiency for Insurance Provider with Salesforce Implementation',
    cardLink: '#',
  },
  {
    id: 'healthcare',
    title: 'Healthcare',
    tag: 'Providers · Clinics · HealthTech',
    downloadLabel: 'Explore Solutions',
    paragraphs: [
      'Healthcare organisations must balance patient experience, clinical accuracy and strict regulatory requirements. Patients expect seamless digital journeys — from booking and telehealth to records and follow-up — while teams need systems that reduce friction and support better care decisions.',
      'We help healthcare providers modernise patient-facing platforms, secure data flows and clarify communication. From appointment systems and portals to content that builds trust, our work prioritises clarity, accessibility and compliance-aware design.',
      'Whether you are digitising front-desk operations or building a new health product, we combine technology and messaging so your organisation is easier to find, easier to use and easier to trust.',
    ],
    image:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1400&q=85&auto=format&fit=crop',
    cardTitle: 'Patient Portals & Secure Communication Platforms for Modern Clinics',
    cardLink: '#',
  },
  {
    id: 'ecommerce',
    title: 'E-commerce & Retail',
    tag: 'D2C · Marketplaces · Brands',
    downloadLabel: 'Grow Online',
    paragraphs: [
      'Online retail is no longer only about having a storefront. Brands compete on discovery, conversion, fulfilment clarity and post-purchase experience. Every product page, campaign and checkout step must work together to turn traffic into loyal customers.',
      'We build and optimise e-commerce experiences that combine solid development with SEO, paid media and social strategy. From Shopify and WooCommerce builds to performance marketing and product-page optimisation, we treat your store as a growth system — not a static catalogue.',
      'Our teams help you improve visibility, reduce friction in the buy path and measure what actually drives revenue so you can scale with confidence.',
    ],
    image:
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1400&q=85&auto=format&fit=crop',
    cardTitle: 'Conversion-Focused Storefronts with Integrated SEO & Performance Marketing',
    cardLink: '#',
  },
  {
    id: 'education',
    title: 'Education',
    tag: 'Institutions · EdTech · Training',
    downloadLabel: 'Learn More',
    paragraphs: [
      'Education providers need digital experiences that communicate clearly, support enrolment and maintain trust with students and parents. From institutional websites to learning platforms and content programmes, clarity and accessibility matter as much as aesthetics.',
      'We design and build education-facing sites, portals and content systems that prioritise structured information, strong search presence and mobile-first journeys. Academic content and research support services complement technical delivery for institutions that need rigorous, well-presented material.',
      'Whether you are launching a new programme or modernising an existing digital presence, we help education organisations present their value with precision and reach the right audiences.',
    ],
    image:
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1400&q=85&auto=format&fit=crop',
    cardTitle: 'Institutional Websites & Academic Content Systems Built for Clarity',
    cardLink: '#',
  },
];

/** Industry scroll items — content from Industries docx */
export const industryScrollItems = [
  {
    id: 'startups',
    title: 'Startups and New Businesses',
    headline: 'Build your digital foundation',
    description:
      'Build your digital foundation with the right website, branding, technology and marketing strategy for early-stage and growing businesses.',
    services: ['Website Development', 'UI UX', 'SEO', 'Digital Marketing'],
    path: '/contact',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1400&q=85&auto=format&fit=crop',
    accent: '#059669',
    cta: 'Explore Solutions',
  },
  {
    id: 'ecommerce-retail',
    title: 'E Commerce and Retail',
    headline: 'Create better online shopping experiences',
    description:
      'Create better online shopping experiences and reach customers across digital channels with development, design and marketing working together.',
    services: ['E Commerce', 'Shopify', 'WooCommerce', 'SEO', 'Social Media'],
    path: '/it-solutions#ecommerce',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1400&q=85&auto=format&fit=crop',
    accent: '#ea580c',
    cta: 'Explore E Commerce',
  },
  {
    id: 'education',
    title: 'Education and EdTech',
    headline: 'Useful digital platforms for education',
    description:
      'Build useful digital platforms and improve visibility for education providers and EdTech businesses.',
    services: ['Websites', 'Software', 'UI UX', 'SEO', 'Digital Marketing'],
    path: '/contact',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1400&q=85&auto=format&fit=crop',
    accent: '#4f46e5',
    cta: 'Explore Solutions',
  },
  {
    id: 'healthcare',
    title: 'Healthcare and Wellness',
    headline: 'Professional digital experiences',
    description:
      'Create professional digital experiences that help your healthcare or wellness business connect with its audience online.',
    services: ['Websites', 'UI UX', 'SEO', 'Digital Marketing', 'Social Media'],
    path: '/contact',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1400&q=85&auto=format&fit=crop',
    accent: '#0d9488',
    cta: 'Explore Solutions',
  },
  {
    id: 'real-estate',
    title: 'Real Estate and Property',
    headline: 'Visibility and relevant enquiries',
    description:
      'Build online visibility and generate relevant enquiries through websites, search and digital advertising.',
    services: ['Websites', 'SEO', 'Google Ads', 'Lead Generation'],
    path: '/digital-marketing',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1400&q=85&auto=format&fit=crop',
    accent: '#0891b2',
    cta: 'Explore Solutions',
  },
  {
    id: 'finance',
    title: 'Finance and Professional Services',
    headline: 'Present your business professionally',
    description:
      'Present your business professionally with user focused digital experiences and targeted marketing.',
    services: ['Websites', 'Software', 'UI UX', 'SEO', 'Digital Marketing'],
    path: '/contact',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1400&q=85&auto=format&fit=crop',
    accent: '#7c3aed',
    cta: 'Explore Solutions',
  },
  {
    id: 'hospitality',
    title: 'Hospitality and Travel',
    headline: 'Help customers discover your business',
    description:
      'Help customers discover your business through engaging digital experiences and stronger online visibility.',
    services: ['Websites', 'SEO', 'Social Media', 'Digital Marketing'],
    path: '/digital-marketing',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1400&q=85&auto=format&fit=crop',
    accent: '#db2777',
    cta: 'Explore Solutions',
  },
  {
    id: 'manufacturing',
    title: 'Manufacturing and Industrial',
    headline: 'Strengthen your digital presence',
    description:
      'Strengthen your digital presence while supporting business operations through technology and marketing.',
    services: ['Websites', 'Software', 'SEO', 'Digital Marketing'],
    path: '/it-solutions',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1400&q=85&auto=format&fit=crop',
    accent: '#0f766e',
    cta: 'Explore Solutions',
  },
  {
    id: 'recruitment',
    title: 'Recruitment and HR',
    headline: 'Connect with relevant audiences',
    description:
      'Build a professional digital presence and connect with relevant audiences through targeted digital solutions.',
    services: ['Websites', 'SEO', 'Social Media', 'Lead Generation'],
    path: '/digital-marketing',
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1400&q=85&auto=format&fit=crop',
    accent: '#2563eb',
    cta: 'Explore Solutions',
  },
  {
    id: 'local-business',
    title: 'Local and Small Businesses',
    headline: 'Build local visibility and attract customers',
    description:
      'Build local visibility, attract customers and create a stronger digital presence with practical solutions.',
    services: ['Local SEO', 'Google Business Profile', 'Websites', 'Social Media'],
    path: '/digital-marketing#seo',
    image: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=1400&q=85&auto=format&fit=crop',
    accent: '#059669',
    cta: 'Explore Solutions',
  },
];
