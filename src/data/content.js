export const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'About', href: '#about' },
];

export const marqueeItems = [
  'AI Strategy Blueprints',
  'Email Automation',
  'Custom AI Agents',
  'RAG Intelligence',
  'Workflow Engineering',
  'Production Systems',
];

export const services = [
  {
    n: '01',
    type: 'DISCOVERY',
    title: 'AI Strategy Blueprint',
    desc: 'We start with a free 15-minute discovery call — no pitch, just a read on your business. If there\'s a real opportunity, I build you a paid Blueprint: a structured report mapping exactly which AI systems to build, what they\'ll save you, and in what order. For businesses and founders who want clarity before committing.',
    metric: '48 h',
    metricLabel: 'avg. to blueprint',
    timeline: '1–2 wks',
  },
  {
    n: '02',
    type: 'AUTOMATE',
    title: 'Email & Inbox Automation',
    desc: 'Stop triaging manually. AI reads incoming emails, pulls out what matters, drafts replies, raises CRM tickets, and routes exceptions — processing thousands of messages a month with zero human touch. One client saved 10+ hours a week.',
    metric: '5 k+',
    metricLabel: 'msgs / month',
    timeline: '2–4 wks',
  },
  {
    n: '03',
    type: 'AGENTIC',
    title: 'Custom AI Agents',
    desc: 'Agents that don\'t just answer — they act. Research, write, update records, escalate edge cases, run multi-step workflows end-to-end. Your team focuses on decisions; the agent handles the rest.',
    metric: '∞',
    metricLabel: 'tasks automated',
    timeline: '3–5 wks',
  },
  {
    n: '04',
    type: 'RETRIEVAL',
    title: 'RAG Knowledge Systems',
    desc: 'Make your internal documents, contracts, and proprietary data instantly queryable in plain English. Grounded, cited answers — no hallucinations, no data leaving your stack. Stop digging through folders.',
    metric: '99 %',
    metricLabel: 'peak accuracy',
    timeline: '2–4 wks',
  },
  {
    n: '05',
    type: 'FULL BUILD',
    title: 'End-to-End AI Product',
    desc: 'From whiteboard to production — the AI layer, backend, auth, dashboards, monitoring, all of it. You get a system that keeps working in week four, not just the demo. No need to hire a separate AI engineer, backend dev, and consultant.',
    metric: '10 +',
    metricLabel: 'systems shipped',
    timeline: '4–8 wks',
  },
];

export const processSteps = [
  {
    n: '01',
    stamp: 'DAY 00',
    title: 'Discovery call',
    desc: 'We talk through how you operate and where the friction is. No jargon, no pressure — just a clear read on what is worth automating.',
  },
  {
    n: '02',
    stamp: 'WEEK 01',
    title: 'Strategy Blueprint',
    desc: 'I map the highest-ROI opportunities and hand you a Blueprint you own — a clear, prioritised plan whether or not you build it with me.',
  },
  {
    n: '03',
    stamp: 'WEEK 02+',
    title: 'Build & integrate',
    desc: 'I build the system and wire it into the tools you already use — email, CRM, sheets, dashboards.',
  },
  {
    n: '04',
    stamp: 'ONGOING',
    title: 'Handoff & support',
    desc: 'You get something that works, documentation, and ongoing support if you want it. No black boxes.',
  },
];

