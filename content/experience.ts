import type { EducationItem, ExperienceItem } from './types';

/** Verified employment records. Dates that were not supplied are not invented. */
export const experience: ExperienceItem[] = [
  {
    id: 'webcreation-nepal',
    company: 'Webcreation Nepal',
    role: { en: 'Full Stack Developer', ne: 'फुल स्ट्याक डेभलपर' },
    period: { en: 'Ongoing', ne: 'जारी' },
    location: { en: 'Kathmandu, Nepal', ne: 'काठमाडौँ, नेपाल' },
    summary: {
      en: 'Working as a Full Stack Developer at Webcreation Nepal, contributing to modern web applications, scalable SaaS platforms, and digital solutions for different industries.',
      ne: 'Webcreation Nepal मा फुल स्ट्याक डेभलपरका रूपमा आधुनिक वेब एप्लिकेसन, स्केलेबल SaaS प्लेटफर्म र विभिन्न क्षेत्रका डिजिटल समाधानमा योगदान गर्दै।',
    },
    responsibilities: [
      {
        en: 'Frontend development, backend APIs, and database-driven functionality.',
        ne: 'फ्रन्टइन्ड विकास, ब्याकइन्ड API र डेटाबेस-आधारित कार्यक्षमता।',
      },
      {
        en: 'Performance optimization and responsive user experiences.',
        ne: 'प्रदर्शन अनुकूलन र उत्तरदायी प्रयोगकर्ता अनुभव।',
      },
      {
        en: 'E-commerce, SaaS, travel, restaurant, hospitality, corporate, and custom business applications.',
        ne: 'इ-कमर्स, SaaS, ट्राभल, रेस्टुरेन्ट, हस्पिटालिटी, कर्पोरेट र अनुकूलित व्यावसायिक एप्लिकेसन।',
      },
      {
        en: 'API integration and full-stack delivery from data model to interface.',
        ne: 'API एकीकरण र डेटा मोडेलदेखि इन्टरफेससम्मको फुल-स्ट्याक डेलिभरी।',
      },
    ],
    stack: ['Next.js', 'React', 'Laravel', 'PHP', 'MySQL', 'TypeScript', 'Tailwind CSS'],
    current: true,
    visible: true,
    verified: true,
    verificationNote: 'Start date has not been supplied and is intentionally omitted.',
  },
  {
    id: 'shakta-technology',
    company: 'Shakta Technology',
    role: { en: 'Full Stack Developer', ne: 'फुल स्ट्याक डेभलपर' },
    period: { en: 'Dates not published', ne: 'मिति प्रकाशित छैन' },
    location: { en: 'Nepal', ne: 'नेपाल' },
    summary: {
      en: 'Worked on full-stack web applications, business websites, e-commerce platforms, news portals, and multi-tenant management systems.',
      ne: 'फुल-स्ट्याक वेब एप्लिकेसन, व्यावसायिक वेबसाइट, इ-कमर्स प्लेटफर्म, समाचार पोर्टल र मल्टि-टेनन्ट व्यवस्थापन प्रणालीमा काम गरें।',
    },
    responsibilities: [
      {
        en: 'Next.js and React frontend development.',
        ne: 'Next.js र React फ्रन्टइन्ड विकास।',
      },
      {
        en: 'Laravel backend development and REST APIs.',
        ne: 'Laravel ब्याकइन्ड विकास र REST API।',
      },
      {
        en: 'MySQL database management, authentication, and role-based access.',
        ne: 'MySQL डेटाबेस व्यवस्थापन, प्रमाणीकरण र भूमिका-आधारित पहुँच।',
      },
      {
        en: 'Responsive UI development, application optimization, and team collaboration.',
        ne: 'उत्तरदायी UI विकास, एप्लिकेसन अनुकूलन र टिम सहकार्य।',
      },
    ],
    stack: ['Next.js', 'React', 'Laravel', 'PHP', 'MySQL', 'Tailwind CSS'],
    current: false,
    visible: true,
    verified: true,
    verificationNote: 'Employment dates have not been supplied and are intentionally omitted.',
  },
];

export const education: EducationItem[] = [
  {
    id: 'bca',
    qualification: {
      en: 'Bachelor of Computer Applications (BCA)',
      ne: 'ब्याचलर अफ कम्प्युटर एप्लिकेसन (BCA)',
    },
    institution: 'Janamaitri Multiple Campus',
    affiliation: 'Tribhuvan University',
    period: { en: 'Currently studying', ne: 'हाल अध्ययनरत' },
    status: { en: '8th semester', ne: 'आठौं सेमेस्टर' },
    description: {
      en: 'Pursuing a Bachelor of Computer Applications at Janamaitri Multiple Campus, Tribhuvan University, while gaining practical experience developing real-world software applications. My academic studies and professional development experience have strengthened my understanding of programming, databases, software engineering, and problem-solving.',
      ne: 'त्रिभुवन विश्वविद्यालयअन्तर्गत जनमैत्री बहुमुखी क्याम्पसमा BCA अध्ययन गर्दै वास्तविक सफ्टवेयर एप्लिकेसन विकासको व्यावहारिक अनुभव लिँदै छु। शैक्षिक अध्ययन र व्यावसायिक विकासले प्रोग्रामिङ, डेटाबेस, सफ्टवेयर इन्जिनियरिङ र समस्या समाधानको बुझाइलाई बलियो बनाएको छ।',
    },
  },
  {
    id: 'plus-two-science',
    qualification: {
      en: 'Higher Secondary Education (+2 Science)',
      ne: 'उच्च माध्यमिक शिक्षा (+२ विज्ञान)',
    },
    period: { en: 'Completed', ne: 'सम्पन्न' },
    status: { en: 'Science stream', ne: 'विज्ञान संकाय' },
    description: {
      en: 'Completed higher secondary education in the Science stream, developing a strong foundation in analytical thinking, mathematics, and problem-solving.',
      ne: 'विज्ञान संकायमा उच्च माध्यमिक शिक्षा सम्पन्न गर्दै विश्लेषणात्मक सोच, गणित र समस्या समाधानको बलियो आधार बनाएँ।',
    },
  },
];

/** Only verified, visible roles are ever rendered. */
export const publicExperience = experience.filter(
  (item) => item.visible && item.verified,
);
