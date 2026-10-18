import {
  ArrowRightLeft, Building2, Code2, Gauge, Globe, Layers, Link2, ListChecks, Megaphone, PenTool, RefreshCw, Rocket,
  Route, Search, Server, Settings2, ShieldCheck, ShoppingBag, ShoppingCart, Smartphone, Store, Target, TrendingUp, Users, Workflow, Wrench,
  Puzzle, Zap, MousePointerClick, type LucideIcon,
} from 'lucide-react';
import {
  SvcPage, SvcHero, SxIntro, SxServices, SxGoals, SxCombos, SxSteps, SxCards, SxWhy, SxLocal, SvcFaq, SxCta,
  type ExItem, type Theme,
} from '../components/svc/SvcKit';

/* ------------------------------------------------------------------ */
/* theme — off-white + soft green                                      */
/* ------------------------------------------------------------------ */
const THEME: Theme = {
  '--c1': '13 148 136', '--c1d': '15 118 110', '--c1x': '17 94 89', '--c1l': '153 246 228',
  '--c2': '16 185 129', '--c2l': '110 231 183', '--c2d': '5 150 105',
  '--c3': '20 184 166', '--c3l': '94 234 212',
  '--d0': '#04130f', '--d1': '#072018', '--d2': '#0c3328', '--d3': '#124a3a', '--bg1': '#f3faf6',
};

/* ------------------------------------------------------------------ */
/* content (Inteliq Brijj website content — Website Development)      */
/* ------------------------------------------------------------------ */
const approach = [
  { t: 'Design', s: 'Clear and professional digital experiences.' },
  { t: 'Development', s: 'Reliable functionality built around your requirements.' },
  { t: 'SEO', s: 'A website structure that supports search visibility.' },
  { t: 'User Experience', s: 'Simple navigation and useful customer journeys.' },
  { t: 'Performance', s: 'A smooth experience across devices and screen sizes.' },
  { t: 'Scalability', s: 'A foundation that can grow with your business.' },
];

