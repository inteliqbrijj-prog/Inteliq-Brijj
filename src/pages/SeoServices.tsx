import {
  BarChart3, Compass, FileText, Globe, Layers, ListChecks, Megaphone, MapPin, MousePointerClick,
  PenTool, Puzzle, Rocket, Search, ShoppingCart, Store, Target, Wrench, type LucideIcon,
} from 'lucide-react';
import {
  SvcPage, SvcHero, SxIntro, SxServices, SxGoals, SxCombos, SxSteps, SxWhy, SxLocal, SvcFaq, SxCta,
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
/* content (Inteliq Brijj website content — SEO Services)             */
/* ------------------------------------------------------------------ */
const approach = [
  { t: 'Search Intent', s: 'Understand what your customers are actually looking for.' },
  { t: 'Technical Foundation', s: 'Improve crawlability, indexing, structure and website performance.' },
  { t: 'Useful Content', s: 'Create clear information that answers real customer needs.' },
  { t: 'Website Experience', s: 'Connect search visibility with a website that is easy to use.' },
  { t: 'Continuous Improvement', s: 'Use performance insights to identify new opportunities.' },
];

const services: ExItem[] = [
  { slug: 'seo-strategy', title: 'SEO Strategy', desc: 'A focused SEO roadmap based on your business, audience, competitors and search opportunities.',
    includes: ['Search Intent', 'Keyword Research', 'Competitor Analysis', 'Content Opportunities', 'Technical Priorities', 'SEO Roadmap'] },
  { slug: 'keyword-research', title: 'Keyword Research', desc: 'Find relevant searches that have genuine value for your business, including commercial, informational, local and long tail keywords.',
    includes: ['Primary Keywords', 'Long Tail Keywords', 'Search Intent', 'Location Based Searches', 'Related Topics', 'Competitor Keywords'] },
  { slug: 'technical-seo', title: 'Technical SEO', desc: 'Build a stronger technical foundation so search engines can crawl, understand and index your website effectively.',
    includes: ['Crawlability', 'Indexability', 'Website Architecture', 'URL Structure', 'Sitemaps', 'Canonicalisation', 'Mobile SEO', 'Core Web Vitals', 'Structured Data'] },
  { slug: 'on-page-seo', title: 'On Page SEO', desc: 'Optimise important pages around search intent, relevance and a clear user experience.',
    includes: ['Page Titles', 'Meta Descriptions', 'Headings', 'Content Structure', 'Internal Links', 'URLs', 'Images', 'Calls to Action'] },
  { slug: 'off-page-seo', title: 'Off Page SEO', desc: "Strengthen your website's external presence through relevant authority and brand building activities.",
    includes: ['Digital PR', 'Brand Mentions', 'Business Citations', 'Content Promotion', 'Relevant Link Opportunities'] },
  { slug: 'local-seo', title: 'Local SEO', desc: 'Reach customers searching for businesses in Jaipur and other local markets across India.',
    includes: ['Local Keyword Research', 'Location Pages', 'Google Business Profile', 'Local Content', 'Business Information', 'Review Strategy'], tagline: 'Grow Your Local Visibility' },
  { slug: 'google-business-profile', title: 'Google Business Profile Optimisation',
    desc: 'Improve the accuracy and relevance of your Google Business Profile with better business information, categories, services, images and local signals.' },
  { slug: 'e-commerce-seo', title: 'E Commerce SEO', desc: 'Help customers discover your online store and products through search.',
    includes: ['Product Pages', 'Category Pages', 'Product Keywords', 'Internal Linking', 'Technical SEO', 'Product Content', 'Store Structure'], tagline: 'Grow Your Online Store' },
  { slug: 'international-seo', title: 'International SEO',
    desc: 'Build search visibility across different countries and markets with country focused keyword research, website structure, content and search intent.' },
  { slug: 'enterprise-seo', title: 'Enterprise SEO', desc: 'Scalable SEO solutions for larger websites with complex structures, multiple pages, teams and markets.',
    includes: ['Technical SEO', 'Website Architecture', 'Template Optimisation', 'Internal Linking', 'Content Systems', 'International SEO'] },
  { slug: 'seo-audit', title: 'SEO Audit', desc: 'Understand what is working, what needs attention and where your website has new search opportunities.',
    label: 'We review', includes: ['Technical SEO', 'Indexation', 'Content', 'Keywords', 'Website Structure', 'Internal Links', 'Backlinks', 'Local SEO'],
    cta: { label: 'Request an SEO Audit', to: '/contact' } },
  { slug: 'competitor-seo-analysis', title: 'Competitor SEO Analysis', desc: 'Understand how competitors approach search and identify opportunities for your own website.',
    note: 'We analyse competitor keywords, content topics, page structures, search visibility, commercial pages and potential content gaps.' },
  { slug: 'link-building', title: 'Link Building',
    desc: 'Build relevant authority through meaningful digital relationships, content promotion, industry opportunities and quality link opportunities.',
    note: 'The focus is on relevance and value, not simply increasing the number of links.' },
];

const goals = [
  { q: 'Want More Google Visibility?', mods: ['SEO Strategy', 'Keyword Research', 'On Page SEO', 'Technical SEO'] },
  { q: 'Want More Local Customers?', mods: ['Local SEO', 'Google Business Profile', 'Local Content'] },
  { q: 'Want More Organic Traffic?', mods: ['Keyword Research', 'On Page SEO', 'Technical SEO', 'Content'] },
  { q: 'Want More Online Sales?', mods: ['E Commerce SEO', 'Technical SEO', 'On Page SEO', 'CRO'] },
  { q: 'Want to Enter New Markets?', mods: ['International SEO', 'Keyword Research', 'Technical SEO'] },
  { q: 'Not Sure What Is Holding Your Website Back?', mods: ['SEO Audit', 'Competitor SEO Analysis', 'Technical SEO'] },
];
const goalIcons: Record<string, LucideIcon> = {
  'SEO Strategy': Compass, 'Keyword Research': Search, 'On Page SEO': FileText, 'Technical SEO': Wrench, 'Local SEO': MapPin,
  'Google Business Profile': Store, 'Local Content': FileText, Content: PenTool, 'E Commerce SEO': ShoppingCart, CRO: MousePointerClick,
  'International SEO': Globe, 'SEO Audit': ListChecks, 'Competitor SEO Analysis': Target,
};

const combos = [
  { tag: 'SEO + Website Development', icon: Globe, text: ['Build a website with search visibility and user experience in mind.'] },
  { tag: 'SEO + Digital Marketing', icon: Megaphone, text: ['Combine organic search with paid advertising and other digital channels.'] },
  { tag: 'SEO + UI UX', icon: PenTool, text: ['Create pages that are easy to find, understand and use.'] },
  { tag: 'SEO + E Commerce', icon: ShoppingCart, text: ['Connect product visibility, website experience and opportunities to convert.'] },
];

const steps = [
  { t: 'Discover', d: 'Understand your business, audience and objectives.' },
  { t: 'Audit', d: 'Identify technical, content and search opportunities.' },
  { t: 'Research', d: 'Analyse keywords, search intent and competitors.' },
  { t: 'Strategise', d: 'Prioritise opportunities based on business value.' },
  { t: 'Optimise', d: 'Improve pages, content, technical elements and website structure.' },
  { t: 'Measure', d: 'Review relevant search and website performance.' },
  { t: 'Improve', d: 'Use insights to refine the SEO strategy over time.' },
];

const why = [
  { tag: 'business-focused', icon: Target, title: 'Business Focused', text: 'We connect SEO with your actual business objectives.' },
  { tag: 'search-intent', icon: Search, title: 'Search Intent Focused', text: 'We consider why people search, not just what they search.' },
  { tag: 'technical-content', icon: Layers, title: 'Technical + Content', text: 'Strong SEO needs both a reliable website foundation and useful information.' },
  { tag: 'connected-services', icon: Puzzle, title: 'Connected Services', text: 'SEO can work alongside web development, digital marketing, UI UX and e commerce.' },
  { tag: 'data-informed', icon: BarChart3, title: 'Data Informed', text: 'Performance insights help identify what to improve next.' },
  { tag: 'growth-ready', icon: Rocket, title: 'Growth Ready', text: 'Your SEO strategy can evolve as your website and business grow.' },
];

const faqs: [string, string][] = [
  ['What are SEO services?', 'SEO services improve different parts of a website and its digital presence to help search engines understand the website and help relevant users discover its pages through organic search.'],
  ['How long does SEO take?', 'SEO timelines vary depending on competition, website condition, industry, content, authority and the amount of optimisation required.'],
  ['Is SEO better than Google Ads?', 'SEO and Google Ads serve different purposes. SEO focuses on organic visibility, while Google Ads provides paid search visibility. They can also work together.'],
  ['Can SEO help a new website?', 'Yes. SEO can be considered during website development so that technical structure, content, search intent and website experience are planned from the beginning.'],
  ['Do you provide SEO services in Jaipur?', 'Yes. Inteliq Brijj Solutions is Jaipur based and provides SEO services for businesses across India.'],
  ['Do you provide Local SEO and E Commerce SEO?', 'Yes. Our services include Local SEO, Google Business Profile optimisation and E Commerce SEO for businesses targeting local customers or online shoppers.'],
];

/* ------------------------------------------------------------------ */
export default function SeoServices() {
  return (
    <SvcPage theme={THEME}>
      <SvcHero
        pill="SEO Services"
        tagline="Get Found. Get Trusted. Grow Organically."
        title={<>SEO Services That Help Your Business Become <span>More Visible</span></>}
        paras={[
          'Your customers are searching online for products, services and solutions. The right SEO strategy helps your business appear when those searches matter.',
          'Inteliq Brijj Solutions provides professional SEO services in Jaipur and across India, combining technical SEO, keyword research, useful content, on page optimisation and search focused website improvements around your business goals.',
        ]}
        chips={['SEO Services', 'Local SEO', 'Technical SEO', 'On Page SEO', 'E Commerce SEO', 'International SEO']}
        primary={{ label: 'Start Your SEO Journey', to: '/contact' }}
        secondary={{ label: 'Request an SEO Audit', to: '/contact' }}
        trust="Jaipur Based · Serving Businesses Across India"
      />
      <SxIntro
        kicker="SEO SERVICES FOR MODERN BUSINESSES"
        title="More Than Rankings"
        lead="Good SEO is about more than adding keywords to a website. It is about understanding what people search for, creating useful pages and making your website easier for both visitors and search engines to understand."
        label="Our approach focuses on"
        items={approach}
      />
      <SxServices id="seo-services" kicker="OUR SEO SERVICES" title="Complete SEO Solutions for Your Business" items={services} />
      <SxGoals
        kicker="WHAT CAN SEO HELP YOU ACHIEVE?"
        title="Choose Your SEO Goal"
        goals={goals}
        icons={goalIcons}
        next={{ title: 'Tell Us Your SEO Goal', cta: { label: 'Request an SEO Consultation', to: '/contact' } }}
      />
      <SxCombos
        kicker="SEO THAT WORKS WITH YOUR DIGITAL PRESENCE"
        title="SEO becomes more useful when your website and other digital channels support the same goals."
        hub="SEO"
        hubIcon={Search}
        items={combos}
        cta={{ label: 'Explore Our Digital Solutions', to: '/services' }}
      />
      <SxSteps kicker="OUR SEO PROCESS" title="Research. Optimise. Measure. Improve." steps={steps} end="Organic growth" />
      <SxWhy kicker="WHY CHOOSE INTELIQ BRIJJ SOLUTIONS?" title="SEO With the Bigger Picture in Mind" items={why} />
      <SxLocal
        kicker="SEO SERVICES IN JAIPUR AND ACROSS INDIA"
        title="Jaipur Based. Helping Businesses Grow Online."
        paras={[
          'Inteliq Brijj Solutions provides SEO services in Jaipur and across India for businesses looking to improve organic visibility and build a stronger online presence.',
          'Whether you are targeting customers in Jaipur, another Indian city or audiences across India, we can develop an SEO approach around your market, audience and business goals.',
        ]}
        cta={{ label: 'Talk to Our SEO Team', to: '/contact' }}
      />
      <SvcFaq kicker="SEO FAQ" title="Frequently Asked Questions" items={faqs} />
      <SxCta
        kicker="READY TO GROW YOUR SEARCH VISIBILITY?"
        title="Be Easier to Find. Be Easier to Choose."
        paras={["Your customers are searching. Let's build an SEO strategy that helps your business become more visible, useful and competitive in organic search."]}
        primary={{ label: 'Start Your SEO Project', to: '/contact' }}
        secondary={{ label: 'Request an SEO Consultation', to: '/contact' }}
      />
    </SvcPage>
  );
}
