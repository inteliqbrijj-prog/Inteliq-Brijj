import {
  Atom, Blocks, Building2, Code2, CreditCard, Feather, Globe, Layers, ListChecks, Megaphone,
  PenTool, Puzzle, RefreshCw, Rocket, ShoppingCart, Smartphone, Sparkles, Store, Target, TrendingUp, Users, Workflow, Wrench, Zap,
  type LucideIcon,
} from 'lucide-react';
import {
  SvcPage, SvcHero, SxIntro, SxServices, SxGoals, SxCombos, SxSteps, SxCards, SxWhy, SxLocal, SvcFaq, SxCta, useDocMeta,
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
/* content (Inteliq Brijj website content — Mobile App Development)    */
/* ------------------------------------------------------------------ */
const services: ExItem[] = [
  { slug: 'android-app-development', title: 'Android App Development', desc: 'Develop Android applications for customers, businesses and digital products.', label: 'Services',
    includes: ['Custom Android Apps', 'Business Apps', 'Ecommerce Apps', 'Booking Apps', 'API Integration', 'Testing'] },
  { slug: 'ios-app-development', title: 'iOS App Development', desc: 'Create iPhone and iPad applications with platform appropriate design and functionality.', label: 'Services',
    includes: ['iOS App Development', 'Custom Features', 'User Authentication', 'Payment Integration', 'Notifications', 'Testing'] },
  { slug: 'cross-platform-app-development', title: 'Cross Platform App Development', desc: 'Build applications for Android and iOS using a shared development approach where suitable.', label: 'Services',
    includes: ['Cross Platform Apps', 'Startup Apps', 'Customer Portals', 'Business Applications', 'MVP Development'] },
  { slug: 'flutter-app-development', title: 'Flutter App Development', desc: 'Develop cross platform mobile applications using Flutter when it fits your technical and business requirements.', label: 'Services',
    includes: ['Custom Flutter Apps', 'Business Apps', 'Ecommerce Apps', 'API Integration', 'Interface Development', 'Testing'] },
  { slug: 'react-native-development', title: 'React Native Development', desc: 'Create mobile applications using React Native for suitable multi platform projects.', label: 'Services',
    includes: ['React Native Apps', 'Business Applications', 'Ecommerce Apps', 'API Integration', 'Notifications', 'Maintenance'] },
  { slug: 'custom-mobile-app-development', title: 'Custom Mobile App Development', desc: 'Build applications around your specific business processes, customer needs and operational goals.', label: 'Services',
    includes: ['Business Management Apps', 'Booking Systems', 'Customer Portals', 'Membership Platforms', 'Custom Dashboards', 'Automated Workflows'] },
  { slug: 'app-ui-ux-design', title: 'App UI UX Design', desc: 'Make applications easier to navigate through clear interfaces and user focused design.', label: 'Services',
    includes: ['User Research', 'User Flows', 'Wireframing', 'App Interface Design', 'Prototyping', 'Usability Improvements'] },
  { slug: 'app-testing', title: 'App Testing', desc: 'Evaluate functionality, usability, compatibility and performance before release and during ongoing development.', label: 'Services',
    includes: ['Functional Testing', 'UI Testing', 'Device Compatibility', 'Performance Testing', 'Integration Testing', 'Bug Identification'] },
  { slug: 'app-maintenance-and-support', title: 'App Maintenance and Support', desc: 'Keep applications updated as technical environments and business requirements change.', label: 'Services',
    includes: ['Bug Fixing', 'App Updates', 'Performance Improvements', 'Compatibility Updates', 'API Maintenance', 'Feature Enhancements'] },
];

const goals = [
  { q: 'Have an App Idea?', mods: ['Custom App Development', 'UI UX Design'] },
  { q: 'Need an Android or iOS App?', mods: ['Native App Development', 'Testing'] },
  { q: 'Want an App for Multiple Platforms?', mods: ['Flutter', 'React Native', 'Cross Platform Development'] },
  { q: 'Building an Ecommerce App?', mods: ['App Development', 'Payment Integration', 'Ecommerce Solutions'] },
  { q: 'Need Business Software and an App?', mods: ['Custom Apps', 'Software Development', 'APIs', 'Automation'] },
  { q: 'Already Have an App?', mods: ['App Testing', 'Maintenance', 'Redesign', 'Feature Improvements'] },
];
const goalIcons: Record<string, LucideIcon> = {
  'Custom App Development': Smartphone, 'UI UX Design': PenTool, 'Native App Development': Code2, Testing: ListChecks, Flutter: Feather,
  'React Native': Atom, 'Cross Platform Development': Layers, 'App Development': Smartphone, 'Payment Integration': CreditCard,
  'Ecommerce Solutions': ShoppingCart, 'Custom Apps': Blocks, 'Software Development': Code2, APIs: Workflow, Automation: Zap,
  'App Testing': ListChecks, Maintenance: Wrench, Redesign: RefreshCw, 'Feature Improvements': Sparkles,
};

const combos = [
  { tag: 'App Development + UI UX Design', icon: PenTool, text: ['Connect user experience with application functionality.'], cta: { label: 'Explore UI UX and Design', to: '/it-solutions#design' } },
  { tag: 'App Development + Software Development', icon: Code2, text: ['Integrate databases, APIs, dashboards and business workflows.'], cta: { label: 'Explore Software Development', to: '/it-solutions#software' } },
  { tag: 'App Development + Website Development', icon: Globe, text: ['Connect your website, mobile app and backend systems.'], cta: { label: 'Explore Website Development', to: '/services/website-development' } },
  { tag: 'App Development + Digital Marketing', icon: Megaphone, text: ['Support app discovery through SEO, content, social media and paid advertising.'], cta: { label: 'Explore Digital Marketing', to: '/digital-marketing' } },
];

const steps = [
  { t: 'Discover', d: 'Understand your business goals, users and requirements.' },
  { t: 'Plan and Design', d: 'Define features, user flows and interface design.' },
  { t: 'Develop', d: 'Build the application and integrate required functionality.' },
  { t: 'Test', d: 'Review usability, compatibility, functionality and performance.' },
  { t: 'Launch and Improve', d: 'Prepare for release and identify future improvements.' },
];

const biz: { t: string; d: string; icon: LucideIcon }[] = [
  { t: 'Startups', d: 'MVP development and customer focused applications.', icon: Rocket },
  { t: 'Small Businesses', d: 'Apps for bookings, services and customer engagement.', icon: Store },
  { t: 'Ecommerce Businesses', d: 'Shopping apps connected with products, payments and orders.', icon: ShoppingCart },
  { t: 'Growing Businesses', d: 'Mobile applications integrated with existing systems.', icon: TrendingUp },
  { t: 'Established Businesses', d: 'Custom business applications and internal digital tools.', icon: Building2 },
];

const why = [
  { icon: Target, title: 'Business Focused', text: 'Applications planned around your objectives.' },
  { icon: Users, title: 'User Focused', text: 'Design that considers navigation and user needs.' },
  { icon: Puzzle, title: 'Connected IT Services', text: 'App development alongside websites, software and UI UX.' },
  { icon: Layers, title: 'Flexible Technology', text: 'Technology choices based on project requirements.' },
  { icon: TrendingUp, title: 'Long Term Thinking', text: 'Consideration for future features, integrations and maintenance.' },
];

const faqs: [string, string][] = [
  ['What mobile app development services do you provide?', 'We provide Android and iOS app development, Flutter, React Native, cross platform development, custom apps, UI UX design, testing and maintenance.'],
  ['How much does mobile app development cost in India?', 'The cost depends on features, design, platforms, integrations, backend requirements and project complexity. The scope should be defined before estimating costs.'],
  ['Should I choose Android, iOS or cross platform development?', 'The choice depends on your target audience, required features, budget and future plans.'],
  ['What is Flutter app development?', 'Flutter is a framework for building applications across multiple platforms. Its suitability depends on your application requirements.'],
  ['Can you develop a custom business mobile app?', 'Yes. Custom apps can support business processes, customer portals, booking systems, dashboards and integrations.'],
  ['Do you provide app testing and maintenance?', 'Yes. These services can include bug fixing, compatibility checks, performance improvements, testing and application updates.'],
  ['Do you provide mobile app development services in Jaipur?', 'Yes. Inteliq Brijj Solutions is based in Jaipur and serves businesses across Jaipur and India.'],
];

/* ------------------------------------------------------------------ */
export default function MobileAppDevelopment() {
  useDocMeta(
    'Mobile App Development Services in Jaipur and India | Inteliq Brijj Solutions',
    'Mobile app development services in Jaipur and across India for Android, iOS, Flutter, React Native and custom business applications.',
  );
  return (
    <SvcPage theme={THEME}>
      <SvcHero
        pill="Mobile App Development"
        title={<>Build an App <span>People Want to Use</span></>}
        paras={[
          'Turn your idea into a mobile application built around your business goals and user needs. Inteliq Brijj Solutions provides mobile app development services in Jaipur and across India, from Android and iOS apps to Flutter, React Native and custom mobile applications.',
        ]}
        primary={{ label: 'Start Your App Project', to: '/contact' }}
        secondary={{ label: 'Discuss Your App Idea', to: '/contact' }}
        trust="Jaipur Based · Serving Businesses Across India"
      />
      <SxIntro
        kicker="MOBILE APP SOLUTIONS FOR YOUR BUSINESS"
        title="Mobile App Solutions for Your Business"
        lead="A successful mobile application combines useful features, intuitive UI UX design, reliable functionality and a smooth user experience. We connect planning, development, testing and maintenance to create applications suited to your business requirements."
      />
      <SxServices
        id="app-services"
        kicker="OUR SERVICES"
        title="Our Mobile App Development Services"
        items={services}
        cta={{ label: 'Discuss Your App Requirements', to: '/contact' }}
      />
      <SxGoals
        kicker="FIND THE RIGHT APP SOLUTION"
        title="Find the Right App Solution"
        goals={goals}
        icons={goalIcons}
        next={{ title: 'Discuss Your App Requirements', cta: { label: 'Get a Consultation', to: '/contact' } }}
      />
      <SxCombos
        kicker="CONNECTED DIGITAL SOLUTIONS"
        title="Your mobile application may need a website, backend software and marketing to work as a complete digital solution."
        hub="App"
        hubIcon={Smartphone}
        items={combos}
      />
      <SxSteps kicker="OUR PROCESS" title="Our App Development Process" steps={steps} />
      <SxCards
        alt
        dense
        cols={5}
        kicker="FOR DIFFERENT BUSINESSES"
        title="Mobile App Development for Different Businesses"
        items={biz.map((b) => ({ icon: b.icon, title: b.t, text: b.d }))}
      />
      <SxWhy kicker="WHY CHOOSE US" title="Why Choose Inteliq Brijj Solutions?" items={why} />
      <SxLocal
        kicker="JAIPUR BASED"
        title="Mobile App Development in Jaipur and Across India"
        paras={[
          'Inteliq Brijj Solutions provides mobile app development services in Jaipur and across India. Our services include Android app development, iOS app development, Flutter app development, React Native development, cross platform apps and custom mobile app development.',
          'Whether you are starting with an idea or improving an existing application, we can help you plan the right next step.',
        ]}
        cta={{ label: 'Discuss Your Project', to: '/contact' }}
      />
      <SvcFaq kicker="FAQ" title="Frequently Asked Questions" items={faqs} />
      <SxCta
        kicker="READY TO BUILD YOUR APP?"
        title="Turn Your App Idea Into a Digital Product"
        paras={["Whether you need an Android app, iOS application, Flutter app, React Native solution or custom business application, let's discuss your requirements."]}
        primary={{ label: 'Start Your App Project', to: '/contact' }}
        secondary={{ label: 'Get a Consultation', to: '/contact' }}
      />
    </SvcPage>
  );
}