const services: ExItem[] = [
  { slug: 'website-development', title: 'Website Development', sub: 'Professional Websites for Businesses',
    desc: 'We create responsive business websites that clearly communicate your services, build trust and provide customers with a simple way to connect with your business.',
    includes: ['Business Websites', 'Corporate Websites', 'Service Websites', 'Landing Pages', 'Responsive Development', 'Lead Generation Websites'],
    cta: { label: 'Build My Business Website', to: '/contact' } },
  { slug: 'custom-website-development', title: 'Custom Website Development', sub: 'Websites Built Around Your Business',
    desc: 'When standard solutions are not enough, custom website development allows functionality, structure and user experiences to be designed around your specific requirements.',
    includes: ['Custom Features', 'Business Portals', 'Dashboards', 'Database Integration', 'Custom Forms', 'User Management', 'API Integration'] },
  { slug: 'wordpress-development', title: 'WordPress Development', sub: 'Flexible WordPress Websites for Businesses',
    desc: 'We provide WordPress website development for businesses that need a professional, manageable and flexible website.',
    includes: ['WordPress Development', 'Theme Customisation', 'Plugin Integration', 'Custom Functionality', 'WordPress SEO Foundations', 'Performance Optimisation', 'Migration', 'Maintenance'],
    cta: { label: 'Explore WordPress Development', to: '/contact' } },
  { slug: 'e-commerce-website-development', title: 'E Commerce Website Development', sub: 'Build an Online Store for Your Customers',
    desc: 'We develop e commerce websites with product discovery, navigation, shopping, payments and customer experience in mind.',
    includes: ['Product Pages', 'Categories', 'Shopping Cart', 'Checkout', 'Payment Integration', 'Product Filters', 'Customer Accounts', 'Order Management'],
    cta: { label: 'Build My Online Store', to: '/contact' } },
  { slug: 'shopify-development', title: 'Shopify Development', sub: 'Shopify Websites for Growing Online Stores',
    desc: 'Create or improve a Shopify store with a structure designed around your products, customers and business requirements.',
    includes: ['Shopify Store Development', 'Theme Customisation', 'Product Setup', 'Navigation', 'App Integration', 'Payment Setup', 'Shopify SEO Foundations'] },
  { slug: 'woocommerce-development', title: 'WooCommerce Development', sub: 'Flexible E Commerce With WordPress',
    desc: 'We develop WooCommerce stores for businesses that want the flexibility of WordPress combined with online selling functionality.',
    includes: ['Store Setup', 'Products', 'Product Variations', 'Categories', 'Payments', 'Shipping', 'Cart', 'Checkout', 'Plugin Integration', 'Store Optimisation'] },
  { slug: 'php-development', title: 'PHP Development', sub: 'PHP Websites and Web Applications',
    desc: 'Our PHP development services support businesses that need custom functionality, database driven websites, web applications or improvements to existing PHP based systems.',
    includes: ['Custom PHP', 'Dynamic Websites', 'Web Applications', 'Database Integration', 'API Integration', 'CMS Solutions', 'Maintenance'] },
  { slug: 'front-end-development', title: 'Front End Development', sub: 'Create a Better Digital Experience',
    desc: 'We turn designs into responsive and interactive website interfaces that work across desktop, tablet and mobile devices.',
    includes: ['Responsive Development', 'Interactive Interfaces', 'Navigation', 'Forms', 'Animations', 'User Interactions', 'Mobile Experience', 'Accessibility'],
    cta: { label: 'Improve My Website Experience', to: '/contact' } },
  { slug: 'back-end-development', title: 'Back End Development', sub: 'Power the Systems Behind Your Website',
    desc: 'Back End development manages the functionality users may not see, including data, business logic, authentication and integrations.',
    includes: ['Server Side Development', 'Databases', 'Authentication', 'Business Logic', 'APIs', 'Integrations', 'Data Processing', 'User Management'] },
  { slug: 'full-stack-development', title: 'Full Stack Development', sub: 'Complete Development From Front End to Back End',
    desc: 'Full Stack development brings the interface, server side functionality, database and integrations together for more complex websites and web applications.',
    includes: ['Front End', 'Back End', 'Database', 'APIs', 'Business Logic', 'Deployment'] },
  { slug: 'cms-development', title: 'CMS Development', sub: 'Manage Your Website Content More Easily',
    desc: 'We create content management solutions that make it easier for businesses and teams to manage pages, media, users and website content.',
    includes: ['Content Management', 'Custom Fields', 'User Roles', 'Media Management', 'Publishing Workflows', 'Search', 'Content Organisation'] },
  { slug: 'website-maintenance', title: 'Website Maintenance', sub: 'Keep Your Website Running Smoothly',
    desc: 'Regular website maintenance can help keep your website updated, secure and functional after launch.',
    includes: ['Updates', 'Security Checks', 'Bug Fixes', 'Performance Improvements', 'Plugin Updates', 'Backups', 'Technical Support'],
    cta: { label: 'Discuss Website Maintenance', to: '/contact' } },
  { slug: 'website-migration', title: 'Website Migration', sub: 'Move Your Website With Greater Control',
    desc: 'Website migration can involve changing platforms, hosting, domains or website structures. We help plan the technical and SEO considerations involved.',
    includes: ['Platform Migration', 'Hosting Migration', 'Content Migration', 'Database Migration', 'URL Mapping', 'Redirect Planning', 'Testing'] },
  { slug: 'website-redesign', title: 'Website Redesign', sub: 'Give Your Existing Website a Better Experience',
    desc: 'A redesign can improve your website without necessarily rebuilding everything from scratch.',
    includes: ['Modern Design', 'Navigation', 'Mobile Experience', 'Content Structure', 'UI UX', 'Performance', 'SEO Foundations', 'Conversion Paths'],
    cta: { label: 'Redesign My Website', to: '/contact' } },
];

