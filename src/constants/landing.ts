import type {
  LandingAudience,
  LandingCapability,
  LandingComparisonRow,
  LandingFaqItem,
  LandingFeature,
  LandingIntegration,
  LandingNavItem,
  LandingPlan,
  LandingStep,
  LandingTestimonial,
} from '@/types/landing.types';

export const LANDING_PRODUCT_NAME = 'NexGenChat';
export const LANDING_TAGLINE = 'AI-Powered Chatbot for Every Website';

export const LANDING_NAV_ITEMS: LandingNavItem[] = [
  { id: 'nav-features', label: 'Features', href: '#features' },
  { id: 'nav-solutions', label: 'Solutions', href: '#solutions' },
  { id: 'nav-pricing', label: 'Pricing', href: '#pricing' },
  { id: 'nav-faq', label: 'FAQ', href: '#faq' },
  { id: 'nav-contact', label: 'Contact', href: '#contact' },
];

export const LANDING_FEATURES: LandingFeature[] = [
  {
    id: 'train-pdf',
    title: 'Train with PDF',
    description: 'Upload manuals, FAQs, and product docs to ground answers in your content.',
    icon: 'FileText',
  },
  {
    id: 'website-training',
    title: 'Website Training',
    description: 'Index public pages so visitors get accurate answers from your site content.',
    icon: 'Globe',
  },
  {
    id: 'ai-chat',
    title: 'AI Chat',
    description: 'Deliver natural, contextual conversations that resolve questions instantly.',
    icon: 'MessageSquare',
  },
  {
    id: 'multi-language',
    title: 'Multi-language',
    description: 'Support global audiences with multilingual conversations out of the box.',
    icon: 'Languages',
  },
  {
    id: 'lead-collection',
    title: 'Lead Collection',
    description: 'Capture emails and intent during chat so sales can follow up faster.',
    icon: 'UserPlus',
  },
  {
    id: 'analytics',
    title: 'Conversation Analytics',
    description: 'Track volume, resolution, response time, and visitor trends in one place.',
    icon: 'BarChart3',
  },
  {
    id: 'branding',
    title: 'Custom Branding',
    description: 'Match colors, avatar, and widget placement to your brand identity.',
    icon: 'Palette',
  },
  {
    id: 'embed',
    title: 'Easy Embed Code',
    description: 'Add the chatbot to any website with a single lightweight script snippet.',
    icon: 'Code2',
  },
  {
    id: 'roles',
    title: 'Role Management',
    description: 'Control who can manage chatbots, knowledge, and team access.',
    icon: 'Shield',
  },
  {
    id: 'knowledge-base',
    title: 'Knowledge Base',
    description: 'Organize documents and URLs into a searchable AI knowledge layer.',
    icon: 'Database',
  },
  {
    id: 'smart-responses',
    title: 'Smart Responses',
    description: 'Prompt-aware replies that stay on-brand and grounded in your sources.',
    icon: 'Sparkles',
  },
  {
    id: 'support-24x7',
    title: '24x7 AI Support',
    description: 'Answer visitors around the clock without expanding support staff.',
    icon: 'Clock',
  },
];

export const LANDING_STEPS: LandingStep[] = [
  {
    id: 'step-1',
    step: 1,
    title: 'Create Chatbot',
    description: 'Name your bot, choose a personality, and configure core settings.',
  },
  {
    id: 'step-2',
    step: 2,
    title: 'Upload Documents',
    description: 'Add PDFs, URLs, and knowledge sources your visitors need answers from.',
  },
  {
    id: 'step-3',
    step: 3,
    title: 'Train AI',
    description: 'Index content into a searchable knowledge base for accurate replies.',
  },
  {
    id: 'step-4',
    step: 4,
    title: 'Copy Embed Code',
    description: 'Generate a secure public key and copy the ready-to-use snippet.',
  },
  {
    id: 'step-5',
    step: 5,
    title: 'Add to Website',
    description: 'Paste the widget script and start answering visitors instantly.',
  },
];

