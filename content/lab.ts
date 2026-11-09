import type { LabExperiment } from './types';

export const labExperiments: LabExperiment[] = [
  {
    id: 'signal-field',
    title: { en: 'Signal Field', ne: 'सिग्नल फिल्ड' },
    description: {
      en: 'A pointer-reactive dot field built with CSS custom properties and a single listener. Move across it — attention follows the cursor without a canvas.',
      ne: 'CSS कस्टम प्रोपर्टी र एउटै लिसनरमा बनेको पोइन्टर-प्रतिक्रियाशील डट फिल्ड। सार्नुहोस् — क्यानभास बिनै ध्यान कर्सरलाई पछ्याउँछ।',
    },
    kind: { en: 'Interaction', ne: 'इन्टर्याक्सन' },
    order: 1,
  },
  {
    id: 'type-decode',
    title: { en: 'Type Decode', ne: 'टाइप डिकोड' },
    description: {
      en: 'A text-scramble transition for states that need emphasis. It respects reduced-motion preferences and settles on the real string, not a fake one.',
      ne: 'जोड दिनुपर्ने अवस्थाका लागि टेक्स्ट-स्क्राम्बल ट्रान्जिसन। यसले रिड्युस्ड-मोसन प्राथमिकता मान्छ र वास्तविक टेक्स्टमै टुंगिन्छ।',
    },
    kind: { en: 'Motion', ne: 'मोसन' },
    order: 2,
  },
  {
    id: 'orbit-loader',
    title: { en: 'Orbit Loader', ne: 'अर्बिट लोडर' },
    description: {
      en: 'A pure-CSS loading mark built from three tilted rings. No images, no JavaScript, and it stops animating under reduced-motion.',
      ne: 'तीनवटा झुकेका रिङबाट बनेको शुद्ध CSS लोडिङ चिन्ह। इमेज वा JavaScript चाहिँदैन, र रिड्युस्ड-मोसनमा एनिमेसन रोकिन्छ।',
    },
    kind: { en: 'CSS', ne: 'CSS' },
    order: 3,
  },
];