const goals = [
  { q: 'Need a Business Website?', mods: ['Website Development', 'WordPress', 'UI UX'] },
  { q: 'Want to Sell Online?', mods: ['E Commerce', 'Shopify', 'WooCommerce', 'E Commerce SEO'] },
  { q: 'Need a Custom Web Application?', mods: ['Custom Development', 'Full Stack', 'Back End', 'APIs'] },
  { q: 'Need a WordPress Website?', mods: ['WordPress Development', 'Customisation', 'SEO', 'Maintenance'] },
  { q: 'Want to Improve Your Existing Website?', mods: ['Website Redesign', 'UI UX', 'Performance', 'SEO'] },
  { q: 'Moving to a New Platform?', mods: ['Website Migration', 'URL Planning', 'Redirects', 'Testing'] },
  { q: 'Need Ongoing Support?', mods: ['Website Maintenance', 'Security', 'Updates', 'Performance'] },
];
const goalIcons: Record<string, LucideIcon> = {
  'Website Development': Globe, WordPress: Layers, 'UI UX': PenTool, 'E Commerce': ShoppingCart, Shopify: Store, WooCommerce: ShoppingBag,
  'E Commerce SEO': Search, 'Custom Development': Code2, 'Full Stack': Layers, 'Back End': Server, APIs: Workflow, 'WordPress Development': Layers,
  Customisation: Settings2, SEO: Search, Maintenance: Wrench, 'Website Redesign': RefreshCw, Performance: Gauge, 'Website Migration': ArrowRightLeft,
  'URL Planning': Link2, Redirects: Route, Testing: ListChecks, 'Website Maintenance': Wrench, Security: ShieldCheck, Updates: RefreshCw,
};

const combos = [
  { tag: 'Website Development + SEO', title: 'Build With Search Visibility in Mind', icon: Search,
    text: ['A website should be developed with its future search visibility in consideration.', 'Website architecture, URLs, navigation, internal linking, content structure and performance can all support a stronger SEO foundation.'],
    cta: { label: 'Explore SEO Services', to: '/services/seo' } },
  { tag: 'Website Development + UI UX', title: 'Technology Meets User Experience', icon: PenTool,
    text: ['Good development and good design should work together.', 'We can connect user research, wireframes, UI UX design, development and testing to create digital experiences that are clear and easy to use.'],
    cta: { label: 'Explore UI UX and Design', to: '/it-solutions#design' } },
  { tag: 'Website Development + Digital Marketing', title: 'Build the Destination Before Driving the Traffic', icon: Megaphone,
    text: ['SEO, Google Ads, social media and other marketing channels can bring visitors to your website. Your website then needs to communicate clearly and guide visitors toward the right action.', 'That is why website development can work alongside digital marketing and conversion focused improvements.'],
    cta: { label: 'Explore Digital Marketing', to: '/digital-marketing' } },
  { tag: 'Website Development + E Commerce', title: 'Create a Better Online Shopping Experience', icon: ShoppingCart,
    text: ['For online stores, development should connect product discovery, usability, payments, SEO and the customer journey.'],
    chain: ['E Commerce Development', 'Product Experience', 'SEO', 'Marketing', 'Conversion'],
    cta: { label: 'Explore E Commerce Solutions', to: '/it-solutions#ecommerce' } },
];

const steps = [
  { t: 'Discover', d: 'Understand your business, audience, goals and requirements.' },
  { t: 'Plan', d: 'Define website structure, functionality and technology.' },
  { t: 'Design', d: 'Create the visual direction and user experience.' },
  { t: 'Develop', d: 'Build the website and required functionality.' },
  { t: 'Test', d: 'Review responsiveness, usability, functionality and performance.' },
  { t: 'Launch', d: 'Prepare the website for its live environment.' },
  { t: 'Improve', d: 'Continue with maintenance, SEO, content and optimisation as needed.' },
];

