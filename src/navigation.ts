import { getPermalink, getBlogPermalink } from './utils/permalinks';
import { SITE_INFO } from './data/site';
import type { CallToAction } from './types';

const socialHref = (val: string) => (val && val !== 'TODO' ? val : getPermalink('/contact'));
const rawWhatsapp = String(SITE_INFO.contact.whatsapp || '');
const whatsappDigits = rawWhatsapp && rawWhatsapp !== 'TODO' ? rawWhatsapp.replace(/[^0-9]/g, '') : '';
const whatsappHref = whatsappDigits ? `https://wa.me/${whatsappDigits}` : getPermalink('/contact');

export const headerData = {
  links: [
    { text: 'Colleges', href: getPermalink('/colleges') },
    { text: 'Courses', href: getPermalink('/courses') },
    { text: 'Entrance Exams', href: getPermalink('/exams') },
    { text: 'Admission Guides', href: getPermalink('/guide') },
    { text: 'Scholarships', href: getPermalink('/scholarships') },
    { text: 'Blog', href: getBlogPermalink() },
    { text: 'About Us', href: getPermalink('/about') },
    { text: 'Contact', href: getPermalink('/contact') },
  ],
  actions: [{ text: 'Get Counselling →', href: getPermalink('/contact'), variant: 'primary' }] as CallToAction[],
};

export const footerData = {
  links: [
    {
      title: 'Colleges & Admissions',
      links: [
        { text: 'All Colleges', href: getPermalink('/colleges') },
        { text: 'Explore Courses', href: getPermalink('/courses') },
        { text: 'Entrance Exams', href: getPermalink('/exams') },
        { text: 'Admission Guides', href: getPermalink('/guide') },
        { text: 'Scholarships', href: getPermalink('/scholarships') },
      ],
    },
    {
      title: 'Guides & Insights',
      links: [
        { text: 'NEET UG Counselling Guide', href: getPermalink('neet-ug-counselling-explained', 'post') },
        {
          text: 'Government vs Private Colleges',
          href: getPermalink('government-vs-private-engineering-colleges', 'post'),
        },
        { text: 'Scholarships for Indian Students', href: getPermalink('scholarships-for-indian-students', 'post') },
        { text: 'Education Articles & News', href: getBlogPermalink() },
      ],
    },
    {
      title: 'About Tawam',
      links: [
        { text: 'About Us', href: getPermalink('/about') },
        { text: 'Contact & Counselling', href: getPermalink('/contact') },
        { text: 'Terms of Service', href: getPermalink('/terms') },
        { text: 'Privacy Policy', href: getPermalink('/privacy') },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Terms', href: getPermalink('/terms') },
    { text: 'Privacy Policy', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: socialHref(SITE_INFO.social.instagram) },
    { ariaLabel: 'YouTube', icon: 'tabler:brand-youtube', href: socialHref(SITE_INFO.social.youtube) },
    { ariaLabel: 'LinkedIn', icon: 'tabler:brand-linkedin', href: socialHref(SITE_INFO.social.linkedin) },
    { ariaLabel: 'WhatsApp', icon: 'tabler:brand-whatsapp', href: whatsappHref },
  ],
  footNote: `&copy; ${new Date().getFullYear()} Tawam Travels. All rights reserved.`,
};