export const LANDING_CAPABILITIES: LandingCapability[] = [
  {
    id: 'natural',
    title: 'Natural Conversations',
    description: 'Human-like replies that feel helpful, not robotic.',
    icon: 'MessagesSquare',
  },
  {
    id: 'markdown',
    title: 'Markdown Responses',
    description: 'Clear formatting for lists, links, and structured answers.',
    icon: 'FileCode2',
  },
  {
    id: 'memory',
    title: 'Context Memory',
    description: 'Stay coherent across multi-turn conversations.',
    icon: 'Brain',
  },
  {
    id: 'fast',
    title: 'Fast Response',
    description: 'Low-latency answers optimized for live website traffic.',
    icon: 'Zap',
  },
  {
    id: 'multi-model',
    title: 'Multi Model Support',
    description: 'Choose Gemini, GPT, Claude, Llama, and more as providers evolve.',
    icon: 'Cpu',
  },
  {
    id: 'vector',
    title: 'Vector Search',
    description: 'Retrieve the most relevant knowledge chunks for every question.',
    icon: 'Search',
  },
  {
    id: 'prompting',
    title: 'Smart Prompting',
    description: 'Guide tone, guardrails, and behavior with custom system prompts.',
    icon: 'Wand2',
  },
  {
    id: 'knowledge-search',
    title: 'Knowledge Search',
    description: 'Ground every answer in your uploaded documents and website content.',
    icon: 'BookOpen',
  },
];

export const LANDING_COMPARISON: LandingComparisonRow[] = [
  {
    id: 'cmp-setup',
    feature: 'Setup time',
    traditional: 'Weeks of scripting & rules',
    nexgen: 'Minutes with guided setup',
  },
  {
    id: 'cmp-knowledge',
    feature: 'Knowledge source',
    traditional: 'Hard-coded intents',
    nexgen: 'PDFs, URLs, and live site content',
  },
  {
    id: 'cmp-language',
    feature: 'Conversation quality',
    traditional: 'Keyword matching',
    nexgen: 'Context-aware AI replies',
  },
  {
    id: 'cmp-brand',
    feature: 'Branding',
    traditional: 'Limited widget themes',
    nexgen: 'Full brand customization',
  },
  {
    id: 'cmp-analytics',
    feature: 'Insights',
    traditional: 'Basic chat counts',
    nexgen: 'Trends, resolution, and response metrics',
  },
  {
    id: 'cmp-scale',
    feature: 'Availability',
    traditional: 'Business hours only',
    nexgen: 'Always-on AI support',
  },
];

export const LANDING_PLANS: LandingPlan[] = [
  {
    id: 'plan-free',
    name: 'Free',
    description: 'Get started with a free plan for personal use.',
    features: [
      '1 chatbot',
      '200 website messages/month',
      '50 playground messages/month',
      'Basic analytics',
      'Email support',
    ],
    recommended: false,
    ctaLabel: 'Start Free',
  },
  {
    id: 'plan-starter',
    name: 'Starter',
    description: 'For growing teams that need more capacity.',
    features: [
      '3 chatbots',
      '5,000 website messages/month',
      '50 playground messages/month',
      'Advance analytics',
      'Email support',
    ],
    recommended: false,
    ctaLabel: 'Get Started',
  },
  {
    id: 'plan-professional',
    name: 'Professional',
    description: 'Unlimited website messages for serious product teams.',
    features: [
      '6 chatbots',
      'Unlimited website messages/month',
      '50 playground messages/month',
      'Advance analytics',
      'Priority email support',
    ],
    recommended: true,
    ctaLabel: 'Choose Professional',
  },
  {
    id: 'plan-enterprise',
    name: 'Enterprise',
    description: 'Full capacity and unlimited usage for large organizations.',
    features: [
      '15 chatbots',
      'Unlimited website messages/month',
      'Unlimited playground messages/month',
      'Advance analytics',
      'Dedicated support',
    ],
    recommended: false,
    ctaLabel: 'Contact Sales',
  },
];

export const LANDING_TESTIMONIALS: LandingTestimonial[] = [
  {
    id: 't1',
    name: 'Aisha Rahman',
    role: 'Head of Support',
    company: 'OrbitCommerce',
    quote:
      'NexGenChat cut our first-response time dramatically. Visitors get accurate answers from our docs without waiting for an agent.',
    initials: 'AR',
  },
  {
    id: 't2',
    name: 'Daniel Cho',
    role: 'Product Lead',
    company: 'PixelForge',
    quote:
      'We embedded the widget in under an hour. The knowledge base and analytics gave our team confidence from day one.',
    initials: 'DC',
  },
  {
    id: 't3',
    name: 'Priya Nair',
    role: 'Founder',
    company: 'HelpStack',
    quote:
      'The brandable widget and grounded answers feel premium. Our conversion from chat to demo requests improved within weeks.',
    initials: 'PN',
  },
];

