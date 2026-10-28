// Option labels must match the single/multiple select options in the
// Airtable "Education Signups" table exactly.

export const CLASS_TIME = '7:00 PM Eastern';

export const FALL_2026_CLASSES = [
  {
    number: '01',
    title: 'What Is Money?',
    date: 'Monday, November 9, 2026',
    time: CLASS_TIME,
    option: '01 - What Is Money? (Nov 9)',
  },
  {
    number: '02',
    title: 'Unlocking New Creative Freedom',
    date: 'Monday, November 23, 2026',
    time: CLASS_TIME,
    option: '02 - Unlocking New Creative Freedom (Nov 23)',
  },
  {
    number: '03',
    title: 'Bitcoin in Practice',
    date: 'Monday, December 7, 2026',
    time: CLASS_TIME,
    option: '03 - Bitcoin in Practice (Dec 7)',
  },
  {
    number: '04',
    title: 'Protecting Your Savings: Security and Self-Custody',
    date: 'Monday, December 14, 2026',
    time: CLASS_TIME,
    option: '04 - Protecting Your Savings: Self-Custody (Dec 14)',
  },
] as const;

export const ALL_SESSIONS_OPTION = 'All 4 Sessions';

export const SESSION_OPTIONS: readonly string[] = [
  ALL_SESSIONS_OPTION,
  ...FALL_2026_CLASSES.map((c) => c.option),
];

export const FORMAT_OPTIONS = [
  'Online Webinar',
  'In-Person (New York)',
  'Both Online + In-Person NYC',
] as const;

export const BACKGROUND_OPTIONS = [
  'Working Artist',
  'Patron / Collector / Supporter',
  'Educator / Arts Administrator',
  'Curious About Sound Money (Non-Artist)',
  'Other',
] as const;

export const SOURCE_OPTIONS = ['Homepage', 'Education Page', 'Webinar Page'] as const;

export type ClassSignupSource = (typeof SOURCE_OPTIONS)[number];
