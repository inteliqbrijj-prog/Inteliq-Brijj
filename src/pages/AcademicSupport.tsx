import {
  Building2, ClipboardCheck, Globe, Landmark, Layers, Leaf, MessageSquare,
  PenTool, Sun, type LucideIcon,
} from 'lucide-react';
import {
  SvcPage, SvcHero, SxServices, SxCards, SxWhy, SxSteps, SxNote, SvcFaq, SxCta, useDocMeta,
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
/* content (Inteliq Brijj website content — Academic Support)          */
/* ------------------------------------------------------------------ */
const services: ExItem[] = [
  { slug: 'assignment-help', title: 'Assignment Help',
    desc: 'Assignments require careful planning, research, clear arguments and attention to assessment criteria. Our assignment help service supports students in understanding assignment briefs, organizing ideas, planning research and improving the structure of their academic work.',
    note: 'Whether you are working on an essay, report, case study or subject-specific assignment, we help you understand the requirements and identify an appropriate approach.',
    cta: { label: 'Explore Assignment Help', to: '/contact' } },
  { slug: 'thesis-help', title: 'Thesis Help',
    desc: 'Preparing a thesis involves developing a clear research question, reviewing relevant literature and presenting findings in a logical academic structure. Our thesis help service provides guidance on research planning, chapter organization, academic writing and the presentation of evidence.',
    note: 'We help students better understand the stages of thesis preparation and the expectations associated with academic research.',
    cta: { label: 'Explore Thesis Help', to: '/contact' } },
  { slug: 'dissertation-help', title: 'Dissertation Help',
    desc: "A dissertation can involve several stages, from developing a research proposal to reviewing literature, selecting a methodology and presenting research findings. Our dissertation support helps students understand these stages and organize their work according to their university's requirements.",
    note: 'Support may include research planning, dissertation structure, methodology guidance, academic writing feedback and proofreading, depending on the service agreed.',
    cta: { label: 'Explore Dissertation Help', to: '/contact' } },
  { slug: 'coursework-help', title: 'Coursework Help',
    desc: 'Coursework may include written reports, case studies, practical projects, presentations and other subject-specific tasks. Our coursework help service assists students with interpreting instructions, organizing information, planning their approach and improving the clarity of their work.',
    note: 'We aim to make coursework requirements easier to understand so students can work through their tasks more effectively.',
    cta: { label: 'Explore Coursework Help', to: '/contact' } },
  { slug: 'essay-and-research-paper-help', title: 'Essay and Research Paper Help',
    desc: 'Academic essays and research papers require a focused argument, relevant evidence, logical organization and appropriate referencing. We provide guidance on essay planning, research organization, paragraph structure, argument development and the presentation of academic sources.',
    note: 'Whether you are preparing an argumentative essay, analytical paper or research-based assignment, structured guidance can help you approach the task with greater clarity.' },
  { slug: 'academic-editing-and-proofreading', title: 'Academic Editing and Proofreading',
    desc: 'Clear academic writing helps readers understand your ideas and arguments. Our academic editing and proofreading services focus on improving the readability and presentation of your work while maintaining your intended meaning.',
    note: 'Depending on your requirements, support may cover grammar, spelling, sentence clarity, punctuation, consistency, formatting and academic tone.' },
  { slug: 'research-and-referencing-help', title: 'Research and Referencing Help',
    desc: 'Academic research requires relevant sources, careful evaluation of information and consistent referencing. Our research and referencing support helps students organize their research, understand citation requirements and present references more consistently.',
    note: "We can provide guidance on referencing styles such as APA and Harvard, subject to your institution's requirements." },
];

const countries: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Landmark, title: 'Academic Support in the UK', text: 'Get guidance on assignments, coursework, essays, dissertations, referencing and academic writing based on the instructions provided by your UK university.' },
  { icon: Building2, title: 'Academic Support in the USA', text: 'Explore support for college assignments, research papers, essays, coursework and academic projects, with attention to your course requirements and citation guidelines.' },
  { icon: Sun, title: 'Academic Support in Australia', text: 'Access guidance for university assignments, reports, research projects, thesis preparation and academic writing in line with your assessment instructions.' },
  { icon: Leaf, title: 'Academic Support in Canada', text: 'Find support for coursework, essays, assignments, research papers and dissertation preparation, tailored to the requirements you share with us.' },
];

const why = [
  { icon: Layers, title: 'Support across multiple academic tasks', text: 'Explore assignment, coursework, thesis, dissertation, research and editing services in one place.' },
  { icon: ClipboardCheck, title: 'A requirements-focused approach', text: 'Share your brief, instructions and relevant guidelines so the service can be assessed against your needs.' },
  { icon: MessageSquare, title: 'Clear communication', text: 'Understand the agreed scope, process, pricing and timeline before proceeding.' },
  { icon: PenTool, title: 'Writing and research guidance', text: 'Get help with structuring ideas, organizing research and improving academic presentation.' },
  { icon: Globe, title: 'Support for international students', text: 'Find services relevant to students studying in the UK, USA, Australia and Canada.' },
];

