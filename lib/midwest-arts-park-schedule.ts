/**
 * Bitcoin Arts Park run-of-show · Midwest Bitcoin Summit
 * Greater Columbus Convention Center · Expo Hall · Sept 23–24, 2026
 * All times Eastern.
 *
 * Aligned to MBS Master Program V5 (updated September 19, 2026).
 */

export type SchedulePlace = 'Booth' | 'Expo Stage';

export type ScheduleKind =
  | 'open'
  | 'cinema'
  | 'pitch'
  | 'stage'
  | 'booth'
  | 'panel'
  | 'close'
  | 'note';

export type ScheduleItem = {
  time: string;
  place: SchedulePlace;
  title: string;
  detail?: string;
  kind: ScheduleKind;
};

export type ScheduleDay = {
  id: 'wed' | 'thu';
  label: string;
  dateLabel: string;
  items: ScheduleItem[];
};

export const MIDWEST_SCHEDULE_META = {
  eventName: 'Bitcoin Arts Park',
  summitName: 'Midwest Bitcoin Summit',
  venue: 'Greater Columbus Convention Center · Expo Hall · Columbus, OH',
  hours: '10:00 AM – 5:00 PM ET both days',
  timezoneNote: 'All times Eastern.',
  pagePath: '/midwest/schedule',
  pdfPath: '/midwest/bitcoin-arts-park-schedule.pdf',
  url: 'https://www.bitcoinforthearts.org/midwest/schedule',
  pdfUrl: 'https://www.bitcoinforthearts.org/midwest/bitcoin-arts-park-schedule.pdf',
  alwaysOn: [
    'Gallery wall + peer-to-peer silent auction',
    'Shipwreck Sean live painting + raffle ticket sales',
    'Proof of Print drop-in demos (all day)',
    'Living Room wallet conversation',
    'A13MW (Susan Koch) character hello on loop',
    'IndeeHub value-for-value resource table',
  ],
  notes: [
    'Podcast tapings happen throughout both days. No fixed clock time.',
    'Silent auction closes and the live-painting raffle draws Thursday at 3:00 PM ET.',
    'Expo Stage Wednesday: Dion intro, Ainsley Costello 45-minute set, then BFTA grant presentation (no Short North / Sweeney Todd on Wednesday).',
    'Expo Stage Thursday lunch block and the art panel follow MBS Master Program V5 timing, with Short North youth theater at 12:50.',
    'Lindey Magee also appears on Expo Stage Thursday: Women, Wealth & Sovereignty (1:40–2:10) and Orange Pilling the Next Generation (4:20–4:50).',
  ],
} as const;