export const LANDING_FAQS: LandingFaqItem[] = [
  {
    id: 'faq-1',
    question: 'What is NexGenChat?',
    answer:
      'NexGenChat is an AI chatbot platform that lets you train bots on your documents and website content, then embed them on any site.',
  },
  {
    id: 'faq-2',
    question: 'How long does setup take?',
    answer:
      'Most teams create a chatbot, upload knowledge, and embed the widget in minutes using the guided dashboard flow.',
  },
  {
    id: 'faq-3',
    question: 'What content can I train on?',
    answer:
      'You can upload PDFs and index website URLs so answers stay grounded in your product and support materials.',
  },
  {
    id: 'faq-4',
    question: 'Can I customize the widget?',
    answer:
      'Yes. Colors, welcome message, avatar visibility, position, and chat title can all match your brand.',
  },
  {
    id: 'faq-5',
    question: 'Do I need developers to install it?',
    answer:
      'No. Copy the embed snippet into your website and the widget loads. Developers can also use APIs for deeper integrations.',
  },
  {
    id: 'faq-6',
    question: 'Which AI models are supported?',
    answer:
      'NexGenChat is designed for multi-model support including providers such as Gemini, GPT, Claude, and Llama depending on your configuration.',
  },
  {
    id: 'faq-7',
    question: 'Is there a free plan?',
    answer:
      'Yes. The Free plan lets you explore the platform with limited chatbots and monthly message allowances.',
  },
  {
    id: 'faq-8',
    question: 'How do analytics work?',
    answer:
      'The dashboard tracks conversations, visitors, resolution, response time, and trends so you can improve support quality.',
  },
  {
    id: 'faq-9',
    question: 'Is my data secure?',
    answer:
      'Access is protected with authentication, role controls, and secure public keys for widget embedding. Production deployments should also use HTTPS and trusted hosting controls.',
  },
  {
    id: 'faq-10',
    question: 'Can I book a demo?',
    answer:
      'Yes. Use the contact form on this page to request a demo and our team will get back to you.',
  },
];

export const LANDING_INTEGRATIONS: LandingIntegration[] = [
  {
    id: 'web',
    name: 'Any Website',
    description: 'Drop-in JavaScript widget for marketing sites and product apps.',
  },
  {
    id: 'docs',
    name: 'Docs & Help Centers',
    description: 'Train on documentation portals and knowledge articles.',
  },
  {
    id: 'cms',
    name: 'CMS Sites',
    description: 'Works with WordPress, Webflow, custom HTML, and more.',
  },
  {
    id: 'api',
    name: 'Developer APIs',
    description: 'Authenticate and manage chatbots programmatically via REST.',
  },
];

export const LANDING_AUDIENCES: LandingAudience[] = [
  {
    id: 'startups',
    name: 'Startups',
    description: 'Launch support that scales with your growth.',
    icon: 'Rocket',
  },
  {
    id: 'agencies',
    name: 'Agencies',
    description: 'Create branded AI experiences for every client.',
    icon: 'BriefcaseBusiness',
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    description: 'Guide visitors to the right information quickly.',
    icon: 'HeartPulse',
  },
  {
    id: 'education',
    name: 'Education',
    description: 'Answer student and learner questions around the clock.',
    icon: 'GraduationCap',
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    description: 'Help shoppers discover products and make decisions.',
    icon: 'ShoppingBag',
  },
  {
    id: 'saas',
    name: 'SaaS',
    description: 'Turn product knowledge into instant customer support.',
    icon: 'CloudCog',
  },
];

export const LANDING_EMBED_SNIPPET = `<script
  src="https://your-domain.com/widget.js"
  data-public-key="pk_live_xxxxxxxx"
  async>
</script>`;

export const LANDING_API_SNIPPET = `curl -X GET "https://api.nexgenchat.com/v1/chatbot-list" \\
  -H "Authorization: Bearer <token>"`;