const steps = [
  { t: 'Share Your Requirements', d: 'Tell us about your academic task, subject, deadline and any instructions or assessment guidelines you have.' },
  { t: 'Discuss the Service', d: 'We review your requirements and discuss the available support, scope, pricing and expected timeline.' },
  { t: 'Confirm the Details', d: 'Once the service and terms are agreed, the next steps are confirmed with you.' },
  { t: 'Receive Your Agreed Support', d: 'Receive the agreed service, such as feedback, editing, proofreading, research guidance or other confirmed academic support.' },
];

const faqs: [string, string][] = [
  ['What academic support services do you offer?', 'Our academic support services include assignment help, thesis help, dissertation help, coursework guidance, essay and research paper support, academic editing, proofreading and referencing assistance.'],
  ['Can I get assignment help for my university course?', 'You can enquire about assignment support by sharing your subject, assignment brief, requirements and deadline. We will clarify the available service and its scope before you proceed.'],
  ['Do you provide thesis and dissertation help?', 'We offer support related to thesis and dissertation preparation, including research planning, structure, methodology guidance, academic writing feedback and proofreading, depending on the agreed service.'],
  ['Do you support students in the UK, USA, Australia and Canada?', "Our academic support offering is designed to serve students in these four markets. Share your institution's requirements so we can discuss the support relevant to your needs."],
  ['Can you help with APA or Harvard referencing?', 'We can provide referencing guidance and relevant formatting support. Please share the referencing style and guidelines specified by your institution.'],
  ['How do I enquire about academic support?', 'Visit our contact page and share details of your task, subject, deadline and requirements. Our team can then discuss the available service and next steps.'],
];

/* ------------------------------------------------------------------ */
export default function AcademicSupport() {
  useDocMeta(
    'Academic Support for International Students | Inteliq Brijj',
    'Explore academic support services, including assignment, thesis, dissertation and coursework help, academic editing, proofreading and research guidance.',
  );
  return (
    <SvcPage theme={THEME}>
      <SvcHero
        long
        pill="Academic Support"
        title={<>Academic Support for <span>International Students</span></>}
        paras={[
          'University life involves more than attending lectures and studying for exams. From understanding assignment requirements to preparing research projects and improving academic writing, students often need the right guidance to manage their workload effectively.',
          'At Inteliq Brijj Solution, we offer academic support services designed to help students approach their academic tasks with greater clarity and confidence. Whether you need assignment guidance, thesis or dissertation support, coursework assistance, research guidance, or academic editing and proofreading, our services are designed around your requirements.',
          'We support students studying in the UK, USA, Australia and Canada, helping them navigate different academic expectations and develop a more structured approach to their work.',
        ]}
        primary={{ label: 'Explore Our Services', to: '#academic-services' }}
        secondary={{ label: 'Contact Us', to: '/contact' }}
      />
      <SxServices id="academic-services" kicker="OUR SERVICES" title="Our Academic Support Services" items={services} />
      <SxCards
        cols={4}
        kicker="COUNTRIES"
        title="Academic Support for Students in Different Countries"
        text="Academic expectations and assessment requirements can vary between universities and countries. Our services are intended to support students in understanding their requirements and organizing their academic work accordingly."
        items={countries}
        cta={{ label: 'Find Academic Support for Your Country', to: '/contact' }}
      />
      <SxWhy
        kicker="WHY CHOOSE US"
        title="Why Choose Inteliq Brijj Solution for Academic Support?"
        text="Finding suitable academic guidance starts with understanding your needs, deadlines and university requirements. Our approach focuses on clear communication and support aligned with the scope of the service requested."
        items={why}
      />
      <SxSteps alt kicker="OUR PROCESS" title="How Our Academic Support Process Works" steps={steps} />
      <SvcFaq kicker="FAQ" title="Frequently Asked Questions" items={faqs} />
      <SxNote label="Academic integrity note">
        All support should comply with your university&apos;s academic-integrity rules. Students remain responsible for their own assessed submissions and should follow their institution&apos;s rules on permitted assistance and disclosure.
      </SxNote>
      <SxCta
        kicker="GET STARTED"
        title="Find the Right Academic Support for Your Needs"
        paras={[
          'Whether you need assignment help, coursework guidance, thesis or dissertation support, or assistance improving your academic writing, start by sharing your requirements with Inteliq Brijj Solution.',
          'Tell us what you are working on, what support you need and when you need it. We will discuss the available options and clarify the next steps.',
        ]}
        primary={{ label: 'Explore Assignment Help', to: '#academic-services-assignment-help' }}
        secondary={{ label: 'Contact Us', to: '/contact' }}
      />
    </SvcPage>
  );
}