export const midwestScheduleDays: ScheduleDay[] = [
  {
    id: 'wed',
    label: 'Wednesday',
    dateLabel: 'Wednesday, September 23, 2026',
    items: [
      {
        time: '10:00–10:20',
        place: 'Booth',
        title: 'Doors · Proof of Print',
        detail: 'Park opens. Drop-in demos all day.',
        kind: 'open',
      },
      {
        time: '10:20–10:50',
        place: 'Booth',
        title: 'Cinema: Liberty International · Solution to Poverty Ep 1',
        kind: 'cinema',
      },
      {
        time: '10:55–11:25',
        place: 'Booth',
        title: 'Cinema: Liberty International · Solution to Poverty Ep 2',
        kind: 'cinema',
      },
      {
        time: '11:30–11:45',
        place: 'Booth',
        title: 'Nadia Vaeh · film pitch',
        detail: 'One Poop Scoop Away teaser + talk (10–15 min).',
        kind: 'pitch',
      },
      {
        time: '12:00–12:10',
        place: 'Expo Stage',
        title: 'Dion Wilson · intro',
        detail: 'Bitcoin for the Arts introduction. Handoff to Ainsley.',
        kind: 'stage',
      },
      {
        time: '12:10–12:55',
        place: 'Expo Stage',
        title: 'Live: Ainsley Costello',
        detail: '45-minute set.',
        kind: 'stage',
      },
      {
        time: '12:55–1:10',
        place: 'Expo Stage',
        title: 'Grant presentation',
        detail:
          "Ainsley Costello presented as BFTA's initial Bitcoin micro-grantee.",
        kind: 'stage',
      },
      {
        time: '1:15–1:45',
        place: 'Booth',
        title: 'Cinema: Liberty International · Solution to Poverty Ep 3',
        kind: 'cinema',
      },
      {
        time: '1:45–2:15',
        place: 'Booth',
        title: 'Cinema: Hummingbird · The Bitcoin Jungle Story',
        kind: 'cinema',
      },
      {
        time: '2:20–2:50',
        place: 'Booth',
        title: 'Cinema: Bigger Than Bitcoin',
        kind: 'cinema',
      },
      {
        time: '2:55–3:10',
        place: 'Booth',
        title: 'Jason R. Johnston · film pitch',
        detail: 'Till My Last Breath trailer + pitch (10–15 min).',
        kind: 'pitch',
      },
      {
        time: '3:15–4:00',
        place: 'Booth',
        title: 'Cinema: Finding Home',
        kind: 'cinema',
      },
      {
        time: '4:00–5:00',
        place: 'Booth',
        title: 'Soft close · trailer loop',
        kind: 'close',
      },
    ],
  },
  {
    id: 'thu',
    label: 'Thursday',
    dateLabel: 'Thursday, September 24, 2026',
    items: [
      {
        time: '10:00–10:20',
        place: 'Booth',
        title: 'Doors · Proof of Print',
        detail: 'Park opens. Drop-in demos all day.',
        kind: 'open',
      },
      {
        time: '10:20–11:05',
        place: 'Booth',
        title: 'Cinema: Finding Home',
        kind: 'cinema',
      },
      {
        time: '11:10–11:40',
        place: 'Booth',
        title: 'Cinema: Liberty International · Solution to Poverty Ep 1',
        kind: 'cinema',
      },
      {
        time: '11:45–12:00',
        place: 'Booth',
        title: 'Nadia Vaeh · film pitch',
        detail: 'One Poop Scoop Away teaser + talk (10–15 min).',
        kind: 'pitch',
      },
      {
        time: '12:00–12:10',
        place: 'Expo Stage',
        title: 'Dion Wilson · intro',
        detail: 'Bitcoin for the Arts introduction. Handoff to Andy.',
        kind: 'stage',
      },
      {
        time: '12:10–12:40',
        place: 'Expo Stage',
        title: "Live: Rock 'n' Roll Andy Breakheart",
        kind: 'stage',
      },
      {
        time: '12:40–12:50',
        place: 'Expo Stage',
        title: 'Dion Wilson · transition',
        detail: 'Setup for Short North Stage youth performers.',
        kind: 'stage',
      },
      {
        time: '12:50–1:00',
        place: 'Expo Stage',
        title: 'Short North Stage · theater with youth performers',
        kind: 'stage',
      },
      {
        time: '1:05–1:35',
        place: 'Booth',
        title: 'Cinema: Hummingbird or Liberty Ep 2–3',
        detail: 'Booth cinema while Expo Stage runs other Summit programming.',
        kind: 'cinema',
      },
      {
        time: '1:35–1:50',
        place: 'Booth',
        title: 'Jason R. Johnston · film pitch',
        detail: 'Till My Last Breath trailer + pitch (10–15 min).',
        kind: 'pitch',
      },
      {
        time: '1:50–2:15',
        place: 'Booth',
        title: 'Ainsley Costello · storytelling',
        detail: 'Nashville-style booth conversation / interview on the bench.',
        kind: 'booth',
      },
      {
        time: '2:20–2:50',
        place: 'Expo Stage',
        title: 'Panel: Does Bitcoin Need Art to Last?',
        detail:
          'Moderator: Dr. Michael J. Kelly. Panelists: Dion Wilson · Kenneth Burris · Kyle Knight · Ainsley Costello.',
        kind: 'panel',
      },
      {
        time: '3:00',
        place: 'Booth',
        title: 'Silent auction close + live-painting raffle draw',
        detail: 'One raffle: Shipwreck Sean live canvas. Claim auction lots after.',
        kind: 'close',
      },
      {
        time: '3:10–3:40',
        place: 'Booth',
        title: 'Cinema: Bigger Than Bitcoin',
        kind: 'cinema',
      },
      {
        time: '3:45–4:15',
        place: 'Booth',
        title: 'Cinema: Liberty shorts / Finding Home reprise',
        kind: 'cinema',
      },
      {
        time: '4:15–5:00',
        place: 'Booth',
        title: 'Claims · soft close',
        kind: 'close',
      },
    ],
  },
];
