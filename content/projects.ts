import type { Project, Workstream } from './types';

/**
 * Public case studies use only supplied project information.
 * Workstreams describe the actual kinds of work delivered at Webcreation Nepal
 * without inventing client names, screenshots, metrics, or URLs.
 */
export const projects: Project[] = [
  {
    slug: 'cargo-gbl',
    title: 'Cargo GBL',
    category: 'business',
    status: 'live',
    visible: true,
    featured: true,
    order: 1,
    employer: 'Shakta Technology',
    summary: {
      en: 'A modern logistics and cargo service website built with a responsive interface, business-focused design, and optimized performance.',
      ne: 'उत्तरदायी इन्टरफेस, व्यवसायमुखी डिजाइन र अनुकूलित प्रदर्शनसहितको आधुनिक लजिस्टिक्स तथा कार्गो सेवा वेबसाइट।',
    },
    description: {
      en: 'Cargo GBL is a public-facing logistics website for a cargo and freight business. The work covered page architecture, a responsive service catalogue, and frontend performance so visitors can understand the services and reach the enquiry path quickly, including on slower mobile connections.',
      ne: 'Cargo GBL कार्गो तथा फ्रेट व्यवसायका लागि सार्वजनिक लजिस्टिक्स वेबसाइट हो। यसमा पेज आर्किटेक्चर, उत्तरदायी सेवा सूची र फ्रन्टइन्ड प्रदर्शन समेटिएको छ, ताकि आगन्तुकहरूले सेवा बुझेर छिटो सम्पर्क मार्गसम्म पुग्न सकून् — ढिलो मोबाइल कनेक्सनमा पनि।',
    },
    role: {
      en: 'Website development: page structure, responsive interface, and frontend performance.',
      ne: 'वेबसाइट विकास: पेज संरचना, उत्तरदायी इन्टरफेस र फ्रन्टइन्ड प्रदर्शन।',
    },
    challenge: {
      en: 'Logistics content is dense — service types, routes, and enquiry details — and most visitors arrive on a phone. Heavy pages make the enquiry path harder to complete.',
      ne: 'लजिस्टिक्स सामग्री घना हुन्छ — सेवाका प्रकार, मार्ग र सोधपुछका विवरण — र अधिकांश आगन्तुक मोबाइलबाट आउँछन्। भारी पेजले सोधपुछको प्रक्रिया कठिन बनाउँछ।',
    },
    solution: {
      en: 'Structured the content into scannable sections, built the layout mobile-first, and kept the frontend payload lean through disciplined images and simple components.',
      ne: 'सामग्रीलाई छिटो पढिने खण्डमा व्यवस्थित गरें, लेआउट मोबाइल-पहिले बनाएँ र अनुशासित इमेज तथा सरल कम्पोनेन्टमार्फत फ्रन्टइन्ड पेलोड हल्का राखें।',
    },
    contributions: [
      { en: 'Responsive service and information architecture', ne: 'उत्तरदायी सेवा तथा जानकारी संरचना' },
      { en: 'Clear contact and enquiry paths', ne: 'स्पष्ट सम्पर्क र सोधपुछ मार्ग' },
      { en: 'Mobile-first frontend performance', ne: 'मोबाइल-पहिले फ्रन्टइन्ड प्रदर्शन' },
    ],
    features: [
      { en: 'Responsive service and information pages', ne: 'उत्तरदायी सेवा तथा जानकारी पेजहरू' },
      { en: 'Clear contact and enquiry paths', ne: 'स्पष्ट सम्पर्क र सोधपुछ मार्ग' },
      { en: 'Mobile-first layout and assets', ne: 'मोबाइल-पहिले लेआउट र एसेट' },
      { en: 'Performance-focused frontend', ne: 'प्रदर्शनमा केन्द्रित फ्रन्टइन्ड' },
    ],
    architecture: [],
    stack: [],
    cover: '/images/projects/cargo-gbl.svg',
    screenshots: [],
    links: { live: 'https://cargogbl.com' },
    seoTitle: {
      en: 'Cargo GBL — Logistics website case study',
      ne: 'Cargo GBL — लजिस्टिक्स वेबसाइट केस स्टडी',
    },
    seoDescription: {
      en: 'Case study: a responsive logistics and cargo website built for clear service presentation and frontend performance.',
      ne: 'केस स्टडी: स्पष्ट सेवा प्रस्तुति र फ्रन्टइन्ड प्रदर्शनका लागि बनाइएको उत्तरदायी लजिस्टिक्स तथा कार्गो वेबसाइट।',
    },
  },
  {
    slug: 'gvs-nepal',
    title: 'GVS Nepal',
    category: 'business',
    status: 'live',
    visible: true,
    featured: true,
    order: 2,
    employer: 'Shakta Technology',
    summary: {
      en: 'A professional company website featuring responsive design, dynamic content management, and an optimized user experience.',
      ne: 'उत्तरदायी डिजाइन, गतिशील सामग्री व्यवस्थापन र अनुकूलित प्रयोगकर्ता अनुभवसहितको व्यावसायिक कम्पनी वेबसाइट।',
    },
    description: {
      en: 'GVS Nepal is a corporate web presence where the content team can publish and update information without touching code. The build pairs a restrained, modern interface with a dynamic content workflow and frontend optimisation so new pages stay consistent and quick.',
      ne: 'GVS Nepal एउटा कर्पोरेट वेब उपस्थिति हो, जहाँ सामग्री टिमले कोड नछोई जानकारी प्रकाशित र अद्यावधिक गर्न सक्छ। यसमा संयमित आधुनिक इन्टरफेस, गतिशील सामग्री कार्यप्रवाह र फ्रन्टइन्ड अनुकूलन मिलाइएको छ, ताकि नयाँ पेजहरू सुसंगत र छिटो रहून्।',
    },
    role: {
      en: 'Full-stack development: content-driven page structure, frontend implementation, and optimisation.',
      ne: 'फुल-स्ट्याक विकास: सामग्रीमा आधारित पेज संरचना, फ्रन्टइन्ड कार्यान्वयन र अनुकूलन।',
    },
    challenge: {
      en: 'A corporate site changes constantly. If every new section needs custom markup, the design drifts and the content team becomes dependent on a developer.',
      ne: 'कर्पोरेट साइट निरन्तर बदलिन्छ। हरेक नयाँ खण्डका लागि छुट्टै मार्कअप चाहिएमा डिजाइन बिग्रन्छ र सामग्री टिम डेभलपरमा निर्भर हुन्छ।',
    },
    solution: {
      en: 'Modelled the page around reusable content sections, kept one consistent component vocabulary, and optimised the frontend so added content does not add unnecessary weight.',
      ne: 'पेजलाई पुन: प्रयोग गर्न सकिने सामग्री खण्डमा मोडेल गरें, एउटै सुसंगत कम्पोनेन्ट शब्दावली राखें र फ्रन्टइन्ड अनुकूलित गरें, ताकि थपिएको सामग्रीले अनावश्यक भार नथपोस्।',
    },
    contributions: [
      { en: 'Reusable content sections and page structure', ne: 'पुन: प्रयोगयोग्य सामग्री खण्ड र पेज संरचना' },
      { en: 'Responsive corporate interface', ne: 'उत्तरदायी कर्पोरेट इन्टरफेस' },
      { en: 'Frontend optimisation', ne: 'फ्रन्टइन्ड अनुकूलन' },
    ],
    features: [
      { en: 'Dynamic content sections', ne: 'गतिशील सामग्री खण्डहरू' },
      { en: 'Responsive corporate pages', ne: 'उत्तरदायी कर्पोरेट पेजहरू' },
      { en: 'Reusable UI vocabulary', ne: 'पुन: प्रयोगयोग्य UI शब्दावली' },
      { en: 'Frontend optimisation', ne: 'फ्रन्टइन्ड अनुकूलन' },
    ],
    architecture: [],
    stack: [],
    cover: '/images/projects/gvs-nepal.svg',
    screenshots: [],
    links: { live: 'https://gvsnepal.com' },
    seoTitle: {
      en: 'GVS Nepal — Corporate website case study',
      ne: 'GVS Nepal — कर्पोरेट वेबसाइट केस स्टडी',
    },
    seoDescription: {
      en: 'Case study: a corporate website with dynamic content management, a modern UI, and frontend optimisation.',
      ne: 'केस स्टडी: गतिशील सामग्री व्यवस्थापन, आधुनिक UI र फ्रन्टइन्ड अनुकूलनसहितको कर्पोरेट वेबसाइट।',
    },
  },
  {
    slug: 'school-management-system',
    title: 'Multi-Tenant School Management',
    category: 'saas',
    status: 'in-development',
    visible: true,
    featured: true,
    order: 3,
    employer: 'Shakta Technology',
    summary: {
      en: 'A scalable school management platform featuring tenant-based data separation, role-based authentication, attendance tracking, exam management, and analytics.',
      ne: 'टेनन्ट-आधारित डेटा अलगाव, भूमिका-आधारित प्रमाणीकरण, उपस्थिति, परीक्षा व्यवस्थापन र विश्लेषणसहितको स्केलेबल विद्यालय व्यवस्थापन प्लेटफर्म।',
    },
    description: {
      en: 'A school management system designed as a multi-tenant SaaS product: independent schools share one application while their data and permissions stay separated. The platform covers role-based access, attendance, exams, and analytics. It is under active development; a public demo link has not been published yet.',
      ne: 'मल्टि-टेनन्ट SaaS उत्पादनका रूपमा डिजाइन गरिएको विद्यालय व्यवस्थापन प्रणाली: फरक-फरक विद्यालयले एउटै एप्लिकेसन साझा गर्छन् तर तिनका डेटा र अनुमति छुट्टै रहन्छन्। प्लेटफर्मले भूमिका-आधारित पहुँच, उपस्थिति, परीक्षा र विश्लेषण समेट्छ। यो सक्रिय विकासमा छ; सार्वजनिक डेमो लिंक अझै प्रकाशित भएको छैन।',
    },
    role: {
      en: 'Full-stack architecture and development across the Next.js interface, Laravel API, and MySQL data model.',
      ne: 'Next.js इन्टरफेस, Laravel API र MySQL डेटा मोडेलभर फुल-स्ट्याक आर्किटेक्चर तथा विकास।',
    },
    challenge: {
      en: 'Multiple schools in one application create two hard problems: tenant data must never leak between institutions, and staff, teachers, students, and parents need different views of the same records.',
      ne: 'एउटै एप्लिकेसनमा धेरै विद्यालय हुँदा दुई कठिन समस्या आउँछन्: एउटा संस्थाको डेटा अर्कोमा कहिल्यै नजानुपर्ने, र कर्मचारी, शिक्षक, विद्यार्थी तथा अभिभावकलाई एउटै रेकर्डको फरक दृश्य चाहिने।',
    },
    solution: {
      en: 'Resolve the tenant before any request logic runs, scope every query to that tenant, and enforce permissions through policies rather than scattered checks in controllers.',
      ne: 'कुनै पनि अनुरोध लजिक चल्नुअघि टेनन्ट पहिचान गर्ने, हरेक क्वेरी त्यही टेनन्टमा सीमित गर्ने र कन्ट्रोलरभरि छरिएका जाँचको सट्टा नीतिमार्फत अनुमति लागू गर्ने।',
    },
    contributions: [
      { en: 'Tenant resolution and scoped query architecture', ne: 'टेनन्ट पहिचान र सीमित क्वेरी आर्किटेक्चर' },
      { en: 'Role-based authentication and policy enforcement', ne: 'भूमिका-आधारित प्रमाणीकरण र नीति कार्यान्वयन' },
      { en: 'Attendance, exams, and analytics workflows', ne: 'उपस्थिति, परीक्षा र विश्लेषण कार्यप्रवाह' },
    ],
    features: [
      { en: 'Role-based authentication and permissions', ne: 'भूमिका-आधारित प्रमाणीकरण र अनुमति' },
      { en: 'Tenant isolation across records and queries', ne: 'रेकर्ड र क्वेरीभर टेनन्ट अलगाव' },
      { en: 'Attendance tracking', ne: 'उपस्थिति ट्र्याकिङ' },
      { en: 'Examinations and results', ne: 'परीक्षा र नतिजा' },
      { en: 'Academic analytics', ne: 'शैक्षिक विश्लेषण' },
    ],
    architecture: [
      {
        name: { en: 'Client', ne: 'क्लाइन्ट' },
        detail: {
          en: 'Next.js portals for administrators, teachers, students, and parents.',
          ne: 'प्रशासक, शिक्षक, विद्यार्थी र अभिभावकका लागि Next.js पोर्टल।',
        },
      },
      {
        name: { en: 'Tenant resolution', ne: 'टेनन्ट पहिचान' },
        detail: {
          en: 'Request-scoped tenant context is established before any application logic or query.',
          ne: 'कुनै पनि एप्लिकेसन लजिक वा क्वेरीअघि अनुरोध-सीमित टेनन्ट सन्दर्भ स्थापित हुन्छ।',
        },
      },
      {
        name: { en: 'Application', ne: 'एप्लिकेसन' },
        detail: {
          en: 'Laravel API with policy-based authorisation and a consistent REST surface.',
          ne: 'नीति-आधारित अधिकार र सुसंगत REST सतहसहितको Laravel API।',
        },
      },
      {
        name: { en: 'Data', ne: 'डेटा' },
        detail: {
          en: 'MySQL with tenant-scoped queries and database constraints protecting relationships.',
          ne: 'टेनन्ट-सीमित क्वेरी र सम्बन्ध सुरक्षित गर्ने डेटाबेस बाधासहितको MySQL।',
        },
      },
    ],
    stack: ['Next.js', 'Laravel', 'MySQL', 'TypeScript'],
    cover: '/images/projects/school-management.svg',
    screenshots: [],
    links: {},
    seoTitle: {
      en: 'Multi-tenant school management system — Case study',
      ne: 'मल्टि-टेनन्ट विद्यालय व्यवस्थापन प्रणाली — केस स्टडी',
    },
    seoDescription: {
      en: 'Case study of a multi-tenant school management SaaS: role-based access, tenant isolation, attendance, exams, and analytics.',
      ne: 'मल्टि-टेनन्ट विद्यालय व्यवस्थापन SaaS को केस स्टडी: भूमिका-आधारित पहुँच, टेनन्ट अलगाव, उपस्थिति, परीक्षा र विश्लेषण।',
    },
    verificationNote: {
      en: 'Under active development. The demo URL and final feature set will be published once verified.',
      ne: 'सक्रिय विकासमा। डेमो URL र अन्तिम सुविधा सूची प्रमाणीकरणपछि प्रकाशित गरिनेछ।',
    },
  },
  {
    slug: 'news-portal',
    title: 'News Portal',
    category: 'web',
    status: 'private',
    visible: true,
    featured: false,
    order: 4,
    employer: 'Shakta Technology',
    summary: {
      en: 'A full-stack news publishing platform built using Next.js and Laravel, with responsive frontend architecture and backend integration.',
      ne: 'Next.js र Laravel प्रयोग गरी बनाइएको फुल-स्ट्याक समाचार प्रकाशन प्लेटफर्म, उत्तरदायी फ्रन्टइन्ड आर्किटेक्चर र ब्याकइन्ड एकीकरणसहित।',
    },
    description: {
      en: 'A full-stack news platform built with Next.js and Laravel. The frontend handles the editorial reading experience while Laravel provides the content and application layer. The public URL has not been published yet.',
      ne: 'Next.js र Laravel मा बनेको फुल-स्ट्याक समाचार प्लेटफर्म। फ्रन्टइन्डले सम्पादकीय पठन अनुभव सम्हाल्छ भने Laravel ले सामग्री र एप्लिकेसन तह प्रदान गर्छ। सार्वजनिक URL अझै प्रकाशित भएको छैन।',
    },
    role: {
      en: 'Full-stack development: Next.js frontend, Laravel API, and content modelling.',
      ne: 'फुल-स्ट्याक विकास: Next.js फ्रन्टइन्ड, Laravel API र सामग्री मोडेलिङ।',
    },
    challenge: {
      en: 'News pages have to be fast on first load, readable on any screen, and structured so articles can be discovered and shared correctly.',
      ne: 'समाचार पेज पहिलो लोडमै छिटो, हरेक स्क्रिनमा पढ्न सकिने र लेखहरू सही रूपमा फेला पार्न तथा साझा गर्न सकिने संरचनामा हुनुपर्छ।',
    },
    solution: {
      en: 'Kept the reading surface server-rendered and lightweight, with a clean article structure, meaningful metadata, and a content API that keeps presentation separate from storage.',
      ne: 'पठन सतहलाई सर्भर-रेन्डर र हल्का राखें, स्पष्ट लेख संरचना, अर्थपूर्ण मेटाडेटा र प्रस्तुतिलाई भण्डारणबाट अलग राख्ने सामग्री API सहित।',
    },
    contributions: [
      { en: 'Next.js editorial frontend', ne: 'Next.js सम्पादकीय फ्रन्टइन्ड' },
      { en: 'Laravel content and REST API layer', ne: 'Laravel सामग्री र REST API तह' },
      { en: 'Responsive reading experience', ne: 'उत्तरदायी पठन अनुभव' },
    ],
    features: [
      { en: 'Next.js article reading experience', ne: 'Next.js लेख पठन अनुभव' },
      { en: 'Laravel content and API layer', ne: 'Laravel सामग्री र API तह' },
      { en: 'Responsive editorial layout', ne: 'उत्तरदायी सम्पादकीय लेआउट' },
      { en: 'Structured metadata for sharing', ne: 'साझा गर्नका लागि संरचित मेटाडेटा' },
    ],
    architecture: [],
    stack: ['Next.js', 'Laravel'],
    cover: '/images/projects/news-portal.svg',
    screenshots: [],
    links: {},
    seoTitle: {
      en: 'News portal — Next.js and Laravel case study',
      ne: 'समाचार पोर्टल — Next.js र Laravel केस स्टडी',
    },
    seoDescription: {
      en: 'Case study: a full-stack news platform with a Next.js frontend and a Laravel content API.',
      ne: 'केस स्टडी: Next.js फ्रन्टइन्ड र Laravel सामग्री API सहितको फुल-स्ट्याक समाचार प्लेटफर्म।',
    },
    verificationNote: {
      en: 'The live URL will be added when it can be shared publicly.',
      ne: 'सार्वजनिक रूपमा साझा गर्न मिल्ने भएपछि लाइभ URL थपिनेछ।',
    },
  },
  {
    slug: 'ecommerce-platform',
    title: 'E-Commerce Platform',
    category: 'ecommerce',
    status: 'private',
    visible: true,
    featured: false,
    order: 5,
    employer: 'Shakta Technology',
    summary: {
      en: 'An e-commerce application with product management, ordering workflows, responsive interfaces, and customer-focused shopping experiences.',
      ne: 'उत्पादन व्यवस्थापन, अर्डर कार्यप्रवाह, उत्तरदायी इन्टरफेस र ग्राहकमुखी किनमेल अनुभवसहितको इ-कमर्स एप्लिकेसन।',
    },
    description: {
      en: 'An e-commerce build covering the catalogue and order lifecycle: product management, order processing, and responsive customer-facing interfaces. The live URL is not published yet.',
      ne: 'क्याटलग र अर्डर जीवनचक्र समेट्ने इ-कमर्स निर्माण: उत्पादन व्यवस्थापन, अर्डर प्रशोधन र ग्राहकमुखी उत्तरदायी इन्टरफेस। लाइभ URL अझै प्रकाशित भएको छैन।',
    },
    role: {
      en: 'Full-stack development across product management, order flows, and storefront UI.',
      ne: 'उत्पादन व्यवस्थापन, अर्डर प्रवाह र स्टोरफ्रन्ट UI भर फुल-स्ट्याक विकास।',
    },
    challenge: {
      en: 'Order handling is where e-commerce breaks: repeated submissions, partial failures, and inconsistent stock can turn a simple checkout into a data problem.',
      ne: 'इ-कमर्स ठ्याक्कै अर्डर ह्यान्डलिङमा बिग्रन्छ: दोहोरिएका सबमिसन, आंशिक असफलता र अस्थिर स्टकले सामान्य चेकआउटलाई डेटा समस्यामा बदल्न सक्छ।',
    },
    solution: {
      en: 'Modelled orders as explicit state transitions, validated on the server, and kept the storefront interfaces responsive with clear product and order status.',
      ne: 'अर्डरलाई स्पष्ट स्टेट ट्रान्जिसनका रूपमा मोडेल गरें, सर्भरमा प्रमाणीकरण गरें र स्पष्ट उत्पादन तथा अर्डर स्थितिसहित स्टोरफ्रन्ट इन्टरफेस उत्तरदायी राखें।',
    },
    contributions: [
      { en: 'Product and catalogue management', ne: 'उत्पादन र क्याटलग व्यवस्थापन' },
      { en: 'Order lifecycle and status handling', ne: 'अर्डर जीवनचक्र र स्थिति व्यवस्थापन' },
      { en: 'Responsive customer storefront', ne: 'उत्तरदायी ग्राहक स्टोरफ्रन्ट' },
    ],
    features: [
      { en: 'Product management', ne: 'उत्पादन व्यवस्थापन' },
      { en: 'Order processing and status tracking', ne: 'अर्डर प्रशोधन र स्थिति ट्र्याकिङ' },
      { en: 'Responsive storefront', ne: 'उत्तरदायी स्टोरफ्रन्ट' },
      { en: 'Server-side validation', ne: 'सर्भर-साइड प्रमाणीकरण' },
    ],
    architecture: [],
    stack: ['Laravel', 'PHP', 'MySQL'],
    cover: '/images/projects/ecommerce.svg',
    screenshots: [],
    links: {},
    seoTitle: {
      en: 'E-commerce platform — Case study',
      ne: 'इ-कमर्स प्लेटफर्म — केस स्टडी',
    },
    seoDescription: {
      en: 'Case study: product management, order processing, and responsive storefront interfaces for an e-commerce platform.',
      ne: 'केस स्टडी: इ-कमर्स प्लेटफर्मका लागि उत्पादन व्यवस्थापन, अर्डर प्रशोधन र उत्तरदायी स्टोरफ्रन्ट इन्टरफेस।',
    },
    verificationNote: {
      en: 'The live URL will be added when it can be shared publicly.',
      ne: 'सार्वजनिक रूपमा साझा गर्न मिल्ने भएपछि लाइभ URL थपिनेछ।',
    },
  },
  {
    slug: 'college-patro',
    title: 'College Patro',
    category: 'saas',
    status: 'in-development',
    visible: false,
    featured: false,
    order: 9,
    summary: {
      en: 'Optional project record. Details are not published until verified.',
      ne: 'वैकल्पिक परियोजना रेकर्ड। प्रमाणीकरण नभएसम्म विवरण प्रकाशित हुँदैन।',
    },
    description: {
      en: 'Reserved case study for College Patro. Add verified features, stack, status, and links before enabling visibility.',
      ne: 'College Patro का लागि आरक्षित केस स्टडी। दृश्यता सक्षम गर्नुअघि प्रमाणित सुविधा, स्ट्याक, स्थिति र लिंक थप्नुहोस्।',
    },
    role: { en: 'To be verified.', ne: 'प्रमाणीकरण गर्न बाँकी।' },
    challenge: { en: 'To be verified.', ne: 'प्रमाणीकरण गर्न बाँकी।' },
    solution: { en: 'To be verified.', ne: 'प्रमाणीकरण गर्न बाँकी।' },
    features: [],
    architecture: [],
    stack: [],
    cover: '/images/projects/college-patro.svg',
    screenshots: [],
    links: {},
    seoTitle: { en: 'College Patro — Case study', ne: 'College Patro — केस स्टडी' },
    seoDescription: { en: 'Optional project case study, pending verification.', ne: 'वैकल्पिक परियोजना केस स्टडी, प्रमाणीकरण बाँकी।' },
  },
  {
    slug: 'restaurant-pos-saas',
    title: 'Restaurant POS SaaS',
    category: 'saas',
    status: 'in-development',
    visible: false,
    featured: false,
    order: 10,
    summary: {
      en: 'Optional project record. Details are not published until verified.',
      ne: 'वैकल्पिक परियोजना रेकर्ड। प्रमाणीकरण नभएसम्म विवरण प्रकाशित हुँदैन।',
    },
    description: {
      en: 'Reserved case study for a restaurant point-of-sale SaaS product. Add verified functionality before enabling visibility.',
      ne: 'रेस्टुरेन्ट पोइन्ट-अफ-सेल SaaS उत्पादनका लागि आरक्षित केस स्टडी। दृश्यता सक्षम गर्नुअघि प्रमाणित कार्यक्षमता थप्नुहोस्।',
    },
    role: { en: 'To be verified.', ne: 'प्रमाणीकरण गर्न बाँकी।' },
    challenge: { en: 'To be verified.', ne: 'प्रमाणीकरण गर्न बाँकी।' },
    solution: { en: 'To be verified.', ne: 'प्रमाणीकरण गर्न बाँकी।' },
    features: [],
    architecture: [],
    stack: [],
    cover: '/images/projects/restaurant-pos.svg',
    screenshots: [],
    links: {},
    seoTitle: { en: 'Restaurant POS SaaS — Case study', ne: 'रेस्टुरेन्ट POS SaaS — केस स्टडी' },
    seoDescription: { en: 'Optional project case study, pending verification.', ne: 'वैकल्पिक परियोजना केस स्टडी, प्रमाणीकरण बाँकी।' },
  },
];

