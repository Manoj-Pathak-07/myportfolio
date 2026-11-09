import type { Localized, SkillCluster } from './types';

export const skillClusters: SkillCluster[] = [
  {
    id: 'frontend',
    label: { en: 'Frontend', ne: 'फ्रन्टइन्ड' },
    summary: {
      en: 'Fast, accessible product surfaces built with the React ecosystem.',
      ne: 'React इकोसिस्टममा बनेका छिटो र सुलभ उत्पादन इन्टरफेस।',
    },
    skills: ['Next.js', 'React.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'HTML5', 'CSS3'],
    relatedProjects: ['cargo-gbl', 'gvs-nepal', 'news-portal'],
  },
  {
    id: 'backend',
    label: { en: 'Backend', ne: 'ब्याकइन्ड' },
    summary: {
      en: 'Application logic and API boundaries that stay predictable as features grow.',
      ne: 'सुविधा बढ्दै जाँदा पनि अनुमान गर्न सकिने एप्लिकेसन लजिक र API सीमा।',
    },
    skills: ['Laravel', 'PHP', 'REST API Development', 'Authentication', 'API Integration'],
    relatedProjects: ['ecommerce-platform', 'school-management-system', 'news-portal'],
  },
  {
    id: 'mobile',
    label: { en: 'Mobile', ne: 'मोबाइल' },
    summary: {
      en: 'Cross-platform mobile products with Flutter, reusable components, and API integration.',
      ne: 'Flutter, पुन: प्रयोगयोग्य कम्पोनेन्ट र API एकीकरणसहित क्रस-प्लेटफर्म मोबाइल उत्पादन।',
    },
    skills: ['Flutter', 'Dart', 'Cross-Platform Mobile Development', 'REST API Integration', 'Responsive Mobile UI'],
    relatedProjects: [],
  },
  {
    id: 'database',
    label: { en: 'Databases', ne: 'डेटाबेस' },
    summary: {
      en: 'Relational models that make the right queries easy and the wrong ones hard.',
      ne: 'सही क्वेरी सजिलो र गलत क्वेरी कठिन बनाउने रिलेसनल मोडेल।',
    },
    skills: ['MySQL', 'SQLite', 'Schema design', 'Query optimisation'],
    relatedProjects: ['ecommerce-platform', 'school-management-system'],
  },
  {
    id: 'architecture',
    label: { en: 'Architecture', ne: 'आर्किटेक्चर' },
    summary: {
      en: 'Structures that keep data isolated, permissions explicit, and features maintainable.',
      ne: 'डेटा अलग, अनुमति स्पष्ट र सुविधा मर्मतयोग्य राख्ने संरचना।',
    },
    skills: ['SaaS Architecture', 'Multi-Tenant Applications', 'Service–Repository Pattern', 'Role-Based Access Control', 'Application Performance'],
    relatedProjects: ['school-management-system', 'ecommerce-platform'],
  },
  {
    id: 'tools',
    label: { en: 'Tools', ne: 'उपकरण' },
    summary: {
      en: 'The working toolkit around the code — version control, deployment, APIs, and design.',
      ne: 'कोडवरिपरिको कार्य उपकरण — भर्सन कन्ट्रोल, डिप्लोयमेन्ट, API र डिजाइन।',
    },
    skills: ['Git', 'GitHub', 'Vercel', 'Postman', 'Figma'],
    relatedProjects: ['cargo-gbl', 'gvs-nepal', 'school-management-system'],
  },
];

export const engineeringConcepts: Localized[] = [
  { en: 'SaaS architecture', ne: 'SaaS आर्किटेक्चर' },
  { en: 'Multi-tenancy', ne: 'मल्टि-टेनन्सी' },
  { en: 'Authentication & authorisation', ne: 'प्रमाणीकरण र अधिकार' },
  { en: 'API integration', ne: 'API एकीकरण' },
  { en: 'Responsive design', ne: 'उत्तरदायी डिजाइन' },
  { en: 'Flutter mobile apps', ne: 'Flutter मोबाइल एप' },
  { en: 'Performance optimisation', ne: 'प्रदर्शन अनुकूलन' },
];