const quality = [
  { t: 'Fast and Efficient', d: 'A smoother website experience for users.' },
  { t: 'Mobile Friendly', d: 'Designed to work across different devices.' },
  { t: 'Easy to Use', d: 'Clear navigation and customer journeys.' },
  { t: 'SEO Ready', d: 'Important technical and structural considerations included.' },
  { t: 'Secure', d: 'Security requirements considered during development and maintenance.' },
  { t: 'Scalable', d: 'Built with future business requirements in mind.' },
  { t: 'Manageable', d: 'Practical for future updates and content management.' },
];

const biz: { t: string; d: string; icon: LucideIcon }[] = [
  { t: 'Startups', d: 'Create a professional digital foundation for a new business.', icon: Rocket },
  { t: 'Small Businesses', d: 'Present your services clearly and make it easier for customers to contact you.', icon: Store },
  { t: 'Growing Businesses', d: 'Build a scalable website that can support new services and digital marketing.', icon: TrendingUp },
  { t: 'E Commerce Businesses', d: 'Create online stores focused on product discovery and customer experience.', icon: ShoppingCart },
  { t: 'Established Businesses', d: 'Modernise existing websites through redesign, migration, optimisation or new functionality.', icon: Building2 },
];

const why = [
  { tag: 'business-focused', icon: Target, title: 'Business Focused', text: 'Your website should support a clear business purpose.' },
  { tag: 'user-focused', icon: Users, title: 'User Focused', text: 'Design and functionality should make sense to the people using the website.' },
  { tag: 'seo-aware', icon: Search, title: 'SEO Aware', text: 'Search considerations can be included during website development.' },
  { tag: 'connected-expertise', icon: Puzzle, title: 'Connected Expertise', text: 'Website development can work alongside SEO, digital marketing, UI UX and e commerce.' },
  { tag: 'scalable-approach', icon: Layers, title: 'Scalable Approach', text: 'Your website can be planned with future requirements in mind.' },
  { tag: 'practical-technology', icon: Zap, title: 'Practical Technology', text: 'We focus on technology that fits the actual business requirement.' },
];

const faqs: [string, string][] = [
  ['What website development services do you provide?', 'We provide custom website development, WordPress development, e commerce development, Shopify, WooCommerce, PHP, Front End, Back End, Full Stack, CMS development, website redesign, migration and maintenance.'],
  ['How much does website development cost in India?', 'Website development costs depend on the number of pages, design, functionality, technology, integrations, e commerce requirements and project scope.'],
  ['How much does a business website cost?', 'The cost depends on the type of business website you need. A simple informational website will have different requirements from a custom website, e commerce store or web application.'],
  ['How long does website development take?', 'The timeline depends on the website size, design, functionality, integrations, content and feedback process.'],
  ['What is custom website development?', 'Custom website development creates website functionality and structure around specific business requirements rather than relying entirely on a standard template.'],
  ['Is WordPress good for business websites?', 'WordPress can be a flexible option for many businesses because it provides content management capabilities and can be extended through themes, plugins and custom development.'],
  ['What is the difference between WordPress and custom development?', 'WordPress provides a flexible content management platform, while custom development offers greater control when a project requires specialised functionality or architecture.'],
  ['Do you provide Shopify and WooCommerce development?', 'Yes. We provide Shopify and WooCommerce development for businesses looking to create or improve online stores.'],
  ['Can you redesign an existing website?', 'Yes. Website redesign can improve design, navigation, mobile experience, content structure, performance, SEO foundations and conversion paths.'],
  ['Can you migrate an existing website?', 'Yes. Website migration can include moving platforms, hosting, domains or website structures with appropriate technical and SEO planning.'],
  ['Can you build an SEO friendly website?', 'Yes. SEO considerations can be included in website architecture, URLs, navigation, internal linking, content structure and technical development.'],
  ['Do you provide website development services in Jaipur?', 'Yes. Inteliq Brijj Solutions is Jaipur based and provides website development services for businesses across India.'],
];

const qualityIcons: LucideIcon[] = [Zap, Smartphone, MousePointerClick, Search, ShieldCheck, TrendingUp, Settings2];

