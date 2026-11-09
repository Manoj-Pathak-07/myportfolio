import type { Localized } from './types';

/**
 * Single source of truth for personal details.
 *
 * LinkedIn keeps the existing project/CV URL. Dates and unverified facts are
 * deliberately absent rather than guessed.
 */
export const profile = {
  name: 'Manoj Pathak',
  firstName: 'Manoj',
  lastName: 'Pathak',
  role: {
    en: 'Full Stack Developer & Flutter Developer',
    ne: 'फुल स्ट्याक तथा Flutter डेभलपर',
  } satisfies Localized,
  roleDetailed: {
    en: 'Full Stack Developer · Flutter Developer · Software Engineer',
    ne: 'फुल स्ट्याक डेभलपर · Flutter डेभलपर · सफ्टवेयर इन्जिनियर',
  } satisfies Localized,
  company: 'Webcreation Nepal',
  previousCompany: 'Shakta Technology',
  siteUrl: 'https://pathakmanoj.com.np',
  email: 'manojjj123123@gmail.com',
  phone: '+977 9813405728',
  phoneHref: 'tel:+9779813405728',
  whatsapp: '+977 9813405728',
  whatsappHref: 'https://wa.me/9779813405728',
  instagram: 'https://www.instagram.com/manoj_pathak_ig/',
  instagramHandle: '@manoj_pathak_ig',
  location: {
    en: 'Kathmandu, Nepal',
    ne: 'काठमाडौँ, नेपाल',
  } satisfies Localized,
  coordinates: { lat: '27.7172° N', lng: '85.3240° E' },
  github: 'https://github.com/manoj-pathak-07',
  githubHandle: 'manoj-pathak-07',
  // Verified profile URL carried over from the existing project/CV.
  linkedin: 'https://www.linkedin.com/in/manojpathak',
  avatar: '/profileimage.jpeg',
  residency: {
    en: 'Based in Kathmandu · Working with teams anywhere',
    ne: 'काठमाडौँमा आधारित · जहाँ पनि टिमसँग काम गर्छु',
  } satisfies Localized,
  /** The availability badge is intentionally hidden until explicitly enabled. */
  availableForHire: false,
  availability: {
    en: 'Open to full-stack and Flutter roles',
    ne: 'फुल स्ट्याक तथा Flutter भूमिकाका लागि खुला',
  } satisfies Localized,
  languages: [
    { name: { en: 'Nepali', ne: 'नेपाली' } satisfies Localized, level: { en: 'Native', ne: 'मातृभाषा' } satisfies Localized },
    { name: { en: 'English', ne: 'अंग्रेजी' } satisfies Localized, level: { en: 'Professional', ne: 'व्यावसायिक' } satisfies Localized },
    { name: { en: 'Hindi', ne: 'हिन्दी' } satisfies Localized, level: { en: 'Conversational', ne: 'संवादात्मक' } satisfies Localized },
  ],
  hero: {
    eyebrow: {
      en: "HELLO, I'M MANOJ PATHAK",
      ne: 'नमस्कार, म मनोज पाठक।',
    } satisfies Localized,
    headline: {
      en: 'I build digital experiences that perform, scale & deliver.',
      ne: 'छिटो, भरपर्दो र विस्तार गर्न सकिने डिजिटल अनुभव निर्माण गर्छु।',
    } satisfies Localized,
    lead: {
      en: "I'm a Full Stack Developer based in Kathmandu, Nepal, currently working at Webcreation Nepal. I build high-performance websites, scalable SaaS platforms, powerful backend systems, and modern mobile applications using Next.js, React, Laravel, and Flutter.",
      ne: 'म काठमाडौंमा कार्यरत फुल स्ट्याक तथा Flutter मोबाइल एप डेभलपर हुँ। हाल Webcreation Nepal मा काम गर्दै Next.js, React, Laravel र Flutter प्रयोग गरेर उच्च प्रदर्शनका वेबसाइट, स्केलेबल SaaS प्लेटफर्म, बलियो ब्याकइन्ड र आधुनिक मोबाइल एप्लिकेसनहरू विकास गर्छु।',
    } satisfies Localized,
    statement: {
      en: 'Clean code. Fast experiences. Scalable solutions.',
      ne: 'सफा कोड। छिटो अनुभव। स्केलेबल समाधान।',
    } satisfies Localized,
    techStack: 'NEXT.JS / REACT / LARAVEL / FLUTTER / MYSQL',
    primaryCta: {
      en: 'Explore My Work',
      ne: 'मेरा प्रोजेक्टहरू हेर्नुहोस्',
    } satisfies Localized,
    secondaryCta: {
      en: 'Download Resume',
      ne: 'मेरो CV डाउनलोड गर्नुहोस्',
    } satisfies Localized,
    tertiaryCta: {
      en: "Let's Connect",
      ne: 'सम्पर्क गरौँ',
    } satisfies Localized,
    location: {
      en: 'Based in Kathmandu, Nepal',
      ne: 'काठमाडौँ, नेपालमा आधारित',
    } satisfies Localized,
  },
  about: {
    en: [
      "I'm Manoj Pathak, a Full Stack Developer and Flutter mobile application developer currently working at Webcreation Nepal.",
      'I specialize in creating fast, scalable, and user-focused digital products. My experience includes e-commerce platforms, SaaS applications, travel websites, restaurant and hospitality solutions, corporate websites, and mobile applications.',
      'I work across the complete development process — from designing responsive frontend interfaces to developing backend APIs, managing databases, integrating services, and delivering production-ready applications.',
      'My primary technologies include Next.js, React, Laravel, PHP, MySQL, and Flutter.',
      'I believe great software should not only look impressive but also perform efficiently, remain maintainable, and solve real problems.',
      'I enjoy learning new technologies, solving engineering challenges, and continuously improving the quality of the products I build.',
    ],
    ne: [
      'म मनोज पाठक, हाल Webcreation Nepal मा कार्यरत फुल स्ट्याक डेभलपर तथा Flutter मोबाइल एप्लिकेसन डेभलपर हुँ।',
      'म छिटो, स्केलेबल र प्रयोगकर्तामा केन्द्रित डिजिटल उत्पादन बनाउनमा विशेषज्ञता राख्छु। मेरो अनुभवमा इ-कमर्स प्लेटफर्म, SaaS एप्लिकेसन, ट्राभल वेबसाइट, रेस्टुरेन्ट तथा हस्पिटालिटी समाधान, कर्पोरेट वेबसाइट र मोबाइल एप्लिकेसन समेटिन्छन्।',
      'म उत्तरदायी फ्रन्टइन्ड इन्टरफेस डिजाइन गर्नेदेखि ब्याकइन्ड API विकास, डेटाबेस व्यवस्थापन, सेवा एकीकरण र उत्पादनका लागि तयार एप्लिकेसन डेलिभर गर्नेसम्मको पूर्ण विकास प्रक्रियामा काम गर्छु।',
      'मेरा मुख्य प्रविधिहरू Next.js, React, Laravel, PHP, MySQL र Flutter हुन्।',
      'म विश्वास गर्छु कि राम्रो सफ्टवेयर आकर्षक मात्र होइन, कुशल रूपमा चल्ने, मर्मतयोग्य रहने र वास्तविक समस्या समाधान गर्ने हुनुपर्छ।',
      'म नयाँ प्रविधि सिक्न, इन्जिनियरिङ चुनौती समाधान गर्न र बनाइएका उत्पादनको गुणस्तर निरन्तर सुधार गर्न रुचाउँछु।',
    ],
  } satisfies Record<'en' | 'ne', string[]>,
  intro: {
    en: [
      "I'm Manoj Pathak, a Full Stack Developer and Flutter mobile application developer currently working at Webcreation Nepal.",
      'I work across the complete development process — responsive frontend interfaces, backend APIs, databases, integrations, and production delivery. My primary technologies are Next.js, React, Laravel, PHP, MySQL, and Flutter.',
      'I care about software that performs efficiently, remains maintainable, and solves real problems. My experience spans e-commerce, SaaS, travel, hospitality, corporate websites, and mobile applications.',
    ],
    ne: [
      'म मनोज पाठक, हाल Webcreation Nepal मा कार्यरत फुल स्ट्याक डेभलपर तथा Flutter मोबाइल एप्लिकेसन डेभलपर हुँ।',
      'म उत्तरदायी फ्रन्टइन्ड, ब्याकइन्ड API, डेटाबेस, एकीकरण र उत्पादन डेलिभरीसम्मको पूर्ण विकास प्रक्रियामा काम गर्छु। मेरा मुख्य प्रविधि Next.js, React, Laravel, PHP, MySQL र Flutter हुन्।',
      'कुशल, मर्मतयोग्य र वास्तविक समस्या समाधान गर्ने सफ्टवेयर मेरो प्राथमिकता हो। मेरो अनुभव इ-कमर्स, SaaS, ट्राभल, हस्पिटालिटी, कर्पोरेट वेबसाइट र मोबाइल एप्लिकेसनमा फैलिएको छ।',
    ],
  } satisfies Record<'en' | 'ne', string[]>,
  aboutHighlight: {
    en: "I don't just build interfaces. I build complete digital solutions.",
    ne: 'म केवल इन्टरफेस बनाउँदिनँ। म पूर्ण डिजिटल समाधान बनाउँछु।',
  } satisfies Localized,
  shortBio: {
    en: 'Full Stack and Flutter developer in Kathmandu building SaaS platforms, mobile apps, APIs, and responsive interfaces with Next.js, Laravel, and Flutter.',
    ne: 'काठमाडौँका फुल स्ट्याक तथा Flutter डेभलपर — Next.js, Laravel र Flutter मा SaaS, मोबाइल एप, API र उत्तरदायी इन्टरफेस बनाउँछु।',
  } satisfies Localized,
  principles: [
    {
      title: { en: 'Clarity over cleverness', ne: 'चतुराईभन्दा स्पष्टता' } satisfies Localized,
      body: {
        en: 'The best implementation is the one the next developer can change without fear. I optimise for readable boundaries and honest naming.',
        ne: 'उत्तम कार्यान्वयन त्यही हो जसलाई अर्को डेभलपरले डर बिना परिवर्तन गर्न सक्छ। म पढ्न सकिने सीमा र स्पष्ट नामकरणलाई प्राथमिकता दिन्छु।',
      } satisfies Localized,
    },
    {
      title: { en: 'Performance is a feature', ne: 'प्रदर्शन पनि एउटा सुविधा हो' } satisfies Localized,
      body: {
        en: 'Speed changes how a product feels and who can use it. I treat payload, queries, and render paths as product decisions, not cleanup tasks.',
        ne: 'गतिले उत्पादनको अनुभव र पहुँच दुवै बदल्छ। म payload, क्वेरी र रेन्डर मार्गलाई सफाइको काम नभई उत्पादन निर्णयका रूपमा लिन्छु।',
      } satisfies Localized,
    },
    {
      title: { en: 'Accessible by default', ne: 'पूर्वनिर्धारित रूपमा सुलभ' } satisfies Localized,
      body: {
        en: 'Keyboard access, contrast, and semantic HTML are part of the build — not a separate pass at the end.',
        ne: 'किबोर्ड पहुँच, कन्ट्रास्ट र सेम्यान्टिक HTML निर्माणकै हिस्सा हुन् — अन्त्यमा गरिने अलग काम होइन।',
      } satisfies Localized,
    },
    {
      title: { en: 'Interfaces should explain themselves', ne: 'इन्टरफेसले आफैं बताउनुपर्छ' } satisfies Localized,
      body: {
        en: 'A user should never have to guess what a control does or what happens next. Microcopy and state design matter as much as layout.',
        ne: 'प्रयोगकर्ताले कुनै नियन्त्रणले के गर्छ वा अब के हुन्छ भनेर अनुमान गर्नु नपर्ने। माइक्रोकपी र स्टेट डिजाइन पनि लेआउटजत्तिकै महत्त्वपूर्ण छन्।',
      } satisfies Localized,
    },
  ],
  interests: [
    { en: 'SaaS architecture', ne: 'SaaS आर्किटेक्चर' },
    { en: 'Flutter & mobile products', ne: 'Flutter र मोबाइल उत्पादन' },
    { en: 'Multi-tenant systems', ne: 'मल्टि-टेनन्ट सिस्टम' },
    { en: 'Developer experience', ne: 'डेभलपर अनुभव' },
    { en: 'Web performance', ne: 'वेब प्रदर्शन' },
  ] satisfies Localized[],
  resume: {
    /** Generated from the print resume route; replace with a verified CV whenever available. */
    pdf: '/resume/manoj-pathak-cv.pdf' as string | null,
    printPath: '/resume',
  },
  contactNote: {
    en: 'Email or WhatsApp is the fastest way to reach me. I read everything and reply to genuine enquiries.',
    ne: 'मलाई सम्पर्क गर्ने सबैभन्दा छिटो माध्यम इमेल वा WhatsApp हो। म सबै पढ्छु र गम्भीर जिज्ञासाको जवाफ दिन्छु।',
  } satisfies Localized,
};

export type Profile = typeof profile;