export const projects = [
  {
    n: '01',
    delay: 0,
    shot: 'fintech platform',
    metric: 'Live · Global',
    title: 'AlphaSentinel.ai',
    blurb: 'Lead AI developer on a full quantitative trading intelligence platform. Built parallel data ingestion from Polygon & Alpha Vantage, an LLM-driven sentiment engine, and a 24/7 EMA-based risk monitor tracking thousands of instruments — triggering tiered email/SMS alerts with AI-generated context. Also designed and shipped the autonomous morning briefing newsletter, delivered to thousands of subscribers with zero manual input.',
    tags: ['LangGraph', 'Python', 'FastAPI', 'Microservices', 'Event-driven'],
    variant: 'panel',
    stickyTop: 96,
  },
  {
    n: '02',
    delay: 70,
    shot: 'agent orchestration',
    metric: '15+ tools',
    title: 'Cosmic Labs — AI Agent Engine',
    blurb: 'Architected an autonomous AI orchestration system for network device management. Built a unified tool registry spanning internal, MCP, and HTTP sources; a parallel execution engine; checkpoint/recovery for long-running tasks; and circuit-breaker patterns handling 7 failure types — boosting completion rates while cutting execution time through intelligent retry logic and concurrency.',
    tags: ['LangGraph', 'Python', 'MCP', 'Circuit Breakers', 'FastAPI'],
    stickyTop: 120,
  },
  {
    n: '03',
    delay: 140,
    shot: 'pricing dashboard',
    metric: '200 farms',
    title: 'Floral Pricing Intelligence',
    blurb: 'An agentic email pipeline processing 100–200 supplier emails daily with wildly varying formats — PDFs, Excel sheets, inline text. The AI extracts structured pricing data, normalises it into MongoDB, and surfaces it through a custom dashboard with an AI chatbot for cross-supplier price comparisons.',
    tags: ['n8n', 'LangChain', 'FastAPI', 'MongoDB'],
    img: './images/projects/flowerautomation.png',
    variant: 'panel',
    stickyTop: 144,
  },
  {
    n: '04',
    delay: 0,
    shot: 'agent console',
    metric: 'Autonomous',
    title: 'Atam — Self-building Agent',
    blurb: "An AI agent that builds its own tools on demand. Given a task it hasn't seen before, Atam writes, sandboxes, and executes its own Python functions — expanding its capabilities with every run. Built on LangGraph with a live sandboxed execution loop and FastAPI backend.",
    tags: ['LangGraph', 'Python', 'FastAPI', 'Prompt Engineering'],
    img: './images/projects/atam.png',
    stickyTop: 168,
  },
  {
    n: '05',
    delay: 70,
    shot: 'chatbot widget',
    metric: '↑ conversions',
    title: 'StratoBridge Lending Chatbot',
    blurb: 'Enterprise-grade AI assistant embedded into a live lending platform. Context-aware workflows track user behaviour in real-time to deliver personalised loan rate guidance and proactively recover users mid-application — measurably reducing form abandonment and directly boosting conversion revenue.',
    tags: ['JavaScript', 'Python', 'FastAPI', 'MongoDB'],
    img: './images/projects/stratolending.png',
    variant: 'panel',
    stickyTop: 192,
  },
  {
    n: '06',
    delay: 140,
    shot: 'SEO automation',
    metric: 'Zero touch',
    title: 'Autonomous SEO Blog Writer',
    blurb: 'A fully automated content pipeline that takes a topic, searches the web for live information, drafts SEO-optimised blog posts, pulls source inputs from Excel, and uploads polished documents directly to Google Drive — from trigger to published draft, without a single manual step.',
    tags: ['n8n', 'AI Agents', 'Google Drive API', 'LLM'],
    stickyTop: 216,
  },
  {
    n: '07',
    delay: 0,
    shot: '5G dashboard',
    metric: 'Real-time',
    title: 'RT 5G Network Monitor',
    blurb: 'Real-time 5G monitoring infrastructure for live network operations. A Python agent continuously collects and processes network metrics — packet loss, bitrate, latency — piping them into InfluxDB. Built and provisioned the full Grafana visualisation layer with automated interactive dashboards, embedded directly into a Streamlit application.',
    tags: ['Grafana', 'InfluxDB', 'Streamlit', 'Docker', 'Python'],
    img: './images/projects/5gagent.jpg',
    stickyTop: 240,
  },
  {
    n: '08',
    delay: 70,
    shot: 'tutor chat',
    metric: 'Step-by-step',
    title: 'MathBot — AI Tutor',
    blurb: "An AI math tutor built for AskAndLearn that doesn't just give answers — it guides students to them. Handles algebra through calculus, renders solutions in LaTeX via careful prompt engineering, grades submitted homework with step-by-step corrections, and runs on a full-stack JS/Python interface.",
    tags: ['Python', 'Gemini API', 'LaTeX', 'Express', 'MongoDB'],
    img: './images/projects/mathbot.png',
    variant: 'panel',
    stickyTop: 264,
  },
  {
    n: '09',
    delay: 140,
    shot: 'forecast chart',
    metric: '2017–2024',
    title: 'Energy Demand Prediction',
    blurb: 'Trained an ML model on 7 years of Delhi weather and electricity consumption data to forecast hourly grid demand. Gives the power sector a forward-looking signal to pre-position supply — cutting the gap between capacity and demand that causes outages.',
    tags: ['Python', 'scikit-learn', 'Pandas', 'AI/ML'],
    img: './images/projects/edemand.png',
    stickyTop: 288,
  },
];

export const metrics = [
  { num: 10, suffix: '+', label: 'AI systems shipped' },
  { num: 5, suffix: 'k+', label: 'emails automated / month' },
  { num: 8, suffix: 'k+', label: 'instruments monitored live' },
  { num: 100, suffix: '%', label: 'Upwork job success' },
];

export const capabilities = [
  { t: 'AI Agent Systems', d: 'Autonomous pipelines that take actions — update CRMs, parse emails, run research — not just answer questions.' },
  { t: 'RAG & Knowledge AI', d: 'Ask your documents anything. Accurate, cited answers from your private data, not the open internet.' },
  { t: 'Workflow Automation', d: 'Eliminate hours of manual work. End-to-end pipelines that run without a human in the loop.' },
  { t: 'Production-grade', d: 'Architected to hold up after the demo — clean code, monitored systems, zero black boxes.' },
];

export const stack = [
  'Python', 'LangGraph', 'LangChain', 'n8n', 'FastAPI', 'MongoDB',
  'React', 'TensorFlow', 'PyTorch', 'Docker', 'JavaScript', 'Grafana',
];

export const socialLinks = [
  { label: 'LinkedIn ↗', href: 'https://www.linkedin.com/in/aditya-nambidi/' },
  { label: 'Instagram ↗', href: 'https://www.instagram.com/adityaaaooo' },
];

export const email = 'adityanambidi344@gmail.com';