/* ------------------------------------------------------------------ */
export default function WebsiteDevelopment() {
  return (
    <SvcPage theme={THEME}>
      <SvcHero
        pill="Website Development Services"
        tagline="Build a Website That Works for Your Business"
        title={<>Professional Website Development Services in Jaipur and <span>Across India</span></>}
        paras={[
          'Your website is often the first interaction customers have with your business. It should look professional, work smoothly, be easy to use and support your wider business and digital marketing goals.',
          'Inteliq Brijj Solutions provides website development services in Jaipur and across India, from custom websites and WordPress development to e commerce, Shopify, WooCommerce and full stack development.',
        ]}
        chips={['Website Development', 'Custom Websites', 'WordPress', 'E Commerce', 'Shopify', 'WooCommerce', 'PHP', 'Full Stack']}
        primary={{ label: 'Start Your Website Project', to: '/contact' }}
        secondary={{ label: 'Discuss Your Requirements', to: '/contact' }}
        trust="Jaipur Based · Serving Businesses Across India"
      />
      <SxIntro
        kicker="WEBSITE DEVELOPMENT FOR MODERN BUSINESSES"
        title="More Than Just a Website"
        lead="A good business website should help people discover your business, understand your services, explore your products and take the next step."
        label="Our approach brings together"
        items={approach}
      />
      <SxServices id="website-services" kicker="OUR WEBSITE DEVELOPMENT SERVICES" title="Solutions Built Around Your Requirements" items={services} />
      <SxGoals
        kicker="WHAT DO YOU WANT TO BUILD?"
        title="Choose the Right Website Solution"
        goals={goals}
        icons={goalIcons}
        cols={4}
        next={{ title: 'Tell Us What You Want to Build', cta: { label: 'Discuss Your Requirements', to: '/contact' } }}
      />
      <SxCombos
        kicker="WEBSITE DEVELOPMENT + SEO · UI UX · MARKETING · E COMMERCE"
        title="Website Development That Works With Everything Else"
        hub="Website"
        hubIcon={Globe}
        items={combos}
      />
      <SxSteps kicker="OUR WEBSITE DEVELOPMENT PROCESS" title="From Idea to Launch" steps={steps} end="Live" />
      <SxCards
        alt
        dense
        cols={4}
        kicker="WHAT MAKES A GOOD BUSINESS WEBSITE?"
        title="Build the Right Foundation"
        items={quality.map((q, i) => ({ icon: qualityIcons[i], title: q.t, text: q.d }))}
      />
      <SxCards
        cols={5}
        dense
        kicker="WEBSITE DEVELOPMENT FOR DIFFERENT BUSINESSES"
        title="Built Around Different Business Needs"
        items={biz.map((b) => ({ icon: b.icon, title: b.t, text: b.d }))}
      />
      <SxLocal
        kicker="WEBSITE DEVELOPMENT IN JAIPUR AND ACROSS INDIA"
        title="Jaipur Based. Building for Businesses Across India."
        paras={[
          'Inteliq Brijj Solutions provides professional website development services in Jaipur and across India.',
          'Whether you need a business website, custom website, WordPress website, e commerce store, Shopify website, WooCommerce store or web application, we can build a solution around your business requirements.',
        ]}
        cta={{ label: 'Start Your Website Project', to: '/contact' }}
      />
      <SxWhy kicker="WHY CHOOSE INTELIQ BRIJJ SOLUTIONS?" title="Website Development With the Bigger Picture in Mind" items={why} />
      <SvcFaq kicker="WEBSITE DEVELOPMENT FAQ" title="Common Questions About Website Development" items={faqs} />
      <SxCta
        kicker="BUILD A WEBSITE THAT GROWS WITH YOUR BUSINESS"
        title="Ready to Create Your Digital Presence?"
        paras={["Whether you need a professional business website, custom website, WordPress website, online store, Shopify store, WooCommerce website or web application, let's build the right solution for your business."]}
        primary={{ label: 'Start Your Project', to: '/contact' }}
        secondary={{ label: 'Discuss Your Requirements', to: '/contact' }}
      />
    </SvcPage>
  );
}
