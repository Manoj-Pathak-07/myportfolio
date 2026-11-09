import type { Localized, PerformanceHighlight, Service } from './types';

export const services: Service[] = [
  {
    id: 'full-stack-web',
    icon: 'layers',
    title: { en: 'Full-Stack Web Applications', ne: 'फुल-स्ट्याक वेब एप्लिकेसन' },
    body: {
      en: 'Complete web solutions with modern frontends, reliable backends, and efficient databases.',
      ne: 'आधुनिक फ्रन्टइन्ड, भरपर्दो ब्याकइन्ड र कुशल डेटाबेससहितको पूर्ण वेब समाधान।',
    },
  },
  {
    id: 'saas',
    icon: 'cloud',
    title: { en: 'SaaS Platforms', ne: 'SaaS प्लेटफर्म' },
    body: {
      en: 'Scalable business applications with maintainable architecture and practical workflows.',
      ne: 'मर्मतयोग्य आर्किटेक्चर र व्यावहारिक कार्यप्रवाहसहित स्केलेबल व्यावसायिक एप्लिकेसन।',
    },
  },
  {
    id: 'ecommerce',
    icon: 'shopping-bag',
    title: { en: 'E-Commerce Solutions', ne: 'इ-कमर्स समाधान' },
    body: {
      en: 'Responsive shopping experiences, product management, and business-oriented functionality.',
      ne: 'उत्तरदायी किनमेल अनुभव, उत्पादन व्यवस्थापन र व्यवसायमुखी कार्यक्षमता।',
    },
  },
  {
    id: 'flutter',
    icon: 'smartphone',
    title: { en: 'Flutter Mobile Applications', ne: 'Flutter मोबाइल एप्लिकेसन' },
    body: {
      en: 'Cross-platform mobile applications with modern interfaces and seamless API integration.',
      ne: 'आधुनिक इन्टरफेस र सहज API एकीकरणसहित क्रस-प्लेटफर्म मोबाइल एप्लिकेसन।',
    },
  },
  {
    id: 'backend',
    icon: 'server',
    title: { en: 'API & Backend Development', ne: 'API र ब्याकइन्ड विकास' },
    body: {
      en: 'Secure, maintainable backend systems with structured APIs and database integration.',
      ne: 'संरचित API र डेटाबेस एकीकरणसहित सुरक्षित, मर्मतयोग्य ब्याकइन्ड प्रणाली।',
    },
  },
  {
    id: 'performance',
    icon: 'gauge',
    title: { en: 'Performance Optimization', ne: 'प्रदर्शन अनुकूलन' },
    body: {
      en: 'Improving loading speed, rendering efficiency, responsiveness, and overall application quality.',
      ne: 'लोडिङ गति, रेन्डरिङ कुशलता, उत्तरदायित्व र समग्र एप्लिकेसन गुणस्तर सुधार।',
    },
  },
];

export const performanceHighlights: PerformanceHighlight[] = [
  {
    id: 'fast',
    title: { en: 'Fast by Design', ne: 'डिजाइनदेखि नै छिटो' },
    body: {
      en: 'Optimized loading, efficient rendering, and smooth interactions.',
      ne: 'अनुकूलित लोडिङ, कुशल रेन्डरिङ र सहज इन्टर्याक्सन।',
    },
  },
  {
    id: 'scale',
    title: { en: 'Built to Scale', ne: 'बढ्न तयार' },
    body: {
      en: 'Maintainable code, reusable components, and scalable architecture.',
      ne: 'मर्मतयोग्य कोड, पुन: प्रयोगयोग्य कम्पोनेन्ट र स्केलेबल आर्किटेक्चर।',
    },
  },
  {
    id: 'user',
    title: { en: 'User Focused', ne: 'प्रयोगकर्तामा केन्द्रित' },
    body: {
      en: 'Responsive, accessible, and intuitive experiences.',
      ne: 'उत्तरदायी, सुलभ र सहज बुझिने अनुभव।',
    },
  },
  {
    id: 'production',
    title: { en: 'Production Mindset', ne: 'उत्पादन सोच' },
    body: {
      en: 'Reliable functionality, thoughtful validation, testing, and optimization.',
      ne: 'भरपर्दो कार्यक्षमता, सोचविचार गरिएको भ्यालिडेसन, परीक्षण र अनुकूलन।',
    },
  },
];

export const performanceStatement: { lead: Localized; emphasis: Localized; body: Localized } = {
  lead: {
    en: "Performance isn't an afterthought.",
    ne: 'प्रदर्शन पछिको सोच होइन।',
  },
  emphasis: {
    en: "It's part of the architecture.",
    ne: 'यो आर्किटेक्चरकै हिस्सा हो।',
  },
  body: {
    en: 'I care deeply about how software performs in real-world environments. From optimizing frontend rendering and reducing unnecessary requests to building efficient APIs and maintainable backend systems, I focus on delivering applications that are fast, reliable, responsive, and scalable. My goal is to create software that feels smooth for users and remains easy to improve as requirements grow.',
    ne: 'वास्तविक वातावरणमा सफ्टवेयरले कसरी प्रदर्शन गर्छ भन्नेमा म गहिरो ध्यान दिन्छु। फ्रन्टइन्ड रेन्डरिङ अनुकूलन र अनावश्यक अनुरोध घटाउनेदेखि कुशल API तथा मर्मतयोग्य ब्याकइन्ड बनाउनेसम्म, म छिटो, भरपर्दो, उत्तरदायी र स्केलेबल एप्लिकेसन डेलिभर गर्न केन्द्रित हुन्छु। मेरो लक्ष्य प्रयोगकर्तालाई सहज लाग्ने र आवश्यकता बढ्दै जाँदा सुधार गर्न सजिलो हुने सफ्टवेयर बनाउनु हो।',
  },
};