/** Webcreation Nepal workstreams — no invented client names or links. */
export const workstreams: Workstream[] = [
  {
    id: 'ecommerce-saas',
    category: 'saas',
    employer: 'Webcreation Nepal',
    title: { en: 'E-Commerce & SaaS Platforms', ne: 'इ-कमर्स र SaaS प्लेटफर्म' },
    summary: {
      en: 'Developing scalable e-commerce and SaaS applications focused on simplifying business operations, improving workflows, and delivering reliable digital experiences.',
      ne: 'व्यावसायिक सञ्चालन सरल बनाउने, कार्यप्रवाह सुधार गर्ने र भरपर्दो डिजिटल अनुभव दिने स्केलेबल इ-कमर्स तथा SaaS एप्लिकेसन विकास।',
    },
    focus: {
      en: 'Scalable architecture, frontend development, backend APIs, product workflows, and performance.',
      ne: 'स्केलेबल आर्किटेक्चर, फ्रन्टइन्ड विकास, ब्याकइन्ड API, उत्पादन कार्यप्रवाह र प्रदर्शन।',
    },
  },
  {
    id: 'travel',
    category: 'web',
    employer: 'Webcreation Nepal',
    title: { en: 'Travel & Tourism Websites', ne: 'ट्राभल र पर्यटन वेबसाइट' },
    summary: {
      en: 'Building modern travel platforms that help businesses present destinations, manage content, and provide engaging digital experiences for travelers.',
      ne: 'व्यवसायलाई गन्तव्य प्रस्तुत गर्न, सामग्री व्यवस्थापन गर्न र यात्रुहरूका लागि आकर्षक डिजिटल अनुभव दिन मद्दत गर्ने आधुनिक ट्राभल प्लेटफर्म।',
    },
    focus: {
      en: 'Responsive interfaces, dynamic content, usability, and performance.',
      ne: 'उत्तरदायी इन्टरफेस, गतिशील सामग्री, प्रयोगयोग्यता र प्रदर्शन।',
    },
  },
  {
    id: 'hospitality',
    category: 'business',
    employer: 'Webcreation Nepal',
    title: { en: 'Restaurant & Hospitality Websites', ne: 'रेस्टुरेन्ट र हस्पिटालिटी वेबसाइट' },
    summary: {
      en: 'Creating attractive and user-friendly restaurant and hospitality websites with modern layouts, responsive design, and customer-focused functionality.',
      ne: 'आधुनिक लेआउट, उत्तरदायी डिजाइन र ग्राहकमुखी कार्यक्षमतासहित आकर्षक तथा प्रयोगमैत्री रेस्टुरेन्ट र हस्पिटालिटी वेबसाइट निर्माण।',
    },
    focus: {
      en: 'Business presentation, menu experiences, responsive UI, and performance.',
      ne: 'व्यवसाय प्रस्तुति, मेनु अनुभव, उत्तरदायी UI र प्रदर्शन।',
    },
  },
  {
    id: 'corporate',
    category: 'business',
    employer: 'Webcreation Nepal',
    title: { en: 'Corporate Websites', ne: 'कर्पोरेट वेबसाइट' },
    summary: {
      en: 'Developing professional websites that represent business identities through clean design, optimized performance, and maintainable frontend architecture.',
      ne: 'सफा डिजाइन, अनुकूलित प्रदर्शन र मर्मतयोग्य फ्रन्टइन्ड आर्किटेक्चरमार्फत व्यवसायको पहिचान प्रस्तुत गर्ने व्यावसायिक वेबसाइट विकास।',
    },
    focus: {
      en: 'Business websites, UI/UX, SEO foundations, and responsive design.',
      ne: 'व्यावसायिक वेबसाइट, UI/UX, SEO आधार र उत्तरदायी डिजाइन।',
    },
  },
  {
    id: 'flutter',
    category: 'mobile',
    employer: 'Webcreation Nepal',
    title: { en: 'Flutter Mobile Applications', ne: 'Flutter मोबाइल एप्लिकेसन' },
    summary: {
      en: 'Developing cross-platform mobile applications using Flutter and Dart, with responsive interfaces, API integration, reusable components, and maintainable application architecture.',
      ne: 'Flutter र Dart प्रयोग गरी उत्तरदायी इन्टरफेस, API एकीकरण, पुन: प्रयोगयोग्य कम्पोनेन्ट र मर्मतयोग्य आर्किटेक्चरसहित क्रस-प्लेटफर्म मोबाइल एप्लिकेसन विकास।',
    },
    focus: {
      en: 'Cross-platform UI, Dart application structure, REST integration, and reusable components. Public app case studies will be added only when shareable.',
      ne: 'क्रस-प्लेटफर्म UI, Dart एप्लिकेसन संरचना, REST एकीकरण र पुन: प्रयोगयोग्य कम्पोनेन्ट। साझा गर्न मिल्ने भएपछि मात्र सार्वजनिक एप केस स्टडी थपिनेछ।',
    },
  },
];

export const publicProjects = projects
  .filter((project) => project.visible)
  .sort((a, b) => a.order - b.order);

export const featuredProjects = publicProjects.filter((project) => project.featured);

export function getProject(slug: string): Project | undefined {
  return publicProjects.find((project) => project.slug === slug);
}
